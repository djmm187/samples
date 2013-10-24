/**
* @class ui.util.Modal
*/ 

Ext.define('ui.util.Modal', {
    extend: 'Ext.window.Window',
    title: null,
    modal: true,
    closeable: true,
    closeAction: 'destory',
    maximizable: true,
    maximized: false,
    autoShow: true,
    minWidth: '200',
    minHeight: '200',
    y:0,
    constrain: true,
    constrainTo: Ext.get('mainView')
});