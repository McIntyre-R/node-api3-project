const express = require('express');
const users = require('./userDb')
const posts = require('../posts/postDb')
const middleware = require('../middleware/middleware')

const router = express.Router();


//done
router.post('/', middleware.validateUser, (req, res, next) => {
    users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
});

//done
router.post('/:id/posts', middleware.validatePost, (req, res) => {
  req.body.user_id = req.params.id
  posts.insert(req.body)
  .then(post => {
    res.status(201).json(post)
  })
});

//done
router.get('/', (req, res) => {
  users.get()
  .then(user=> {
    res.status(200).json(user)
  })
  .catch( error => {
    next('failed')
  })
});

//done
router.get('/:id', middleware.validateUserId, (req, res) => {
    res.status(200).json(req.user)

});

//done
router.get('/:id/posts',  middleware.validateUserId, (req, res) => {
  users.getUserPosts(req.params.id)
  .then(user => {
    if (user ) {
      res.status(200).json(user)
    } else {
      res.status(404).json({message: 'user posts not found'})
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error retrieving user posts'
    })
  })
});

//done
router.delete('/:id', middleware.validateUserId, (req, res) => {
  users.remove(req.params.id)
  .then(user => {
    res.status(200).json(`Deleted user`)
  })
});

//done
router.put('/:id', middleware.validateUserId, (req, res) => {
  users.update(req.params.id, req.body)
  .then(user => {
    res.status(201).json('user has been updated')
  })
});


module.exports = router;


