const FormGroup = ReactBootstrap.FormGroup;
const FormControl = ReactBootstrap.FormControl;
const ControlLabel = ReactBootstrap.ControlLabel;
const Col = ReactBootstrap.Col;

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
        <Col componentClass={ ControlLabel } sm={ 2 } >{ this.props.data.placeholder }:</Col>
        <Col sm={ 8 }>
          <FormControl.Static type={ this.props.data.type } placeholder={ this.props.data.placeholder }>{ this.state.value }</FormControl.Static>
        </Col>
			</FormGroup>
    );
  }
});

window.StaticInputField = StaticInputField
