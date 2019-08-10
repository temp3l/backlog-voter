export const contractDefinition = {
  name: 'ContractSchema',
  required: ['id', 'vendor', 'type', 'contractId'],
  properties: {
    contractId: {type: 'string', id: true, required: true},
    vendor: {type: 'string'},
    type: {type: 'string', enum: ['bike', 'twike', 'dreik']},
    test: {type: 'string'},
  },
};
