export const LIST_ADMIN_ROLE = [
  {
    title: 'Dashboard',
    value: 'DASHBOARD',
    key: 'DASHBOARD',
  },
  {
    title: 'Người dùng',
    value: 'USER',
    key: 'USER',
  },
  {
    title: 'Nhân viên',
    value: 'ADMIN',
    key: 'ADMIN',
    children: [
      {
        title: 'Quyền',
        value: 'ADMIN-ROLE',
        key: 'ADMIN-ROLE',
      },
      {
        title: 'Danh sách nhân viên',
        value: 'ADMIN-LIST',
        key: 'ADMIN-LIST',
      },
    ],
  },
  {
    title: 'Thương hiệu',
    value: 'BRAND',
    key: 'BRAND',
  },
  {
    title: 'Danh mục',
    value: 'CATEGORY',
    key: 'CATEGORY',
  },
  {
    title: 'Sản phẩm',
    value: 'PRODUCT',
    key: 'PRODUCT',
  },
  {
    title: 'Bài viết',
    value: 'POST',
    key: 'POST',
  },
  {
    title: 'Đơn hàng',
    value: 'ORDER',
    key: 'ORDER',
  },
];