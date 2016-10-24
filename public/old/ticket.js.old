const AutocompleteField = React.createClass({
  getInitialState: function () {
    return { results: [], input: '', autocompletes: [] };
  },
  componentDidMount: function () {
    fetch('http://cjohnson.ignorelist.com/' + this.props.field.options.rules.data + '.json')
      .then((resp) => { this.setState({ results: resp, input: this.props.field.value }) });
  },
  handleChange: function (evt) {
    this.setState({ input: evt.target.value });
    const formData = new FormData;
    formData.set('search', this.state.input)
    fetch('http://cjohnson.ignorelist.com/' + this.props.field.options.rules.data + '.json', { method: 'POST', body: formData })
      .then(function (respArray) {
		    const autocompletes = respArray.map((option) => {
		      return ( 
						<li onClick={ this.submit } value={ option } >
							{ option }
						</li> 
					);
		    });
        this.setState({ autocompletes: autocompletes });
      });
  },
  submit: function (evt) {
    this.setState({ input: evt.target.value, results: [] });
  },
  render: function () {
    return (
      <div>
        <span>{ this.props.field.options.name }: </span>
        <input type="text" placeholder={ this.props.field.options.name } onChange={ this.handleChange } value={ this.state.input } />
        <ul style="list-style-type: none">
          { autocompletes }
        </ul>
      </div>
    );
  }
});

const DropdownField = React.createClass({
  getInitialState: () => {
    return { input: '' }
  },
  componentDidLoad: function () {
    this.setState({ input: this.props.value });
  },
  select: function (evt) {
    this.setState({ input: evt.target.value });
  },
  render: function () {
    const menuitems = this.props.options.rules.data.map(function (item) {
      return ( <MenuItem eventKey={ item } onSelect={ this.select } >{ item }</MenuItem> );
    });
  
    return (
      <div>
        <span>{ this.props.options.name }: </span>
        <span><DropdownButton name={ this.props.options.name } >{ menuitems }</DropdownButton></span>
        <span><input type={ this.props.options.rules.type } placeholder={ this.props.options.name } value={ this.state.input } /></span>
      </div>
    );
  }
});

const InputField = React.createClass({
  getInitialState: () => {
    return { value: '' };
  },
  componentDidMount: function () {
    this.setState({ value: this.props.field.value });
  },
  render: function () {
    return (
      <div>
        <span>{ this.props.field.name }: </span>
        <input type={ this.props.field.options.rules.type } value={ this.state.value } />
      </div>
    );
  }
});


const TabsFieldlist = React.createClass({
  render: function () {
    const fields = this.props.fields.map((field, index) => {
      return ( <Tab eventKey={ index } title={ this.props.fields[index].options.name }>{ field }</Tab> );
    });

    return ( <Tabs defaultActiveKey={ 1 } id={ this.props.name } >{ fields }</Tabs>);
  }
});

const Fieldlist = React.createClass({
  render: function () {
    const fields = this.props.fields.map((field, index) => {
      return ( <div title={ this.props.fields[index].options.name }>{ field }</div> );
    });
    
    return ( <div id={ this.props.name } >{ fields }</div> );
  }
});


const CreateTemplate = React.createClass({
  getInitialState: () => {
    return {
      ticketTemplate: '',
      html: '',
    };
  },
  componentDidMount: function () {
    this.loadTemplateFromServer()
      .then(dispatcher(this.state.ticketTemplate))
			// dispatcher doesn't return anything, so you can't do another then!
      .then(
				(jst) => { this.setState({ html: jst }) }
			);
  },
  loadTemplateFromServer: function () {
		console.log(this.props.source);
    fetch(this.props.source)
			.then((data) => { return data.text() })
      .then((template) => { this.setState({ ticketTemplate: template }) });
  },

  dispatcher: function (templatejson) {
    if (templatejson.type !== 'field' || templatejson.type !== 'fieldlist') throw new Error('templatejson is not a field or a fieldlist: ', templatejson)
    return templatejson.type === 'field' ? this.renderField(templatejson) : this.renderFieldlist(templatejson);
  },
  renderField: function (field) {
    if (!field.type !== 'field') throw new Error('renderField received a parameter that is not a field: ', field);
    
    const rulesKey = {
      autocomplete: ( <AutocompleteField field={ field } /> ),
      dropdown: ( <DropdownField field={ field } /> )
    };

    return field.options.rules.type === 'complextext' ? rulesKey[field.options.rules.type] : ( <InputField field={ field } /> );
  },
  renderFieldlist: function (fieldlist) {
    if (!Array.isArray(fieldlist)) throw new Error('renderFieldlist got something that was not an array: ', fieldlist);
    
    const values = fieldlist.values.map((json) => {
      this.dispatcher(json);
    });
    
    Promise.all(values)
      .then((jstArray) => {
        return fieldlist.options.rules.type === 'tabs' ?
          ( <TabsFieldlist fields={ jstArray } name={ fieldlist.options.name } />) :
          ( <Fieldlist fields={ jstArray } name={ fieldlist.options.name } /> )
      });

  },
  render: function () {
    return ( <div>{ this.state.html }</div> );
  }
});

window.CreateTemplate = CreateTemplate;
