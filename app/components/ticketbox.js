const SERVER = "http://cjohnson.ignorelist.com/";

const Col = ReactBootstrap.Col;
const Panel = ReactBootstrap.Panel;
const Button = ReactBootstrap.Button;
const Modal = ReactBootstrap.Modal;

const Ticket = window.Ticket;
const TicketList = window.TicketList;
const ButtonGrid = window.ButtonGrid;

const TicketBox = React.createClass({
  getInitialState: function () {
      return { 
				ticket: {}, 
				showModal: false, 
				refresh: false, 
				search: { search: '', before: '', after: ''} 
			};
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
	refreshed: function () {
		this.setState({ refresh: false });
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
	ticketSearch: function (obj) {
		this.setState({ search: obj, refresh: true });
	},
  render: function () {
    return (
			<Panel>
        <TicketList 
					refresh={ this.state.refresh } 
					refreshed={ this.refreshed } 
					onclick={ this.selectTicket } 
					deleteTicket={ this.deleteTicket } 
					searchObj={ this.state.search } 
					ticketSearch={ this.ticketSearch }
				/>
				<ButtonGrid ticketSearch={ this.ticketSearch } selectTicket={ this.selectTicket } />
        <Modal bsSize="large" backdrop={true} keyboard={true} show={ this.state.showModal } >
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

ReactDOM.render(
    <TicketBox />,
    document.getElementById('content')
);
