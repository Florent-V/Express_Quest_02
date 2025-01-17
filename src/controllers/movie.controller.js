const Movie = require("../models/movie.model");

const movieController = {};

// C from CRUD : Create One New
movieController.create = (req, res, next) => {
  console.log(req.body);
  if (!req.body) {
    res.status(400).json({
      message: "Content cannot be empty !"
    });
  }

  const movie = {
    ...req.body
  };

  Movie.create(movie)
    .then(([result]) => {
      res.status(201).json({ id: result.insertId, message: "Movie Created" });
      //res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Error saving the movie",
        msg: err
      });
      next(err);
    });
};


// R from CRUD : Get All With Filters
movieController.getAll = (req, res, next) => {
  console.log(req.query);
  Movie.getAll(req)
    .then(([movies]) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
      next(err);
    });
};

//R from CRUD : Get One By ID
movieController.getById = (req, res, next) => {
  const id = parseInt(req.params.id);
  Movie.getById(id)
    .then(([movie]) => {
      (movie[0]) ? res.status(200).json(movie[0]) : res.status(404).send('Not Found');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Error retrieving data from database",
        msg: err
      });
      next(err);
    });
};


//U from CRUD : Update One By ID
movieController.updateById = (req, res, next) => {

  if (!req.body) {
    res.status(400).json({message: "Content cannot be empty !"});
  }

  const id = parseInt(req.params.id);

  const movie = {
    ...req.body,
    id,
  };

  Movie.updateById(movie)
    .then(([result]) => {
      result.affectedRows ? res.sendStatus(204) : res.status(404).send("Not Found");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Error editing data from database",
        msg: err
      });
      next(err);
    });
};


//D from CRUD : Delete One By ID
movieController.deleteById = (req, res, next) => {
  const id = req.params.id;
  Movie.deleteById(id)
    .then(([result]) => {
      result.affectedRows ? res.sendStatus(204) : res.status(404).send("Not Found");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Error deleting data from database",
        msg: err
      });
      next(err);
    });
};


module.exports = movieController;