const Button = ReactBootstrap.Button;
const Tabs = ReactBootstrap.Tabs;
const Tab = ReactBootstrap.Tab;
const MenuItem = ReactBootstrap.MenuItem;
const Checkbox = ReactBootstrap.Checkbox;
const FormGroup = ReactBootstrap.FormGroup;
const FormControl = ReactBootstrap.FormControl;
const ControlLabel = ReactBootstrap.ControlLabel;
const Form = ReactBootstrap.Form;
const Col = ReactBootstrap.Col;


const AutocompleteField = window.AutocompleteField;
const DropdownField = window.DropdownField;
const InputField = window.InputField;

const Ticket = React.createClass({
	getInitialState: function () {
		return { data: {} };
	},
	componentDidMount: function () {
		console.log('this.props.data: ', this.props.data);
		this.setState({ data: this.props.data });
		console.log('setting this.state.data: ', this.state.data);
	},
	submit: function () {
		this.props.submit(this.state.data);
	},
	childValue: function (name, value) {
		let data = this.state.data;
		data[name] = value;
		this.setState({ data: data });
	},
	render: function () {
		return (
			<Form horizontal onSubmit={ this.submit } >
		 	  <FormGroup>
		 	    <Col componentClass={ ControlLabel } sm={ 1 } >Id:</Col>
		 	    <Col sm={ 8 } ><FormControl.Static type="text" placeholder="Id" onChange={ this.childValue }>{ this.state.data["id"] }</FormControl.Static></Col>
		 	  </FormGroup>
		 	  <FormGroup>
		 	    <Col componentClass={ ControlLabel } sm={ 1 } >Date:</Col>
		 	    <Col sm={ 8 } ><FormControl.Static type="date" placeholder="Date" onChange={ this.childValue }>{ this.state.data["date"] }</FormControl.Static></Col>
		 	  </FormGroup>
	 	    <FormGroup controlId="typeSelect">
          <Col componentClass={ ControlLabel } sm={ 1 } >Type:</Col>
          <Col sm={ 8 } ><FormControl componentClass="select" placeholder="Type" onChange={ this.childValue }>{ this.state.data["type"] }
            <option value="doacrossship">DOA - Cross Ship</option>
            <option value="doarepairreturn">DOA - Repair & Return</option>
            <option value="nonwarrantyrepairreturn">Non-Warranty - Repair & Return</option>
            <option value="otherseenotes">Other - See Notes</option>
            <option value="warrantycrossship">Warranty - Cross Ship</option>
          </FormControl></Col>
        </FormGroup>
       	<FormGroup> 
		 	  	<Col smOffset={ 1 } ><AutocompleteField name="Customer" value={ this.state.data["customer"] } data="customerdb" setvalue={ this.childValue } /></Col>
				</FormGroup>
 		 	  <FormGroup>
		 	    <Col smOffset={ 1 } ><Checkbox value={ this.state.data["date"] } onChange={ this.childValue }>Drop Ship</Checkbox></Col>
		 	  </FormGroup>
			 	<Col sm={ 20 } ><Tabs defaultActiveKey={ 1 } id="tabs" >
			 	  <Tab eventKey={ 1 } title="Inventory">
						<br />
						<Col smOffset={ 1 } >
   			 	  	<FormGroup>
  			 	  	  <Col componentClass="ControlLabel" sm={ 2 } >Item Number:</Col>
  			 	  	  <Col sm={ 8 } ><FormControl type="text" value={ this.state.data["itemnumber"] } placeholder="Item Number" onChange={ this.childValue } /></Col>
  			 	  	</FormGroup>
							<FormGroup>
			 	    		<Col smOffset={ 1 } ><AutocompleteField name="Vendor" value={ this.state.data["vendor"] } data="vendordb" setvalue={ this.childValue } /></Col>
  			 	  	</FormGroup>
   			 	  	<FormGroup>
  			 	  	  <Col componentClass="ControlLabel" sm={ 2 } >Serial Number:</Col>
  			 	  	  <Col sm={ 8 } ><FormControl type="text" value={ this.state.data["serial"] } placeholder="Serial Number" onChange={ this.childValue } /></Col>
  			 	  	</FormGroup>
   			 	  	<FormGroup>
  			 	  	  <Col componentClass="ControlLabel" sm={ 2 } >Purchase Date:</Col>
  			 	  	  <Col sm={ 8 } ><FormControl type="date" value={ this.state.data["purchasedate"] } placeholder="Purchase Date" onChange={ this.childValue } /></Col>
  			 	  	</FormGroup>
  	 	      	<FormGroup controlId="typeSelect">
            	  <Col componentClass="ControlLabel" sm={ 2 } >Type:</Col>
            	  <Col sm={ 8 } ><FormControl componentClass="select" value={ this.state.data["type"] } placeholder="Type" onChange={ this.childValue }>
            	    <option value="doacrossship">DOA - Cross Ship</option>
            	    <option value="doarepairreturn">DOA - Repair & Return</option>
            	    <option value="nonwarrantyrepairreturn">Non-Warranty - Repair & Return</option>
            	    <option value="otherseenotes">Other - See Notes</option>
            	    <option value="warrantycrossship">Warranty - Cross Ship</option>
            	  </FormControl></Col>
            	</FormGroup>
   			 	  	<FormGroup>
  			 	  	  <Col componentClass="ControlLabel" sm={ 2 } >Invoice:</Col>
  			 	  	  <Col sm={ 8 } ><FormControl type="text" value={ this.state.data["invoice"] } placeholder="Invoice" onChange={ this.childValue } /></Col>
  			 	  	</FormGroup>
		 	      	<FormGroup controlId="problemTextarea">
            	  <Col componentClass="ControlLabel" sm={ 2 } >Problem:</Col>
            	  <Col sm={ 8 } ><FormControl componentClass="textarea" value={ this.state.data["problem"] } placeholder="Problem" onChange={ this.childValue } /></Col>
            	</FormGroup>
						</Col>
			 	  </Tab>
			 	  <Tab eventKey={ 2 } title="Customer">
			 	  </Tab>
			 	  <Tab eventKey={ 3 } title="Status">
			 	    <InputField name="itemnumber" type="text" value={ this.state.data["itemnumber"] } setvalue={ this.childValue } />
			 	    <InputField name="received" type="checkbox" value={ this.state.data["received"] } setvalue={ this.childValue } />
			 	    <InputField name="tracking" type="text" value={ this.state.data["tracking"] } setvalue={ this.childValue } />
			 	    <InputField name="eval" type="checkbox" value={ this.state.data["eval"] } setvalue={ this.childValue } />
			 	    <InputField name="stock" type="checkbox" value={ this.state.data["stock"] } setvalue={ this.childValue } />
			 	    <InputField name="close" type="checkbox" value={ this.state.data["close"] } setvalue={ this.childValue } />
			 	  </Tab>
			 	  <Tab eventKey={ 4 } title="Other">
			 	    <InputField name="startedby" type="text" value={ this.state.data["startedby"] } setvalue={ this.childValue } />
			 	    <InputField name="notes" type="text" value={ this.state.data["notes"] } setvalue={ this.childValue } />
			 	    <div name="holdstatus">
			 	      <h2>Hold Status</h2>
			 	      <InputField name="itemnumber" type="text" value={ this.state.data["itemnumber"] } setvalue={ this.childValue } />
			 	      <InputField name="repairhold" type="text" value={ this.state.data["repairhold"] } setvalue={ this.childValue } />
			 	      <InputField name="holddate" type="date" value={ this.state.data["holddate"] } setvalue={ this.childValue } />
			 	      <InputField name="vendorrma" type="text" value={ this.state.data["vendorrma"] } setvalue={ this.childValue } />
			 	    </div>
			 	  </Tab>
			 	</Tabs></Col>
				<Col smOffset={ 2 } ><Button bsStyle="primary" onClick={ this.submit }>Submit</Button></Col>
			</Form>
		);
	}
});

window.Ticket = Ticket;
