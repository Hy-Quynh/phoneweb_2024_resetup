import { Form, Input, Select, message } from 'antd';
import CustomModal from '../../../../components/customModal/CustomModal';
import { ModalControlType } from '../../../../types/modal';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { AdminBody } from '../../../../types/admin';
import { adminAPI } from '../../../../services/admin';
import { AdminData } from '../ListAdmin';
import { validateEmail } from '../../../../utils/validate';
import { useEffect, useState } from 'react';
import { RoleType } from '../../role/Role';
import { roleAPI } from '../../../../services/role';

type ControlListAdminProps = {
  isOpen: boolean;
  handleCancel: () => void;
  reloadData: ()=>void;
  title: string;
  type: ModalControlType;
  initData?: AdminData;
};

const ControlListAdmin: React.FC<ControlListAdminProps> = (props) => {
  const [roleList, setRoleList] = useState<RoleType[]>([]);
  const [form] = Form.useForm();

  const getRoleList = async () => {
    try {
      const res = await roleAPI.getAllRole(true);

      if (res?.data?.success) {
        setRoleList(res?.data?.payload?.role);
      } else {
        message.error('Lấy thông tin quyền thất bại');
      }
    } catch (error) {
      message.error('Lấy thông tin quyền thất bại');
      console.log('get role list error >>> ', error);
    }
  };

  useEffect(() => {
    getRoleList();
  }, []);

  const submitForm = async () => {
    try {
      await form.validateFields();
      if (props.type === 'CREATE') {
        await handleAddAdmin();
      }

      if (props.type === 'UPDATE') {
        await hanldleUpdateAdminInfo();
      }
    } catch (error) {
      console.log('submit form error >> ', error);
    }
  };

  const handleAddAdmin = async () => {
    try {
      const formData = form.getFieldsValue();
      const signUpData: AdminBody = {
        name: formData?.name,
        email: formData?.email,
        roleId: formData?.roleId,
        password: formData?.password,
      };

      const res = await adminAPI.adminSignUp(signUpData);
      if (res?.data?.success) {
        message.success('Thêm thông tin quản trị viên thành công');
        props?.reloadData()
      } else {
        message.error(
          res?.data?.error?.message || 'Thêm thông tin quản trị viên thất bại'
        );
      }
    } catch (error: any) {
      message.error('Xử lí thông tin thất bại')
    }
  };

  const hanldleUpdateAdminInfo = async () => {
    try {
      if (props?.initData?._id) {
        const formData = form.getFieldsValue();
        const signUpData: AdminBody = {
          name: formData?.name,
          roleId: formData?.roleId,
          email: formData?.email,
        };

        const res = await adminAPI.updateAdminInfo(
          props?.initData?._id,
          signUpData
        );

        if (res?.data?.success) {
          message.success('Cập nhật thông tin quản trị viên thành công');
          props?.reloadData()
        } else {
          message.error(
            res?.data?.error?.message ||
              'Cập nhật thông tin quản trị viên thất bại'
          );
        }
      }
    } catch (error: any) {
      message.error('Xử lí thông tin thất bại')
    }
  };

  return (
    <CustomModal
      isOpen={props?.isOpen}
      handCanel={() => props?.handleCancel()}
      title={props.title}
      handleSubmit={() => submitForm()}
    >
      <Form
        layout={'vertical'}
        form={form}
        initialValues={{
          name: props?.initData?.name,
          email: props?.initData?.email,
          roleId: props?.initData?.roleId
        }}
      >
        <Form.Item
          label='Tên'
          rules={[{ required: true, message: 'Vui lòng nhập thông tin tên' }]}
          name='name'
        >
          <Input placeholder='Nhập vào tên quản trị viên' />
        </Form.Item>
        <Form.Item
          label='Email'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập thông tin email',
            },
            {
              validator: (_, value) => {
                const validate = validateEmail(value)
                if (!validate) {
                  return Promise.reject(
                    'Email sai định dạng'
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
          name='email'
        >
          <Input placeholder='Nhập vào email' />
        </Form.Item>

        <Form.Item
          label='Quyền'
          name='roleId'
          rules={[{ required: true, message: 'Vui lòng lựa chọn quyền' }]}
        >
          <Select>
            {roleList?.map((item) => {
              return (
                <Select.Option value={item?._id} key={item?._id}>
                  {item?.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        {props.type === 'CREATE' ? (
          <>
            <Form.Item
              label='Mật khẩu'
              rules={[
                { required: true, message: 'Vui lòng nhập thông tin mật khẩu' },
              ]}
              name='password'
            >
              <Input.Password
                placeholder='Nhập vào tên đặng nhập'
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              label='Mật khẩu nhập lại'
              name='confirmPassword'
              rules={[
                {
                  validator: (_, value) => {
                    const password = form.getFieldValue('password');
                    if (password !== value) {
                      return Promise.reject(
                        'Mật khẩu nhập lại không chính xác'
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password
                placeholder='Nhập vào tên đặng nhập'
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </>
        ) : (
          <></>
        )}
      </Form>
    </CustomModal>
  );
};

export default ControlListAdmin;
