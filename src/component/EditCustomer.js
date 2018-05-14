import React, { Component } from 'react';
import SkyLight from 'react-skylight';

class EditCustomer extends Component {
 constructor(props) {
     super(props);
     this.state = {firstname:this.props.customer.firstname,
          lastname: this.props.customer.lastname, 
          streetaddress: this.props.customer.lastname, 
          postcode: this.props.customer.postcode,
          city: this.props.customer.city, 
          email: this.props.customer.email, 
          phone: this.props.customer.phone};
 }

 handleChange = (event) => {
     this.setState({
         [event.target.name]: event.target.value})
}

handleSubmit = (event) => {
event.preventDefault();
const customer = {firstname: this.state.firstname, 
    lastname: this.state.lastname, 
    streetaddress: this.state.streetaddress, 
    postcode: this.state.postcode, 
    city: this.state.city,
    email: this.state.email, 
    phone: this.state.phone};
this.props.updateCustomer(this.props.link, customer);
this.simpleDialog.hide();
    }


  render() {
    return (
        <div>
        <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Edit customer">
                
        <form>
        <div className="form-group">
            <input placeholder="First name" className="form-control" value={this.state.firstname} name="firstname" onChange={this.handleChange}></input>
            <input placeholder="Last name" className="form-control" value={this.state.lastname} name="lastname" onChange={this.handleChange}></input>
            <input placeholder="Street address" className="form-control" value={this.state.streetaddrss}name="streetaddress" onChange={this.handleChange}></input>
            <input placeholder="Postcode" className="form-control" value={this.state.postcode} name="postcode" onChange={this.handleChange}></input>
            <input placeholder="City" className="form-control" value={this.state.city} name="city" onChange={this.handleChange}></input>
            <input placeholder="Email" className="form-control" value={this.state.email} name="email" onChange={this.handleChange}></input>
            <input placeholder="Phone" className="form-control" value={this.state.phone} name="phone" onChange={this.handleChange}></input>
        </div>
            <button className="btn btn-danger" onClick={this.handleSubmit}>Save</button>
        </form>
        </SkyLight>
            <button className="btn btn-danger" onClick={() => this.simpleDialog.show()}>Edit</button>
        </div>
        );  
    }
    }
    

    export default EditCustomer;