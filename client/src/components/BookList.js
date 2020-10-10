import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Input, Label } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getBooks, addBook, deleteBook, searchBook } from '../actions/bookActions';
import { changeFilter } from '../actions/filterActions';
import PropTypes from 'prop-types';
import Loader from './Loader';
import BookModal from './BookModal';
import CategoryFilter from './CategoryFilter';
import Book from './Book';

class BookList extends Component {
  state ={
    searchBookValue:''
  }

  componentDidMount() {
    this.props.getBooks();
  };

  componentWillMount() {
    this.changeSearch = this.debounce(this.props.searchBook, 500)
  }

  // componentWillReceiveProps(nextProps) {
  //   // debugger
  //   console.log("componentWillReceiveProps", nextProps)
  // }


  // Debouncing the call to searchBook fun till the user has stopped typing
  handleChange = (e) => {
    const val = e.target.value

    this.setState({ searchBookValue: val }, () => {
      this.changeSearch(val)
    })
  }

  debounce = (fn, delay) => {
    // console.log("e.target2====>", e.target)
    let timerId;
    return function() {
      // if(timerId) {
        clearTimeout(timerId);
      // }
      

      timerId = setTimeout(() => {
        fn.apply(this, arguments);
      },delay);
    }
  }


  onDeleteClick = id => {
    this.props.deleteBook(id);
  };

  handleFilterChange = e => {
    this.props.changeFilter(e.target.value);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const categories = ["Action", "Biography", "History", "Horror", "Kids", "Learning", "Sci-Fi"];
    const { books, loading, isSearch, searchedBook } = this.props.library, catFilter = this.props.catFilter.filter, selectedFilter = catFilter.length > 1 ? 'All Categories' : catFilter[0], noDataHeading = 'No Books To Show...';
    
    let renderBook;
    if(isSearch && searchedBook && searchedBook.length) {
        renderBook = <ListGroup>
              <div className="flex">
                <h3 className="center">Searched Book....</h3>
              </div>
            {searchedBook
              .map((book) => (
              <CSSTransition key={book.id} timeout={500} classNames="fade">
                <ListGroupItem  className="book">
                  <Book {...{...book, categories}}
                        onDeleteClick={() => this.onDeleteClick(book.id)}
                  />
                </ListGroupItem>
              </CSSTransition>
            ))
            }
        </ListGroup>
    } else if(isSearch && loading) {
      renderBook = <Loader/>;
    } else if(isSearch &&  !searchedBook) {
      renderBook = <div className="flex">
                    <h3 className="center">Searched Book Not Found...</h3>
                  </div>
    }

    return (
      <Container style={{marginBottom: "20px"}}>
        <BookModal
          {...{categories}}
        />
        <div className="flex-container">
          <div>
            <Label className="m-rt" for="search-category">Search by category filter:</Label>
            <CategoryFilter selectedCategory={selectedFilter} categories={['All Categories',...categories]} onChange={this.handleFilterChange}/>
          </div>
          <div>
            <Label className="m-rt" for="search">Search by book's name:</Label>
            <Input
              className="category-select w-50 ib w-auto"
              type="text"
              name="search"
              id="search"
              value={this.state.searchBookValue}
              placeholder="Search by book's name:"
              onChange={this.handleChange}
            />
          </div>
        </div>
        { 
          renderBook
        }
        {!loading && !isSearch &&
          <ListGroup>
              {books && books.length ? 
              
              books.filter(book => catFilter.includes(book.category))
                .map((book) => (
                <CSSTransition key={book.id} timeout={500} classNames="fade">
                  <ListGroupItem  className="book">
                    <Book {...{...book, categories}}
                          onDeleteClick={() => this.onDeleteClick(book.id)}
                    />
                  </ListGroupItem>
                </CSSTransition>
              )):
              (<div className="flex">
                <h3 className="center">{noDataHeading}</h3>
              </div>)
              }
          </ListGroup>}
          {loading && !isSearch && <Loader/>}
        {/* {<Loader/>} */}
      </Container>
    );
  }
}

BookList.propTypes = {
  getBooks: PropTypes.func.isRequired,
  addBook: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  library: PropTypes.object.isRequired,
  catFilter: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  library: state.library,
  catFilter: state.filter,
  loading: state.loading,
  searchedBook: state.searchedBook,
  isSearch: state.isSearch
});

export default connect(mapStateToProps,
  { getBooks,
    addBook,
    deleteBook,
    changeFilter,
    searchBook
  }
)(BookList);
