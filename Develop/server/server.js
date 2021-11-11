const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const {ApolloServer}= require("apollo-server-express");
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
async function startApolloServer(){
  const server = new ApolloServer(
    {
      typeDefs, resolvers,
      context:({req})=>{
        authMiddleware(req)
      }
    }
  )
  await server.start()
  server.applyMiddleware({app})
    app.listen(PORT, () =>{
      console.log("server listening")
    });
}




db.once('open', () => {
startApolloServer()
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
