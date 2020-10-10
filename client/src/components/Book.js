import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import EditModal from './EditModal';


class Book extends Component {

  render() {

    const {
      category,
      categories,
      name,
      author,
      count,
      id,
      onDeleteClick
    } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-md-4 book-details">
            <h5>{category}</h5>
            <h4>{name}</h4>
            <h4>{Number(count)}</h4>
            <p style={{color: "#007bff"}}>{author}</p>
          </div>
        </div>
        <div className="row buttons-row">
          <div className="col-md-4">
            <Button className="remove-btn"
                    size="sm"
                    onClick={onDeleteClick}
            >
              Remove
            </Button>
            <EditModal categories={categories}
                       id={id}
                       name={name}
                       author={author}
                       category={category}
                       count={Number(count)}
            />
          </div>
        </div>
      </div>
    )
  }
}

Book.propTypes = {
  category: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired
}

export default Book;

//NOTE: Change to functional component?
