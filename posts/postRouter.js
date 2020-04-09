const express = require('express');
const posts = require('./postDb')
const middleware = require('../middleware/middleware')
const router = express.Router();

router.get('/', (req, res, next) => {
  posts.get()
  .then(post=> {
    res.status(200).json(post)
  })
  .catch( error => {
    next('failed')
  })
});

router.get('/:id', middleware.validatePostId, (req, res) => {
  posts.getById(req.params.id)
  .then(post=> {
    res.status(200).json(post)
  })
  .catch( error => {
    next('failed')
  })
});

router.delete('/:id', middleware.validatePostId, (req, res) => {
  posts.remove(req.params.id)
  .then(post => {
    res.status(200).json(`Deleted post`)
  })
});

router.put('/:id', middleware.validatePostId, (req, res) => {
  posts.update(req.params.id, req.body)
  .then(post => {
    res.status(201).json('Post has been updated')
  })
});


module.exports = router;
