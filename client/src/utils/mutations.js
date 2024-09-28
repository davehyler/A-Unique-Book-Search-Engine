import { gql } from "@apollo/client";
// Each set of mutations below will be copied, pasted and replaced with login, add user, save, and delete book to run a mutation using the Apollo Web Server
export const LOGIN_USER = gql
`mutation login($email: String!, $password: String!) 
    {
        login(email: $email, password: $password) 
        {
            token
            user 
            {
                _id
                username
            }
        }
    }
`;
export const ADD_USER = gql
`mutation addUser($username: String!, $email: String!, $password: String!) 
    {
        addUser(username: $username, email: $email, password: $password) 
        {
            token
            user 
            {
                _id
                username
            }
        }
    }
`;
export const SAVE_BOOK = gql
`mutation saveBook($bookInput: BookInput!) 
    {
        saveBook(bookInput: $bookInput) 
        {
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
    }
`;
export const REMOVE_BOOK = gql
`mutation removeBook($bookId: ID!) 
    {
        removeBook(bookId: $bookId) 
        {
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
    }
`;
