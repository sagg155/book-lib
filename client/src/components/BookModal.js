import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addBook } from '../actions/bookActions';
import PropTypes from 'prop-types';
import {uuid} from '../utils/helper';

class BookModal extends Component {
  state = {
    modal: false,
    name: '',
    author: '',
    category: 'Action',
    count: ''
  }

  componentWillMount() {
    console.log("componentWillMount")
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const newBook = {
      name: this.state.name,
      author: this.state.author,
      category: this.state.category,
      count: Number(this.state.count),
      id: uuid()
    }

    this.props.addBook(newBook);
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button
          color="primary"
          style={{marginBottom: '2rem'}}
          onClick={this.toggle}
        >
          Add Book
        </Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>
            Add book to your library
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit} className="form">
              <FormGroup>
                <Label className="label" for="title">Title:</Label>
                <Input
                  required={true}
                  color="black"
                  type="text"
                  name="name"
                  id="title"
                  placeholder="Example: Half GirlFirend"
                  onChange={this.onChange}
                />
                <Label className="label" for="author">Author:</Label>
                <Input
                  required={true}
                  type="text"
                  name="author"
                  id="author"
                  placeholder="Example: Chetan Bhagat"
                  onChange={this.onChange}
                />
                <Label className="label" for="total_pages">Count:</Label>
                <Input
                  required={true}
                  type="number"
                  name="count"
                  id="count"
                  placeholder="Example: 1"
                  onChange={this.onChange}
                />
                <Label className="label" for="category">Category:</Label>
                <Input
                  type="select"
                  name="category"
                  id="category"
                  onChange={this.onChange}
                >
                {this.props.categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </Input>
                <Button
                  color="dark"
                  style={{marginTop: '2rem'}}
                  block
                >
                  Add Book
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

BookModal.propTypes = {
  categories: PropTypes.array.isRequired,
  addBook: PropTypes.func.isRequired
}

export default connect(null, { addBook })(BookModal);
