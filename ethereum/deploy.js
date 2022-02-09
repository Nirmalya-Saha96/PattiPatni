const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/Factory.json');

const provider = new HDWalletProvider(
  'prize verify carpet deposit game round burden cabin general boil topic world',
  'https://rinkeby.infura.io/v3/fcaced938a2a4f18a072be9405285690'
);
const web3 = new Web3(provider);

const deploy = async () => {    //deployed script
  const accounts = await web3.eth.getAccounts();    //getting the accounts

  console.log('Attempting to deploy from account', accounts[0]);

//this is the main deploy phase to deploy to the ehereum network(rinkeby)
  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: '0x' + compiledFactory.bytecode })
    .send({ from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();
//0x9585fCC7bc907515b2a9758D3279593618030159
