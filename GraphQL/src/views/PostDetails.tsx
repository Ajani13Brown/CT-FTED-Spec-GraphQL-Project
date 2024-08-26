import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Spinner, Alert, Container, ListGroup } from 'react-bootstrap';
import { postDetails } from '../graphql/Queries';

interface Comment {
  id: string;
  name: string;
  email: string;
  body: string;
}

interface PostDetailsResponse {
  post: {
    id: string;
    title: string;
    body: string;
    comments: Comment[];
  };
}

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery<PostDetailsResponse>(postDetails, {
    variables: { postId: id },
  });

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error!</Alert.Heading>
        <p>{error.message}</p>
      </Alert>
    );
  }

  if (!data?.post) {
    return <p>No post found</p>;
  }

  const { post } = data;

  return (
    <Container>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <h4>Comments</h4>
      <ListGroup>
        {post.comments.map(comment => (
          <ListGroup.Item key={comment.id}>
            <h5>{comment.name}</h5>
            <p>{comment.body}</p>
            <small>{comment.email}</small>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default PostDetails;
