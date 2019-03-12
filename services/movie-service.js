import * as movieDao from '../dao/movie-dao';

export function findAllByYear(year) {
  return movieDao.findAllByYear(year);
}

export function findByYearAndTitle(year, title) {
  return movieDao.findByYearAndTitle(year, title);
}

export function update(movie) {
  return movieDao.update(movie);
}

export function save(movie) {
  return movieDao.saveMovie(movie);
}