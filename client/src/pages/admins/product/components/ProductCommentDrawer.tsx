import React, { useEffect, useState } from 'react';
import { StarOutlined, StarFilled, DeleteFilled } from '@ant-design/icons';
import { parseJSON } from '../../../../utils/handleData';
import { USER_INFO_KEY } from '../../../../constants';
import { commentAPI } from '../../../../services/comment';
import { Button, Drawer, Pagination, Switch, message } from 'antd';
import { displayDate } from '../../../../utils/datetime';

const REVIEW_IN_PAGE = 12;

type ProductCommentProps = {
  productId: string;
  open: boolean;
  handleClose: () => void;
};

export default function ProductCommentDrawer({
  productId,
  open,
  handleClose,
}: ProductCommentProps) {
  const [productComment, setProductComment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [replyCommentId, setReplyCommentId] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const userData = parseJSON(localStorage.getItem(USER_INFO_KEY), {});

  const getAllComment = async (page: number) => {
    try {
      const commentRes = await commentAPI.getAllComment(
        REVIEW_IN_PAGE,
        (page - 1) * REVIEW_IN_PAGE,
        productId
      );

      if (commentRes?.data?.success) {
        setProductComment(commentRes?.data?.payload.comment);
        const allItem = commentRes?.data?.payload.total;
        // const total_page = Math.ceil(Number(allItem) / REVIEW_IN_PAGE);
        setTotalItem(allItem);
        setCurrentPage(page);
      }
    } catch (error) {
      console.log('get comment Error: ', error);
    }
  };

  useEffect(() => {
    getAllComment(1);
  }, [productId]);

  const createCommentChildren = async () => {
    if (!replyContent?.trim()?.length) {
      return message.error('Nội dung bình luận không thể bỏ trống');
    }

    const createRes = await commentAPI.addCommentChildren(replyCommentId, {
      userId: userData?._id,
      content: replyContent,
      isAdmin: true,
    });

    if (createRes?.data?.success) {
      setReplyContent('');
      getAllComment(currentPage);
      return message.success('Trả lời bình luân thành công');
    }
    return message.error('Trả lời bình luận thất bại');
  };

  return (
    <Drawer
      title='Bình luận sản phẩm'
      onClose={() => handleClose?.()}
      open={open}
      width={'80vw'}
    >
      {productComment?.length ? (
        productComment?.map((commentItem: any) => {
          return (
            <div key={`product-comment-item-${commentItem?._id}`}>
              <div className='row px-[20px] box-border mt-[50px] mx-0'>
                <div className='col-sm-8 col-md-8'>
                  <div className='flex justify-start flex-row items-center mb-[10px]'>
                    <div>
                      <h6 className='mx-[8px] my-[5px] m-0 bg-[gray] text-[white] font-extrabold rounded-[15px] w-[30px] h-[30px] py-[7px] px-[9px]'>
                        {commentItem?.userEmail?.charAt(0)?.toUpperCase()}
                      </h6>
                    </div>
                    <div className='flex justify-start items-center'>
                      <h6 className='ml-[10px] text-[1.2em] font-bold mb-0'>
                        {commentItem?.full_name}
                      </h6>

                      <div className='ml-[10px]'>
                        <div className='flex my-[10px] justify-center flex-row'>
                          {[1, 2, 3, 4, 5]?.map((item) => {
                            return item <= commentItem?.star ? (
                              <StarFilled className='text-[#FFD334] w-[15px]' />
                            ) : (
                              <StarOutlined className='text-[#FFD334] w-[15px]' />
                            );
                          })}
                        </div>
                      </div>

                      <div className='ml-[15px]'>
                        <div
                          onClick={async () => {
                            const deleteRes = await commentAPI.deleteComment(
                              commentItem?._id
                            );
                            if (deleteRes?.data?.success) {
                              getAllComment(currentPage);
                              return message.success(
                                'Xoá bình luận thành công'
                              );
                            }
                            return message.error('Xoá bình luận thất bại');
                          }}
                        >
                          <DeleteFilled className='text-[red] cursor-pointer' />
                        </div>
                      </div>
                      <div className='ml-[15px]' onClick={async () => {}}>
                        <Switch
                          checked={commentItem?.status}
                          onChange={async (checked) => {
                            const updateRes =
                              await commentAPI.updateCommentStatus(
                                commentItem?._id,
                                checked
                              );

                            if (updateRes?.data?.success) {
                              getAllComment(currentPage);
                              return message.success(
                                'Cập nhật trạng thái bình luận thành công'
                              );
                            }
                            return message.error(
                              'Cập nhật trạng thái bình luận thất bại'
                            );
                          }}
                        ></Switch>
                      </div>
                    </div>
                  </div>
                  <p style={{ marginBottom: 0, fontSize: '0.8em' }}>
                    Ngày comment:{' '}
                    {commentItem.createdAt &&
                      displayDate(commentItem?.createdAt)}
                  </p>

                  <textarea
                    rows={3}
                    value={commentItem?.content && commentItem?.content}
                    disabled={true}
                    className='border-[1px] border-solid border-[black] resize-none w-full p-[5px]'
                  />

                  <div
                    className='text-[blue] text-right cursor-pointer'
                    onClick={() => {
                      if (replyCommentId !== commentItem?._id) {
                        setReplyContent('');
                        setReplyCommentId(commentItem?._id);
                      }
                    }}
                  >
                    Phản hồi
                  </div>

                  {commentItem?.replies?.length ? (
                    commentItem?.replies?.map((childrenCommentItem: any) => {
                      return (
                        <div
                          key={`children-comment-item-${childrenCommentItem?._id}`}
                          className='flex justify-end mt-[12px] w-full'
                        >
                          <div style={{ width: '90%' }} className='w-[90%]'>
                            <div className='flex justify-start flex-row items-center mb-[10px]'>
                              <div>
                                <h6 className='my-[2px] mx-[5px] m-0 bg-[gray] text-[white] font-semibold text-[14px] rounded-[15px]  w-[30px] h-[30px] py-[7px] px-[9px]'>
                                  {childrenCommentItem?.isAdmin
                                    ? 'A'
                                    : childrenCommentItem?.userEmail
                                        ?.charAt(0)
                                        ?.toUpperCase()}
                                </h6>
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}
                              >
                                <h6
                                  style={{
                                    marginLeft: '10px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    marginBottom: 0,
                                  }}
                                >
                                  {childrenCommentItem?.isAdmin
                                    ? 'Quản trị viên'
                                    : childrenCommentItem?.userEmail}
                                </h6>
                                <div style={{ marginLeft: '15px' }}>
                                  <div
                                    onClick={async () => {
                                      const deleteRes =
                                        await commentAPI.deleteCommentChildren(
                                          commentItem?._id,
                                          childrenCommentItem?._id
                                        );

                                      if (deleteRes?.data?.success) {
                                        getAllComment(currentPage);
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
                              </div>
                            </div>
                            <p className='mb-0 text-[0.8em]'>
                              Ngày comment:{' '}
                              {childrenCommentItem.timestamp &&
                                displayDate(commentItem?.timestamp)}
                            </p>
                            <textarea
                              rows={2}
                              value={childrenCommentItem?.content}
                              className='w-full resize-none border-[1px] border-solid border-[black] p-[5px]'
                              disabled={true}
                            />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <></>
                  )}
                  {replyCommentId === commentItem?._id ? (
                    <div className='mt-[10px]'>
                      <div className='text-left ml-[10%] text-[blue]'>
                        Phản hồi
                      </div>
                      <div className='flex justify-end'>
                        <textarea
                          rows={2}
                          value={replyContent}
                          className='border-[1px] border-solid border-[black] resize-none px-[5px] text-[12px] w-[90%]'
                          onChange={(event) =>
                            setReplyContent(event?.target?.value)
                          }
                        />
                      </div>
                      <div className='flex justify-end border-[1px] border-solid border-[rgb(218,218,218)] w-[90%] ml-[10%] p-[5px]'>
                        <Button
                          className='px-[20px]'
                          onClick={() => {
                            createCommentChildren();
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
        })
      ) : (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          Hiện chưa có đánh giá sản phẩm
        </div>
      )}
      {productComment?.length ? (
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
                    getAllComment(page);
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
    </Drawer>
  );
}
