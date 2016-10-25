const SERVER = "http://cjohnson.ignorelist.com/";

const Grid = ReactBootstrap.Grid;
const Form = ReactBootstrap.Form;
const FormGroup = ReactBootstrap.FormGroup;
const FormControl = ReactBootstrap.FormControl;
const Row = ReactBootstrap.Row;
const Col = ReactBootstrap.Col;
const Panel = ReactBootstrap.Panel;
const Table = ReactBootstrap.Table;
const Button = ReactBootstrap.Button;
const Modal = ReactBootstrap.Modal;

const Ticket = window.Ticket;

const TicketBox = React.createClass({
  getInitialState: function () {
      return { ticket: {}, showModal: false, refresh: false, search: "" };
  },
	selectTicket: function (evt) {
		evt.preventDefault();
		let ticketid = evt.currentTarget.attributes.value.value;
		let url = ticketid === 'new' ? 
			SERVER + "api/tickets/new" : 
			SERVER + "api/tickets/get/" + ticketid;

		fetch(url)
			.then((data) => { return data.text() })
			.then((data) => {
				this.setState({ ticket: JSON.parse(data) });
				this.openModal();
			});
	},
	openModal: function () {
		this.setState({ showModal: true });
	},
	closeModal: function () {
		this.setState({ showModal: false });
	},
	deleteTicket: function (evt) {
		evt.stopPropagation();
		let url = SERVER + "api/tickets/delete/" + evt.currentTarget.attributes.value.value;

		fetch(url)
			.then((data) => { return data.text() })
			.then((data) => { 
				console.log(data);
				this.setState({ refresh: true }); 
			});
	},
	submit: function () {
		let url = SERVER + 'api/tickets/update';
		let formdata = new FormData();
		formdata.append("ticket", JSON.stringify(this.state.ticket));

		fetch(url, { method: 'POST', body: formdata })
			.then((data) => { return data.text() })
			.then((stat) => { 
				this.closeModal();
				this.setState({ refresh: true });
			});
	},
	setProperty: function (setProp) {
		let data = this.state.ticket;
		data[setProp.name] = setProp.value;

		this.setState({ ticket: data });
	},
	ticketSearch: function (str) {
		this.setState({ search: str });
	},
  render: function () { 
    return (
			<Panel>
        <TicketList refresh={ this.state.refresh } source={ this.props.source } onclick={ this.selectTicket } deleteTicket={ this.deleteTicket } searchString={ this.state.search } />
				<ButtonGrid ticketSearch={ this.ticketSearch } selectTicket={ this.selectTicket } />
        <Modal bsSize="large" show={ this.state.showModal } >
          <Modal.Header>
            <Modal.Title>Ticket Properties</Modal.Title>
          </Modal.Header>
          <Modal.Body>
						<Ticket data={ this.state.ticket } setProp={ this.setProperty } submit={ this.submit } />
          </Modal.Body>
          <Modal.Footer>
						<Button onClick={ this.submit }>Save</Button>
            <Button onClick={ this.closeModal }>Cancel</Button>
          </Modal.Footer>
        </Modal>
			</Panel>
  	);
  }
});

const ButtonGrid = React.createClass({
	getInitialState: function () {
		return { input: "", search: "" }
	},
	keypress: function (evt) {
		console.log(evt.nativeEvent.keyCode, evt.charCode);
		if (evt.charCode === 13) {
			this.submitClick(evt)
		}
	},
	onChange: function (evt) {
		this.setState({ input: evt.target.value })
	},
	submitClick: function (evt) {
		console.log('in submitClick');

		this.props.ticketSearch(this.state.input);
	},
	render: function () {
		return (
			<Grid>
				<Row>
					<Col smOffset={6} sm={4}>
						<FormControl
							onChange={ this.onChange }
							type="text"
							value={ this.state.input }
							placeholder="Enter a Search Term"
							onKeyPress={ this.keypress }
						/>
					</Col>
					<Col sm={1}>
						<Button bsStyle="primary" onClick={ this.submitClick }>Submit</Button>
					</Col>
					<Col sm={1}>
						<Button bsStyle="primary" onClick={ this.props.selectTicket } value="new">New Ticket</Button>
					</Col>
				</Row>
			</Grid>
		)
	}
});




const TicketList = React.createClass({
  getInitialState: function () {
      return { tickets: [] };
  },
	componentDidMount: function () {
		this.refreshList();
	},
	componentWillReceiveProps: function (newProps) {
		console.log(this.props.searchString, newProps);
		this.refreshList();
		if (newProps.seachString && this.props.searchString !== newProps.seachString) this.ticketSearch(newProps.searchString);
	},
	refreshList: function (tickets) {
		let url = SERVER + "api/tickets/search/" + this.props.source;
    fetch(url)
      .then((tickets) => { return tickets.text() })
      .then((text) => {
				this.buildList(JSON.parse(text)); 
			});
	},
  buildList: function (tickets) {
    const ticketJst = tickets.map((ticket) => {
			let date = new Date(ticket.date).toISOString().substring(0, 10);
      return (
        <tr onClick={ this.props.onclick } key={ ticket.id } value={ ticket.id } >
          <td>{ ticket.id }</td>
          <td>{ ticket.vendor }</td>
          <td>{ date }</td>
	 	 		<td onClick={ this.props.deleteTicket } value={ ticket.id } >[X]</td>
        </tr>
      );
    });

    if (this.isMounted()) this.setState({ tickets: ticketJst });
  },
	ticketSearch: function (str) {
	
		console.log('ticketSearch', str);
		
		//	assert.notEqual(str, null);
		let url = SERVER + "api/tickets/search/" + str;

		fetch(url)
			.then((data) => { return data.text() })
			.then((data) => { this.buildList(JSON.parse(data))})
			.catch((err) => { console.log(err.stack) });
	},
  render: function () {
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th width="15%">Id</th>
            <th width="45%">Vendor</th>
            <th width="40%">Date</th>
						<th width="10%">Delete</th>
          </tr>
        </thead>
        <tbody>
          { this.state.tickets }
        </tbody>
      </Table>
    );
  }
});

ReactDOM.render(
    <TicketBox source="initial" />,
    document.getElementById('content')
);
