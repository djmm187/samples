/**
*	@class ui.store.Users
*/ 

Ext.define('ui.store.Users',{
	extend: 'Ext.data.Store',
	model: 'ui.model.Users',
	proxy: {
		type: 'ajax',
		url: '/assets/data/users.json',
		reader: {
			type: 'json',
			root: 'results'
		}
	},
	autoLoad: true
});