const Tab = ReactBootstrap.Tab;

window.TabInventory = function () {
	return (
		<Tab eventKey={ 1 } title="Inventory">
			<br />
			<InputField data={ { controlId: 'itemnumberText', type: 'text', name: 'itemnumber', placeholder: 'Item Number', onChange: this.childValue, value: this.state.data["itemnumber"] } } />
		 	<AutocompleteField data= { { placeholder: "Vendor", name: "vendor", value: this.state.data["vendor"], onChange: this.childValue } }/>
			<InputField data={ { controlId: 'serialnumberText', type: 'text', name: 'serial', placeholder: 'Serial Number', onChange: this.childValue, value: this.state.data["serial"] } } />
			<InputField data={ { controlId: 'purchasedateText', type: 'date', name: 'purchasedate', placeholder: 'Purchase Date', onChange: this.childValue, value: this.state.data["purchasedate"] } } />
			<SelectField  data={ { controlId: "typeSelect", name: "type", placeholder: "Type", onChange: this.childValue, value: this.state.data["type"], options: ["DOA - Cross Ship", "Warranty - Repair & Return", "Warranty - Cross Ship", "Non-Warranty - Repair & Return", "Other - See Notes"] } } />
			<InputField data={ { controlId: 'invoiceText', type: 'text', name: 'invoice', placeholder: 'Invoice', onChange: this.childValue, value: this.state.data["invoice"] } } />
			<TextboxInputField data={ { name: "problem", placeholder: "Problem", value: this.state.data["problem"], onChange: this.childValue } } />
		</Tab>
	)
};
