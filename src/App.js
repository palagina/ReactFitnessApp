import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Customer from './component/Customer';
import Training from './component/Training';
import FrontPage from './component/FrontPage';
//import Calendar from './component/Calendar';
import Navigator from './component/Navigator';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Personal Trainer Application</h1>
        </header>
  
    <BrowserRouter>
 <div>
  <Navigator />

<Switch>
<Route exact path="/" render={() => <FrontPage/> } />
<Route path="/customer" component={Customer} />
<Route path="/training" component={Training} />

</Switch>
</div>
      </BrowserRouter>
 
      </div>
    );
  }
}

export default App;
