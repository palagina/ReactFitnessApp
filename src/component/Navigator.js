import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Navigator extends Component {

  render() {
      return (
          
    <nav className="navbar navbar-expand-lg navbar-light bg-light">

             <Link className="navbar-brand" to="/">Home</Link>
         <div className="collapse navbar-collapse" id="navbarSupportedContent">

         <ul className="navbar-nav mr-auto">
               
                 <li className="nav-item active">
                     <Link className="nav-link" to="/Customer">Customers</Link>
                 </li>
                 <li className="nav-item active">
                    <Link className="nav-link" to="/Training">Training</Link>
                </li>
                <li className="nav-item ">
                     <Link className="nav-link" to="/Calendar">Calendar</Link>
                </li>
         </ul>
         </div>

    </nav>
    );
}
}


export default Navigator;