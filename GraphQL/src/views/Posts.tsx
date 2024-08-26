import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { Spinner, Alert, Container, ListGroup } from 'react-bootstrap';
import { getUserPosts } from '../graphql/Queries';

interface Post {
  id: string;
  title: string;
}

interface UserPostsResponse {
  user: {
    posts: {
      data: Post[];
    };
  };
}

const Posts: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const { data, loading, error } = useQuery<UserPostsResponse>(getUserPosts, {
    variables: { userId },
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

  const posts = data?.user.posts.data;

  if (!posts || posts.length === 0) {
    return <p>No posts found</p>;
  }

  return (
    <Container>
      <h2>Posts</h2>
      <ListGroup>
        {posts.map((post: Post) => (
          <ListGroup.Item key={post.id}>
            <h4>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </h4>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Posts;
