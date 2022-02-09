const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');   //constructor web3->provider->ganache
const web3 = new Web3(ganache.provider()); //creating a instance of web3 and providing a provider for the perticular network

const compiledFactory = require('../ethereum/build/Factory.json');
const compiledCertificate = require('../ethereum/build/Certificate.json');

let accounts;
let factory;
let certificateAddress;
let certificate;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '5000000' });

});

describe('PattiPatni', ()=>{
  it('deploys with factory manager approval', ()=>{
    assert.ok(factory.options.address);
  });

  it('marks factory creator as government', async () => {
    const factoryManager = await factory.methods.government().call();
    assert.equal(accounts[0], factoryManager);
  });

  it('creates a marriage appointment', async () =>{
    await factory.methods.bookMarriageAppointment("h", "123", accounts[1], "w", "123", accounts[2], "a", "123", accounts[3], "hHash", "wHash").send({
      from: accounts[1],
      gas: '5000000'
    });

    const marriageAppointment = await factory.methods.appointMarriage(0).call();

    assert.equal('123', marriageAppointment.husbandAdhar);
  });

  it('creates a whole marriage', async () =>{
    await factory.methods.bookMarriageAppointment("h", "123", accounts[1], "w", "123", accounts[2], "a", "123", accounts[3], "hHash", "wHash").send({
      from: accounts[1],
      gas: '5000000'
    });

    await factory.methods.approveMarriage("123", "0").send({
      from: accounts[3],
      gas: '5000000'
    });

    await factory.methods.wifeSignature("123", "0").send({
      from: accounts[2],
      gas: '5000000'
    });

    await factory.methods.uploadHusband("vHash", "rHash", "123", "0").send({
      from: accounts[1],
      value: '100000000000000000'
    });

    await factory.methods.governmentMarriageCertificate("0").send({
      from: accounts[0],
      gas: '5000000'
    });

    const isApproved = await factory.methods.work(0).call();
    const marriageCertificate = await factory.methods.getMarriageCertificate("123", "123").call();

    const deployedCertificate = await new web3.eth.Contract(
      JSON.parse(compiledCertificate.interface),
      marriageCertificate
    );

    const certificateDetail = await deployedCertificate.methods.getCertificate().call();

    assert.equal(true, isApproved.isCertified);
    assert.ok(marriageCertificate);
    assert.equal("h", certificateDetail[0]);
  });

  it('requires one person get married only once at a time', async () =>{
    try{
      await factory.methods.bookMarriageAppointment("h", "123", accounts[1], "w", "123", accounts[2], "a", "123", accounts[3], "hHash", "wHash").send({
        from: accounts[1],
        gas: '5000000'
      });

      await factory.methods.approveMarriage("123", "0").send({
        from: accounts[3],
        gas: '5000000'
      });

      await factory.methods.wifeSignature("123", "0").send({
        from: accounts[2],
        gas: '5000000'
      });

      await factory.methods.uploadHusband("vHash", "rHash", "123", "0").send({
        from: accounts[1],
        value: '100000000000000000'
      });

      await factory.methods.governmentMarriageCertificate("0").send({
        from: accounts[0],
        gas: '5000000'
      });

      await factory.methods.bookMarriageAppointment("h", "123", accounts[1], "w", "123", accounts[2], "a", "123", accounts[3], "hHash", "wHash").send({
        from: accounts[1],
        gas: '5000000'
      });
      assert(false);
    }catch(err){
      assert(err);
    }
  });

  it('creates a whole child process', async ()=>{
    await factory.methods.bookMarriageAppointment("h", "123", accounts[1], "w", "123", accounts[2], "a", "123", accounts[3], "hHash", "wHash").send({
      from: accounts[1],
      gas: '6000000'
    });

    await factory.methods.approveMarriage("123", "0").send({
      from: accounts[3],
      gas: '6000000'
    });

    await factory.methods.wifeSignature("123", "0").send({
      from: accounts[2],
      gas: '6000000'
    });

    await factory.methods.uploadHusband("vHash", "rHash", "123", "0").send({
      from: accounts[1],
      value: '100000000000000000',
      gas: '6000000'
    });

    await factory.methods.governmentMarriageCertificate("0").send({
      from: accounts[0],
      gas: '6000000'
    });

    await factory.methods.claimChildBirth("c", "f", "m", "123", "123", "fHash", "mHash").send({
      from: accounts[1],
      value: '100000000000000000',
      gas: '6000000'
    });

    await factory.methods.governmentChildCertificate("0").send({
      from: accounts[0],
      gas: '6000000'
    });

    const marriageCertificate = await factory.methods.getChildCertificate("123", "123").call();

    const deployedCertificate = await new web3.eth.Contract(
      JSON.parse(compiledCertificate.interface),
      marriageCertificate[0]
    );

    const certificateDetail = await deployedCertificate.methods.getCertificate().call();
    assert.equal("c", certificateDetail[4]);
    assert.ok(marriageCertificate[0]);
  });

  it('requires to get married to get child certificate', async ()=>{
    try{
      await factory.methods.claimChildBirth("c", "f", "m", "123", "123", "fHash", "mHash").send({
        from: accounts[1],
        value: '100000000000000000',
        gas: '6000000'
      });
      assert(false);
    }catch(err){
      assert(err);
    }
  });

  it('pays a fine of 1 ether if one having more than 2 children', async ()=>{
    await factory.methods.bookMarriageAppointment("h", "123", accounts[1], "w", "123", accounts[2], "a", "123", accounts[3], "hHash", "wHash").send({
      from: accounts[1],
      gas: '6000000'
    });

    await factory.methods.approveMarriage("123", "0").send({
      from: accounts[3],
      gas: '6000000'
    });

    await factory.methods.wifeSignature("123", "0").send({
      from: accounts[2],
      gas: '6000000'
    });

    await factory.methods.uploadHusband("vHash", "rHash", "123", "0").send({
      from: accounts[1],
      value: '100000000000000000',
      gas: '6000000'
    });

    await factory.methods.governmentMarriageCertificate("0").send({
      from: accounts[0],
      gas: '6000000'
    });

    await factory.methods.claimChildBirth("c", "f", "m", "123", "123", "fHash", "mHash").send({
      from: accounts[1],
      value: '100000000000000000',
      gas: '6000000'
    });

    await factory.methods.governmentChildCertificate("0").send({
      from: accounts[0],
      gas: '6000000'
    });

    await factory.methods.claimChildBirth("cc", "f", "m", "123", "123", "fHash", "mHash").send({
      from: accounts[1],
      value: '100000000000000000',
      gas: '6000000'
    });

    await factory.methods.governmentChildCertificate("1").send({
      from: accounts[0],
      gas: '6000000'
    });

    await factory.methods.claimChildBirthWithFine("ccc", "f", "m", "123", "123", "fHash", "mHash").send({
      from: accounts[1],
      value: '1000000000000000000',
      gas: '6000000'
    });

    await factory.methods.governmentChildCertificate("2").send({
      from: accounts[0],
      gas: '6000000'
    });

    const childCount = await factory.methods.getChildCount("123", "123").call();
    let balance = await factory.methods.getBalance().call();
    balance = web3.utils.fromWei(balance, 'ether');

    assert.equal("3", childCount);
    assert(balance > 1);
  });

  it('requires specified approver approves a marriage by his address and adhar', async () =>{
    try{
      await factory.methods.bookMarriageAppointment("h", "123", accounts[1], "w", "123", accounts[2], "a", "123", accounts[3], "hHash", "wHash").send({
        from: accounts[1],
        gas: '5000000'
      });

      await factory.methods.approveMarriage("122", "0").send({
        from: accounts[2],
        gas: '5000000'
      });
      assert(false);
    }catch(err){
      assert(err);
    }
  });

  it('requires the wife to sign by giving her adhar and address', async ()=> {
    try{
      await factory.methods.bookMarriageAppointment("h", "123", accounts[1], "w", "123", accounts[2], "a", "123", accounts[3], "hHash", "wHash").send({
        from: accounts[1],
        gas: '5000000'
      });

      await factory.methods.approveMarriage("123", "0").send({
        from: accounts[3],
        gas: '5000000'
      });

      await factory.methods.wifeSignature("122", "0").send({
        from: accounts[1],
        gas: '5000000'
      });
      assert(false);
    }catch(err){
      assert(err);
    }
  });

  it('requires the approver to approve and wife to sign the the husband can apply for marriage certificate', async ()=>{
    try{
      await factory.methods.bookMarriageAppointment("h", "123", accounts[1], "w", "123", accounts[2], "a", "123", accounts[3], "hHash", "wHash").send({
        from: accounts[1],
        gas: '5000000'
      });

      await factory.methods.uploadHusband("vHash", "rHash", "123", "0").send({
        from: accounts[1],
        value: '100000000000000000'
      });
      assert(false);
    }catch(err){
      assert(err);
    }
  });

  it('requires only the government to certify any marriage', async ()=>{
    try{
      await factory.methods.bookMarriageAppointment("h", "123", accounts[1], "w", "123", accounts[2], "a", "123", accounts[3], "hHash", "wHash").send({
        from: accounts[1],
        gas: '5000000'
      });

      await factory.methods.approveMarriage("123", "0").send({
        from: accounts[3],
        gas: '5000000'
      });

      await factory.methods.wifeSignature("123", "0").send({
        from: accounts[2],
        gas: '5000000'
      });

      await factory.methods.uploadHusband("vHash", "rHash", "123", "0").send({
        from: accounts[1],
        value: '100000000000000000'
      });

      await factory.methods.governmentMarriageCertificate("0").send({
        from: accounts[1],
        gas: '5000000'
      });
      assert(false);
    }catch(err){
      assert(err);
    }
  });

  it('requires a minimum charge to pay for marriage', async ()=>{
    try{
      await factory.methods.bookMarriageAppointment("h", "123", accounts[1], "w", "123", accounts[2], "a", "123", accounts[3], "hHash", "wHash").send({
        from: accounts[1],
        gas: '5000000'
      });

      await factory.methods.approveMarriage("123", "0").send({
        from: accounts[3],
        gas: '5000000'
      });

      await factory.methods.wifeSignature("123", "0").send({
        from: accounts[2],
        gas: '5000000'
      });

      await factory.methods.uploadHusband("vHash", "rHash", "123", "0").send({
        from: accounts[1],
        gas: '6000000'
      });
      assert(false);
    }catch(err){
      assert(err);
    }
  });

  it('requires a minimum charge to pay for child certificate', async ()=>{
    try{
      await factory.methods.bookMarriageAppointment("h", "123", accounts[1], "w", "123", accounts[2], "a", "123", accounts[3], "hHash", "wHash").send({
        from: accounts[1],
        gas: '6000000'
      });

      await factory.methods.approveMarriage("123", "0").send({
        from: accounts[3],
        gas: '6000000'
      });

      await factory.methods.wifeSignature("123", "0").send({
        from: accounts[2],
        gas: '6000000'
      });

      await factory.methods.uploadHusband("vHash", "rHash", "123", "0").send({
        from: accounts[1],
        value: '100000000000000000',
        gas: '6000000'
      });

      await factory.methods.governmentMarriageCertificate("0").send({
        from: accounts[0],
        gas: '6000000'
      });

      await factory.methods.claimChildBirth("c", "f", "m", "123", "123", "fHash", "mHash").send({
        from: accounts[1],
        gas: '6000000'
      });
      assert(false);
    }catch(err){
      assert(err);
    }
  });

  it('requires to pay a fine of 1 ether for > 2 children of same parent', async ()=>{
    try{
      await factory.methods.bookMarriageAppointment("h", "123", accounts[1], "w", "123", accounts[2], "a", "123", accounts[3], "hHash", "wHash").send({
        from: accounts[1],
        gas: '6000000'
      });

      await factory.methods.approveMarriage("123", "0").send({
        from: accounts[3],
        gas: '6000000'
      });

      await factory.methods.wifeSignature("123", "0").send({
        from: accounts[2],
        gas: '6000000'
      });

      await factory.methods.uploadHusband("vHash", "rHash", "123", "0").send({
        from: accounts[1],
        value: '100000000000000000',
        gas: '6000000'
      });

      await factory.methods.governmentMarriageCertificate("0").send({
        from: accounts[0],
        gas: '6000000'
      });

      await factory.methods.claimChildBirth("c", "f", "m", "123", "123", "fHash", "mHash").send({
        from: accounts[1],
        value: '100000000000000000',
        gas: '6000000'
      });

      await factory.methods.governmentChildCertificate("0").send({
        from: accounts[0],
        gas: '6000000'
      });

      await factory.methods.claimChildBirth("cc", "f", "m", "123", "123", "fHash", "mHash").send({
        from: accounts[1],
        value: '100000000000000000',
        gas: '6000000'
      });

      await factory.methods.governmentChildCertificate("1").send({
        from: accounts[0],
        gas: '6000000'
      });

      await factory.methods.claimChildBirth("ccc", "f", "m", "123", "123", "fHash", "mHash").send({
        from: accounts[1],
        value: '100000000000000000',
        gas: '6000000'
      });
      assert(false);
    }catch(err){
      assert(err);
    }
  });
});
