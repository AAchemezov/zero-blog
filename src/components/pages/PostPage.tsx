import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POST } from 'src/query/Queries';
import { Button, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar } from '../common';
import Comments from '../comments/Comments';
import DeletePostModal, { DeletePostModalProps } from '../deletePost/DeletePostModal';

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
  const navigate = useNavigate();
  const [deletePost, setDeletePost] = useState<DeletePostModalProps>();
  const { data, loading } = useQuery(
    GET_POST,
    {
      fetchPolicy: 'cache-first',
      variables: { id },
    },
  );
  const post: Post = data?.post;

  if (loading && !post) {
    return (
      <div className="d-flex justify-content-center m-5">
        <Spinner
          as="span"
          animation="border"
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
      <p className="my-4 pre-wrap">
        {post.body}
      </p>
      <div className="d-flex justify-content-end gap-1 ">
        <Button
          variant="light"
          className=" d-flex align-items-center"
          onClick={() => navigate('edit')}
        >
          <i className="material-icons">edit</i>
        </Button>
        <Button
          variant="light"
          className=" d-flex align-items-center"
          onClick={() => setDeletePost({
            postId: post.id,
            postName: post.title,
            onClose: () => navigate('/posts'),
          })}
        >
          <i className="material-icons">delete</i>
        </Button>
      </div>
      <Comments comments={post.comments.data} />
      {deletePost && <DeletePostModal {...deletePost} />}
    </div>
  );
}

export default PostPage;
