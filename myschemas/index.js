const {gql}=require ('apollo-server-express');
const resolvers = require('./resolvers');

const typeDefs = gql`
input SaveBookInput {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Query {
    me:User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email:String!, password: String!): Auth
    saveBook(BookId: String!, title: String!, authors: [String]!, description: String, image: String, link: String): User
    removeBook(bookId: String! User)
}

type Auth {
    token: Spring
    user: User
}

type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int!
    savedBooks: [Book]!
}

type Book {
bookId: String!
authors: [Strip!]!
description: String
title: String
image: String
link: String
}
`



module.exports = {
    typeDefs,
    resolvers
}
