/**
* @class ui.model.Ticket
*/

Ext.define('ui.model.Ticket', {
	extend : 'Ext.data.Model',
    fields : [
      'id',
      'type',
      'title',
      'description',
      'section',
      'status',
      'assigned',
      'dateCreated',
      'dateUpdated'
    ]
});