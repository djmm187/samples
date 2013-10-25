Ext.application({
    name: 'ui',
    appFolder: '/ticketingsystem/assets/ui/',
    stores: ['ui.store.main.Navigation', 'ui.store.Tickets', 'ui.store.Users'],
    views: ['ui.util.*'],
    controllers: ['ui.controller.Main'],
    launch: function() {
        var me = this;

        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            alias: 'widget.ticketTracker',
            id: 'mainView',
            items: [{
                region: 'north',
                html: '<h1 class="x-panel-header">AnkleDeep Ticketing System</h1>',
                border: 0,
            }, 
            {
                region: 'west',
                xtype: 'treepanel',
                collapsible: true,
                title: 'Sections',
                width: 250,
                border: 0,
                id: 'nav',
                rootVisible: false,
                useArrows: true,
                store: Ext.create('ui.store.main.Navigation'),
                bbar: ['->', {
                    xtype: 'button',
                    text: 'Add Section',
                    itemId: 'newSection'
                }]
            }, 
            {
                region: 'center',
                title: null,
                id: 'ticketGrid',
                items: [Ext.create('ui.view.grid.Tickets')]
            }, {
                region: 'south',
                height: 25,
                id: 'statusBar',
                border: 0,
                items: [{
                    xtype: 'text',
                    id: 'statusMessage',
                    style: 'float: right; color: #e6e6e6; margin: 2px 25px 0 0; font-weight:bold;',
                    text: 'Ready...'
                }]
            }]
        })
    }
});
