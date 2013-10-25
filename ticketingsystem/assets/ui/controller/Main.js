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

			"#mainView": {
				afterrender: this.loadGrid
			},
			"#mainView treepanel#nav": {
				itemclick: this.onSectionClick
			},
			'#mainView treepanel button[itemId=newSection]': {
				click: this.onNewSectionClick
			},
			"[itemId=viewTicket]": {
				'click': this.viewTicket
			},

			"#mainView #filterForm checkbox": {
				'change' : this.filterTickets
			},
			"#mainView [itemId=textSearch]": {
				'change': this.doStoreFilter
			}
		});
	},
	loadGrid: function (panel, eOpts) {
		if (panel.down('grid').getStore().getCount() === 0) {

			var defaultView = panel.down('treepanel').getRootNode();			
			//this.onSectionClick(null, defaultView.getChildAt(0));
		}
	},
	onNewSectionClick: function (btn) {
		var panel = btn.up('treepanel').getRootNode();

		panel.appendChild(
			{
				text: 'New Node-'+(panel.childNodes.length + 1), 
				leaf: true
			}
		);
	},
	sectionNameChange: function() {

	},
	onSectionClick: function (view, record, node, index, e, eOpts) {
		var section = record.getData().text.replace(' ','').toLowerCase(),
			store = Ext.StoreMgr.lookup('tickets_'+section);

		if (!store) {
			console.log('no store')
			store = Ext.create('ui.store.Tickets', {
				storeId: 'tickets_'+section,
				    proxy : {
				        type : 'ajax',
				        url : ui.app.dp.stores.Tickets[section],
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

        console.log(rec.get('id'));
	},

	filterTickets: function (checkbox, newValue, oldValue, eOpts) {
		var grid = checkbox.up('grid'),
			store = grid.getStore();

		var filters = function () {
					var checked = checkbox.up('checkboxgroup').getChecked(),
					filters = [];

					for (var f in checked) { filters.push(checked[f].boxLabel) };

					return filters;
				}()

		store.clearFilter(true);
		this.doStoreFilter(filters, store);
	},

	doStoreFilter: function (input, newValue, oldValue, eOpts) {
		var store = input.up('grid').getStore();


		var filterMe = function (key, val) {
			store.filter(
					Ext.create('Ext.util.Filter', {
						filterFn: function(item) {
							return val === item.get(key); 
						}, 
						root: 'data'
					})
				)
		};

		store.clearFilter(true);

		if (typeof newValue === "string") {

			if (newValue.match('@')) {
				var columns = newValue.split('@');
				for (var c in columns) {
					var kv = c.split(' ');
					
					if (!kv[1]) return;
					filterMe(kv[0].substr(1), kv[1]);
				}

			} else {	
				filterMe("title", newValue);
			}

			return;
		}

		if (newValue.length > 0) {
			store.filter(
				Ext.create('Ext.util.Filter', {
					filterFn: function(item) {
						return Ext.Array.contains(newValue, item.get("status")); 
					}, 
					root: 'data'
				})
			)
			return;
		}

		store.load();
	} 
});
