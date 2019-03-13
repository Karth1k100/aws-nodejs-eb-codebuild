var movieDao=require('../dao/movie-dao');

exports.findAllByYear= function (year) {
  return movieDao.findAllByYear(year);
}

exports.findByYearAndTitle=function(year, title) {
  return movieDao.findByYearAndTitle(year, title);
}

exports.update=function(movie) {
  return movieDao.update(movie);
}

exports.save=function(movie) {
  return movieDao.saveMovie(movie);
}