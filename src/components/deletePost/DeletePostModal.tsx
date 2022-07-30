import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useMutation } from '@apollo/client';
import { Spinner } from 'react-bootstrap';
import { DELETE_POST } from '../../queries/Queries';
import { useToast } from '../toastWrapper/ToastWrapper';

export type DeletePostModalProps = {
  postId: string
  postName: string
  onClose: ()=> void
};

function DeletePostModal({ postId, postName, onClose }: DeletePostModalProps): JSX.Element {
  const addToast = useToast();
  const [deletePost, { loading }] = useMutation(DELETE_POST, {
    onCompleted: () => {
      addToast({ title: 'Пост удалён!', text: postName });
      onClose();
    },
  });

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить пост?</Modal.Title>
      </Modal.Header>
      <Modal.Body>{postName}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Отменить
        </Button>
        <Button
          variant="primary"
          disabled={loading}
          onClick={() => deletePost({ variables: { id: postId } })}
        >
          {loading && (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          )}
          Подтвердить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeletePostModal;
