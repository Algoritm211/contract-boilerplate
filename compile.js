const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxContractPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const contractSource = fs.readFileSync(inboxContractPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: contractSource,
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

const abi = output.contracts['Inbox.sol']['Inbox'].abi
const bytecode = output.contracts['Inbox.sol']['Inbox'].evm.bytecode.object

module.exports = {
  abi,
  bytecode,
}
