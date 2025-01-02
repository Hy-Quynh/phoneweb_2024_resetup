import HomepageBrand from './components/Brand';
import HomepageCategory from './components/Category';
import NewProduct from './components/NewProduct';
import SellingProduct from './components/SellingProduct';
import Banner1 from '../../../assets/img/homepage-banner-1.jpg';
import Banner2 from '../../../assets/img/homepage-banner-2.jpg';
import Banner3 from '../../../assets/img/homepage-banner-3.jpg';
import Banner4 from '../../../assets/img/homepage-banner-4.webp';
import Banner5 from '../../../assets/img/homepage-banner-5.jpg';

export default function HomePage() {
  return (
    <div>
      <div className='container-fluid mb-3'>
        <div className='row px-xl-5'>
          <div className='col-lg-8'>
            <div
              id='header-carousel'
              className='carousel slide carousel-fade mb-30 mb-lg-0'
              data-ride='carousel'
            >
              <ol className='carousel-indicators'>
                <li
                  data-target='#header-carousel'
                  data-slide-to={0}
                  className='active'
                />
                <li data-target='#header-carousel' data-slide-to={1} />
                <li data-target='#header-carousel' data-slide-to={2} />
              </ol>
              <div className='carousel-inner'>
                <div
                  className='carousel-item position-relative active'
                  style={{ height: 430 }}
                >
                  <img
                    className='position-absolute w-100 h-100'
                    src={Banner1}
                    style={{ objectFit: 'cover' }}
                  />
                  <div className='carousel-caption d-flex flex-column align-items-center justify-content-center'>
                    <div className='p-3' style={{ maxWidth: 700 }}>
                      <h1 className='display-4 text-white mb-3 animate__animated animate__fadeInDown'>
                        Sản phẩm mới
                      </h1>
                      <p className='mx-md-5 px-5 animate__animated animate__bounceIn'>
                        Với hơn 100 sản phẩm với công nghệ hiện đại, sẽ đem lại
                        trải nghiệm tuyệt vời dành cho bạn
                      </p>
                      <a
                        className='btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp'
                        href='product'
                      >
                        Mua ngay
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className='carousel-item position-relative'
                  style={{ height: 430 }}
                >
                  <img
                    className='position-absolute w-100 h-100'
                    src={Banner2}
                    style={{ objectFit: 'cover' }}
                  />
                  <div className='carousel-caption d-flex flex-column align-items-center justify-content-center'>
                    <div className='p-3' style={{ maxWidth: 700 }}>
                      <h1 className='display-4 text-white mb-3 animate__animated animate__fadeInDown'>
                        Hàng ngàn ưu đãi hấp dẫn
                      </h1>
                      <p className='mx-md-5 px-5 animate__animated animate__bounceIn'>
                        Với hơn 100 sản phẩm với công nghệ hiện đại, sẽ đem lại
                        trải nghiệm tuyệt vời dành cho bạn
                      </p>
                      <a
                        className='btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp'
                        href='/product'
                      >
                        Mua ngay
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className='carousel-item position-relative'
                  style={{ height: 430 }}
                >
                  <img
                    className='position-absolute w-100 h-100'
                    src={Banner3}
                    style={{ objectFit: 'cover' }}
                  />
                  <div className='carousel-caption d-flex flex-column align-items-center justify-content-center'>
                    <div className='p-3' style={{ maxWidth: 700 }}>
                      <h1 className='display-4 text-white mb-3 animate__animated animate__fadeInDown'>
                        Hàng ngàn ưu đãi hấp dẫn
                      </h1>
                      <p className='mx-md-5 px-5 animate__animated animate__bounceIn'>
                        Với hơn 100 sản phẩm với công nghệ hiện đại, sẽ đem lại
                        trải nghiệm tuyệt vời dành cho bạn
                      </p>
                      <a
                        className='btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp'
                        href='/product'
                      >
                        Mua ngay
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-4'>
            <div className='product-offer mb-30' style={{ height: 200 }}>
              <img
                className='img-fluid'
                src={Banner4}
                alt=''
              />
              <div className='offer-text'>
                <h6 className='text-white text-uppercase'>Mua 1 tặng 1</h6>
                <h3 className='text-white mb-3'>Khuyến mãi sốc</h3>
                <a href='/product' className='btn btn-primary'>
                  Mua ngay
                </a>
              </div>
            </div>
            <div className='product-offer mb-30' style={{ height: 200 }}>
              <img
                className='img-fluid'
                src={Banner5}
                alt=''
              />
              <div className='offer-text'>
                <h6 className='text-white text-uppercase'>Giảm 20%</h6>
                <h3 className='text-white mb-3'>Khuyến mãi</h3>
                <a href='/product' className='btn btn-primary'>
                  Mua ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Carousel End */}
      {/* Featured Start */}
      <div className='container-fluid pt-5'>
        <div className='row px-xl-5 pb-3'>
          <div className='col-lg-3 col-md-6 col-sm-12 pb-1'>
            <div
              className='d-flex align-items-center bg-light mb-4'
              style={{ padding: 30 }}
            >
              <h1 className='fa fa-check text-primary m-0 mr-3' />
              <h5 className='font-weight-semi-bold m-0'>Chất lượng sản phẩm</h5>
            </div>
          </div>
          <div className='col-lg-3 col-md-6 col-sm-12 pb-1'>
            <div
              className='d-flex align-items-center bg-light mb-4'
              style={{ padding: 30 }}
            >
              <h1 className='fa fa-shipping-fast text-primary m-0 mr-2' />
              <h5 className='font-weight-semi-bold m-0'>Miễn phí vận chuyển</h5>
            </div>
          </div>
          <div className='col-lg-3 col-md-6 col-sm-12 pb-1'>
            <div
              className='d-flex align-items-center bg-light mb-4'
              style={{ padding: 30 }}
            >
              <h1 className='fas fa-exchange-alt text-primary m-0 mr-3' />
              <h5 className='font-weight-semi-bold m-0'>Đổi mới 14 ngày</h5>
            </div>
          </div>
          <div className='col-lg-3 col-md-6 col-sm-12 pb-1'>
            <div
              className='d-flex align-items-center bg-light mb-4'
              style={{ padding: 30 }}
            >
              <h1 className='fa fa-phone-volume text-primary m-0 mr-3' />
              <h5 className='font-weight-semi-bold m-0'>Hỗ trợ 24/7</h5>
            </div>
          </div>
        </div>
      </div>
      {/* Featured End */}
      {/* Categories Start */}
      <HomepageCategory />
      {/* Categories End */}

      {/* Categories Start */}
      <HomepageBrand />
      {/* Categories End */}

      {/* Products Start */}
      <NewProduct />

      {/* Products End */}
      {/* Offer Start */}
      <div className='container-fluid pt-5 pb-3'>
        <div className='row px-xl-5'>
          <div className='col-md-6'>
            <div className='product-offer mb-30' style={{ height: 300 }}>
              <img
                className='img-fluid'
                src='https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/012023/iphone-14-pro-purple-side-perspective-feature-purple_20230115071617.jpg'
                alt=''
              />
              <div className='offer-text'>
                <h6 className='text-white text-uppercase'>Giảm 20%</h6>
                <h3 className='text-white mb-3'>Khuyến mãi sốc</h3>
                <a href='/product' className='btn btn-primary'>
                  Mua ngay
                </a>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='product-offer mb-30' style={{ height: 300 }}>
              <img
                className='img-fluid'
                src='https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/012023/iphone-14-pro-purple-side-perspective-feature-purple_20230115071617.jpg'
                alt=''
              />
              <div className='offer-text'>
                <h6 className='text-white text-uppercase'>Mua 1 tặng 1</h6>
                <h3 className='text-white mb-3'>Khuyến mãi đặc biệt</h3>
                <a href='/product' className='btn btn-primary'>
                  Mua ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Offer End */}
      <SellingProduct />
      {/* Vendor Start */}
      <div className='container-fluid py-5'>
        <div className='row px-xl-5'>
          <div className='col'>
            <div className='owl-carousel vendor-carousel'>
              <div className='bg-light p-4'>
                <img src='img/vendor-1.jpg' alt='' />
              </div>
              <div className='bg-light p-4'>
                <img src='img/vendor-2.jpg' alt='' />
              </div>
              <div className='bg-light p-4'>
                <img src='img/vendor-3.jpg' alt='' />
              </div>
              <div className='bg-light p-4'>
                <img src='img/vendor-4.jpg' alt='' />
              </div>
              <div className='bg-light p-4'>
                <img src='img/vendor-5.jpg' alt='' />
              </div>
              <div className='bg-light p-4'>
                <img src='img/vendor-6.jpg' alt='' />
              </div>
              <div className='bg-light p-4'>
                <img src='img/vendor-7.jpg' alt='' />
              </div>
              <div className='bg-light p-4'>
                <img src='img/vendor-8.jpg' alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Vendor End */}
    </div>
  );
}
