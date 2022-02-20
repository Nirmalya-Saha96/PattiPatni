import web3 from './web3';
import Factory from './build/Factory.json';

const instance = new web3.eth.Contract(
  JSON.parse(Factory.interface),
  '0x344a20692b54303f89079fD161C8f2Eff63cd740'
);

export default instance;
