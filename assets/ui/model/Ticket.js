/**
* @class ui.model.Ticket
*/

Ext.define('ui.model.Ticket', {
	extend : 'Ext.data.Model',
    fields : [
      'id',
      'type',
      'description',
      'status',
      'assigned',
      'dateCreated',
      'dateUpdated'
    ]
});