import http from '../utils/http';
import { GET_BOOKS, ADD_BOOK, UPDATE_BOOK, DELETE_BOOK, BOOKS_LOADING, SEARCH_BOOK } from './types';

export const getBooks = () => dispatch => {
  dispatch(setBooksLoading());
  console.log('setTiemoutouter')
  http.getOrDelete('GET', '/api/books')
  .then(res => {

    // To give the feel that it's fetching data from real server which is getting data from db
    setTimeout(()=> {
      dispatch({
      type: GET_BOOKS,
      payload: res
    })}, 500)
  })
};

export const searchBook = (name) => dispatch => {
  dispatch(setBooksLoading());
  debugger
  http.getOrDelete('GET', `/api/books/search?name=${name}`)
  .then(res => {

    dispatch({
      type: SEARCH_BOOK,
      payload: res
    })
  })
};

export const addBook = book => dispatch => {
  // axios
  //   .post('/api/books', book)
    http.postOrPut('POST','/api/books', book)
    .then(res => {
      console.log("res===>", res)
      dispatch({
        type: ADD_BOOK,
        payload: res
      })
    })
};

export const updateBook = book => dispatch => {
  http.postOrPut('PUT',`/api/books/${book.id}`, book)
    .then(res =>{
      console.log("res===>", res)
      dispatch({
        type: UPDATE_BOOK,
        payload: res
      })
    })
};

export const deleteBook = id => dispatch => {
    http.getOrDelete('DELETE', `/api/books/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_BOOK,
        payload: id
      })
    )
};

export const setBooksLoading = () => {
  return {
    type: BOOKS_LOADING
  };
};
