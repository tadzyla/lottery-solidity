const assert = require('assert');
const ganache = require('ganache-cli');  // local test network
const Web3 = require('web3');   // requires constructor function or class, thats why start with capital letter
                                // web3 is portal to ethereum network, this is how we retrieve information from the network and make changes init

const web3 = new Web3(ganache.provider());  // creates new web3 instance with Web3 constructor
// web3 library has to be given the provider, which instructs what network it has to connect to, and it has information about available accounts available for web3
// in our case provider was given by ganache-cli module
// ganache holds small testing network

const { interface, object } = require ('../compile')
// abi - interface
// evm - bytecode


let accounts;
let lottery;

beforeEach(async() => {
    // get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // deploy contract using one of the accounts
   lottery = await new web3.eth
        .Contract(interface)
        .deploy({ data: object })  // tells to web3 that we want to deploy a new copy of this contract
        .send({ from: accounts[0], gas: '1000000' })
});
 
describe('Lottery contract', () => {
    it('deploys a contract', () => {
        assert.ok(lottery.options.address);  // address the contract was deployed to on a local test network
    });
});