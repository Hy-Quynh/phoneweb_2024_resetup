import { useEffect, useState } from 'react';
import { postAPI } from '../../../services/post';
import PostItem from '../../../components/postItem';

const POST_IN_PAGE = 12;

export default function PostPage() {
  const [listPost, setListPost] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchText, setSearchText] = useState('');

  const getPostList = async (page: number, search?: string) => {
    const post = await postAPI.getAllPost(POST_IN_PAGE, page, search, true);
    const payload = post?.data?.payload;

    if (payload) {
      const total = payload?.total;
      const post = payload?.post;

      if (page > currentPage) {
        const newPost: any = [...listPost];
        newPost?.push(...post);
        setListPost(newPost);
      } else {
        setListPost(post);
      }
      setCurrentPage(page);
      setTotalPage(Math.ceil(total / POST_IN_PAGE));
    }
  };

  useEffect(() => {
    getPostList(currentPage);
  }, []);

  return (
    <div>
      <div className='container-xxl py-6'>
        <div className='container'>
          <div
            className='section-header text-center mx-auto mb-5 wow fadeInUp'
            data-wow-delay='0.1s'
            style={{ maxWidth: '600px' }}
          >
            <h1 className='display-5 mb-3 text-3xl font-bold'>Bài Viết</h1>
            <p>Những bài viết về chủ đề công nghệ mới nhất</p>
          </div>
          <div style={{ maxWidth: '600px', marginBottom: '50px' }}>
            <form action=''>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Nhập vào tiêu đề bài viết'
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                />
                <div
                  className='input-group-append'
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    getPostList(0, searchText);
                  }}
                >
                  <span className='input-group-text bg-transparent text-primary'>
                    <i className='fa fa-search' />
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div className='row g-4' style={{ gap: '50px 0' }}>
            {listPost?.map((postItem: any, postIndex) => {
              return (
                <PostItem
                  image={postItem?.image || ''}
                  name={postItem?.name || ''}
                  postId={postItem?._id}
                  createdAt={postItem?.createdAt}
                  key={postItem?._id}
                />
              );
            })}
            <div
              className='col-12 text-center wow fadeInUp'
              data-wow-delay='0.1s'
            >
              {currentPage + 1 < totalPage ? (
                <div
                  className='btn btn-primary rounded-pill py-3 px-5'
                  onClick={() => getPostList(currentPage + 1)}
                >
                  Xem thêm
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
