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
				'->',
				{
					xtype: 'form',
					border: 0,
					height: 20,
					width: 470,
					id: 'filterForm',
					items: [
						{
							xtype: 'checkboxgroup',
							fieldLabel: 'status filter',
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
            width: 150
        }, { 
            text: 'Description', 
            dataIndex: 'description',
            flex: 1
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
                        
                        Ext.create('ui.view.util.Modal', {
                            title: "Ticket #"+rec.get('id'),
                            items: [form]
                        });
                    }
                }
            ]
        }
    ]
});
