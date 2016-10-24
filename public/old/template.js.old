// <!-- react bootstrap has a tabs feature that I could use with the inventory/customer/status/whatever tabs -->
//		dropdown menus will work for text fields that have a limited number of options
//		use the listgroup stuff to organize the page




I want to programmatically generate the template form so that if I add or remove fields from the template object, I don't have to change the rendering rules
  - this is like, what react does.... it should be pretty easy to do
  - make an obect that has the value and rendering instructions for each field
    * the value will be blank at generation, the rendering instructions ('type') will be part of the template
      - do I need a further type that identifies what the 'value' should contain?
      - validation should happen on the client side, so no

//  template item hierarchy
* ticket-template-data (value === array of objects)
  * fieldlist (value === array of fields)
    * field (value === container for renderable content)
  * tabs (value === array of fields/fieldlists)
    * tab (value === field/fieldlist)
      * [content-box]
  * field (value = container for renderable content)



  const AutocompleteField = React.createClass({
    getInitialState: () => {
      return { results: [], input: '' };
    },
    componentDidMount: () => {
      fetch(this.props.resource)
        .then((resp) => { this.setState({ results: resp }) });
    },
    handleChange: (evt) => {
      this.setState({ input: evt.target.value });
      const formData = new FormData;
      formData.set('search', this.state.input)
      fetch(this.props.resource, { method: 'POST', body: formData })
        .then(function (respArray) {
          this.setState({ autocompletes: respArray });
        });
    },
    submit: (evt) => {
      this.setState( input: evt.target.value, results: [] );
    },
    render: () => {
      const fields = () => {
        const autocompleteFields = this.state.autocompletes.map((option) => {
          return (
            <div onClick={ this.submit } >{ option }</div>
          );
        });

      return (
        <div>
          <span>{ this.props.options.name }: </span>
          <input type="text" placeholder={ this.props.options.name } onChange={ this.handleChange } value: { this.state.input } />
          <ul style:"list-style-type: none">
            { this.state.autocompletes }
          </ul>
        </div>
      );
    }
  });

  const DropdownField = React.createClass({
    getInitialState: () => {
      return { input: '' }
    },
    select: (evt) => {
      this.setState({ input: evt.target.value });
    },
    render: () => {
      const menuitems = this.props.options.rules.data.map(function (item) {
        return (
          <MenuItem eventKey={ item } onSelect={ } >{ item }</MenuItem>
        );
      });
    
      return (
        <div>
          <span>{ this.props.options.name }: </span>
          <span>
            <DropdownButton name={ this.props.options.name } >
              { menuitems }
            </DropdownButton>
          </span>
          <span><input type={ this.props.options.rules.type } placeholder={ this.props.options.name } value={ this.state.input } /></span>
        </div>
      );
    }
  });

  const InputField = React.createClass({
    render: () => {
      return (
        <div>
          <span>{ this.props.field.name }: </span>
          <input type={ this.props.field.options.type } />
        </div>
      );
    }
  });

  const CreateTemplate = React.createClass({
    getInitialState:() => {
      return {
        ticketTemplate: '',
        html: '',
      }
    },
    componentDidMount:() => {
      this.loadTemplateFromServer()
        .then(generateTemplateHTML);
    },
    generateTemplateHTML: (templatecode) => {
      const html = templatecode.reduce((previous, item) => {
        if (item.type === 'field') {
          return previous + this.handleField(item);
        } else if (item.type === 'fieldlist') {
          return previous + this.handleFieldlist(item);
        }
      });

      this.setState({ html: html });
    },
    loadTemplateFromServer: () => {
      fetch(this.props.source)
        .then(function (template) {
          this.setState({ ticketTemplate: template });
        }.bind(this));
    },
    templateCodeToHtml: (field) => {
      const rulesKey = {
        autocomplete: ( <AutocompleteField name={ this.props.options.name } source={ 'http://cjohnson.ignorelist.com' + this.props.options.rules.data } /> )
        dropdown: ( <DropdownField options={ this.props.options } ></DropdownField> )
      };

      return field.options.type === 'complextext' ? rulesKey[field.options.rules.type] : ( <InputField field={ field } />)
    },
    handleField: (field) => {
      const deferredField = new Promise (function (resolve, reject) { resolve(this.templateCodeToHtml(field)) };
      deferredField
        .then((html) => { return html });
    },
    handleFieldlist: function (fieldlist) {
      const deferredArray = fieldlist.map(function (field) {
        return new Promise(function (resolve, reject) {
          if (field.type === 'field') {
            resolve(generateTemplateHTML(field));
          } else if (field.type === 'fieldlist') {
            resolve(handleFieldlist(field));
          }
        })
      });

      Promise.all(deferredArray)
        .then(function (renderedFieldsArray) {




            //  do I need to return something else for a tabs fieldlist?
            return ( <div name={ fieldlist.name } >{ renderedFieldsArray.join('') }</div> );
        });
    },
    render: function () {
      return ( { this.state.html } );
    }
  });


ticket-template-data = [
  {
    type: 'field',
    options: { name: 'container' }
    value: {
      type: 'fieldlist',
      options: { name: 'rmaProperties' },
      value: [
        {   //  populate autogen fields on the server and return them to the client?
          type: 'field',
          options: { name: id, rules: { type: 'complexdate', format: 'autogentext', generator: /* createid */ } },
          value: ''
        },
        {
          type: 'field',
          options: { name: 'date', rules: { type: 'complexdate', format: 'autogendate', generator: /* createticketdate */ } },
          value: ''
        },
        {
          type: 'field',
          options: { name: 'type', rules: { type: 'complextext', format: 'dropdown', data: [] } },
          value: ''
        },
        {
          type: 'field',
          options: { name: 'customer', rules: { type: 'complextext', format: 'autocomplete', data: 'customerdb' } },
          value: ''
        },
        {
          type: 'field',
          options: { name: 'dropship', rules: { type: 'checkbox' } },
          value: false
        },
      ]
    }
  },
  {
    type: 'fieldlist',
    options: { name: 'tabs', list-type: 'tabs' },
    value: [
      {
        type: 'fieldlist',
        options: { name: 'inventory' },
        value: [
          {
            type: 'field',
            options: { name: 'itemnumber', rules: { type: 'text' } },
            value: ''
          },
          {
            type: 'field',
            options: { name: 'vendor', rules: { type: 'complextext', format: 'autocomplete', data: 'vendordb' } },
            value: ''
          },
          { //  autocomplete? is this unique to the item, product line, or other?
            type: 'field',
            options: { name: 'serial', rules: { type: 'text' } },
            value: ''
          },
          { // autocomplete? serial number should get inventory item for this, which will fill other fields
            type: 'field',
            options: { name: 'purchasedate', rules: { type: 'date' } },
            value: ''
          },
          {
            type: 'field',
            options: { name: 'type', rules: { type: 'dropdowntext', data: [
                  'doa - cross ship',
                  'doa - repair & return',
                  'non-warranty - repair & return',
                  'other - see notes',
                  'return - credit',
                  'warranty - cross ship'
                ]
              }
            },
            value: ''
          },
          {
            type: 'field',
            options: { name: 'invoice', rules: { type: 'checkbox' } },
            value: false
          },
          {
            type: 'field',
            options: { name: 'problem', rules: { type: 'textbox' } },
            value: ''
          },
        ]
      },
      {
        type: 'fieldlist',
        options: { name: 'customer' },
        value: ''
      },
      {
        type: 'fieldlist',
        options: { name: 'status' },
        value: [
          {
            type: 'field',
            options: { name: 'itemnumber', rules: { type: 'text' } },
            value: ''
          },
          {
            type: 'field',
            options: { name: 'received', rules: { type: 'checkbox' } },
            value: ''
          },
          {
            type: 'field',
            options: { name: 'tracking', rules: { type: 'text' } },
            value: ''
          },
          {
            type: 'field',
            options: { name: 'eval', rules: { type: 'checkbox' } },
            value: ''
          },
          {
            type: 'field',
            options: { name: 'stock', rules: { type: 'checkbox' } },
            value: ''
          },
          {
            type: 'field',
            options: { name: 'close', rules: { type: 'checkbox' } },
            value: ''
          }
        ]
      },
      {
        type: 'fieldlist',
        options: { name: 'other' },
        value: [
          {
            type: 'field',
            options: { name: 'startedby', rules: { type: 'text' } },
            value: ''
          },
          {
            type: 'field',
            options: { name: 'notes', rules: { type: 'textbox' } },
            value: ''
          },
          {
            type: 'fieldlist',
            options: { name: 'holdstatus' },
            value: [
              {
                type: 'field',
                options: { name: 'itemnumber', rules: { type: 'text' } }
                value: ''
              ),
              {
                type: 'field',
                options: { name: 'repairhold', rules: { type: 'text' } },
                value: ''
              },
              {
                type: 'field',
                options: { name: 'holddate', rules: { type: 'date' } },
                value: ''
              },
              {
                type: 'field',
                options: { name: 'vendorrma', rules: { type: 'text' } },
                value: ''
              }
            ]
          }
        ]
      }
    ]
  }
];


<section name="rma-properties">
  <div id="id" type="int"></div> <!-- for create, automatically set to the next sequential id available in the DB -->
  <div id="date" type="date"></div> <!-- for create, automatically set to the current date; immutable afterward -->
  <div id="type" type="text"></div> <!-- dropdown menu -->
  <div id="customer" type="text"></div> <!-- needs to be a search bar that tries to autofill from DB results -->
  <div id="dropship" type="checkbox"></div>
</section>

<section name="inventory">
  <div id="itemnumber" type="int"></div> ***
  <div id="vendor" type="text"></div> <!-- search bar autofill from DB --> ***
  <div id="serial" type="int"></div> ***
  <div id="purchasedate" type="date"></div> ***
  <div id="type" type="text">
    <span>doa - cross ship</span
    <span>doa - repair & return</span
    <span>non-warranty - repair & return</span
    <span>other - see notes</span
    <span>return - credit</span
    <span>warranty - cross ship</span
    <span>warranty - repair & return</span
  </div>
  <div id="invoice" type="id"></div> <!-- should hook into the invoicing system to auto-populate a bunch of this stuff (*** fields) -->
  <div id="problem" type="text"></div> <!-- a textbox for typing the problem into -->
</section>

<section name="customer">
</section>

<section name="status">
  <div id="itemnumber" type="int"></div>
  <div id="received" type="date"></div>
  <div id="tracking" type=""></div>
  <div id="eval" type=""></div>
  <div id="stock" type=""></div>
  <div id="close" type=""></div>
</section>

<section name="other">
  <div id="startedby" type="text"></div>
  <div id="notes" type="textbox"></div>
  <div id="holdstatus" type="container">
    <span id="itemnumber" type="int"></span>
    <span id="repairhold" type="checkbox"></span>
    <span id="holddate" type="date"></span>
    <span id="vendorrma" type="int"></span>
  </div>
</section>

<section name="sidebar">
  <div id="request" type="button"></div>
  <div id="issue" type="button"></div>
  <div id="receive" type="button"></div>
  <div id="cancel" type="button"></div>
  <div id="next" type="button"></div>
</section>
