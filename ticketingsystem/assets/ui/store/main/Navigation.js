/**
* @class ui.store.main.Navigation
*/

Ext.define('ui.store.main.Navigation', {
    extend : "Ext.data.TreeStore",
    autoLoad : true,
    root: {
        "text": ".",
        "expanded": true,
        "children": [
            {
                "text": "Database",
                "leaf": false,
                "section": "database"
            },
            {
                "text": "Admin",
                "leaf": false,
                "section": "admin",

            },
            {
                "text": "UI",
                "leaf": false,
                "section": "ui"
            }
        ]
    }
});