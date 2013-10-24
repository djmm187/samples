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
                "leaf": true,
                "section": "database"
            },
            {
                "text": "Admin",
                "leaf": true,
                "section": "admin",

            },
            {
                "text": "UI",
                "leaf": true,
                "section": "ui"
            }
        ]
    }
});