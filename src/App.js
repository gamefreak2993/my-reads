import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CreateBooks from './CreateBooks';
import * as BooksAPI from './utils/BooksAPI';

class App extends Component {
  state = {
    books: []
  }

  componentDidMount () {
    BooksAPI.getAll().then( ( books ) => { this.setState( { books } ) } );
  }

  render () {
    return (
      <div className="myReadsApp">
        <Header />
        <Route exact path='/' render={ () => (
          <CreateBooks
            books={ this.state.books }
          />
        ) } />
        <Footer />
      </div>
    );
  }
}

export default App;
