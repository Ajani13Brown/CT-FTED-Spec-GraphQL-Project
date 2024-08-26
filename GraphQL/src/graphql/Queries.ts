import { gql } from "urql";

export const getProfile = gql`
  query getProfile($id: ID!) {
    user(id: $id) {
      name
      email
      address {
        street
        suite
        city
        zipcode
        geo {
          lat
          lng
        }
      }
      phone
      website
      company {
        name
        catchPhrase
        bs
      }
    }
  }
`;

export const getUserPosts = gql`
  query getUserPosts($userId: ID!) {
    user(id: $userId) {
      posts {
        id
        title
        body
      }
    }
  }
`;

export const postDetails = gql`
  query getPostDetails($postId: ID!) {
    post(id: $postId) {
      id
      title
      body
      comments {
        id
        name
        email
        body
      }
    }
  }
`;