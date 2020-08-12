var express = require('express');
var Peliculas = require('../models/peliculas')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  Peliculas.getNewMovies(2000).then(result => {
    res.json(result);
  }).catch(err => console.log(err));
});

router.post('/moreMovies', function (req, res, next) {
  Peliculas.getMoreMovies(req.body.from, req.body.to).then(result => res.json(result)).catch(err => console.log(err))
})

router.post('/buscarTitle', (req, res) => {
  Peliculas.searchByTitle(req.body.pelicula)
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

router.post('/buscarId', (req, res) => {
  Peliculas.searchById(req.body.id)
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

router.get('/providers', (req, res) => {
  Peliculas.getProviders()
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

router.post('/genres', (req, res) => {
  Peliculas.getGenresById(req.body.id)
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

router.post('/autocomplete', (req, res) => {
  Peliculas.autocomplete(req.body.search)
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

router.post('/moviesByProvider', (req, res) => {
  Peliculas.getMoviesByProvider(req.body)
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

router.post('/releatedmovies', (req, res) => {
  Peliculas.getReleatedMovies(req.body.genreIds)
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

module.exports = router;
