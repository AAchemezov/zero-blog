import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from 'src/queries/Queries';
import { Badge, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
  const [page, setPage] = useState(0);
  const [deletePost, setDeletePost] = useState<DeletePostModalProps>();

  const { previousData, loading, data = loading ? previousData : undefined } = useQuery(
    GET_ALL_POSTS,
    {
      fetchPolicy: 'no-cache',
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
        <Button variant="light" className=" d-flex align-items-center">
          <i className="material-icons">add</i>
          создать
        </Button>
      </div>
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
