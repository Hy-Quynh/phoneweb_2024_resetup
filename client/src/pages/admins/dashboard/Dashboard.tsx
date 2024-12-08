import { Button, DatePicker, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { checkoutAPI } from '../../../services/checkout';
import { FORMAT_NUMBER } from '../../../constants';
import { displayDate } from '../../../utils/datetime';
import { OrderStatusType } from '../../../types/checkout';
import { ORDER_STATUS, ORDER_STATUS_COLOR } from '../../../enums/order';
import { TABLE_ITEM_PER_PAGE } from '../../../constants/table';

const { RangePicker } = DatePicker;

function AdminDashboard() {
  const [timeRange, setTimeRage] = useState<any>([
    dayjs(dayjs().subtract(1, 'week').format('YYYY-MM-DD'), 'YYYY-MM-DD'),
    dayjs(dayjs().format('YYYY-MM-DD'), 'YYYY-MM-DD'),
  ]);
  const [statisticData, setStatisticData] = useState<any>({});

  const searchOrderByDate = async () => {
    try {
      const startDate = timeRange[0].startOf('day').format('YYYY-MM-DD');
      const endDate = timeRange[1].endOf('day').format('YYYY-MM-DD');

      const order = await checkoutAPI.statisticOrder(startDate, endDate);

      if (order?.data?.payload) {
        setStatisticData(order?.data?.payload);
      }
    } catch (error) {
      message.error('Lấy thông tin thất bại');
    }
  };

  useEffect(() => {
    searchOrderByDate();
  }, []);

  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (_: any, record: any, index: number) => <div>{index + 1}</div>,
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_: any, record: any) => (
        <div>{displayDate(record?.createdAt)}</div>
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (_: any, record: any) => {
        return <div>{FORMAT_NUMBER.format(record?.totalPrice)}</div>;
      },
    },
    {
      title: 'Tình trạng',
      dataIndex: 'deliveryStatus',
      key: 'deliveryStatus',
      render: (_: any, record: { deliveryStatus: OrderStatusType }) => (
        <div
          style={{ background: ORDER_STATUS_COLOR[record?.deliveryStatus] }}
          className='text-center w-fit px-[10px] py-[5px] text-[white] rounded-[8px]'
        >
          {ORDER_STATUS[record?.deliveryStatus]}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className='border-b-[2px] border-b-solid border-b-[#FFD334] w-fit pr-[10px] text-2xl font-bold'>
        Thống kê
      </div>

      <div className='mt-[20px] flex'>
        <RangePicker
          value={timeRange}
          onChange={(dateRage) => setTimeRage(dateRage)}
        />
        <Button className='bg-primary' onClick={() => searchOrderByDate()}>
          Tìm kiếm
        </Button>
      </div>

      <div className='flex items-center justify-center mt-[50px] gap-x-[100px] flex-wrap gap-y-[20px]'>
        <div className='bg-[#FFD334] py-[30px] px-[50px] rounded-[16px]'>
          <p className='text-xl font-bold text-center'>Doanh thu</p>
          <p className='text-[red] text-lg font-bold text-center'>
            {FORMAT_NUMBER.format(statisticData?.totalRevenue || 0)} VNĐ
          </p>
        </div>

        <div className='bg-[#FFD334] py-[30px] px-[50px] rounded-[16px]'>
          <p className='text-xl font-bold text-center'>Tổng đơn hàng</p>
          <p className='text-[red] text-lg font-bold text-center'>
            {statisticData?.totalOrders || 0}
          </p>
        </div>
      </div>
      <div className='mt-[30px]'>
        <h2 className='border-b-[2px] border-b-solid border-b-[#FFD334] w-fit pr-[10px] text-xl font-bold'>Danh sách đơn hàng</h2>
        <Table
          columns={columns}
          dataSource={statisticData?.orders || []}
          rowKey='_id'
          key='_id'
          pagination={{ pageSize: TABLE_ITEM_PER_PAGE }}
          className='mt-[20px]'
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
