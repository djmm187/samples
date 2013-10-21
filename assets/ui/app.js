Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'sample',
    appFolder: '.',

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            id: 'globalView',
            layout: 'fit',
            items: [
                /**
                 * main application
                 *
                 */
            ]
        });
    }
});