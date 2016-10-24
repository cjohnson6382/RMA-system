const DropdownButton = ReactBootstrap.DropdownButton;
const Button = ReactBootstrap.Button;
const Tabs = ReactBootstrap.Tabs;
const Tab = ReactBootstrap.Tab;
const MenuItem = ReactBootstrap.MenuItem;
const Checkbox = ReactBootstrap.Checkbox;
const FormGroup = ReactBootstrap.FormGroup;
const FormControl = ReactBootstrap.FormControl;
const ControlLabel = ReactBootstrap.ControlLabel;
const Form = ReactBootstrap.Form;
const Col = ReactBootstrap.Col

const SERVER = "http://cjohnson.ignorelist.com/";

const CheckboxField = React.createClass({
  getInitialState: function () {
    return { value: this.props.data.value };
  },
  onChange: function (evt) {
    let name = evt.currentTarget.attributes.name.value;
    let value = evt.currentTarget.value;

    this.props.data.onChange({ name: name, value: value});
  },
  render: function () {
    return (
      <FormGroup controlId={ this.props.data.name + "Checkbox" }>
        <Col smOffset={ 1 } >
          <Checkbox name={ this.props.data.name } value={ this.state.value } onChange={ this.props.data.onChange }>{ this.props.data.placeholder }</Checkbox>
        </Col>
      </FormGroup>
    );
  }
});

const SelectField = React.createClass({
  getInitialState: function () {
    return { value: this.props.data.value }
  },
  onChange: function (evt) {
    //  console.log(evt.currentTarget, evt.nativeEvent);
    let name = evt.currentTarget.attributes.name.value;
    let value = evt.currentTarget.value;

    this.props.data.onChange({ name: name, value: value});
  },
  render: function () {
    let options = this.props.data.options.map((option, index) => {
      return ( <option key={ index } name={ this.props.data.name }>{ option }</option> )
    });

    return (
      <FormGroup controlId={ this.props.data.controlId }>
        <Col componentClass={ ControlLabel } sm={ 1 } >{ this.props.data.placeholder }:</Col>
        <Col sm={ 8 } >
          <FormControl
            componentClass="select"
            placeholder={ this.props.data.placeholder}
            name={ this.props.data.name }
            onChange={ this.onChange }
            value={ this.state.value }
          > 
            { options }
          </FormControl>
        </Col>
      </FormGroup>
    );
  }
});

const StaticInputField = React.createClass({
	getInitialState: function () {
		return { value: '' };
	},
	componentWillReceiveProps: function () {
		if (this.props.data.type === "date" && this.props.data.value) {
			let date = new Date(this.props.data.value).toISOString().substring(0, 10);
			this.setState({ value: date });
		}	else {
			this.setState({ value: this.props.data.value })
		}
	},
  render: function () {
    return (
      <FormGroup controlId={ this.props.data.name + "Static" } >
        <Col componentClass="ControlLabel" sm={ 2 } >{ this.props.data.placeholder }:</Col>
        <Col sm={ 8 }>
          <FormControl.Static type={ this.props.data.type } placeholder={ this.props.data.placeholder }>{ this.state.value }</FormControl.Static>
        </Col>
			</FormGroup>
    );
  }
});

const TextboxInputField = React.createClass({
  getInitialState: function () {
    return { value: this.props.data.value }
  },
  onChange: function (evt) {
    let name = evt.currentTarget.attributes.name.value;
    let value = evt.currentTarget.value;

    this.props.data.onChange({ name: name, value: value});
  },
  render: function () {
    return (
      <FormGroup controlId={ this.props.data.name + "Textbox" } >
        <Col componentClass="ControlLabel" sm={ 2 }>{ this.props.data.placeholder }:</Col>
        <Col sm={ 8 } >
          <FormControl name={ this.props.data.name } componentClass="textarea" placeholder={ this.props.data.placeholder } onChange={ this.onChange } value={ this.state.value } />
        </Col>
      </FormGroup>
    );
  }
});
const InputField = React.createClass({
  getInitialState: function () {
   	return { value: '' }
  },
	componentDidMount: function () {
		this.setState({ value: this.props.data.value });
	},
	componentWillReceiveProps: function (newProps) {
		if (this.props.data.type === 'date' && newProps.data.value) {
			let date = new Date(newProps.data.value).toISOString().substring(0, 10);
			this.setState({ value: date });
		} else {
    	this.setState({ value: newProps.data.value });
		}
	},
  onChange: function (evt) {
    let name = evt.currentTarget.attributes.name.value;
    let value = evt.currentTarget.value;

    this.props.data.onChange({ name: name, value: value});
  },
  render: function () {
    return (
      <FormGroup controlId={ this.props.data.controlId }>
        <Col componentClass="ControlLabel" sm={ 2 } >{ this.props.data.placeholder }:</Col>
        <Col sm={ 8 } >
          <FormControl
            type={ this.props.data.type }
            name={ this.props.data.name }
            placeholder={ this.props.data.placeholder }
            onChange={ this.onChange }
            value={ this.state.value }
          />
        </Col>
      </FormGroup>
    );
  }
});

