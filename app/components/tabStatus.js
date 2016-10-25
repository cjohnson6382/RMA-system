const Tab = ReactBootstrap.Tab;

window.TabStatus = function () { 
	return (
	  <Tab eventKey={ 3 } title="Status">
			<br />
			<InputField data={ { controlId: 'itemnumberText', type: 'text', name: 'itemnumber', placeholder: 'Item Number', onChange: this.childValue, value: this.state.data["itemnumber"] } } />
			<CheckboxField data={ { name: "received", onChange: this.onChange, value: this.state.data["received"], placeholder: "Received" } }/>
			<InputField data={ { controlId: 'trackingText', type: 'text', name: 'tracking', placeholder: 'Tracking', onChange: this.childValue, value: this.state.data["tracking"] } } />
			<CheckboxField data={ { name: "eval", onChange: this.onChange, value: this.state.data["eval"], placeholder: "Eval" } }/>
			<CheckboxField data={ { name: "stock", onChange: this.onChange, value: this.state.data["stock"], placeholder: "Stock" } }/>
			<CheckboxField data={ { name: "close", onChange: this.onChange, value: this.state.data["close"], placeholder: "Close" } }/>
	  </Tab>
	)
}

//	window.TabStatus = TabStatus;
