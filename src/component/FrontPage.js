import React, { Component } from 'react';
import one from './one.jpg';
import two from './two.jpg';
import three from './three.jpg';

class FrontPage extends Component {
    render (){
        return (
<div>
<h2>Here you can see all the customers and trainings.</h2>
<img src={one} className="img-thumbnail" width="300"/>
<img src={two} className="img-thumbnail" width="300"/>
<br></br>
<img src={three} className="img-thumbnail" width="600"/>
    </div>

        )
    }
}

export default FrontPage;






