//See Module 21 Activity 01 for structure of typeDefs, book example below:
//refer to activity 17 for usage of exclamation/non-nullable, ie: "String!" and [] containers

const typeDefs = `
type User {
_id: ID!
username: String
email: String!
bookCount: Int
savedBooks: [Book]
}

type Book {
bookId: ID!
title: String!
authors: String!
description: String
}

input BookInput {
bookId: String      
authors: String!       
description: String       
title: String!            
}

type Auth {
token: ID!
user: User
}

type Query {
user: ID!
}

type Mutation {
signUp(username: String!, email: String!, password: String!): Auth    
login(email: String!, password: String!): User    
saveBook(bookInput: BookInput!): Book
deleteBook(bookId: String!): Book
}
`;

module.exports = typeDefs;

//Reference for structure:
// const typeDefs = `
//   type Class {
//     _id: ID
//     name: String
//     building: String
//     creditHours: Int
//   }

//   type Query {
//     classes: [Class]
//   }
// `;

// module.exports = typeDefs;
