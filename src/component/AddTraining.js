import React, { Component } from 'react';
import SkyLight from 'react-skylight';

class AddTraining extends Component {
 constructor(props) {
     super(props);
     this.state = {date:'', duration:'', activity:'', customer:''};
 }

 handleChange = (event) => {
     this.setState({
         [event.target.name]: event.target.value
     })
}

handleSubmit = (event) => {
event.preventDefault();
const newTraining = { 
   date: this.state.date, 
    duration: this.state.duration, 
    activity: this.state.activity, 
    customer: this.state.customer};

    this.props.addTraining(newTraining);
    this.props.loadTrainings();
    this.simpleDialog.hide();
    }


  render() {
    return (
        <div>
        <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Add training">
                  Add a new training
        <form>
        <div className="form-group">
            <input placeholder="Date" className="form-control" name="date" onChange={this.handleChange}></input>
            <input placeholder="Duration" className="form-control" name="duration" onChange={this.handleChange}></input>
            <input placeholder="Activity" className="form-control" name="activity" onChange={this.handleChange}></input>
            <input placeholder="Customer id" className="form-control" name="customer" onChange={this.handleChange}></input>
        </div>
            <button className="btn btn-danger" onClick={this.handleSubmit}>Save</button>
        </form>
        </SkyLight>
            <button className="btn btn-danger mb-2 mt-2" onClick={() => this.simpleDialog.show()}>Add training</button>
        </div>
    
        );
        
    }
    }
    

    export default AddTraining;