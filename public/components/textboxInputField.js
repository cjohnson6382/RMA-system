const FormGroup = ReactBootstrap.FormGroup;
const FormControl = ReactBootstrap.FormControl;
const ControlLabel = ReactBootstrap.ControlLabel;
const Col = ReactBootstrap.Col;

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
        <Col componentClass={ ControlLabel } sm={ 2 }>{ this.props.data.placeholder }:</Col>
        <Col sm={ 8 } >
          <FormControl name={ this.props.data.name } componentClass="textarea" placeholder={ this.props.data.placeholder } onChange={ this.onChange } value={ this.state.value } />
        </Col>
      </FormGroup>
    );
  }
});

window.TextboxInputField = TextboxInputField;
