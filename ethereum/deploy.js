const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/Factory.json');

const provider = new HDWalletProvider(
  'prize verify carpet deposit game round burden cabin general boil topic world',
  'https://sepolia.infura.io/v3/f1d01d7f78944663887a954faa97cbec'
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
//0xd02a7EDD636C214d14419e0a3fa5F1a1E4DE6D69
//  '0x344a20692b54303f89079fD161C8f2Eff63cd740' //prev deployed add
