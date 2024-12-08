import { useEffect, useState } from 'react';
import { Markup } from 'interweave';
import { useParams } from 'react-router-dom';
import { postAPI } from '../../../services/post';
import { message } from 'antd';
import { displayDate } from '../../../utils/datetime';
import './style.scss';
import PostComment from './components/postComment';

export default function PostDetailPage() {
  const [postDetail, setPostDetail] = useState<any>({});
  const [relativePost, setRelativePost] = useState<any>([]);
  const { postId } = useParams();

  const getPostData = async () => {
    if (!postId) {
      return message.error('Mã bài viết không tồn tại');
    }
    const detail = await postAPI.getPostById(postId);
    if (detail?.data?.success) {
      const payload = detail?.data?.payload;
      setPostDetail(payload);
    }
  };

  const getRelativePost = async () => {
    if (!postId) {
      return;
    }
    const post = await postAPI.getRelativePost(postId, 5, 0, true);

    if (post?.data?.payload?.post?.length)
      setRelativePost(post?.data?.payload?.post);
  };

  useEffect(() => {
    getPostData();
    getRelativePost();
  }, []);

  return (
    <div>
      <div className='container-xxl py-6'>
        <div className='container'>
          <div className='row g-4'>
            <div className='col-12 col-md-8'>
              <div
                className='section-header text-center mx-auto mb-5 wow fadeInUp'
                data-wow-delay='0.1s'
              >
                <h1 className='mb-3 font-bold text-3xl'>{postDetail?.name}</h1>
              </div>
              <div
                style={{ width: '100%', height: '500px', position: 'relative' }}
              >
                <img
                  src={postDetail?.image}
                  alt='post'
                  style={{ width: '100%', height: '95%' }}
                />
              </div>
              <div className='text-muted border-top pt-4'>
                <small className='me-3'>
                  <i className='fa fa-calendar text-primary me-2' />
                  {displayDate(postDetail?.createdAt)}
                </small>
              </div>

              <div
                style={{ width: '100%', marginTop: '50px' }}
                className='post-detail-description'
              >
                <Markup content={postDetail?.description} />
              </div>
            </div>
            <div className='col-md-1' />
            <div className='col-12 col-md-3'>
              <div
                className='text-center mx-auto mb-5 wow fadeInUp mt-5'
                data-wow-delay='0.1s'
              >
                <h4 className='mb-3 text-2xl' style={{ marginTop: '4.7rem' }}>
                  Bài viết mới nhất
                </h4>
                <div className='row g-4' style={{ justifyContent: 'center' }}>
                  {relativePost?.map((postItem: any, postIndex: number) => {
                    return (
                      <div
                        className='col-12 wow fadeInUp'
                        data-wow-delay='0.1s'
                        key={`post-item-${postIndex}`}
                        style={{ marginTop: postIndex !== 0 ? '30px' : '' }}
                      >
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            height: '180px',
                          }}
                        >
                          <img
                            src={postItem?.image}
                            style={{ width: '100%', height: '100%' }}
                            alt='post-iamge'
                          />
                        </div>
                        <div className='bg-light p-1'>
                          <a
                            className='d-block h5 lh-base mb-1'
                            href={`/post/${postItem?._id}`}
                            style={{
                              fontSize: '16px',
                              fontWeight: 500,
                              maxWidth: '100%',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              padding: '5px 10px',
                            }}
                          >
                            {postItem?.name}
                          </a>
                          <div className='text-muted border-top pt-1'>
                            <small className='me-3'>
                              <i className='fa fa-calendar text-primary me-2' />
                              {displayDate(postItem?.createdAt)}
                            </small>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className='mt-[100px]'>
            <PostComment />
          </div>
        </div>
      </div>
    </div>
  );
}
