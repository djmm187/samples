/**
* @class ui.view.form.FilterForm
*/

Ext.define('ui.view.form.FilterForm', {
	extend: 'Ext.form.Panel',
    border: 0,
    minHeight: 200,
    bodyPadding: 10,
    id: 'filterForm',
    toFrontOnShow: true,
    fieldDefaults: {
    	labelAlign: 'top'
    },
    items: [
    {
    	border: 0,
    	flex: 1,
    	items: [
	    	{
	            xtype: 'combobox',
	            fieldLabel: 'User',
	            displayField: 'username',
	            valueField: 'id',
	            name: 'assigned',
	            store: Ext.create('ui.store.Users')
	        },
	        {
				xtype: 'combobox',
				fieldLabel: 'Status',
				name: 'status',
				store: Ext.create('Ext.data.Store', {
						fields: ['status', 'display'],
						data: [
						{'status': 'open', 'display': 'Open'},
						{'status': 'closed', 'display': 'Closed'},
						{'status': 'inprogress', 'display': 'In Progress'},
						{'status': 'noway', 'display': 'No Way'}]
					}),
				queryMode: 'local',
				displayField: 'display',
				valueField: 'status'
			},
	        {
	        	xtype: 'textfield',
	        	fieldLabel: 'Title',
	        	name: 'title'
	        }
        ]
    },	
    {
    	border: 0,
    	flex: 1,
    	items: [
    		{
				xtype: 'textfield',
				fieldLabel: 'Description',
				name: 'description'
			},
	        {
	            xtype: 'fieldcontainer',
	            border: 0,
	            title: null,
	            columns: 2,
	            layout: 'hbox',
	            fieldDefaults: {
	                labelAlign: 'top',
	                margin: '0 5 0 0'
	            }
	        }, {
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
    	border: 0,
    	flex: 0,
    	items: [
    	{
    		xtype: 'checkboxgroup',
            fieldLabel: 'Status',
            vertical: false,
            width: 500,
            border: 0,
            defaults: {
                labelAlign: 'left'
            },
            items: [
                {boxLabel: 'Open', name: 'status', inputValue: 'open'},
                {boxLabel: 'Closed', name: 'status', inputValue: 'closed'},
                {boxLabel: 'In Progress', name: 'status', inputValue: 'inprogress'},
                {boxLabel: 'No Way', name: 'status', inputValue: 'noway'}
            ]
    	}]
    }],
    dockedItems: [
	    {
	    	dock: 'bottom',
			xtype: 'toolbar',
			border: 0,
			bodyStyle: 'background: none',
			items: [
				'->',
			    {
			    	xtype: 'button',
			    	text: 'Done',
			    	id: 'filterFormDone',
			    	handler: function (btn) {
			    		btn.up('form').up('toolbar').hide().up().down('[itemId=toggleFilter]').toggle();
			    	}
			    }
			]
	    }
    ]
});