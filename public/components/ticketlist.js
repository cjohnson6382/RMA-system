const SERVER = "http://cjohnson.ignorelist.com/";

const Table = ReactBootstrap.Table;

const TicketList = React.createClass({
  getInitialState: function () {
      return { tickets: [] };
  },
	componentDidMount: function () {
		this.ticketSearch(this.props.searchObj);
	},
	componentWillReceiveProps: function (newProps) {
		let n = JSON.stringify(newProps.searchObj);
		let o = JSON.stringify(this.props.searchObj);
		if (n !== o) { 
			this.ticketSearch(newProps.searchObj) 
		} else if (newProps.refresh) {
			this.ticketSearch(this.props.searchObj);
		}
	},
  buildList: function (tickets) {
		console.log('buildlist', tickets);
    const ticketJst = tickets.map((ticket) => {
			let date = new Date(ticket.date).toISOString().substring(0, 10);
      return (
        <tr onClick={ this.props.onclick } key={ ticket.id } value={ ticket.id } >
          <td>{ ticket.id }</td>
          <td>{ ticket.vendor }</td>
          <td>{ ticket.customer }</td>
          <td>{ ticket.invoice }</td>
          <td>{ ticket.serial }</td>
          <td>{ date }</td>
	 	 		<td onClick={ this.props.deleteTicket } value={ ticket.id } >[X]</td>
        </tr>
      );
    });

    if (this.isMounted()) this.setState({ tickets: ticketJst });
  },
	ticketSearch: function (obj) {
		this.props.refreshed();
		console.log('ticketSearch', obj);
		
		//	assert.notEqual(str, null);
		let url = SERVER + "api/tickets/search/" + JSON.stringify(obj);

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
            <th width="5%">Id</th>
            <th width="15%">Vendor</th>
            <th width="15%">Customer</th>
            <th width="15%">Invoice</th>
            <th width="15%">Serial</th>
            <th width="15%">Date</th>
						<th width="5%">Delete</th>
          </tr>
        </thead>
        <tbody>
          { this.state.tickets }
        </tbody>
      </Table>
    );
  }
});

window.TicketList = TicketList;
