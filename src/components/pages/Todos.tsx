import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_TODO, GET_ALL_TODOS } from 'src/queries/Queries';
import createToast from 'src/tools/toast';

const LIMIT_PAGE = 8;

interface Todo {
  id: string
  title: string
  user: {
    username: string,
    name: string
  }
}

function Todos() {
  const [page, setPage] = useState(0);
  const { previousData, data = previousData, loading } = useQuery(GET_ALL_TODOS, {
    fetchPolicy: 'no-cache',
    variables: { options: { paginate: { page: page + 1, limit: LIMIT_PAGE } } },
  });
  const [deleteTodo, deleteTodoQuery] = useMutation(DELETE_TODO, { onCompleted: () => createToast('Задача успешно удалёна') });
  const total = Math.floor((data?.posts?.meta?.totalCount || 0) / LIMIT_PAGE) + 1;

  return (
    <div>
      <div className={`progress ${!loading && !deleteTodoQuery.loading ? 'hide' : ''}`}>
        <div className="indeterminate" />
      </div>
      <ul className={`collection with-header z-depth-1 ${loading ? 'disabled' : ''}`}>
        <li className="collection-header"><h4>Задачи</h4></li>
        {data?.todos?.data.map((todo: Todo) => (
          <li className="collection-item avatar hoverable post" key={todo.id}>
            <img className="circle" src={`https://avatars.dicebear.com/api/bottts/${todo.user.username}.svg?size=36`} alt={todo.user.username} />
            <div className="title purple-text text-darken-1">{todo.user.name}</div>
            <div className="row">
              <h5 className="postTitle red-text text-lighten-2 truncate">{todo.title}</h5>
              {/* <p className="truncate grey-text text-darken-2">{todo.body}</p> */}
            </div>
            <div className="secondary-content" style={{ height: '100%' }}>
              {/* <a href="#!" className="row"><i className="material-icons">edit</i></a> */}
              <a href="" className="row" onClick={() => deleteTodo({ variables: { id: todo.id } })}>
                <i className="material-icons red-text button text-lighten-1">
                  delete
                </i>
              </a>
            </div>
          </li>
        ))}
      </ul>
      <ul className="pagination right">
        <li className={page === 0 ? 'disabled' : 'waves-effect'}>
          <a href="" onClick={() => page !== 0 && setPage((oldPage) => oldPage - 1)}>
            <i className="material-icons">chevron_left</i>
          </a>
        </li>
        {Array.from(Array(total).keys()).map((index) => (
          <li className={page === index ? 'active' : 'waves-effect'} key={index}>
            <a href="" onClick={() => setPage(index)}>{index + 1}</a>
          </li>
        ))}
        <li className={page === total - 1 ? 'disabled' : 'waves-effect'}>
          <a href="" onClick={() => page !== total - 1 && setPage((oldPage) => oldPage + 1)}>
            <i className="material-icons">chevron_right</i>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Todos;
