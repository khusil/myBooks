import { gql } from '@apollo/client';





export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
  `;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
        username
      }
      token
    }
  }`;

export const SAVE_BOOK = gql`
  mutation SaveBook($bookdata: BookInput) {
    saveBook(bookdata: $bookdata) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  } `;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!) {
  removeBook(bookId: $bookId) {
    _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    
  }
} `;