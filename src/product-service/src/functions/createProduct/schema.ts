export default {
  type: "object",
  properties: {
      title: {
          type: 'string'
      },
      description: {
          type: 'string'
      },
      price: {
          type: 'number',
          minimum: 0
      },
      count: {
        type: 'number', 
        minimum: 0
      }
  },
  required: ['title']
} as const;