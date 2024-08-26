

import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation createPost($title: String!, $body: String!, $tags: [String]) {
    createPost(input: { title: $title, body: $body, tags: $tags }) {
      id
      title
      body
      tags
    }
  }
`;


export const updatePost = gql`
  mutation updatePost($id: ID!, $title: String, $body: String, $tags: [String]) {
    updatePost(id: $id, input: { title: $title, body: $body, tags: $tags }) {
      id
      title
      body
      tags
    }
  }
`;


export const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;
