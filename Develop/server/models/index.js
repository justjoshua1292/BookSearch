const {ApolloServer, gql} = require("apollo-server");
const {getSingleUser, login } = require("../controllers/user-controller");
const User = require('./User');
const typeDefs= gql`
type Book{
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String

}
type User{
    username: String
    password: String
    email: String
    savedBooks: [Book]
}
type Query{
    me:[User]
}
type Mutation{
    login(email: String, password: String): User
}
`
const resolvers = {
    Query:{
        me:()=> getSingleUser()
    },
    Mutation:{
        login:(email, password)=>login(email, password)
    }
}

module.exports = { User, typeDefs, resolvers }
