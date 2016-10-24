const FormGroup = ReactBootstrap.FormGroup;
const FormControl = ReactBootstrap.FormControl;
const ControlLabel = ReactBootstrap.ControlLabel;
const Form = ReactBootstrap.Form;
const Col = ReactBootstrap.Col;

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

window.SelectField = SelectField;
