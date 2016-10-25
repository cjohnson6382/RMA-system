const Tab = ReactBootstrap.Tab;

window.TabOther = function () {
	return (
	  <Tab eventKey={ 4 } title="Other">
			<InputField data={ { controlId: 'startedbyText', type: 'text', name: 'startedby', placeholder: 'Started By', onChange: this.childValue, value: this.state.data["startedby"] } } />
			<InputField data={ { controlId: 'notesText', type: 'text', name: 'notes', placeholder: 'Notes', onChange: this.childValue, value: this.state.data["notes"] } } />
			<div>
				<h3>Hold Status</h3>
				<InputField data={ { controlId: 'itemnumberText', type: 'text', name: 'itemnumber', placeholder: 'Item Number', onChange: this.childValue, value: this.state.data["itemnumber"] } } />
				<InputField data={ { controlId: 'repairholdText', type: 'text', name: 'repairhold', placeholder: 'Repair Hold', onChange: this.childValue, value: this.state.data["repairhold"] } } />
				<InputField data={ { controlId: 'holddateDate', type: 'date', name: 'holddate', placeholder: 'Hold Date', onChange: this.childValue, value: this.state.data["holddate"] } } />
				<InputField data={ { controlId: 'vendorrmaText', type: 'text', name: 'vendorrma', placeholder: 'Vendor RMA', onChange: this.childValue, value: this.state.data["vendorrma"] } } />
			</div>
	  </Tab>
	);
}
window.TabOther = TabOther;
