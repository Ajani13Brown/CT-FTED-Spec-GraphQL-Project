import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../graphql/Mutations';
import { Button, Form, Container, Alert } from 'react-bootstrap';

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [createPost, { loading, error }] = useMutation(CREATE_POST);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost({
        variables: { title, body, tags },
      });
      
    } catch (e) {
      console.error('Error creating post:', e);
    }
  };

  return (
    <Container>
      <h2>Create Post</h2>
      {error && <Alert variant="danger">Error: {error.message}</Alert>}
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
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </Button>
      </Form>
    </Container>
  );
};

export default CreatePost;