const AutocompleteField = React.createClass({
  getInitialState: function () {
    return {
      results: [],
      input: '',
      autocompletes: []
    };
  },
  componentDidMount: function () {
		this.setState({ input: this.props.data.value });
  },
	componentWillReceiveProps: function (newProps) {
		this.setState({ input: newProps.data.value });
	},
	checkEmpty: function (evt) {
		//	this function needs to modify the displayed autocompletes by the user's input if the input does not require a server hit
		//		can check whether the new input contains the old input; if so, no server hit is required
		//		the new input is a subset of the old input and a filter can return just the stuff that matches the new input

		evt.preventDefault();
		let curr = evt.nativeEvent.target.value;

		let prevl = this.state.input ? this.state.input.length : 0;
		let currl = curr.length || 0;

		//	don't setState directly for the input value; should be going up to the ticketbox and then propagating back down
    //	this.setState({ input: evt.nativeEvent.target.value });



		//	this might not work*****************************************		
		let name = evt.currentTarget.attributes.name.value;
		let value = evt.currentTarget.value
		this.submit({ name: name, value: value });

		if (currl > prevl && curr !== '') {
			this.handleChange(evt)
		} else {
			this.setState({ autocompletes: [] });
		}
	},
  handleChange: function (evt) {
    const formData = new FormData;
		console.log(this.props.data, evt.nativeEvent.target.value);
		//	this function only fires if there is a change that requires hitting the server
		//		the autocomplete results displayed should chnage when the user changes the input field, regardless of whether there is a server request
    fetch(SERVER + "data/" + this.props.data.name + "/" + evt.nativeEvent.target.value)
      .then((resp) => { 
				return resp.text() 			
			})
      .then((respArray) => {
		    const autocompletes = JSON.parse(respArray).map((option, index) => {
		      return ( <li key={ index } name={ this.props.data.name } onClick={ this.selectAutocomplete } value={ option }>{ option }</li> )
		    });
        this.setState({ autocompletes: autocompletes });
      });
  },
  handle: function (evt) {
		if (evt.nativeEvent.keyCode == 13) {
			this.setState({ input: evt.currentTarget.value});

			let name = evt.currentTarget.attributes.name.value;
			let value = evt.currentTarget.value
			this.submit({ name: name, value: value });
		}
  },
	selectAutocomplete: function (evt) {
		evt.preventDefault();
		let name = evt.currentTarget.attributes.name.value;
		let value = evt.currentTarget.innerText;

		this.submit({ name: name, value: value });
	},
  submit: function (newProp) {
    this.setState({ input: newProp.value, autocompletes: [] });
		this.props.data.onChange(newProp);
  },
  render: function () {
    return (
			<FormGroup controlId={ this.props.data.name + "Autocomplete" }>
				<Col componentClass="ControlLabel" sm={ 2 } >{ this.props.data.placeholder}:</Col>	
	      <Col sm={ 8 }><div>
	        <input
						name={ this.props.data.name }
						type="text" 
						placeholder={ this.props.data.placeholder } 
						onKeyPress={ this.handle }
						onChange={ this.checkEmpty }
						value={ this.state.input } 
					/>
	        <ul style={{ listStyleType: "none" }} >
	          { this.state.autocompletes }
	        </ul>
	      </div></Col>
			</FormGroup>
    );
  }
});

window.AutocompleteField = AutocompleteField;
window.InputField  = InputField;
window.StaticInputField = StaticInputField;
window.TextboxInputField = TextboxInputField;
window.SelectField = SelectField;
window.CheckboxField = CheckboxField;

