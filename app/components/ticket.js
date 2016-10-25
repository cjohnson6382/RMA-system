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

const TabInventory = window.TabInventory;
const TabCustomer = window.TabCustomer;
const TabStatus = window.TabStatus;
const TabOther = window.TabOther;

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
          { TabInventory.bind(this)() }
          { TabCustomer.bind(this)() }
          { TabStatus.bind(this)() }
          { TabOther.bind(this)() }
			 	</Tabs></Col>
			</Form>
		);
	}
});


window.Ticket = Ticket;
