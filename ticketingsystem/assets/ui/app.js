Ext.application({
    name: 'ui',
    appFolder: '/ticketingsystem/assets/ui/',
    stores: ['ui.store.main.Navigation', 'ui.store.Tickets'],
    views: ['ui.view.util.Modal'],
    controllers: ['ui.controller.Main'],
    launch: function() {
        var me = this;

        //lets just fetch the file for now. TODO: move this to a more managable place.
        Ext.Ajax.request({
            method: 'GET',
            url: '/ticketingsystem/assets/conf.json',
            success: function (response) {
                configs = Ext.decode(response.responseText);
                
                // datapath file (ie /assets/conf.json)
                me.dp = configs;
            },
            failure: function (reponse) {
                console.log('error loading config file');
                me.dp = null;
            }
        });


        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            alias: 'widget.ticketTracker',
            id: 'mainView',
            items: [{
                region: 'north',
                html: '<h1 class="x-panel-header">AnkleDeep Ticketing System</h1>',
                border: false,
                margins: '0 0 5 0'
            }, 
            {
                region: 'west',
                xtype: 'treepanel',
                collapsible: true,
                title: 'Sections',
                width: 250,
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
                items: [{
                    xtype: 'text',
                    id: 'statusMessage',
                    style: 'float: right; color: #fff; margin-right:25px; font-weight:bold;',
                    text: 'Ready...'
                }]
            }]
        })
    }
});