const express = require('express');
const middleware = require('./middleware/middleware')

const postRouter = require('./posts/postRouter')
const userRouter = require('./users/userRouter')
const server = express();


server.use(middleware.logger);
server.use(express.json());
server.get('/',  (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/users',  userRouter);
server.use('/api/posts', postRouter);

server.use(middleware.errorHandle);





module.exports = server;
