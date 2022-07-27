import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_POST, GET_ALL_POSTS } from 'src/queries/Queries';
import createToast from 'src/tools/toast';

const LIMIT_PAGE = 8;

interface Post {
  id: string
  title: string
  body: string
  user: {
    username: string,
    name: string
  }
}

function Posts() {
  const [page, setPage] = useState(0);
  const { previousData, data = previousData, loading } = useQuery(GET_ALL_POSTS, {
    fetchPolicy: 'no-cache',
    variables: { options: { paginate: { page: page + 1, limit: LIMIT_PAGE } } },
  });
  const [deletePost, deletePostQuery] = useMutation(DELETE_POST, { onCompleted: () => createToast('Пост успешно удалён') });
  const total = Math.floor((data?.posts?.meta?.totalCount || 0) / LIMIT_PAGE) + 1;

  return (
    <div>
      <div className={`progress ${!loading && !deletePostQuery.loading ? 'hide' : ''}`}>
        <div className="indeterminate" />
      </div>
      <ul className={`collection with-header z-depth-1 ${loading ? 'disabled' : ''}`}>
        <li className="collection-header"><h4>Посты</h4></li>
        {data?.posts?.data.map((post: Post) => (
          <li className="collection-item avatar hoverable post" key={post.id}>
            <img className="circle" src={`https://avatars.dicebear.com/api/bottts/${post.user.username}.svg?size=36`} alt={post.user.username} />
            <div className="title purple-text text-darken-1">{post.user.name}</div>
            <div className="row">
              <h5 className="postTitle red-text text-lighten-2 truncate">{post.title}</h5>
              <p className="truncate grey-text text-darken-2">{post.body}</p>
            </div>
            <div className="secondary-content" style={{ height: '100%' }}>
              {/* <a href="#!" className="row"><i className="material-icons">edit</i></a> */}
              <a href="#!" className="row" onClick={() => deletePost({ variables: { id: post.id } })}>
                <i className="material-icons red-text button text-lighten-1">
                  delete
                </i>
              </a>
            </div>
          </li>
        ))}
      </ul>
      <ul className="pagination right">
        <li className={page === 0 ? 'disabled' : 'waves-effect hoverable'}>
          <a href="#!" onClick={() => page !== 0 && setPage((oldPage) => oldPage - 1)}>
            <i className="material-icons">chevron_left</i>
          </a>
        </li>
        {Array.from(Array(total).keys()).map((index) => (
          <li className={page === index ? 'active' : 'waves-effect hoverable'} key={index}>
            <a href="#!" onClick={() => setPage(index)}>{index + 1}</a>
          </li>
        ))}
        <li className={page === total - 1 ? 'disabled' : 'waves-effect hoverable'}>
          <a href="#!" onClick={() => page !== total - 1 && setPage((oldPage) => oldPage + 1)}>
            <i className="material-icons">chevron_right</i>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Posts;
