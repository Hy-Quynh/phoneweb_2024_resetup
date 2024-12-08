import {
  BarChartOutlined,
  UserOutlined,
  ToolOutlined,
  ProductOutlined,
  FormOutlined,
  AppleOutlined,
  AppstoreAddOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { ROUTER } from '../../enums/router';

export const MenuItem = [
  {
    key: 'DASHBOARD',
    icon: <BarChartOutlined />,
    label: (
      <a href={ROUTER?.ADMIN} className='text-base'>
        Dashboard
      </a>
    ),
  },
  {
    key: 'BRAND',
    icon: <AppleOutlined />,
    label: (
      <a href={ROUTER?.ADMIN_BRAND} className='text-base'>
        Thương hiệu
      </a>
    ),
  },
  {
    key: 'CATEGORY',
    icon: <AppstoreAddOutlined />,
    label: (
      <a href={ROUTER?.ADMIN_CATEGORY} className='text-base'>
        Danh mục
      </a>
    ),
  },
  {
    key: 'PRODUCT',
    icon: <ProductOutlined />,
    label: (
      <a href={ROUTER?.ADMIN_PRODUCT} className='text-base'>
        Sản phẩm
      </a>
    ),
  },
  {
    key: 'ORDER',
    icon: <ShoppingCartOutlined />,
    label: (
      <a href={ROUTER?.ADMIN_ORDER} className='text-base'>
        Đơn hàng
      </a>
    ),
  },
  {
    key: 'POST',
    icon: <FormOutlined />,
    label: (
      <a href={ROUTER?.ADMIN_POST} className='text-base'>
        Bài viết
      </a>
    ),
  },
  {
    key: 'USER',
    icon: <UserOutlined />,
    label: (
      <a href={ROUTER?.ADMIN_USER} className='text-base'>
        Người dùng
      </a>
    ),
  },
  {
    key: 'ADMIN',
    icon: <ToolOutlined />,
    label: 'Nhân viên',
    children: [
      {
        key: 'ADMIN-ROLE',
        label: (
          <a href={ROUTER?.ADMIN_ROLE} className='text-base'>
            Phân quyền
          </a>
        ),
      },
      {
        key: 'ADMIN-LIST',
        label: (
          <a href={ROUTER?.ADMIN_LIST} className='text-base'>
            Danh sách
          </a>
        ),
      },
    ],
  },
];
