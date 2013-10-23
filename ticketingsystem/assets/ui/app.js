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
                xtype: 'gridpanel',
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