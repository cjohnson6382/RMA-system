const FormGroup = ReactBootstrap.FormGroup;
const FormControl = ReactBootstrap.FormControl;
const ControlLabel = ReactBootstrap.ControlLabel;
const Col = ReactBootstrap.Col;

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
        <Col componentClass={ ControlLabel } sm={ 2 } >{ this.props.data.placeholder }:</Col>
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

window.InputField = InputField;
