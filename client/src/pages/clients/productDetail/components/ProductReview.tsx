import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StarOutlined, StarFilled, DeleteFilled } from '@ant-design/icons';
import { commentAPI } from '../../../../services/comment';
import { Button, Pagination, message } from 'antd';
import { parseJSON } from '../../../../utils/handleData';
import { USER_INFO_KEY } from '../../../../constants';
import { displayDate } from '../../../../utils/datetime';

const REVIEW_IN_PAGE = 12;

type ProductCommentProps = {
  handleSetTotalComment: (commentTotal: number) => void;
};

export default function ProductReview({
  handleSetTotalComment,
}: ProductCommentProps) {
  const [addCommentData, setAddCommentData] = useState('');
  const [commentData, setCommentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [commentEditContent, setCommentEditContent] = useState('');
  const [commentEditId, setCommentEditId] = useState('');
  const [replyCommentId, setReplyCommentId] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [checkUserPurchased, setCheckUserPurchased] = useState(true);
  const [starComment, setStarComment] = useState(0);

  const userData = parseJSON(localStorage.getItem(USER_INFO_KEY));

  const { productId } = useParams();

  const createNewComment = async () => {
    try {
      if (!productId) {
        return message.error('Mã sản phẩm không chính xác');
      }

      if (!checkUserPurchased) {
        return message.error(
          'Chức năng này chỉ được thực hiện khi đã mua sản phẩm'
        );
      }

      if (!addCommentData?.trim()?.length) {
        return message.error('Nội dung bình luận không được bỏ trống');
      }

      if (starComment === 0) {
        return message.error('Số sao đánh giá không được bỏ trống');
      }

      if (userData?._id) {
        const createCommentRes = await commentAPI.addNewComment({
          userId: userData._id,
          content: addCommentData?.trim(),
          productId: productId || '',
          star: starComment,
        });

        if (createCommentRes?.data?.success) {
          message.success('Gửi comment thành công');
          getAllComment(currentPage);
          setAddCommentData('');
          setStarComment(0);
        } else {
          message.error('Gửi comment thất bại');
        }
      } else {
        message.error('Đăng nhập để thực hiện chức năng này');
      }
    } catch (error) {
      console.log('create comment error: ', error);
    }
  };

  const getAllComment = async (page: number) => {
    try {
      if (!productId) {
        return;
      }

      const commentRes = await commentAPI.getAllComment(
        REVIEW_IN_PAGE,
        (page - 1) * REVIEW_IN_PAGE,
        productId,
        true
      );

      if (commentRes?.data?.success) {
        setCommentData(commentRes?.data?.payload?.comment);
        const allItem = commentRes?.data?.payload.total;
        // const total_page = Math.ceil(Number(allItem) / REVIEW_IN_PAGE);
        setTotalItem(allItem);
        setCurrentPage(page);
        handleSetTotalComment?.(allItem);
      }
    } catch (error) {
      console.log('get comment Error: ', error);
    }
  };

  useEffect(() => {
    getAllComment(1);
  }, []);

  const handleCheckUserPurchased = async () => {
    // const checkResponse = await productAPI.checkUserPurchasedProduct(
    //   userData?._id,
    //   productId
    // );
    // if (checkResponse?.success) {
    //   setCheckUserPurchased(checkResponse?.payload);
    // }
  };

  useEffect(() => {
    if (productId && userData?._id) {
      handleCheckUserPurchased();
    }
  }, [userData, productId]);

  const deleteProductComment = async (commentId: string) => {
    const deleteRes = await commentAPI.deleteComment(commentId);

    if (deleteRes?.data?.success) {
      getAllComment(currentPage);
      return message.success('Xoá bình luận thành công');
    }
    return message.error('Xoá bình luận thất bại');
  };

  const createCommentChildren = async () => {
    if (!userData?._id) {
      return message?.error('Vui lòng đăng nhập để phản hồi bình luận');
    }

    if (!replyContent?.trim()?.length) {
      return message.error('Nội dung bình luận không thể bỏ trống');
    }

    const createRes = await commentAPI.addCommentChildren(replyCommentId, {
      userId: userData?._id,
      content: replyContent,
      isAdmin: false,
      userEmail: userData?.email,
    });

    if (createRes?.data?.success) {
      setReplyContent('');
      getAllComment(currentPage);
      return message.success('Trả lời bình luân thành công');
    }
    return message.error('Trả lời bình luận thất bại');
  };

  return (
    <div className='row'>
      <div className='col-md-6'>
        <h4 className='mb-2'>{commentData?.length} Đánh giá cho sản phẩm</h4>
        {commentData.map((commentItem: any, commentIndex) => {
          return (
            <div key={`product-comment-item-${commentItem?._id}`}>
              <div className='row px-[20px] box-border mt-[50px] mx-0'>
                <div className='col-sm-10'>
                  <div className='mb-[10px] flex items-center flex-row justify-start'>
                    <div>
                      <h6 className='py-[5px] px-[10px] m-0 bg-[#FFD334] text-[#3D464D] font-bold rounded-[15px]'>
                        {commentItem?.userEmail?.charAt(0)?.toUpperCase()}
                      </h6>
                    </div>
                    <div>
                      <h6 className='ml-[10px] text-[1.2em] font-bold mb-0 text-[rgb(255,86,34)]'>
                        {commentItem?.userEmail}
                      </h6>
                    </div>
                    <div style={{ marginLeft: '10px' }}>
                      <div className='flex flex-row justify-center my-[10px]'>
                        {[1, 2, 3, 4, 5]?.map((item) => {
                          return item <= commentItem?.star ? (
                            <StarFilled className='text-[#FFD334] w-[15px]' />
                          ) : (
                            <StarOutlined className='text-[#FFD334] w-[15px]' />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <p className='mb-[5px] text-[0.8em] text-left'>
                    Ngày đánh giá:{' '}
                    {commentItem.createdAt &&
                      displayDate(commentItem?.createdAt)}
                  </p>

                  <textarea
                    rows={3}
                    value={
                      commentItem?._id === commentEditId
                        ? commentEditContent
                        : (commentItem?.content && commentItem?.content) || ''
                    }
                    disabled={commentItem?._id === commentEditId ? false : true}
                    style={{ resize: 'none' }}
                    onChange={(event) => {
                      setCommentEditContent(event?.target?.value);
                    }}
                    className='w-full border-[1px] border-solid border-[black] p-[5px]'
                  />

                  <div className='flex justify-end mt-[5px]'>
                    {commentItem?.userId === userData?._id ? (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <div
                          className='text-[red] cursor-pointer text-[14px]'
                          onClick={() => deleteProductComment(commentItem?._id)}
                        >
                          Xoá
                        </div>
                        <div
                          className='text-[green] cursor-pointer text-[14px] ml-[20px]'
                          onClick={async () => {
                            if (commentItem?._id !== commentEditId) {
                              setCommentEditContent(commentItem?.content);
                              setCommentEditId(commentItem?._id);
                            } else {
                              if (!commentEditContent?.trim()?.length) {
                                return message.error(
                                  'Nội dung bình luận không được bỏ trống'
                                );
                              }

                              const updateRes = await commentAPI.updateComment(
                                commentEditId,
                                commentEditContent
                              );
                              if (updateRes?.data?.success) {
                                const listComment: any = [...commentData]?.map(
                                  (item: any) => {
                                    if (item?._id === commentEditId) {
                                      return {
                                        ...item,
                                        content: commentEditContent,
                                      };
                                    }
                                    return { ...item };
                                  }
                                );
                                setCommentData(listComment);
                                setCommentEditContent('');
                                setCommentEditId('');

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
                          {commentItem?._id === commentEditId
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
                          if (replyCommentId !== commentItem?._id) {
                            setReplyContent('');
                            setReplyCommentId(commentItem?._id);
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
                  {commentItem?.replies?.length ? (
                    commentItem?.replies?.map((childrenCommentItem: any) => {
                      return (
                        <div
                          key={`children-comment-item-${childrenCommentItem?._id}`}
                          className='flex justify-end mt-[12px] w-full'
                        >
                          <div className='w-[90%]'>
                            <div className='flex justify-start flex-row items-center mb-[10px]'>
                              <div>
                                <h6 className='px-[5px] py-[2px] m-0 bg-[#3CB814] text-[white] font-semibold text-[14px] rounded-[10px]'>
                                  {childrenCommentItem?.isAdmin
                                    ? 'A'
                                    : childrenCommentItem?.userEmail
                                        ?.charAt(0)
                                        ?.toUpperCase()}
                                </h6>
                              </div>
                              <div className='flex justify-start items-center'>
                                <h6 className='ml-[10px] text-[14px] font-semibold mb-0 text-[#3CB814]'>
                                  {childrenCommentItem?.isAdmin
                                    ? 'Quản trị viên'
                                    : childrenCommentItem?.userEmail}
                                </h6>
                                {childrenCommentItem?.isAdmin !== 'admin' &&
                                childrenCommentItem?.userId ===
                                  userData?._id ? (
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
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                            <p className='text-[0.8em] mb-0 text-left'>
                              Ngày phản hồi:{' '}
                              {childrenCommentItem.timestamp &&
                                displayDate(commentItem?.timestamp)}
                            </p>
                            <textarea
                              rows={2}
                              value={childrenCommentItem?.content}
                              className='resize-none w-full border-[1px] border-solid border-[black]'
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
        })}
        {commentData?.filter((item: any) => item?.status)?.length ? (
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
      </div>
      <div className='col-md-6'>
        <h6
          style={{
            textAlign: 'center',
            fontSize: '1.5em',
            // color: MAIN_COLOR,
            fontWeight: 600,
          }}
        >
          Đánh giá sản phẩm
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
            <div className='flex my-[10px] justify-center flex-row gap-[10px]'>
              {[1, 2, 3, 4, 5]?.map((item) => {
                return item <= starComment ? (
                  <StarFilled
                    className='text-[#FFD334]'
                    onClick={() => {
                      setStarComment(item - 1);
                    }}
                  />
                ) : (
                  <StarOutlined
                    className='text-[#FFD334]'
                    onClick={() => {
                      setStarComment(item);
                    }}
                  />
                );
              })}
            </div>
            <textarea
              rows={4}
              placeholder='Nhập đánh giá'
              value={addCommentData}
              onChange={(event) => setAddCommentData(event.target.value)}
              className='px-[10px] py-[5px] border-[1px] border-solid border-[black] w-full'
            />

            <div className='flex mt-[10px] justify-center flex-row'>
              <Button
                onClick={() => createNewComment()}
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
