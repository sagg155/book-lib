import { GET_BOOKS, ADD_BOOK, UPDATE_BOOK, DELETE_BOOK, BOOKS_LOADING, SEARCH_BOOK } from '../actions/types';

const initialState = {
  books: [],
  loading: false,
  isSearch: false
};


export default function(state = initialState, action) {
  switch(action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false,
        isSearch: false
      };
    case SEARCH_BOOK:
        return {
          ...state,
          searchedBook: action.payload,
          // books: action.payload,
          loading: false,
          isSearch: true
        };
    case ADD_BOOK:
      // debugger
      return {
        ...state,
        books: [action.payload, ...state.books],
        isSearch: false
      };
    case UPDATE_BOOK:
      const updatedBooks = state.books.map(book => {
          if(book.id === action.payload.id){
            return { ...book, ...action.payload,isSearch: false}
          }
        return book;
      });
      return {
        books: updatedBooks
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => (book.id !== action.payload)),
        isSearch: false
      };
    case BOOKS_LOADING:
      return {
        ...state,
        loading: true,
        isSearch: false
      };
    default:
      return state;
  }
}
