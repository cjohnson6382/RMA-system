const Checkbox = ReactBootstrap.Checkbox;
const FormGroup = ReactBootstrap.FormGroup;
const ControlLabel = ReactBootstrap.ControlLabel;
const Col = ReactBootstrap.Col;

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

window.CheckboxField = CheckboxField;
