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
                layout: 'hbox',
                bodyStyle: 'background: #fff',
                defaults: {
                    margin: '10 5 0 5'
                },
                items: [ 
                    {
                        xtype: 'container',
                        title: null,
                        border: 0,
                        flex: 10,
                        html: "<b>Source available @ <a href='https://github.com/djmm187/samples' target='_blank' title='https://github.com/djmm187/samples'>https://github.com/djmm187/samples</b>"
                    }, {
                        xtype: 'text',
                        id: 'systemStatusLabel',
                        style: 'font-weight: bold;',
                        text: 'System Status: '
                    },{
                        xtype: 'text',
                        id: 'systemStatus',
                        flex: 1,
                        text: 'Ready...'
                    }
                ]
            }]
        });
    }
});
