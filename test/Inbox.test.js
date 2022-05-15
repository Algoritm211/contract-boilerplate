const ganache = require('ganache');
const Web3 = require('web3');
const {abi, bytecode} = require('../compile');
const web3 = new Web3(ganache.provider());

describe('Testing inbox contract', () => {
  let accounts;
  let inbox;
  const INITIAL_MESSAGE = 'Initial message'

  beforeEach(async () => {
    // Get the list of accounts
    accounts = await web3.eth.getAccounts();

    // Use one of the accounts to deploy the contract
    inbox = await new web3.eth.Contract(abi)
      // Here we need the data and arguments for constructor if needed
      .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
      // "from" - here we will deploy our contract
      .send({from: accounts[0], gas: 1_000_000})
  })

  it('Contract is successfully deployed', () => {
    const deployedAddress = inbox.options.address;
    expect(deployedAddress).toBeTruthy();
  })

  it('Default message displays and looks good', async () => {
    const message = await inbox.methods.message().call();
    expect(message).toBe(INITIAL_MESSAGE);
  });

  it('Message changes right', async () => {
    const newMessage = 'New message for test';
    await inbox.methods.setMessage(newMessage).send({ from: accounts[0], gas: 1_000_000 });
    const message = await inbox.methods.message().call();
    expect(message).toBe(newMessage);
  });
})
