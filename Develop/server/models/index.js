const {ApolloServer, gql}= require("apollo-server");
const User = require('./User');
const typeDef= gql`
type Book{
    authors [String]
    description String
    bookId String
    image String
    link String
    title String

}
type User{
    username
    password
    email
    savedBooks [Book]
}`

module.exports = { User };
