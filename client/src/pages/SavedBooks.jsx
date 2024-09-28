import React from "react";
import { removeBookId } from '../utils/localStorage';
import {
Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";
import Auth from '../utils/auth';

const SavedBooks = () => 
{
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);
//remove useEffect and useState for save books and reference via mutations

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeBook(
        {
        variables: { bookId }
        });

      if (error) {
        throw new Error("Failed to delete the book ID from your Saved Books")
      }
      removeBookId(bookId);
    } 
    catch (err) 
    {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  //Change if statements from userdata array length to only be present during data loads.
  if (loading) 
  {
    return <h2>LOADING...</h2>;
  }
  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col key={book.bookId} md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}<p/><a href={book.link} target="_blank">Buy Book</a></Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};
//Add book ID above to key as well as place an actual link to the google API so users can click the book
//REMINDER: Leave comments down here outside of HTML generation just in case
export default SavedBooks;
