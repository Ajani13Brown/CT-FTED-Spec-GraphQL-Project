import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { postDetails } from '../graphql/Queries';
import { updatePost } from '../graphql/Mutations';




const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(postDetails, { variables: { id } });
  const [updatePost, { loading: updating, error: updateError }] = useMutation(updatePost);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (data?.post) {
      setTitle(data.post.title);
      setBody(data.post.body);
      setTags(data.post.tags || []);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePost({
        variables: { id, title, body, tags },
      });
      navigate(`/posts/${id}`);
    } catch (e) {
      console.error('Error updating post:', e);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error || updateError) return <Alert variant="danger">Error: {error?.message || updateError?.message}</Alert>;

  return (
    <Container>
      <h2>Edit Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBody">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter content"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formTags">
          <Form.Label>Tags (optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter tags separated by commas"
            value={tags.join(', ')}
            onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={updating}>
          {updating ? 'Updating...' : 'Update Post'}
        </Button>
      </Form>
    </Container>
  );
};

export default EditPost;
