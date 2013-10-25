/**
* @class ui.view.form.FilterForm
*/

Ext.define('ui.view.form.FilterForm', {
	extend: 'Ext.form.Panel',
    border: 0,
    minHeight: 200,
    bodyPadding: 10,
    id: 'filterForm',
    layout: 'anchor',
    toFrontOnShow: true,
    items: [
        {
            xtype: 'combobox',
            labelAlign: 'top',
            fieldLabel: 'User',
            displayField: 'username',
            valueField: 'id',
            name: 'assigned',
            store: Ext.create('ui.store.Users')
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
            labelAlign: 'top',
            vertical: false,
            width: 500,
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
    ],
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