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
const InputField = window.InputField;
const StaticInputField = window.StaticInputField;
const TextboxInputField = window.TextboxInputField;
const SelectField = window.SelectField;
const CheckboxField = window.CheckboxField;

const Ticket = React.createClass({
	getInitialState: function () {
		return { data: {} };
	},
	componentDidMount: function () {
		this.setState({ data: this.props.data });
	},
	childValue: function (newProp) {
		this.props.setProp(newProp);
	},
	render: function () {
		return (
			<Form horizontal onSubmit={ this.submit } autoComplete="off" >
				<StaticInputField data={ { name: "id", value: this.state.data["id"], placeholder: "Id", type: "text" } } />
				<StaticInputField data={ { name: "date", value: this.state.data["date"], placeholder: "Date", type: "date" } } />
				<SelectField  data={ { controlId: "typeSelect", name: "type", placeholder: "Type", onChange: this.childValue, value: this.state.data["type"], options: ["DOA - Cross Ship", "Warranty - Repair & Return", "Warranty - Cross Ship", "Non-Warranty - Repair & Return", "Other - See Notes"] } } />
       	<AutocompleteField data= { { placeholder: "Customer", name: "customer", value: this.state.data["customer"], onChange: this.childValue } }/>
				<CheckboxField data={ { name: "dropship", onChange: this.onChange, value: this.state.data["dropship"], placeholder: "Dropship" } }/>
			 	<Col sm={ 20 } ><Tabs defaultActiveKey={ 1 } id="tabs" >
			 	  <Tab eventKey={ 1 } title="Inventory">
						<br />
						<InputField data={ { controlId: 'itemnumberText', type: 'text', name: 'itemnumber', placeholder: 'Item Number', onChange: this.childValue, value: this.state.data["itemnumber"] } } />
			     	<AutocompleteField data= { { placeholder: "Vendor", name: "vendor", value: this.state.data["vendor"], onChange: this.childValue } }/>
						<InputField data={ { controlId: 'serialnumberText', type: 'text', name: 'serial', placeholder: 'Serial Number', onChange: this.childValue, value: this.state.data["serial"] } } />
						<InputField data={ { controlId: 'purchasedateText', type: 'date', name: 'purchasedate', placeholder: 'Purchase Date', onChange: this.childValue, value: this.state.data["purchasedate"] } } />
						<SelectField  data={ { controlId: "typeSelect", name: "type", placeholder: "Type", onChange: this.childValue, value: this.state.data["type"], options: ["DOA - Cross Ship", "Warranty - Repair & Return", "Warranty - Cross Ship", "Non-Warranty - Repair & Return", "Other - See Notes"] } } />
						<InputField data={ { controlId: 'invoiceText', type: 'text', name: 'invoice', placeholder: 'Invoice', onChange: this.childValue, value: this.state.data["invoice"] } } />
						<TextboxInputField data={ { name: "problem", placeholder: "Problem", value: this.state.data["problem"], onChange: this.childValue } } />
			 	  </Tab>
			 	  <Tab eventKey={ 2 } title="Customer">
			 	  </Tab>
			 	  <Tab eventKey={ 3 } title="Status">
						<br />
						<InputField data={ { controlId: 'itemnumberText', type: 'text', name: 'itemnumber', placeholder: 'Item Number', onChange: this.childValue, value: this.state.data["itemnumber"] } } />
						<CheckboxField data={ { name: "received", onChange: this.onChange, value: this.state.data["received"], placeholder: "Received" } }/>
						<InputField data={ { controlId: 'trackingText', type: 'text', name: 'tracking', placeholder: 'Tracking', onChange: this.childValue, value: this.state.data["tracking"] } } />
						<CheckboxField data={ { name: "eval", onChange: this.onChange, value: this.state.data["eval"], placeholder: "Eval" } }/>
						<CheckboxField data={ { name: "stock", onChange: this.onChange, value: this.state.data["stock"], placeholder: "Stock" } }/>
						<CheckboxField data={ { name: "close", onChange: this.onChange, value: this.state.data["close"], placeholder: "Close" } }/>
			 	  </Tab>
			 	  <Tab eventKey={ 4 } title="Other">
						<InputField data={ { controlId: 'startedbyText', type: 'text', name: 'startedby', placeholder: 'Started By', onChange: this.childValue, value: this.state.data["startedby"] } } />
						<InputField data={ { controlId: 'notesText', type: 'text', name: 'notes', placeholder: 'Notes', onChange: this.childValue, value: this.state.data["notes"] } } />
						<div>
							<h3>Hold Status</h3>
							<InputField data={ { controlId: 'itemnumberText', type: 'text', name: 'itemnumber', placeholder: 'Item Number', onChange: this.childValue, value: this.state.data["itemnumber"] } } />
							<InputField data={ { controlId: 'repairholdText', type: 'text', name: 'repairhold', placeholder: 'Repair Hold', onChange: this.childValue, value: this.state.data["repairhold"] } } />
							<InputField data={ { controlId: 'holddateDate', type: 'date', name: 'holddate', placeholder: 'Hold Date', onChange: this.childValue, value: this.state.data["holddate"] } } />
							<InputField data={ { controlId: 'vendorrmaText', type: 'text', name: 'vendorrma', placeholder: 'Vendor RMA', onChange: this.childValue, value: this.state.data["vendorrma"] } } />
						</div>
			 	  </Tab>
			 	</Tabs></Col>
			</Form>
		);
	}
});


window.Ticket = Ticket;
