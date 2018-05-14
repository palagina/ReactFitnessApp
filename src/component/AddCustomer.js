import React, { Component } from 'react';
import SkyLight from 'react-skylight';

class AddCustomer extends Component {
 constructor(props) {
     super(props);
     this.state = {firstname:'',  lastname:'', streetaddress:'', postcode:'', city:'', email:'', phone:''};
 }

 handleChange = (event) => {
     this.setState({
         [event.target.name]: event.target.value
     })
}

handleSubmit = (event) => {
event.preventDefault();
const newCustomer = {firstname: this.state.firstname, 
    lastname: this.state.lastname, 
    streetaddress: this.state.streetaddress, 
    postcode: this.state.postcode, 
    city: this.state.city,
    email: this.state.email, 
    phone: this.state.phone};

    this.props.addCustomer(newCustomer);
    this.props.loadCustomers();
    this.simpleDialog.hide();
    }


  render() {
    return (
        <div>
        <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Add customer">
                  Add a new customer
        <form>
        <div className="form-group">
            <input placeholder="First name" className="form-control" name="firstname" onChange={this.handleChange}></input>
            <input placeholder="Last name" className="form-control" name="lastname" onChange={this.handleChange}></input>
            <input placeholder="Street address" className="form-control" name="streetaddress" onChange={this.handleChange}></input>
            <input placeholder="Postcode" className="form-control" name="postcode" onChange={this.handleChange}></input>
            <input placeholder="City" className="form-control" name="city" onChange={this.handleChange}></input>
            <input placeholder="Email" className="form-control" name="email" onChange={this.handleChange}></input>
            <input placeholder="Phone" className="form-control" name="phone" onChange={this.handleChange}></input>
        </div>
            <button className="btn btn-danger" onClick={this.handleSubmit}>Save</button>
        </form>
        </SkyLight>
            <button className="btn btn-danger mb-2 mt-2" onClick={() => this.simpleDialog.show()}>Add customer</button>
        </div>
    
        );
        
    }
    }
    

    export default AddCustomer;