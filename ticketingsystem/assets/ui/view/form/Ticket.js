/**
*	@class ui.view.form.Ticket
*/ 

Ext.define('ui.view.form.Ticket', {
	extend: 'Ext.form.Panel',
	title: null,
	bodyPadding: 5,
	layout: 'anchor',
	url: null,
	raw: null,
	grid: null,
	buttons: [
		'->',
		{
			text: 'Save',
			itemId: 'saveForm',
			handler: function (btn) {
				var panel = this.up('form'),
				form = panel.getForm(),
				values = form.getValues();
				
				panel.setLoading('Saving...');
				ppp = panel;
				if(panel.grid) {
					grid = Ext.getCmp(panel.grid);
				} else {
					grid = Ext.getCmp('mainView').down('grid');
				}

				if (form.isValid()) {
					var store = grid.getStore(),
					model = Ext.create(store.model.getName(), values);
					
					store.add(model);

					panel.setLoading('Changes have been committed.')

					if(panel.up('window')) {
						panel.up('window').close();
					} else {
						panel.setLoading(false);
						form.reset();
					}

				}

				
				panel.setLoading(false);
				return;
				

			}
		},
		{
			text: 'Reset',
			itemId: 'reset',
			handler: function (btn) {
				var panel = this.up('form');

				if (panel.raw) {
					panel.getForm().setValues(panel.raw);
				} else {
					panel.getForm().reset();
				}
			}
		}
	],
	initComponent: function() {
		var me = this;

		this.items = [
		{
			xtype: 'displayfield',
			fieldLabel: 'TICKET ID',
			name: 'id'
		},{
			xtype: 'displayfield',
			fieldLabel: 'Opened',
			name: 'dateCreated'
		},{
			xtype: 'displayfield',
			fieldLabel: 'Last Updated',
			name: 'dateUpdated'
		},{
			xtype: 'displayfield',
			fieldLabel: 'Section',
			name: 'section'
		},{
			xtype: 'textfield',
			fieldLabel: 'Ticket Title',
			name: 'title'
		},{
			xtype: 'combobox',
			fieldLabel: 'Type',
			name: 'type',
			store: Ext.create('Ext.data.Store', {
				fields: ['type'],
				data: [
				{'type': 'major'},
				{'type': 'minor'},
				{'type': 'blocker'},
				{'type': 'enhancement'},
				{'type': 'scopecreep'}]
			}),
			queryMode: 'local',
			displayField: 'type',
			valueField: 'type'
		}, {
			xtype: 'textareafield',
			fieldLabel: 'test',
			name: 'description'
		}, {
			xtype: 'combobox',
			fieldLabel: 'Status',
			name: 'status',
			store: Ext.create('Ext.data.Store', {
					fields: ['status'],
					data: [
					{'status': 'open'},
					{'status': 'closed'},
					{'status': 'inprogress'},
					{'status': 'noway'}]
				}),
			queryMode: 'local',
			displayField: 'status',
			valueField: 'status'
		}, {
			xtype: 'combobox',
			fieldLabel: 'Assigned To',
			name: 'assigned',
			store: Ext.create('ui.store.Users'),
			queryMode: 'local',
			displayField: 'name',
			valueField: 'id'
		}];

		this.callParent(arguments);
	}

});