import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DeleteFilled } from '@ant-design/icons';
import { postCommentAPI } from '../../../../services/postComment';
import { Button, Pagination, message } from 'antd';
import { parseJSON } from '../../../../utils/handleData';
import { USER_INFO_KEY } from '../../../../constants';
import { displayDate } from '../../../../utils/datetime';

const REVIEW_IN_PAGE = 12;

export default function PostComment() {
  const [addPostCommentData, setAddPostCommentData] = useState('');
  const [postCommentData, setPostCommentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [postCommentEditContent, setPostCommentEditContent] = useState('');
  const [postCommentEditId, setPostCommentEditId] = useState('');
  const [replyPostCommentId, setReplyPostCommentId] = useState('');
  const [replyContent, setReplyContent] = useState('');

  const userData = parseJSON(localStorage.getItem(USER_INFO_KEY));

  const { postId } = useParams();

  const createNewPostComment = async () => {
    try {
      if (!postId) {
        return message.error('Mã bài viết không chính xác');
      }

      if (!addPostCommentData?.trim()?.length) {
        return message.error('Nội dung bình luận không được bỏ trống');
      }

      if (userData?._id) {
        const createPostCommentRes = await postCommentAPI.addNewPostComment({
          userId: userData._id,
          content: addPostCommentData?.trim(),
          postId: postId || '',
        });

        if (createPostCommentRes?.data?.success) {
          message.success('Gửi bình luận thành công');
          getAllPostComment(currentPage);
          setAddPostCommentData('');
        } else {
          message.error('Gửi bình luận thất bại');
        }
      } else {
        message.error('Đăng nhập để thực hiện chức năng này');
      }
    } catch (error) {
      console.log('create postComment error: ', error);
    }
  };

  const getAllPostComment = async (page: number) => {
    try {
      if (!postId) {
        return;
      }

      const postCommentRes = await postCommentAPI.getAllPostComment(
        REVIEW_IN_PAGE,
        (page - 1) * REVIEW_IN_PAGE,
        postId,
        true
      );

      if (postCommentRes?.data?.success) {
        setPostCommentData(postCommentRes?.data?.payload?.postComment);
        const allItem = postCommentRes?.data?.payload.total;
        setTotalItem(allItem);
        setCurrentPage(page);
      }
    } catch (error) {
      console.log('get postComment Error: ', error);
    }
  };

  useEffect(() => {
    getAllPostComment(1);
  }, []);

  const deleteProductPostComment = async (postCommentId: string) => {
    const deleteRes = await postCommentAPI.deletePostComment(postCommentId);

    if (deleteRes?.data?.success) {
      getAllPostComment(currentPage);
      return message.success('Xoá bình luận thành công');
    }
    return message.error('Xoá bình luận thất bại');
  };

  const createPostCommentChildren = async () => {
    if (!userData?._id) {
      return message?.error('Vui lòng đăng nhập để phản hồi bình luận');
    }

    if (!replyContent?.trim()?.length) {
      return message.error('Nội dung bình luận không thể bỏ trống');
    }

    const createRes = await postCommentAPI.addPostCommentChildren(
      replyPostCommentId,
      {
        userId: userData?._id,
        content: replyContent,
        isAdmin: false,
        userEmail: userData?.email,
      }
    );

    if (createRes?.data?.success) {
      setReplyContent('');
      getAllPostComment(currentPage);
      return message.success('Trả lời bình luân thành công');
    }
    return message.error('Trả lời bình luận thất bại');
  };

  return (
    <div className='row'>
      <div className='col-md-6'>
        <h4 className='mb-2 text-2xl font-bold'>
          {postCommentData?.length} Đánh giá cho bài viết
        </h4>
        {postCommentData.map((postCommentItem: any, postCommentIndex) => {
          return (
            <div key={`product-postComment-item-${postCommentItem?._id}`}>
              <div className='row px-[20px] box-border mt-[50px] mx-0'>
                <div className='col-sm-10'>
                  <div className='mb-[10px] flex items-center flex-row justify-start'>
                    <div>
                      <h6 className='py-[5px] px-[10px] m-0 bg-[#FFD334] text-[#3D464D] font-bold rounded-[15px]'>
                        {postCommentItem?.userEmail?.charAt(0)?.toUpperCase()}
                      </h6>
                    </div>
                    <div>
                      <h6 className='ml-[10px] text-[1.2em] font-bold mb-0 text-[rgb(255,86,34)]'>
                        {postCommentItem?.userEmail}
                      </h6>
                    </div>
                  </div>
                  <p className='mb-[5px] text-[0.8em] text-left'>
                    Ngày đánh giá:{' '}
                    {postCommentItem.createdAt &&
                      displayDate(postCommentItem?.createdAt)}
                  </p>

                  <textarea
                    rows={3}
                    value={
                      postCommentItem?._id === postCommentEditId
                        ? postCommentEditContent
                        : (postCommentItem?.content &&
                            postCommentItem?.content) ||
                          ''
                    }
                    disabled={
                      postCommentItem?._id === postCommentEditId ? false : true
                    }
                    style={{ resize: 'none' }}
                    onChange={(event) => {
                      setPostCommentEditContent(event?.target?.value);
                    }}
                    className='w-full border-[1px] border-solid border-[black] p-[5px]'
                  />

                  <div className='flex justify-end mt-[5px]'>
                    {postCommentItem?.userId === userData?._id ? (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <div
                          className='text-[red] cursor-pointer text-[14px]'
                          onClick={() =>
                            deleteProductPostComment(postCommentItem?._id)
                          }
                        >
                          Xoá
                        </div>
                        <div
                          className='text-[green] cursor-pointer text-[14px] ml-[20px]'
                          onClick={async () => {
                            if (postCommentItem?._id !== postCommentEditId) {
                              setPostCommentEditContent(
                                postCommentItem?.content
                              );
                              setPostCommentEditId(postCommentItem?._id);
                            } else {
                              if (!postCommentEditContent?.trim()?.length) {
                                return message.error(
                                  'Nội dung bình luận không được bỏ trống'
                                );
                              }

                              const updateRes =
                                await postCommentAPI.updatePostComment(
                                  postCommentEditId,
                                  postCommentEditContent
                                );
                              if (updateRes?.data?.success) {
                                const listPostComment: any = [
                                  ...postCommentData,
                                ]?.map((item: any) => {
                                  if (item?._id === postCommentEditId) {
                                    return {
                                      ...item,
                                      content: postCommentEditContent,
                                    };
                                  }
                                  return { ...item };
                                });
                                setPostCommentData(listPostComment);
                                setPostCommentEditContent('');
                                setPostCommentEditId('');

                                return message.success(
                                  'Chỉnh sửa nội dung bình luận thành công'
                                );
                              }
                              return message.error(
                                'Chỉnh sửa nội dung bình luận thất bại'
                              );
                            }
                          }}
                        >
                          {postCommentItem?._id === postCommentEditId
                            ? 'Lưu thay đổi'
                            : 'Chỉnh sửa'}
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div
                      className='text-[blue] cursor-pointer text-[14px] ml-[20px]'
                      onClick={() => {
                        if (userData?._id) {
                          if (replyPostCommentId !== postCommentItem?._id) {
                            setReplyContent('');
                            setReplyPostCommentId(postCommentItem?._id);
                          }
                        } else {
                          message.error(
                            'Vui lòng đăng nhập để phản hồi bình luận'
                          );
                        }
                      }}
                    >
                      Phản hồi
                    </div>
                  </div>
                  {postCommentItem?.replies?.length ? (
                    postCommentItem?.replies?.map(
                      (childrenPostCommentItem: any) => {
                        return (
                          <div
                            key={`children-postComment-item-${childrenPostCommentItem?._id}`}
                            className='flex justify-end mt-[12px] w-full'
                          >
                            <div className='w-[90%]'>
                              <div className='flex justify-start flex-row items-center mb-[10px]'>
                                <div>
                                  <h6 className='px-[5px] py-[2px] m-0 bg-[#3CB814] text-[white] font-semibold text-[14px] rounded-[10px]'>
                                    {childrenPostCommentItem?.isAdmin
                                      ? 'A'
                                      : childrenPostCommentItem?.userEmail
                                          ?.charAt(0)
                                          ?.toUpperCase()}
                                  </h6>
                                </div>
                                <div className='flex justify-start items-center'>
                                  <h6 className='ml-[10px] text-[14px] font-semibold mb-0 text-[#3CB814]'>
                                    {childrenPostCommentItem?.isAdmin
                                      ? 'Quản trị viên'
                                      : childrenPostCommentItem?.userEmail}
                                  </h6>
                                  {childrenPostCommentItem?.isAdmin !==
                                    'admin' &&
                                  childrenPostCommentItem?.userId ===
                                    userData?._id ? (
                                    <div style={{ marginLeft: '15px' }}>
                                      <div
                                        onClick={async () => {
                                          const deleteRes =
                                            await postCommentAPI.deletePostCommentChildren(
                                              postCommentItem?._id,
                                              childrenPostCommentItem?._id
                                            );

                                          if (deleteRes?.data?.success) {
                                            getAllPostComment(currentPage);
                                            return message.success(
                                              'Xoá phản hồi bình luận thành công'
                                            );
                                          }
                                          return message.error(
                                            'Xoá phản hồi bình luận thất bại'
                                          );
                                        }}
                                      >
                                        <DeleteFilled className='text-[red] cursor-pointer text-[16px]' />
                                      </div>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                              <p className='text-[0.8em] mb-0 text-left'>
                                Ngày phản hồi:{' '}
                                {childrenPostCommentItem.timestamp &&
                                  displayDate(postCommentItem?.timestamp)}
                              </p>
                              <textarea
                                rows={2}
                                value={childrenPostCommentItem?.content}
                                className='resize-none w-full border-[1px] border-solid border-[black]'
                                disabled={true}
                              />
                            </div>
                          </div>
                        );
                      }
                    )
                  ) : (
                    <></>
                  )}

                  {replyPostCommentId === postCommentItem?._id ? (
                    <div className='mt-[10px]'>
                      <div className='text-left ml-[10%] text-[blue]'>
                        Phản hồi
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <textarea
                          rows={2}
                          value={replyContent}
                          className='resize-none w-[90%] pl-[5px] mr-[5px] text-[12px] border-[1px] border-solid border-[black]'
                          onChange={(event) =>
                            setReplyContent(event?.target?.value)
                          }
                        />
                      </div>
                      <div className='flex justify-end border-[1px] border-solid border-[rgb(218,218,218)] w-[90%] ml-[calc(10%-5px)] p-[5px]'>
                        <Button
                          className='text-[#3D464D] bg-[#FFD334] px-[10px] py-[2px] border-none'
                          onClick={() => {
                            createPostCommentChildren();
                          }}
                        >
                          Gửi
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {postCommentData?.filter((item: any) => item?.status)?.length ? (
          <div className='row mt-[50px] mx-0 justify-end'>
            <div className='col-sm-2 col-md-1'></div>
            <div className='col-sm-8 col-md-6'>
              <div className='row justify-center mx-0'>
                <div className='flex flex-row justify-center'>
                  <Pagination
                    total={Number(totalItem)}
                    defaultCurrent={1}
                    current={currentPage}
                    onChange={(page) => {
                      getAllPostComment(page);
                    }}
                    pageSize={REVIEW_IN_PAGE}
                  />
                </div>
              </div>
            </div>
            <div className='col-sm-2 col-md-3'></div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className='col-md-6'>
        <h6
          style={{
            textAlign: 'center',
            fontWeight: 800,
          }}
          className='text-3xl'
        >
          Đánh giá bài viết
        </h6>
        <div
          style={{
            paddingLeft: '20px',
            paddingRight: '20px',
            boxSizing: 'border-box',
            marginLeft: 0,
            marginRight: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: '90%', minWidth: '300px' }}>
            <textarea
              rows={4}
              placeholder='Nhập đánh giá'
              value={addPostCommentData}
              onChange={(event) => setAddPostCommentData(event.target.value)}
              className='px-[10px] py-[5px] border-[1px] border-solid border-[black] w-full'
            />

            <div className='flex mt-[10px] justify-center flex-row'>
              <Button
                onClick={() => createNewPostComment()}
                className='text-[#3D464D] bg-[#FFD334] hover:bg-[#FFD334]'
              >
                Gửi đánh giá
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
