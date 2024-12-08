import React, { useEffect, useMemo, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {
  Layout,
  Menu,
  Button,
  theme,
  Dropdown,
  MenuProps,
  Avatar,
  Typography,
} from 'antd';
import { Outlet } from 'react-router-dom';
import { MenuItem } from './menuItem';
import './style.scss';
import { logOut, parseJSON } from '../../utils/handleData';
import { USER_INFO_KEY } from '../../constants';

const { Header, Sider, Content } = Layout;
const { Paragraph } = Typography;

type AdminLayoutProps = {
  children?: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = () => {
  const menuItem = useMemo(() => {
    let customerData = parseJSON(localStorage.getItem(USER_INFO_KEY), {});

    if (customerData?.isMainAdmin) {
      return MenuItem;
    }

    const roleList = customerData?.roleList;

    const filterChildren = MenuItem?.map((item: any) => {
      if (!item?.children) {
        return item;
      }
      return {
        ...item,
        children: roleList?.includes(item?.key)
          ? item?.children
          : [...item?.children]?.filter((it: any) =>
              roleList?.includes(it?.key)
            ),
      };
    });

    const filterMenu = [...filterChildren]?.filter(
      (item: any) =>
        roleList?.includes(item?.key) ||
        item?.children?.find((it: any) => roleList?.includes(it?.key))
    );

    return filterMenu;
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: (
        <a href='/admin/login' className='text-base' onClick={() => logOut()}>
          Đăng xuất
        </a>
      ),
    },
  ];

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className='min-h-[100vh] max-h-[100vh]'
      >
        <div className='flex mb-[50px] mt-[40px] items-center justify-center'>
          <SettingOutlined className='text-white text-lg' />
          {!collapsed ? (
            <Paragraph className='text-white text-lg !mb-0 tracking-widest font-bold ml-[10px]'>
              QUẢN TRỊ
            </Paragraph>
          ) : (
            <></>
          )}
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          items={menuItem}
          className='text-base'
        />
      </Sider>
      <Layout className='max-h-[100vh] overflow-auto'>
        <Header
          style={{ background: colorBgContainer }}
          className='flex justify-between items-center pr-[40px] pl-0'
        >
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Dropdown menu={{ items }} placement='bottom' trigger={['click']}>
            <Avatar
              size='large'
              icon={<UserOutlined />}
              className='cursor-pointer'
            />
          </Dropdown>
        </Header>
        <Content
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className='mx-[16px] my-[24px] p-[24px] overflow-auto'
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
