import React, { useEffect, useRef, useState } from 'react';
import { Breadcrumb, Button, Switch, Table, message } from 'antd';
import type { TableProps } from 'antd';
import TableAction from '../../../components/table/TableAction';
import { displayDate } from '../../../utils/datetime';
import { postAPI } from '../../../services/post';
import { ModalControlType } from '../../../types/modal';
import { TABLE_ITEM_PER_PAGE } from '../../../constants/table';
import ControlPostModal from './components/ControlPostModal';
import './style.scss';

export interface PostType {
  _id: string;
  index: number;
  name: string;
  image: string;
  description: string;
  status: boolean;
  createdAt: string;
}

const AdminPost: React.FC = () => {
  const [postList, setPostList] = useState<PostType[]>([]);
  const [openControlModal, setOpenControlModal] = useState<boolean>(false);
  const [modalInitData, setModalInitData] = useState<PostType>();
  const controlModalType = useRef<ModalControlType>('');

  const columns: TableProps<PostType>['columns'] = [
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

  const getPostList = async () => {
    try {
      const res = await postAPI.getAllPost();

      if (res?.data?.success) {
        setPostList(res?.data?.payload?.post);
      } else {
        message.error('Lấy thông tin bài viết thất bại');
      }
    } catch (error) {
      message.error('Lấy thông tin bài viết thất bại');
      console.log('get post list error >>> ', error);
    }
  };

  useEffect(() => {
    getPostList();
  }, []);

  const handleCancelControlModal = () => {
    setOpenControlModal(false);
  };

  const handleOpenControlModal = (type: ModalControlType) => {
    setModalInitData(undefined);
    controlModalType.current = type;
    setOpenControlModal(true);
  };

  const handleChangeStatus = async (postId: string, checked: boolean) => {
    try {
      const res = await postAPI.updatePostStatus(postId, checked);
      if (res?.data?.success) {
        message.success('Cập nhật trạng thái thành công');
        getPostList();
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

  const handleDelete = async (postId: string) => {
    try {
      const res = await postAPI.deletePost(postId);
      if (res?.data?.success) {
        message.success('Xoá bài viết thành công');
        getPostList();
      } else {
        message.error(res?.data?.error?.message || 'Xoá thông tin thất bại');
      }
    } catch (error) {
      message.error('Xoá bài viết thất bại');
      console.log('handleDelete error >> ', error);
    }
  };

  return (
    <div className='admin-post'>
      <div className='mb-[10px]'>
        <Breadcrumb
          items={[
            {
              title: 'Quản lí',
            },
            {
              title: 'Bài viết',
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
        dataSource={postList}
        rowKey='_id'
        key='_id'
        pagination={{ pageSize: TABLE_ITEM_PER_PAGE }}
      />

      {openControlModal ? (
        <ControlPostModal
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
            getPostList();
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default AdminPost;
