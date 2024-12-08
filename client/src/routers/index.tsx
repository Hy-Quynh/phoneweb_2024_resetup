import { Route, Routes } from 'react-router-dom';
import { ROUTER } from '../enums/router';
import NotFoundPage from '../pages/notFoundPage';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import ForgotPasswordPage from '../pages/forgotPassword';
import AdminDashboard from '../pages/admins/dashboard/Dashboard';
import ClientLayout from '../layouts/client/ClientLayout';
import HomePage from '../pages/clients/homepage';
import AdminRole from '../pages/admins/role/Role';
import ListAdmin from '../pages/admins/listAdmin/ListAdmin';
import AdminUser from '../pages/admins/user/ListUser';
import AdminBrand from '../pages/admins/brand/Brand';
import AdminCategory from '../pages/admins/category/Category';
import AdminPost from '../pages/admins/post/Post';
import AdminProduct from '../pages/admins/product/Product';
import PostPage from '../pages/clients/post';
import PostDetailPage from '../pages/clients/postDetail';
import AboutPage from '../pages/clients/aboutPage';
import ProductDetail from '../pages/clients/productDetail';
import ProductPage from '../pages/clients/product';
import AdminPrivate from '../layouts/admin/PrivateLayout';
import CartPage from '../pages/clients/cart';
import PaymentPage from '../pages/clients/payment';
import PersonalPage from '../pages/clients/personalPage';
import AdminOrder from '../pages/admins/order';

const arrRoutes = [
  { path: ROUTER.LOGIN, element: <LoginPage /> },
  { path: ROUTER.REGISTER, element: <RegisterPage /> },
  { path: ROUTER.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
  {
    path: ROUTER.ADMIN_LOGIN,
    element: <LoginPage isAdmin={true} />,
  },
  {
    path: ROUTER.ADMIN_FORGOT_PASSWORD,
    element: <ForgotPasswordPage isAdmin={true} />,
  },
  {
    path: ROUTER.ADMIN,
    element: <AdminPrivate />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: ROUTER.ADMIN_ROLE,
        element: <AdminRole />,
      },
      {
        path: ROUTER.ADMIN_LIST,
        element: <ListAdmin />,
      },
      {
        path: ROUTER.ADMIN_USER,
        element: <AdminUser />,
      },
      {
        path: ROUTER.ADMIN_BRAND,
        element: <AdminBrand />,
      },
      {
        path: ROUTER.ADMIN_CATEGORY,
        element: <AdminCategory />,
      },
      {
        path: ROUTER.ADMIN_PRODUCT,
        element: <AdminProduct />,
      },
      {
        path: ROUTER.ADMIN_POST,
        element: <AdminPost />,
      },
      {
        path: ROUTER.ADMIN_ORDER,
        element: <AdminOrder />,
      },
    ],
  },
  {
    path: ROUTER.HOMEPAGE,
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTER.ABOUT_PAGE,
        element: <AboutPage />,
      },
      {
        path: ROUTER.POSTPAGE,
        element: <PostPage />,
      },
      {
        path: ROUTER.POST_DETAIL,
        element: <PostDetailPage />,
      },
      {
        path: ROUTER.PRODUCT_PAGE,
        element: <ProductPage />,
      },
      {
        path: ROUTER.PRODUCT_DETAIL,
        element: <ProductDetail />,
      },
      {
        path: ROUTER.CART_PAGE,
        element: <CartPage />,
      },
      {
        path: ROUTER.PAYMENT_PAGE,
        element: <PaymentPage />,
      },
      {
        path: ROUTER.PERSONAL_PAGE,
        element: <PersonalPage />,
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
];

export const MainRouter = () => {
  const renderRoutes = (arrRoutes: any) => {
    return arrRoutes.map((item: any, index: number) => {
      const { path, element } = item;
      return (
        <Route key={index} path={path} element={element}>
          {item?.children?.map((it: any, id: number) => {
            return <Route key={`child-router-${id}`} {...it} />;
          }) || <></>}
        </Route>
      );
    });
  };

  return <Routes>{renderRoutes(arrRoutes)}</Routes>;
};
