import React, { Component } from 'react';
import SkyLight from 'react-skylight';

class EditTraining extends Component {
 constructor(props) {
     super(props);
     this.state = {
        date: this.props.training.date, 
         duration: this.props.training.duration, 
         activity: this.props.training.activity, 
         customer: this.props.training.customer};
 }

 handleChange = (event) => {
     this.setState({
         [event.target.name]: event.target.value})
}

handleSubmit = (event) => {
event.preventDefault();
const training = {
    date: this.state.date, 
    duration: this.state.duration, 
    activity: this.state.activity, 
    customer: this.state.customer};
this.props.updateTraining(this.props.link, training);
this.simpleDialog.hide();
    }


  render() {
    return (
        <div>
        <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Edit training">
                  Edit the training
        <form>
        <div className="form-group">
            <input placeholder="Date" className="form-control" value={this.state.date} name="date" onChange={this.handleChange}></input>
            <input placeholder="Duration" className="form-control" value={this.state.duration} name="duration" onChange={this.handleChange}></input>
            <input placeholder="Activity" className="form-control" value={this.state.activity} name="activity" onChange={this.handleChange}></input>
            <input placeholder="Customer" className="form-control" value={this.state.customer} name="customer" onChange={this.handleChange}></input>
        </div>
            <button className="btn btn-danger" onClick={this.handleSubmit}>Save</button>
        </form>
        </SkyLight>
            <button className="btn btn-danger" onClick={() => this.simpleDialog.show()}>Edit</button>
        </div>
        );  
    }
    }
    

    export default EditTraining;