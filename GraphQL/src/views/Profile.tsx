import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { getProfile } from '../graphql/Queries';
import { User } from '../types/user';

interface ProfileResponse {
  user: User;
}

const Profile: React.FC = () => {
  const [show, setShow] = useState(true);
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery<ProfileResponse>(getProfile, {
    variables: { id },
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
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>
          Oh snap! You got an error! {error.message}
        </Alert.Heading>
      </Alert>
    );
  }

  if (!data?.user) {
    return <p>No user found</p>;
  }

  const { user } = data;

  return (
    <Container>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Address: {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
      <p>Company: {user.company.name} ({user.company.catchPhrase})</p>
    </Container>
  );
};

export default Profile;
