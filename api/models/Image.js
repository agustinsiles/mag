module.exports = {
  connection: 'MongoDB',
  schema: true,
  attributes: {
    uri: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string'
    },
    isMain: {
      type: 'boolean',
      defaultsTo: false
    },
    product: {
      model: 'product'
    }
  }
};
