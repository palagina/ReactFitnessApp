import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';


class Customer extends Component {
  constructor(props){
    super(props);
    this.state = {customers: [], search: ''}
}

  componentDidMount() {
    this.loadCustomers();
  }
  
  loadCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then((response) => response.json()) 
    .then((responseData) => {this.setState({customers: responseData.content }); 
    })   
  }


  onDelClick = (link) => {
    confirmAlert ({
      title: 'Confirm to submit',
      message: 'Are you sure to do it?',
      buttons: [
  {
         label: 'Yes',
            onClick:() => {
                fetch(link, {method: 'DELETE'})
               .then(res => this.loadCustomers())
               .catch(err => console.error(err))    
               toast.error("Customer deleted!", {
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


  addCustomer = (newCustomer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', 
    {   method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newCustomer)
    })
    .then(res => this.loadCustomers())
    .catch(err => console.error(err))
  }

  updateCustomer = (link, customer) => {
    fetch(link, { 
      method: 'PUT', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(customer)
    })
  .then(res => this.loadCustomers())
    .catch( err => console.error(err))
  }

  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.customers];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ customers: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.customers[cellInfo.index][cellInfo.column.id]
        }}                
      />
    );
  }  

  updateSearch = (event) => {
    this.setState({search: event.target.value});
    console.log(this.state.search)
    }

  render() {
      const{customers, search} = this.state;
      const filterCustomers = customers.filter(customer =>{
            return customer.lastname.toLowerCase().includes(search.toLowerCase())
        })

        if (customers.length===0) {
          return <h1>Loading...</h1>
        }
        else {
       
    return (
      <div className="App-body">
        <div className="container">
            <div className="row">
            
        <AddCustomer addCustomer={this.addCustomer} loadCustomers={this.loadCustomers} />
        
        <input className="form-control col-3 ml-4 mb-2 mt-2"
        type='search' 
        placeholder='search by lastname' 
        value={search} 
        onChange={this.updateSearch}/>
       
              </div>

      <ReactTable data={filterCustomers}
        columns={[
            {
              columns: [
                {
                 Header: "Id",
                 accessor: "links[0].href",
                 show: false
                },
                {
                  Header: "First name",
                  accessor: "firstname",
                },
                {
                  Header: "Last name",
                  accessor: "lastname",
                },
                {
                  Header: "Street address",
                  accessor: "streetaddress",
                },
                {
                  Header: "Postcode",
                  accessor: "postcode",
                },
                {
                  Header: "City",
                  accessor: "city",
                },
                {
                  Header: "Email",
                  accessor: "email",
                },
                {
                    Header: "Phone",
                    accessor: "phone",
                  },
                
                  {
                    id: 'button',
                    sortable: false,
                    filterable: false,
                    width: 100,
                    accessor: 'links[0].href',
                    Cell: ({row, value}) => (<EditCustomer updateCustomer={this.updateCustomer} link={value} customer={row}/>)
                  }, 

                  {
                    id: 'button',
                    sortable: false,
                    filterable: false,
                    width: 100,
                    accessor: "links[0].href",
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
                
                );
              }
            }    
            }

export default Customer;