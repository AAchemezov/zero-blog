import React from 'react';
import { Badge, Button, Card } from 'react-bootstrap';

interface Comment {
  id: string
  name: string
  body: string
  email: string
}

function Comments({ comments }:{ comments:Comment[] }) {
  return (
    <div>
      <div className="d-flex align-items-center">
        <h5 className="me-2">Комментарии</h5>
        <Badge pill bg="secondary">{comments.length}</Badge>
      </div>
      <div className="flex-column">
        {comments.map((comment) => (
          <Card className="my-4" key={comment.id}>
            <div className="d-flex align-items-start justify-content-between p-2">
              <Card.Body className="pb-0">
                <Card.Title>{comment.name}</Card.Title>
                <Card.Text>{comment.body}</Card.Text>
              </Card.Body>
              <Button
                variant="light"
                size="sm"
                className="p-0 d-flex align-items-center"
                // onClick={() => setDeletePost({
                //   postId: post.id,
                //   postName: post.title,
                //   onClose: () => setDeletePost(undefined),
                // })}
              >
                <i className="material-icons md-18">close</i>
              </Button>
            </div>
            <div className="d-flex justify-content-end m-2">
              <span className="link-primary">
                {comment.email}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Comments;
