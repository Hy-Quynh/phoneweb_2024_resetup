import { Form, Input, message } from 'antd';
import CustomModal from '../../../../components/customModal/CustomModal';
import { ModalControlType } from '../../../../types/modal';
import { postAPI } from '../../../../services/post';
import { PostType } from '../Post';
import { useEffect, useState } from 'react';
import { customUpload } from '../../../../utils/upload-file';
import CustomQuillEditor from '../../../../components/customQuillEditor';

type ControlPostProps = {
  isOpen: boolean;
  handleCancel: () => void;
  reloadData: () => void;
  title: string;
  type: ModalControlType;
  initData?: PostType;
};

const ControlPostModal: React.FC<ControlPostProps> = (props) => {
  const [postImage, setPostImage] = useState<any>('');
  const [fileUpload, setFileUpload] = useState<any>(null);
  const [form] = Form.useForm();

  const submitForm = async () => {
    try {
      await form.validateFields();
      if (props.type === 'CREATE') {
        await handleAddPost();
      }

      if (props.type === 'UPDATE') {
        await hanldleUpdatePostInfo();
      }
    } catch (error) {
      console.log('submit form error >> ', error);
    }
  };

  const handleAddPost = async () => {
    try {
      const formData = form.getFieldsValue();
      const uploadRes = await customUpload(fileUpload);
      if (!uploadRes) {
        return message.error('Upload file thất bại');
      }

      const postData = {
        name: formData?.name,
        image: uploadRes,
        description: formData?.description,
      };

      const res = await postAPI.addNewPost(postData);
      if (res?.data?.success) {
        message.success('Thêm thông tin bài viết thành công');
        props?.reloadData();
      } else {
        message.error(
          res?.data?.error?.message || 'Thêm thông tin bài viết thất bại'
        );
      }
    } catch (error: any) {
      message.error('Xử lí thông tin thất bại');
    }
  };

  const hanldleUpdatePostInfo = async () => {
    try {
      if (props?.initData?._id) {
        const formData = form.getFieldsValue();
        const postData = {
          name: formData?.name,
          image: postImage || '',
          description: formData?.description,
        };

        if (fileUpload) {
          const uploadRes = await customUpload(fileUpload);
          if (!uploadRes) {
            return message.error('Upload file thất bại');
          }

          postData.image = uploadRes;
        }

        const res = await postAPI.updatePost(props?.initData?._id, postData);

        if (res?.data?.success) {
          message.success('Cập nhật thông tin bài viết thành công');
          props?.reloadData();
        } else {
          message.error(
            res?.data?.error?.message || 'Cập nhật thông tin bài viết thất bại'
          );
        }
      }
    } catch (error: any) {
      message.error('Xử lí thông tin thất bại');
    }
  };

  useEffect(() => {
    if (
      (props.type === 'UPDATE' || props.type === 'VIEW') &&
      props?.initData?.image
    ) {
      setPostImage(props.initData.image);
    }
  }, [props.type]);

  return (
    <CustomModal
      isOpen={props?.isOpen}
      handCanel={() => props?.handleCancel()}
      title={props.title}
      handleSubmit={() => submitForm()}
      width='90vw'
      className='admin-post-modal'
    >
      <Form
        layout={'vertical'}
        form={form}
        initialValues={{
          name: props?.initData?.name
        }}
      >
        <Form.Item
          label='Tên bài viết'
          rules={[{ required: true, message: 'Vui lòng nhập thông tin tên' }]}
          name='name'
        >
          <Input placeholder='Nhập vào tên bài viết' />
        </Form.Item>

        <Form.Item
          label='Nội dung bài viết'
          name={'description'}
          className='post-form-description-item'
        >
          <CustomQuillEditor
            initValue={props?.initData?.description || ''}
            handleChange={(value) => {
              form.setFieldValue('description', value);
            }}
          />
        </Form.Item>

        <Form.Item
          label='Hình ảnh'
          rules={[
            {
              validator: (_, value) => {
                if (!value && !postImage) {
                  return Promise.reject('Vui lòng chọn hình ảnh');
                }
                return Promise.resolve();
              },
            },
          ]}
          name='image'
        >
          <Input
            type='file'
            placeholder='Chọn hình ảnh'
            onChange={(event) => {
              const reader = new FileReader();
              reader.addEventListener('load', () => {
                setPostImage(reader.result);
              });
              if (event?.target?.files?.[0]) {
                reader.readAsDataURL(event.target.files[0]);
              }

              setFileUpload(event?.target?.files?.[0]);
            }}
          />
        </Form.Item>

        {postImage ? (
          <div className='mt-[20px]'>
            <img
              src={postImage}
              alt='product img'
              style={{ border: '0.5px solid gray' }}
              className='w-[200px]  h-auto'
            />
          </div>
        ) : (
          ''
        )}
      </Form>
    </CustomModal>
  );
};

export default ControlPostModal;
