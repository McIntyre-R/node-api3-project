
const users = require('../users/userDb')
const posts = require('../posts/postDb')


function logger(req, res, next) {
    console.log(`${req.method} Request to ${req.originalUrl}`);
    next();
}

function errorHandle(err, req, res, next){
    res.status(400).json("this is the error" + err)
}

function validateUserId(req, res, next) {
    users.getById(req.params.id)
    .then( user => {
        if (user) {
            req.user = user
            next(); 
          } else {
           res.status(404).send({ message: "invalid user id" })
          }
})}
  
function validateUser(req, res, next) {
    
    if (req.body) {
        if(req.body.name) {
            next();
        } else {
            res.status(400).json({ messsage: "missing required name field"})
        }; 
      } else {
        res.status(400).json({ messsage: "missing user data"})
      }
}
  
function validatePost(req, res, next) {
    if (req.body) {
        if(req.body.text) {
            next();
        } else {
            res.status(400).json({ messsage: "missing required text field"})
        }; 
      } else {
        res.status(400).json({ messsage: "missing user data"})
      }
}

function validatePostId(req, res, next) {
    posts.getById(req.params.id)
    .then( post => {
        if (post) {
            req.post = post
            next(); 
          } else {
           res.status(404).send({ message: "invalid post id" })
          }
})
}

module.exports = { logger, errorHandle, validateUserId, validateUser, validatePost, validatePostId }