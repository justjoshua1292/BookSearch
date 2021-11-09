const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const {ApolloServer}= require("apollo-server");
const {authMiddleware}= require("./utils/auth")
const {typeDefs, resolvers}= require("./models")

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);
const server = new ApolloServer(
  {
    typeDefs, resolvers,
    context:({req})=>{
      authMiddleware(req)
    }
  }
)


db.once('open', () => {
server.listen ().then(({
  url
})=>{
  console.log("server listening")
})
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
