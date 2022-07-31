import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from 'src/query/Queries';
import {
  Badge, Button, Card, Spinner,
} from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import DeletePostModal, { DeletePostModalProps } from '../deletePost/DeletePostModal';
import { Avatar, PagePagination } from '../common';

const LIMIT_PAGE = 20;

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
  const [searchParams, setSearchParams] = useSearchParams({ page: '0' });
  const page = +(searchParams.get('page') || 0);
  const setPage = (pageNumber: number) => setSearchParams(({ page: String(pageNumber) }));
  const [deletePost, setDeletePost] = useState<DeletePostModalProps>();
  const navigate = useNavigate();
  const { previousData, loading, data = loading ? previousData : undefined } = useQuery(
    GET_POSTS,
    {
      fetchPolicy: 'cache-first',
      variables: { options: { paginate: { page: page + 1, limit: LIMIT_PAGE } } },
    },
  );

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <h1 className="display-4 me-2">Посты </h1>
          <Badge pill bg="secondary">{data?.posts?.meta?.totalCount}</Badge>
        </div>
        <Button
          variant="light"
          className=" d-flex align-items-center"
          onClick={() => navigate('new')}
        >
          <i className="material-icons">add</i>
          создать
        </Button>
      </div>
      {loading && !data
        && (
        <div className="d-flex justify-content-center m-5">
          <Spinner
            as="span"
            animation="border"
            role="status"
            aria-hidden="true"
          />
        </div>
        )}
      <div className={`flex-column ${(loading) && 'opacity-25'}`}>
        { data?.posts?.data.map((post: Post) => (
          <Card className="my-4" key={post.id}>
            <Card.Header className="d-flex align-items-center justify-content-between p-2">
              <Avatar {...post.user} />
              <Button
                variant="light"
                size="sm"
                className="p-0 d-flex align-items-center"
                onClick={() => setDeletePost({
                  postId: post.id,
                  postName: post.title,
                  onClose: () => setDeletePost(undefined),
                })}
              >
                <i className="material-icons md-18">close</i>
              </Button>
            </Card.Header>
            <Link to={post.id} className="link-dark text-decoration-none">
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
              </Card.Body>
            </Link>
          </Card>
        ))}
      </div>
      <PagePagination
        page={page}
        onChange={setPage}
        limitPage={LIMIT_PAGE}
        totalCount={data?.posts?.meta?.totalCount}
      />
      {deletePost && <DeletePostModal {...deletePost} />}
    </div>
  );
}

export default Posts;
