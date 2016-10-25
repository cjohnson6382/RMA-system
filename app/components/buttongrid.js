const ControlLabel = ReactBootstrap.ControlLabel;
const Grid = ReactBootstrap.Grid;
const FormControl = ReactBootstrap.FormControl;
const Row = ReactBootstrap.Row;
const Col = ReactBootstrap.Col;
const Button = ReactBootstrap.Button;

const ButtonGrid = React.createClass({
	getInitialState: function () {
		return { input: "", search: "", before: "", after: "" }
	},
	keypress: function (evt) {
		if (evt.charCode === 13) {
			this.submitClick(evt)
		}
	},
	onChange: function (evt) {
		this.setState({ input: evt.target.value })
	},
	dateRange: function (evt) {
		console.log(evt.target);
		this.setState({ [evt.target.attributes.name.value]: evt.target.value });
	},
	submitClick: function (evt) {
		console.log('submit click: ', this.state.input, this.state.before, this.state.after);

		this.props.ticketSearch({ 
			search: this.state.input, 
			before: this.state.before, 
			after: this.state.after 
		});
	},
	render: function () {
		return (
			<Grid>
				<Row>
					<Col componentClass={ ControlLabel } sm={1} >Before: </Col>
					<Col sm={2}>
						<FormControl 
							type="date"
							name="before"
							placeholder="Tickets created before..."
							onChange={ this.dateRange }
							value={ this.state.before }
						/>
					</Col>
					<Col componentClass={ ControlLabel } sm={1}>After: </Col>
					<Col sm={2}>
						<FormControl 
							type="date"
							name="after"
							placeholder="Tickets created after..."
							onChange={ this.dateRange }
							value={ this.state.after }
						/>
					</Col>
					<Col sm={4}>
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

window.ButtonGrid = ButtonGrid;
