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
			store = Ext.create('ui.store.Tickets', {
				storeId: 'tickets_'+section,
				    proxy : {
				        type : 'ajax',
				        url : paths.stores.Tickets[section],
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
							return item.get(key).match(val); 
						}, 
						root: 'data'
					})
				)
		};

		store.clearFilter();

		if (typeof newValue === "string") {

			if (newValue.match('@')) {

				var columns = newValue.split('@');
				columns = columns.splice(1,columns.length);

				for (var c in columns) {
					var kv = columns[c].split(' ');

					if (kv.length < 2) break;
					filterMe(kv[0], kv[1]);
				}
				return;

			} else {	
				filterMe("title", newValue);
			}

			return;
		}

		if (newValue.length > 0) {
			store.filter(
				Ext.create('Ext.util.Filter', {
					filterFn: function(item) {
						console.log
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
