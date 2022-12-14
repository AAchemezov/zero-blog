import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_POST, GET_POST_DETAIL, UPDATE_POST } from 'src/query/Queries';
import {
  Button, Form, InputGroup, Spinner,
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import SendPostSchema from './validation';
import { useToast } from '../../wrappers/toastWrapper/ToastWrapper';

interface Post {
  id?: string
  title: string
  body: string
}

function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const addToast = useToast();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post>({ id, title: '', body: '' });
  const { loading } = useQuery(
    GET_POST_DETAIL,
    {
      fetchPolicy: 'no-cache',
      variables: { id },
      skip: !id,
      onCompleted: (data:{ post: Post }) => {
        const { id, title, body } = data.post;
        setPost({ id, title, body });
      },
    },
  );
  const onCompleted = (data: { post: Post }) => {
    addToast({ title: `Пост успешно ${id ? 'обновлён' : 'создан!'}`, text: data.post.title });
    navigate(`/posts/${data.post.id}`);
  };

  const [sendPost] = useMutation(id ? UPDATE_POST : CREATE_POST, { onCompleted });

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
      <Formik
        initialValues={post}
        enableReinitialize
        onSubmit={({ id, ...input }) => sendPost({ variables: { id, input } })}
        validationSchema={SendPostSchema}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
          touched,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="ControlTitleId">
              <Form.Label>Заголовок</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Введите заголовок"
                  name="title"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isValid={touched.title && !errors.title}
                  isInvalid={touched.title && !!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="ControlBodyId">
              <Form.Label>Содержание</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  as="textarea"
                  type="text"
                  rows={8}
                  name="body"
                  value={values.body}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isValid={touched.body && !errors.body}
                  isInvalid={touched.body && !!errors.body}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.body}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <div className="d-flex justify-content-end gap-1 ">
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
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
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditPostPage;
