import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POST_DETAIL } from 'src/queries/Queries';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

interface Post {
  id?: string
  title: string
  body: string
}

function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post>({ id, title: '', body: '' });
  const { loading } = useQuery(
    GET_POST_DETAIL,
    {
      fetchPolicy: 'no-cache',
      variables: { id },
      skip: !id,
      onCompleted: (data:{ post: Post }) => setPost(data.post),
    },
  );

  if (loading) {
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
      <h3 className="mt-5 mb-5">{id ? 'Редактирование поста' : 'Создание поста'}</h3>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Заголовок</Form.Label>
          <Form.Control
            size="lg"
            className="bold"
            placeholder="Введите заголовок"
            value={post.title}
            onChange={({ target: { value } }) => setPost((old) => ({ ...old, title: value }))}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Содержание</Form.Label>
          <Form.Control
            as="textarea"
            rows={8}
            value={post.body}
            onChange={({ target: { value } }) => setPost((old) => ({ ...old, body: value }))}
          />
        </Form.Group>
      </Form>
      <div className="d-flex justify-content-end gap-1 ">
        <Button
          variant="primary"
          onClick={() => null}
        >
          Сохранить
        </Button>
        <Button
          variant="secondary"
          onClick={() => (id ? navigate(`/posts/${id}`) : navigate(-1))}
        >
          Отменить
        </Button>
      </div>
    </div>
  );
}

export default EditPostPage;
