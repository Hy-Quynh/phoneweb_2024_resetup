import { parseJSON } from '../../../../utils/handleData';
import { USER_INFO_KEY } from '../../../../constants';
import { Button, Form, Input, message } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { userAPI } from '../../../../services/user';

function PersonalInfo() {
  const userData = parseJSON(localStorage.getItem(USER_INFO_KEY));
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      if (!userData?._id) {
        return;
      }

      const userInfo = {
        name: values?.name,
        email: values?.email,
        phone: values?.phone,
        address: values?.address,
      };

      const res = await userAPI.updateUserInfo(userData?._id, userInfo);

      if (res?.data?.success) {
        message.success('Cập nhật thông tin thành công');

        localStorage.setItem(
          USER_INFO_KEY,
          JSON.stringify({
            _id: userData?._id,
            ...userInfo,
          })
        );
      } else {
        message.error(
          res?.data?.error?.message || 'Cập nhật thông tin thất bại'
        );
      }
    } catch (error: any) {
      message.error('Cập nhật thông tin thất bại');
    }
  };

  return (
    <Form
      layout={'vertical'}
      form={form}
      initialValues={{
        name: userData?.name,
        email: userData?.email,
        phone: userData?.phone,
        address: userData?.address,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label='Tên khách hàng'
        rules={[{ required: true, message: 'Vui lòng nhập thông tin tên' }]}
        name='name'
      >
        <Input
          prefix={<UserOutlined />}
          placeholder='Nhập vào tên khách hàng'
        />
      </Form.Item>

      <Form.Item
        label='Email'
        name='email'
        rules={[
          {
            type: 'email',
            required: true,
            message: 'Email sai định dạng',
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder='Nhập vào email' />
      </Form.Item>

      <Form.Item
        label='Số điện thoại'
        name='phone'
        rules={[
          {
            validator: (_, value) => {
              const isPhone = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(
                value
              );
              if (!isPhone) {
                return Promise.reject('Số điện thoại sai định dạng');
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input
          prefix={<PhoneOutlined />}
          placeholder='Nhập vào số điện thoại'
        />
      </Form.Item>

      <Form.Item
        label='Địa chỉ'
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
        name='address'
      >
        <Input prefix={<FormOutlined />} placeholder='Nhập vào địa chỉ' />
      </Form.Item>

      <Form.Item style={{ marginBottom: '0px' }}>
        <div className='flex justify-center'>
          <div className='w-[50%]'>
            <Button
              block={true}
              type='primary'
              htmlType='submit'
              className='bg-[#FFD334] text-[#3D464D] font-bold hover:!bg-[#FFD334] hover:!text-[#3D464D]'
            >
              Cập nhật
            </Button>
          </div>
        </div>
      </Form.Item>
    </Form>
  );
}

export default PersonalInfo;
