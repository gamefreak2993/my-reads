import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CreateBooks from './CreateBooks';

class App extends Component {

  render() {
    return (
      <div className="myReadsApp">
        <Header/>
          <Route exact="exact" path='/' render={_ => (<CreateBooks/>)}/>
        <Footer/>
      </div>
    );
  }
}

export default App;
