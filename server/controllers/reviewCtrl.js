const Review = require('../models/reviewModel.js');
const Event = require('../models/eventModel.js');
const url = require('url');
const db = require('../db/db.js');

module.exports = {
  '/': {
    get(req, res) {
      console.log('Received GET at /api/review');
      res.end('Received GET at /api/review');
    },
    post(req, res) {
      console.log('Received POST at /api/review');
      const newReview = req.body;
      const { eventId, reviewerId } = req.body;
      delete newReview.token;

      Review.createReview(newReview)
        .then((reslt) => {
          console.log('RESULT RESULT RESULT::::::', reslt[0].dataValues);
          res.send(reslt);
        })
        .catch((err) => {
          console.log('error in POST at /api/review', err);
          res.send(err);
        });
    },
    put(req, res) {
      console.log('Received PUT at /api/:review');
      res.end('Received PUT at /api/:review');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/:review');
      res.end('Received DELETE at /api/:review');
    },
  },
  '/user/:userId': {
    get(req, res) {
      console.log('Received GET at /api/review/:userId');
      const userId = url.parse(req.url, true).path.slice(7)
      res.end('Received GET at /api/review/:userId');
    },
    post(req, res) {
      console.log('Received POST at /api/review/:userId');
      res.end('Received POST at /api/review/:userId')
    },
    put(req, res) {
      console.log('Received PUT at /api/:review');
      res.end('Received PUT at /api/:review');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/:review');
      res.end('Received DELETE at /api/:review');
    },
  },
  '/event/:eventId': {
    get(req, res) {
      console.log('Received GET at /api/review/event/:eventId');

      const eventId = url.parse(req.url, true).path.split('/event/')[1];

      console.log('getting all reviews for event: ', eventId);

      Review.findReviewsByEvent(eventId)
        .then((reviews) => {
          console.log('these are the reviews', reviews);
          if (reviews.length === 0) {
            console.log('reviews do not exist');
            res.end('Received GET at /api/review/event/:eventId');
          } else {
            console.log('there are reviews, return them');
            res.send(reviews);
          }
        });
    },
    post(req, res) {
      console.log('Received POST at /api/review/event/:eventId');
      res.end('Received POST at /api/:reviewId');
    },
    put(req, res) {
      console.log('Received PUT at /api/review/event/:eventId');
      res.end('Received PUT at /api/:reviewId');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/review/event/:eventId');
      res.end('Received DELETE at /api/review/event/:eventId');
    },
  },
  '/chef/:userId': {
    get(req, res) {
      const userId = url.parse(req.url, true).path.slice(6);
      Review.findReviewsByChef(userId)
        .then((results) => {
          console.log('results received in /chef/:userId');
          Review.updateAverage(results);
          res.send(results);
        });
    },
    post(req, res) {
      console.log('Received POST at /api/review/event/:eventId');
      res.end('Received POST at /api/:reviewId');
    },
    put(req, res) {
      console.log('Received PUT at /api/review/event/:eventId');
      res.end('Received PUT at /api/:reviewId');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/review/event/:eventId');
      res.end('Received DELETE at /api/review/event/:eventId');
    },
  },

};
