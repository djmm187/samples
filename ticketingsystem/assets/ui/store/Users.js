/**
*	@class ui.store.Users
*/ 

Ext.define('ui.store.Users',{
	extend: 'Ext.data.Store',
	model: 'ui.model.Users',
	proxy: {
		type: 'ajax',
		url: paths.stores.Users,
		reader: {
			type: 'json',
			root: 'results'
		}
	},
	autoLoad: true
});