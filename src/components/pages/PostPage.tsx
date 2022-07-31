import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POST } from 'src/queries/Queries';
import { Button, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Avatar } from '../common';
import Comments from '../comments/Comments';

interface Post {
  id: string
  title: string
  body: string
  user: {
    username: string,
    name: string
  }
  comments: {
    data: {
      id: string
      name: string
      body: string
      email: string
    }[]
  }
}

function PostPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useQuery(
    GET_POST,
    {
      fetchPolicy: 'no-cache',
      variables: { id },
    },
  );
  const post: Post = data?.post;

  if (loading && !post) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex flex-column align-items-start justify-content-start mt-5 mb-5">
        <Avatar {...post.user} />
        <h3 className="mt-1">{post.title}</h3>
      </div>
      <p className="my-4">
        {post.body}
      </p>
      <div className="d-flex justify-content-end gap-1 ">
        <Button variant="light" className=" d-flex align-items-center">
          <i className="material-icons">edit</i>
        </Button>
        <Button variant="light" className=" d-flex align-items-center">
          <i className="material-icons">delete</i>
        </Button>
      </div>
      <Comments comments={post.comments.data} />
    </div>
  );
}

export default PostPage;
