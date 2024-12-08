import React, { useEffect, useRef, useState } from 'react';
import { Breadcrumb, Button, Switch, Table, message } from 'antd';
import type { TableProps } from 'antd';
import TableAction from '../../../components/table/TableAction';
import { displayDate } from '../../../utils/datetime';
import { roleAPI } from '../../../services/role';
import { ModalControlType } from '../../../types/modal';
import { TABLE_ITEM_PER_PAGE } from '../../../constants/table';
import ControlRoleModal from './components/ControlRoleModal';

export interface RoleType {
  _id: string;
  index: number;
  name: string;
  listRoles: string[];
  status: boolean;
  createdAt: string;
}

const AdminRole: React.FC = () => {
  const [roleList, setRoleList] = useState<RoleType[]>([]);
  const [openControlModal, setOpenControlModal] = useState<boolean>(false);
  const [modalInitData, setModalInitData] = useState<RoleType>();
  const controlModalType = useRef<ModalControlType>('');

  const columns: TableProps<RoleType>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (_, record, index) => <div>{index + 1}</div>,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record: any) => <div>{displayDate(record)}</div>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <Switch
          checked={record?.status}
          onChange={(checked) => handleChangeStatus(record?._id, checked)}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <TableAction
          key={record?._id}
          handleUpdate={() => {
            controlModalType.current = 'UPDATE';
            setModalInitData(record);
            setOpenControlModal(true);
          }}
          handleDelete={() => handleDelete(record?._id)}
          
        />
      ),
    },
  ];

  const getRoleList = async () => {
    try {
      const res = await roleAPI.getAllRole();

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

  const handleCancelControlModal = () => {
    setOpenControlModal(false);
  };

  const handleOpenControlModal = (type: ModalControlType) => {
    setModalInitData(undefined);
    controlModalType.current = type;
    setOpenControlModal(true);
  };

  const handleChangeStatus = async (roleId: string, checked: boolean) => {
    try {
      const res = await roleAPI.updateRoleStatus(roleId, checked);
      if (res?.data?.success) {
        message.success('Cập nhật trạng thái thành công');
        getRoleList();
      } else {
        message.error(
          res?.data?.error?.message || 'Cập nhật thông tin thất bại'
        );
      }
    } catch (error) {
      message.error('Cập nhật trạng thái thất bại');
      console.log('handleChangeStatus error >> ', error);
    }
  };

  const handleDelete = async (roleId: string) => {
    try {
      const res = await roleAPI.deleteRole(roleId);
      if (res?.data?.success) {
        message.success('Xoá quyền thành công');
        getRoleList();
      } else {
        message.error(res?.data?.error?.message || 'Xoá thông tin thất bại');
      }
    } catch (error) {
      message.error('Xoá quyền thất bại');
      console.log('handleDelete error >> ', error);
    }
  };

  return (
    <div>
      <div className='mb-[10px]'>
        <Breadcrumb
          items={[
            {
              title: 'Nhân viên',
            },
            {
              title: 'Quyền',
            },
          ]}
        />
      </div>
      <div className='flex justify-end mb-[20px]'>
        <Button
          type='primary'
          className='bg-primary'
          onClick={() => handleOpenControlModal('CREATE')}
        >
          Thêm mới
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={roleList}
        rowKey='_id'
        key='_id'
        pagination={{ pageSize: TABLE_ITEM_PER_PAGE }}
      />

      {openControlModal ? (
        <ControlRoleModal
          title={
            controlModalType.current === 'CREATE'
              ? 'Thêm mới'
              : controlModalType.current === 'UPDATE'
              ? 'Cập nhật'
              : 'Xem chi tiết'
          }
          isOpen={openControlModal}
          handleCancel={() => handleCancelControlModal()}
          type={controlModalType.current}
          initData={modalInitData}
          reloadData={() => {
            setOpenControlModal(false);
            getRoleList();
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default AdminRole;
