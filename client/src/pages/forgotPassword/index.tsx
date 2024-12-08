import { Button, Form, Grid, Input, theme, Typography } from 'antd';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import './style.scss';
import { ROUTER } from '../../enums/router';

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

type ForgotPasswordType = {
  isAdmin?: boolean;
};

export default function ForgotPasswordPage({ isAdmin }: ForgotPasswordType) {
  const { token } = useToken();
  const screens = useBreakpoint();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const styles = {
    container: {
      margin: '0 auto',
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: '380px',
      background: isAdmin ? 'rgb(20, 20, 20)' : 'rgb(255, 255, 255)',
      borderRadius: '8px',
      boxShadow:
        'rgba(0, 0, 0, 0.03) 0px 1px 2px 0px, rgba(0, 0, 0, 0.02) 0px 1px 6px -1px, rgba(0, 0, 0, 0.02) 0px 2px 4px 0px',
    },
    footer: {
      marginTop: token.marginLG,
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      alignItems: 'center',
      background: isAdmin ? 'rgb(0, 0, 0)' : '#F3F5F5',
      display: 'flex',
      height: screens.sm ? '100vh' : 'auto',
      padding: screens.md ? `${token.sizeXXL}px 0px` : '0px',
    },
    text: {
      color: isAdmin ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
      color: isAdmin ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.88)',
    },
    adminSettingIcon: {
      fontSize: '32px',
      color: 'rgba(255, 255, 255, 0.85)',
    },
  };

  return (
    <section style={styles.section} className='forgot-password-page'>
      <div style={styles.container}>
        <div style={styles.header}>
          {isAdmin ? (
            <div className='flex justify-center mb-[10px]'>
              <SettingOutlined style={styles.adminSettingIcon} />
            </div>
          ) : (
            <div className='logo mb-[10px] flex justify-center'>
              <a href='/' className='text-decoration-none'>
                <span className='h1 text-uppercase text-primary bg-dark px-2 text-base'>
                  PHONE
                </span>
                <span className='h1 text-uppercase text-dark bg-primary px-2 ml-n1 text-base'>
                  STORE
                </span>
              </a>
            </div>
          )}

          <Title style={styles.title} className='text-center'>QUÊN MẬT KHẨU</Title>
          <Text style={styles.text} className='text-center'>
            Nhập vào tài khoản email để nhận OTP từ hệ thống
          </Text>
        </div>
        <Form
          name='normal_login'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout='vertical'
          requiredMark='optional'
        >
          <Form.Item
            name='email'
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Vui lòng nhập vào email',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder='Nhập vào email' />
          </Form.Item>
          <Form.Item style={{ marginBottom: '0px' }}>
            <Button
              block={true}
              type='primary'
              htmlType='submit'
              className='bg-[#FFD334] text-[#3D464D] font-bold hover:!bg-[#FFD334] hover:!text-[#3D464D]'
            >
              Gửi OTP
            </Button>
            <div style={styles.footer} className='footer'>
              <Text style={styles.text}>Quay lại trang đăng nhập</Text>{' '}
              <Link
                href={isAdmin ? ROUTER.ADMIN_LOGIN : ROUTER.LOGIN}
                className='!text-[#fab504]'
              >
                Đăng nhập
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
