import { Form, Input, TreeSelect, message } from 'antd';
import CustomModal from '../../../../components/customModal/CustomModal';
import { ModalControlType } from '../../../../types/modal';
import { roleAPI } from '../../../../services/role';
import { RoleBody } from '../../../../types/role';
import { RoleType } from '../Role';
import { LIST_ADMIN_ROLE } from '../../../../constants/role';

type ControlRoleProps = {
  isOpen: boolean;
  handleCancel: () => void;
  reloadData: () => void;
  title: string;
  type: ModalControlType;
  initData?: RoleType;
};

const { SHOW_PARENT } = TreeSelect;

const ControlRoleModal: React.FC<ControlRoleProps> = (props) => {
  const [form] = Form.useForm();

  const submitForm = async () => {
    try {
      await form.validateFields();
      if (props.type === 'CREATE') {
        await handleAddRole();
      }

      if (props.type === 'UPDATE') {
        await hanldleUpdateRoleInfo();
      }
    } catch (error) {
      console.log('submit form error >> ', error);
    }
  };

  const handleAddRole = async () => {
    try {
      const formData = form.getFieldsValue();
      const roleData: RoleBody = {
        name: formData?.name,
        listRoles: formData?.listRoles,
      };

      const res = await roleAPI.addNewRole(roleData);
      if (res?.data?.success) {
        message.success('Thêm thông tin quyền thành công');
        props?.reloadData();
      } else {
        message.error(
          res?.data?.error?.message || 'Thêm thông tin quyền thất bại'
        );
      }
    } catch (error: any) {
      message.error('Xử lí thông tin thất bại')
    }
  };

  const hanldleUpdateRoleInfo = async () => {
    try {
      if (props?.initData?._id) {
        const formData = form.getFieldsValue();
        const roleData: RoleBody = {
          name: formData?.name,
          listRoles: formData?.listRoles,
        };

        const res = await roleAPI.updateRole(props?.initData?._id, roleData);

        if (res?.data?.success) {
          message.success('Cập nhật thông tin quyền thành công');
          props?.reloadData();
        } else {
          message.error(
            res?.data?.error?.message || 'Cập nhật thông tin quyền thất bại'
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
          listRoles: props?.initData?.listRoles
        }}
      >
        <Form.Item
          label='Tên quyền'
          rules={[{ required: true, message: 'Vui lòng nhập thông tin tên' }]}
          name='name'
        >
          <Input placeholder='Nhập vào tên quyền' />
        </Form.Item>

        <Form.Item
          label='Danh sách quyền'
          rules={[{ required: true, message: 'Vui lòng lựa chọn quyền' }]}
          name='listRoles'
        >
          <TreeSelect
            treeData={LIST_ADMIN_ROLE}
            treeCheckable={true}
            showCheckedStrategy={SHOW_PARENT}
            placeholder='Vui lòng lựa chọn quyền'
            style={{
              width: '100%',
            }}
          />
        </Form.Item>
      </Form>
    </CustomModal>
  );
};

export default ControlRoleModal;
