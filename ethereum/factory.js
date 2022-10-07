import web3 from './web3';
import Factory from './build/Factory.json';

const instance = new web3.eth.Contract(
  JSON.parse(Factory.interface),
  '0xB6aF4f753aFd813f124e6cCd843cEc822b1A979e'
);

export default instance;
