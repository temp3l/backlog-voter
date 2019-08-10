export const contractDefinition = {
  name: 'Contract',
  required: ['id', 'vendor', 'lesse', 'contractId'],
  properties: {
    id: {type: 'string', id: true},
    contractId: {type: 'string'},
    vendor: {type: 'string'},
    type: {type: 'string', enum: ['bike', 'twike', 'dreik']},
  },
};
