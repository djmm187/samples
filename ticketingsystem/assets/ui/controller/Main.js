/**
* @class ui.controller.Main
*	main controller for ticketing system (events bound to view)
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
				'change': this.doStoreFilter,
				'focus' : function() { this.updateSystemStatus('Begin Filtering Tickets...') },
				'blur' : this.updateSystemStatus
			}
		});
	},

	/**
		@method loadGrid

		method automatically loads first nodes tickets into grid
		(basically the initial view)
	**/
	loadGrid: function (panel, eOpts) {
		if (panel.down('grid').getStore().getCount() === 0) {		
			var tree = Ext.getCmp('nav'),
			rec = tree.getRootNode().getChildAt(0);
            
            tree.getSelectionModel().select(rec);
            this.onSectionClick(rec.getData().text);
		}
	},

	/**
		@method onNewSectionClick

		method adds a new node to the applications treeview
	**/
	onNewSectionClick: function (btn) {
		var panel = btn.up('treepanel').getRootNode();

		panel.appendChild(
			{
				text: 'NewNode-'+(panel.childNodes.length + 1), 
				leaf: true
			}
		);
	},

	/** TODO: finish me **/
	sectionNameChange: function () {},

	/**
		@method onSectionClick

		method loads target nodes associated tickets
	**/
	onSectionClick: function (view, record, node, index, e, eOpts) {
		var section,
			store;

		section = ((typeof view === "string") ? view : record.getData().text).replace(' ','').toLowerCase();
		this.updateSystemStatus('Loading '+section+' tickets');
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
		this.updateSystemStatus();

		return;
	},

	/**
		@method viewTicket
	**/
	viewTicket: function (grid, rowIndex, colIndex) {
		var rec = grid.getStore().getAt(rowIndex);
	},

	/** 
		@method filterTickets
		
		method to use filter form provided in the main grid toolbar
		TODO: finish me sometime
	**/
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

	/**
		@method doStoreFilter

		method provides a way to search local data store
		default is to search titles
		annotations provide a way to specify query columns
	**/
	doStoreFilter: function (input, newValue, oldValue, eOpts) {
		var store = input.up('grid').getStore();

		var filterMe = function (key, val) {
			store.filter(
					Ext.create('Ext.util.Filter', {
						filterFn: function(item) {
							return item.get(key.toLowerCase()).match(new RegExp(val, "i")); 
						}, 
						root: 'data'
					})
				);
		};

		store.clearFilter();

		if (typeof newValue === "string") {

			if (newValue.match('@')) {

				var columns = newValue.split('@');
				columns = columns.splice(1, columns.length);

				for (var c in columns) {
					var kv = columns[c].split(' ');

					if (kv.length < 2) break;
					filterMe(kv[0], kv[1]);
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
	},

	/** 
		@method updateSystemStatus

		shared method to show a message to the user
	**/
	updateSystemStatus: function (message) {
		if (!message || typeof message === "object") message = "Ready ...";

		Ext.getCmp('systemStatus').setText(message);
	}

});
