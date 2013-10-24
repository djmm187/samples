/**
* @class ui.view.grid.Tickets
*/

Ext.define('ui.view.grid.Tickets', {
	extend: 'Ext.grid.Panel',
	dockedItems: [
		{
			dock: 'top',
			xtype: 'toolbar',
			items: [
				{
					xtype: 'button',
					text: 'New Ticket',
					itemId: 'newTicket',
					handler: function (btn) {
						Ext.create('ui.util.Modal', {
							title: 'New Ticket',
							items: [Ext.create('ui.view.form.Ticket')]
						});
					}
				}, '->',
				{
                    xtype: 'textfield',
                    fieldLabel: 'Search',
                    hideLabel: true,
                    emptyText: 'Title Search. use @**COLUMN NAME** to search a specific column',
                    width: 500,
                    height: 30,
                    itemId: 'textSearch'
                }, '->',
                {
                    xtype: 'button',
                    text: 'Apply Filter',
                    itemId: 'toggleFilter',
                    enableToggle: true,
                    handler: function (btn) {
                        var toolbar = Ext.getCmp('filterForm').up('toolbar');

                        (!btn.pressed) ? toolbar.hide() :toolbar.show();
                    }
                }
            ],
        }, {
            xtype: 'toolbar',
            dock: 'bottom',
            hidden: true,
            items: [
                {
                    xtype: 'form',
                    border: 0,
                    minHeight: 200,
                    id: 'filterForm',
                    layout: 'anchor',
                    dockedItems: [
                        {

                        }
                    ],
                    items: [
                        {
                            xtype: 'combobox',
                            labelAlign: 'top',
                            fieldLabel: 'User',
                            displayField: 'Name',
                            valueField: 'id',
                            name: 'assigned'
                            //store: Ext.create('ui.store.Users')
                        },
                        {
                            xtype: 'fieldcontainer',
                            border: 0,
                            title: null,
                            columns: 2,
                            layout: 'hbox',
                            fieldDefaults: {
                                labelAlign: 'top',
                                margin: '0 5 0 0',
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Start',
                                    name: 'start'
                                }, {
                                    xtype: 'datefield',
                                    fieldLabel: 'End',
                                    name: 'end'
                                }
                            ]
                        },
                        {
                            xtype: 'checkboxgroup',
                            fieldLabel: 'Status',
                            labelAlign: 'left',
                            vertical: false,
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {boxLabel: 'Open', name: 'status', inputValue: 'open'},
                                {boxLabel: 'Closed', name: 'status', inputValue: 'closed'},
                                {boxLabel: 'In Progress', name: 'status', inputValue: 'inprogress'},
                                {boxLabel: 'No Way', name: 'status', inputValue: 'noway'}
                            ]

                        }
                    ]
                }
            ]
        }
    ],
    columns: [
        { 
            text: 'ID',  
            dataIndex: 'id' 
        }, { 
            text: 'Type', 
            dataIndex: 'type', 
            width: 100
        }, { 
            text: 'Title', 
            dataIndex: 'title', 
            flex: 1
        }, { 
            text: 'Description', 
            dataIndex: 'description',
            flex: 3
        }, {
            text: 'Status',
            dataIndex: 'status',
            renderer: function(value, metaData) {
                var v = value.replace(' ', '').toLowerCase(),
                statusColors = {
                    "open" : "#009933",
                    "closed": "#990000",
                    "inprogress": "#CC9900",
                    "noway" : "#33FFFF"
                },
                bg = (statusColors[v]) ? statusColors[v] : "transparent";

                return "<div style='width:100%; height:100%; text-align: center; background-color:"+ bg +"'>"+ value +"</div>";
            },
            width: 125
        }, {
           text: 'Assigned To',
           dataIndex: 'assigned',
           width: 200
        },{
           text: 'Opened',
           xtype: 'datecolumn',
           dataIndex: 'dateCreated',
           format: 'd/m/Y'
        },{
           text: 'Updated',
           xtype: 'datecolumn',
           dataIndex: 'dateUpdated',
           format: 'd/m/Y'
        }, {
            text: 'Edit Ticket',
            xtype: 'actioncolumn',
            items: [
                {
                    icon   : '/assets/extjs/examples/shared/icons/fam/information.png',
                    tooltip: 'View Ticket',
                    itemId : 'viewTicket',
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);

                        var form = Ext.create('ui.view.form.Ticket', {
                            raw: rec
                        });
                        form.loadRecord(rec);
                        
                        Ext.create('ui.util.Modal', {
                            title: "Ticket #"+rec.get('id'),
                            items: [form]
                        });
                    }
                }
            ]
        }
    ]
});
