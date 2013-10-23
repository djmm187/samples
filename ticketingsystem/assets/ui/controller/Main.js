/**
* @class ui.controller.Main
*/

Ext.define('ui.controller.Main', {
	extend: 'Ext.app.Controller',
	refs: [{
		ref: 'mainNav',
		selector: '#mainView treepanel#nav'
	}],
	init: function() {
		var me = this;

		this.control({
			"#mainView treepanel#nav": {
				itemclick: this.onSectionClick
			},
			"[itemId=viewTicket]": {
				'click': this.viewTicket
			}
		});
	},
	onSectionClick: function(view, record, node, index, e, eOpts) {
		var section = record.getData().text.replace(' ','').toLowerCase(),
		store = Ext.StoreMgr.lookup('tickets_'+section),
		url = '/assets/data/'+section+'/tickets.json';

		if (!store) {
			console.log('no store')
			store = Ext.create('ui.store.Tickets', {
				storeId: 'tickets_'+section,
				    proxy : {
				        type : 'ajax',
				        url : url,
				        reader : {
				            type : 'json',
				            root: 'results'
				        }
				    }
			});
		}

		Ext.getCmp('mainView').down('grid').bindStore(store);
		store.load();
		
		return;
	},
	viewTicket: function (grid, rowIndex, colIndex) {
		var rec = grid.getStore().getAt(rowIndex);

        alert(rec.get('id'));
	}
});
