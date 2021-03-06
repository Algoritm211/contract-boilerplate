require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {abi, bytecode} = require('./compile');

const provider = new HDWalletProvider({
  mnemonic: process.env.MNEMONIC_PHRASE,
  providerOrUrl: process.env.RINKEBY_ENDPOINT,
})

const web3 = new Web3(provider);

const deployContract = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log(`Attempting to deploy from account: ${accounts[0]}`);

  const result = await new web3.eth.Contract(abi)
    .deploy({data: bytecode, arguments: ['Initial message']})
    .send({from: accounts[0], gas: 1_000_000});

  console.log(`Contract was deployed to ${result.options.address}`);
  provider.engine.stop();
}

void deployContract()
