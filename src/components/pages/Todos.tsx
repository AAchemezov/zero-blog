import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TODOS } from 'src/query/Queries';
import {
  Alert, Badge, Button, CloseButton,
} from 'react-bootstrap';
import { Avatar, PagePagination } from '../common';

const LIMIT_PAGE = 25;

interface Todo {
  id: string
  title: string
  completed: boolean
  user: {
    username: string,
    name: string
  }
}

function Todos() {
  const [page, setPage] = useState(0);
  const { previousData, data = previousData, loading } = useQuery(GET_TODOS, {
    fetchPolicy: 'no-cache',
    variables: { options: { paginate: { page: page + 1, limit: LIMIT_PAGE } } },
  });

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <h1 className="display-4 me-2">Задачи</h1>
          <Badge pill bg="secondary">{data?.todos?.meta?.totalCount}</Badge>
        </div>
        <Button variant="light" className=" d-flex align-items-center">
          <i className="material-icons">add</i>
          создать
        </Button>
      </div>
      <div className={`row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 ${(loading) && 'opacity-25'}`}>
        { data?.todos?.data.map((todo: Todo) => (
          <div className="p-2" key={todo.id}>
            <Alert className="p-2" variant={todo.completed ? 'success' : 'warning'}>
              <div className="d-flex align-items-center justify-content-between">
                <i className="material-icons">
                  {todo.completed ? 'task_alt' : 'schedule'}
                </i>
                <CloseButton />
              </div>
              <Alert.Heading className="mb-5 mt-4 mx-2">{todo.title}</Alert.Heading>
              <Avatar {...todo.user} />
            </Alert>
          </div>
        ))}
      </div>
      <PagePagination
        page={page}
        onChange={setPage}
        limitPage={LIMIT_PAGE}
        totalCount={data?.todos?.meta?.totalCount}
      />
    </div>
  );
}

export default Todos;
