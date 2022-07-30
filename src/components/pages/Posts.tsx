import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from 'src/queries/Queries';
import {
  Badge,
  Button, Card, Container, Pagination,
} from 'react-bootstrap';
import DeletePostModal, { DeletePostModalProps } from '../deletePost/DeletePostModal';

const LIMIT_PAGE = 15;

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
  const { previousData, loading, data = loading ? previousData : undefined } = useQuery(
    GET_ALL_POSTS,
    {
      fetchPolicy: 'no-cache',
      variables: { options: { paginate: { page: page + 1, limit: LIMIT_PAGE } } },
    },
  );
  const [deletePost, setDeletePost] = useState<DeletePostModalProps>();
  const total = Math.floor((data?.posts?.meta?.totalCount || 0) / LIMIT_PAGE) + 1;

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <h1 className="display-4 me-2">Посты </h1>
          <Badge pill bg="secondary">{data?.posts?.meta?.totalCount}</Badge>
        </div>
        <Button variant="light" className=" d-flex align-items-center">
          <i className="material-icons">add</i>
          создать
        </Button>
      </div>
      <div className={`flex-column ${(loading) && 'opacity-25'}`}>
        { data?.posts?.data.map((post: Post) => (
          <Card className="my-4" key={post.id}>
            <Card.Header className="d-flex align-items-center justify-content-between p-2">
              <div className="d-flex align-items-center">
                <img className="me-1 rounded-1" src={`https://avatars.dicebear.com/api/initials/${post.user.username}.svg?size=24`} alt={post.user.name} />
                <span className="link-primary">
                  @
                  {post.user.username}
                </span>
              </div>
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
                <i className="material-icons md-18">
                  close
                </i>
              </Button>
            </Card.Header>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.body}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div style={{ height: '100px' }} />
      <Container className="fixed-bottom rounded-2 bg-body pt-2">
        <Pagination className="float-end">
          <Pagination.Prev
            disabled={page === 0}
            onClick={() => setPage((oldPage) => oldPage - 1)}
          />
          {Array.from(Array(total).keys()).map((index) => (
            <Pagination.Item active={page === index} key={index} onClick={() => setPage(index)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={page === total - 1}
            onClick={() => setPage((oldPage) => oldPage + 1)}
          />
        </Pagination>
      </Container>
      {deletePost && <DeletePostModal {...deletePost} />}
    </div>
  );
}

export default Posts;
