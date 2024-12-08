const Checkout = require('../models/checkout');
const Stripe = require('stripe');
const Product = require('../models/product');
const STRIPE_KEY = process.env.STRIPE_KEY;
const stripe = new Stripe(STRIPE_KEY);

module.exports = {
  checkoutCart: async (checkoutData) => {
    try {
      const {
        totalQuantity,
        totalPrice,
        paymentMethod,
        paymentId,
        cartData,
        userInfo,
      } = checkoutData;

      let checkValid = true;

      for (
        let productIndex = 0;
        productIndex < cartData?.length;
        productIndex++
      ) {
        const product = await Product.findOne({
          _id: cartData?.[productIndex]?.productId,
        })
          .lean()
          .exec();

        if (product?.currentQuantity < cartData?.[productIndex]?.quantity) {
          checkValid = false;
          break;
        }
      }

      if (!checkValid) {
        throw new Error(
          'Số lượng sản phẩm trong giỏ hàng vượt quá số lượng hiện có'
        );
      }

      if (paymentMethod === 'CARD') {
        const payment = await stripe.paymentIntents.create({
          amount: totalPrice,
          currency: 'VND',
          description: 'pay product',
          payment_method: paymentId,
          confirm: true,
        });

        if (!payment)
          throw new Error('Thanh toán thất bại, vui lòng thử lại sau');
      }

      const inserProduct = await Checkout.insertMany([
        {
          totalQuantity,
          totalPrice,
          paymentMethod,
          paymentId,
          productInfo: cartData,
          userInfo,
          deliveryStatus: paymentMethod === 'CARD' ? 'PAID' : 'ORDERED',
        },
      ]);

      if (inserProduct) {
        for (
          let productIndex = 0;
          productIndex < cartData?.length;
          productIndex++
        ) {
          await Product.updateOne(
            { _id: cartData?.[productIndex]?.productId },
            {
              $inc: {
                currentQuantity:
                  Number(cartData?.[productIndex]?.quantity) * -1,
              },
            }
          );
        }

        return {
          success: true,
        };
      }

      throw new Error('Xảy ra lỗi trong quá trình xử lí');
    } catch (error) {
      return {
        success: false,
        error: {
          message: error.message,
        },
      };
    }
  },

  getUserOrder: async (userId) => {
    try {
      const listOrder = await Checkout.find({ 'userInfo.userId': userId })
        .lean()
        .exec();

      if (listOrder) {
        return {
          success: true,
          order: [...listOrder],
        };
      }

      throw new Error('Lấy danh sách đơn hàng thất bại');
    } catch (error) {
      return {
        success: false,
        error: {
          message: error.message,
        },
      };
    }
  },

  getOrderDetail: async (checkoutId) => {
    try {
      const listOrder = await Checkout.findOne({ _id: checkoutId })
        .lean()
        .exec();

      if (listOrder) {
        return {
          success: true,
          payload: { ...listOrder },
        };
      }

      throw new Error('Lấy danh sách đơn hàng thất bại');
    } catch (error) {
      return {
        success: false,
        error: {
          message: error.message,
        },
      };
    }
  },

  changeOrderStatus: async (checkoutId, status) => {
    try {
      const res = await Checkout.findOneAndUpdate(
        { _id: checkoutId },
        {
          deliveryStatus: status,
        }
      );

      if (res) {
        return {
          success: true,
        };
      } else {
        throw new Error('Cập nhật thành công');
      }
    } catch (error) {
      return {
        success: false,
        error: {
          message: error.message,
        },
      };
    }
  },

  getAllOrder: async () => {
    try {
      const listOrder = await Checkout.find().lean().exec();

      if (listOrder) {
        return {
          success: true,
          order: listOrder,
        };
      }

      throw new Error('Lấy danh sách đơn hàng thất bại');
    } catch (error) {
      return {
        success: false,
        error: {
          message: error.message,
        },
      };
    }
  },

  statisticOrder: async (startDate, endDate) => {
    try {
      const results = await Checkout.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
            isDelete: false, // Lọc ra các đơn hàng không bị xóa
            status: true, // Lọc ra các đơn hàng hợp lệ
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$totalPrice' },
            totalOrders: { $sum: 1 },
            orders: { $push: '$$ROOT' },
          },
        },
        {
          $project: {
            _id: 0,
            totalRevenue: 1,
            totalOrders: 1,
            orders: 1,
          },
        },
      ]);

      if (results) {
        return {
          success: true,
          payload: {...results[0]},
        };
      }

      throw new Error('Lấy danh sách thống kê thất bại');
    } catch (error) {
      return {
        success: false,
        error: {
          message: error.message,
        },
      };
    }
  },
};
