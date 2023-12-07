import { Container, Table, Button, Tab, Tabs, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "./App.css";
function App() {
  const [key, setKey] = useState("home");
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState("");
  const [quantity, setQuantity] = useState("");
  const [id, setId] = useState(null);
  
  const fetchData = () => {
    // Fetch data from the API
    fetch("http://localhost:8080/api/books")
      .then((response) => response.json())
      .then((response) => {
        setBooks(response.booksData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleAuthor = (event) => {
    setAuthor(event.target.value);
  };
  const handleCost = (event) => {
    setCost(event.target.value);
  };
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const handleId = (event) => {
    setId(event.target.value);
  };
  const handleAddBook = (e) => {
    e.preventDefault();
    // console.log(newBook);
    const payload = {
      book_title:title,
      book_author:author,
      book_cost:cost,
      book_quantity:quantity,
    }
    // Post new book data to the API
    fetch("http://localhost:8080/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        setAuthor("")
        setCost("")
        setQuantity("")
        setTitle("")

      })
      .catch((error) => console.error("Error posting data:", error));
  };

  const handleUpdate = () => {
    const payload = {
      book_title:title,
      book_author:author,
      book_cost:cost,
      book_quantity:quantity,
    }
    console.log(id)
      fetch(`http://localhost:8080/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        // .then((data) => {
        //   setId(null);
        // })
        .catch((error) => console.error('Error updating data:', error));
  };

  return (
    <>
      {/* <Container> */}
      <h1>Simple Library System</h1>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 tab"
      >
        <Tab eventKey="home" title="All Books" className="tabs">
          <Container>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  {/* <th>Id</th> */}
                  <th>Title</th>
                  <th>Author</th>
                  <th>Cost</th>
                  <th>Quantity</th>
                  {/* Add more columns as needed */}
                </tr>
              </thead>
              <tbody>
                {Array.isArray(books) && books.length > 0 ? (
                  books.map((book) => (
                    <tr key={book.book_id}>
                      {/* <td>{book.book_id}</td> */}
                      <td>{book.book_title}</td>
                      <td>{book.book_author}</td>
                      <td>{book.book_cost}</td>
                      <td>{book.book_quantity}</td>
                      {/* Add more cells as needed */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No books available</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <Button variant="outline-primary" onClick={fetchData}>
              Get All Books
            </Button>{" "}
          </Container>
        </Tab>
        <Tab eventKey="add" title="Add Book" className="tabs">
          <Container>
            <Form>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleTitle}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="author">
                <Form.Label>Author</Form.Label>
                <input
                  type="text"
                  name="author"
                  value={author}
                  onChange={handleAuthor}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="author">
                <Form.Label>Cost</Form.Label>
                <input
                  type="text"
                  name="cost"
                  value={cost}
                  onChange={handleCost}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="author">
                <Form.Label>Quantity</Form.Label>
                <input
                  type="text"
                  name="quantity"
                  value={quantity}
                  onChange={handleQuantity}
                />
              </Form.Group>
            </Form>
            <Button
              variant="outline-success"
              type="submit"
              onClick={handleAddBook}
            >
              Add Book
            </Button>{" "}
          </Container>
        </Tab>
        <Tab eventKey="update" title="Update Book" className="tabs">
          <Container>
          <Form>
          <Form.Group className="mb-3" controlId="title">
                <Form.Label>Id</Form.Label>
                <input
                  type="text"
                  name="id"
                  value={id}
                  onChange={handleId}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleTitle}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="author">
                <Form.Label>Author</Form.Label>
                <input
                  type="text"
                  name="author"
                  value={author}
                  onChange={handleAuthor}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="author">
                <Form.Label>Cost</Form.Label>
                <input
                  type="text"
                  name="cost"
                  value={cost}
                  onChange={handleCost}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="author">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="text"
                  name="quantity"
                  value={quantity}
                  onChange={handleQuantity}
                />
              </Form.Group>
            </Form>
            <Button variant="outline-warning" className="button" onClick={handleUpdate}>
              Update
            </Button>{" "}
          </Container>
        </Tab>
      </Tabs>
      {/* </Container> */}
    </>
  );
}

export default App;
