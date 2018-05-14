import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import AddTraining from './AddTraining';
import EditTraining from './EditTraining';
import moment from 'moment';

class Training extends Component {
  constructor(props){
    super(props);
    this.state = {trainings: [], search: ''}
}

  componentDidMount() {
    this.loadTrainings();
  }

  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then((response) => response.json()) 
    .then((responseData) => { 
      this.setState({ 
        trainings: responseData,
      }); 
    })   
  }


  updateSearch = (event) => {
    this.setState({search: event.target.value});
    console.log(this.state.search)
    }
  

  onDelClick = (link) => {
    confirmAlert ({
      title: 'Confirm to submit',
      message: 'Are you sure to do it?',
      buttons: [
  {
         label: 'Yes',
            onClick:() => {
                fetch("https://customerrest.herokuapp.com/api/trainings/" + link, {method: 'DELETE'})
               .then(res => this.loadTrainings())
               .catch(err => console.error(err))    
               toast.error("Training deleted!", {
                position: toast.POSITION.TOP_RIGHT
               });
         }
    },
      {
        label: 'No',
      }
      ]
      })
     }

  addTraining = (newTraining) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', 
    {   method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newTraining)
    })
    .then(res => this.loadTrainings())
    .catch(err => console.error(err))
  }

  updateTraining = (link, training) => {
    fetch("https://customerrest.herokuapp.com/api/trainings/" + link, { 
      method: 'PUT', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(training)
    })
  .then(res => this.loadTrainings())
    .catch( err => console.error(err))
  }

  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.trainings];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ trainings: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.trainings[cellInfo.index][cellInfo.column.id]
        }}                
      />
    );
  }  

  render() {
    const{trainings, search} = this.state;
      const filterTrainings = trainings.filter(training =>{
            return training.activity.toLowerCase().includes(search.toLowerCase())
        })

        if (trainings.length===0) {
          return <h1>Loading...</h1>
        }
        else {

    return (
      <div className="App-body">
         <div className="container">
           <div className="row">

        <AddTraining  addTraining={this.addTraining} loadTrainings={this.loadTrainings} />

        <input className="form-control col-3 ml-4 mb-2 mt-2"
        type="search" 
        placeholder='search by activity'
        value={search} 
        onChange={this.updateSearch} />
        </div>

      <ReactTable data={filterTrainings}
        columns={[
            {
              columns: [
                {
                  Header: "Id",
                  accessor: "id",
                },
                {
                  Header: "Date",
                //accessor: moment("date").format("MMM Do YYYY"),
                  accessor: "date"
                },
                {
                  Header: "Duration",
                  accessor: "duration",
                },
                {
                  Header: "Activity",
                  accessor: "activity",
                },
                {
                  Header: "Customer",
                  accessor: "customer.id",
                },
                
                  {
                    id: 'button',
                    sortable: false,
                    filterable: false,
                    width: 100,
                    accessor: `id`,
                    Cell: ({row, value}) => (<EditTraining updateTraining={this.updateTraining} link={value} training={row}/>)
                  }, 

                  {
                    id: 'button',
                    sortable: false,
                    filterable: false,
                    width: 100,
                    accessor: `id`,
                    Cell: ({value}) => (<button className="btn btn-danger" 
                    onClick={()=>{this.onDelClick(value)}}>Delete</button>)
                  }   
                  
              ]
            }
          ]}
          filtertable
              defaultPageSize={10}
              className="-striped -highlight"
            />
           
            <ToastContainer autoClose={1000} />
          </div>
          </div>
                
                );}
            }    
            }

export default Training;