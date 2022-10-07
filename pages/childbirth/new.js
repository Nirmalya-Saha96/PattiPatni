import React, { Component } from 'react';
import { Card, Button, Input, Message, Form } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import Layout from '../../components/Layout';
import { Link, Router } from '../../routes';
import web3 from '../../ethereum/web3';

import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

class NewChildBirth extends Component {
  state = {
    child_name: "",
    father_name: "",
    mother_name: "",
    father_adhar: "",
    mother_adhar: "",
    father_hash: "",
    mother_hash: "",
    file: null,
    filee: null,
    value: "0.1",
    valueFine: "1",
    errorMessage: '',
    loading: false
  };

 captureFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);

    reader.onloadend = () => {
      this.setState({file: Buffer(reader.result)});
    };

    e.preventDefault();
  }

  captureFilee = (e) => {
     const data = e.target.files[0];
     const reader = new window.FileReader();
     reader.readAsArrayBuffer(data);

     reader.onloadend = () => {
       this.setState({filee: Buffer(reader.result)});
     };

     e.preventDefault();
   }

 onSubmit = async (e) => {
     e.preventDefault();

     this.setState({ loading: true, errorMessage: '' });

     try {
       // const created = await client.add(this.state.file);
       // const url = `https://ipfs.infura.io/ipfs/${created.path}`;
       const url = 'https://cdn1.iconfinder.com/data/icons/avatar-2-2/512/Programmer-512.png';
       this.setState({father_hash: url});
     } catch (error) {
       console.log(error.message);
       this.setState({ errorMessage: error.message });
     }

     try {
       // const createdd = await client.add(this.state.filee);
       // const urll = `https://ipfs.infura.io/ipfs/${createdd.path}`;
       const urll = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIFa3IwZwr9FaLamnDQw6IYSTaiagu4SUFPg&usqp=CAU';
       this.setState({mother_hash: urll});
     } catch (error) {
       console.log(error.message);
       this.setState({ errorMessage: error.message });
     }

     try {
       const accounts = await web3.eth.getAccounts();
       const childCount = await factory.methods.getChildCount(this.state.father_adhar, this.state.mother_adhar).call();
       if(childCount < 2){
         await factory.methods
           .claimChildBirth(
             this.state.child_name, this.state.father_name, this.state.mother_name,
              this.state.father_adhar, this.state.mother_adhar, this.state.father_hash, this.state.mother_hash)
           .send({
             from: accounts[0],
             value: web3.utils.toWei(this.state.value, 'ether')
           });
       } else {
         await factory.methods
           .claimChildBirthWithFine(
             this.state.child_name, this.state.father_name, this.state.mother_name,
              this.state.father_adhar, this.state.mother_adhar, this.state.father_hash, this.state.mother_hash)
           .send({
             from: accounts[0],
             value: web3.utils.toWei(this.state.valueFine, 'ether')
           });
       }

      Router.pushRoute('/childbirth');
     } catch (err) {
       this.setState({ errorMessage: err.message });
     }

     this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h2>BOOK YOUR CHILD BIRTH CERTIFICATE</h2>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Child Name</label>
          <Input
            label="name"
            labelPosition="right"
            value={this.state.child_name}
            onChange={event =>
              this.setState({ child_name: event.target.value })}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Father Name</label>
          <Input
            label="name"
            labelPosition="right"
            value={this.state.father_name}
            onChange={event =>
              this.setState({ father_name: event.target.value })}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Mother Name</label>
          <Input
            label="name"
            labelPosition="right"
            value={this.state.mother_name}
            onChange={event =>
              this.setState({ mother_name: event.target.value })}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Father Adhar Number</label>
          <Input
            label="adhar"
            labelPosition="right"
            value={this.state.father_adhar}
            onChange={event =>
              this.setState({ father_adhar: event.target.value })}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Mother Adhar Number</label>
          <Input
            label="adhar"
            labelPosition="right"
            value={this.state.mother_adhar}
            onChange={event =>
              this.setState({ mother_adhar: event.target.value })}
            required
          />
        </Form.Field>
          <Form.Field>
            <label>Upload Father's Adhar Card</label>
            <Input label="ID proof" labelPosition="right" type='file' onChange={this.captureFile} required></Input>
          </Form.Field>
          <Form.Field>
            <label>Upload Mother's Adhar Card</label>
            <Input label="ID proof" labelPosition="right" type='file' onChange={this.captureFilee} required></Input>
          </Form.Field>
          <Message error header="Seems you are not married" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            CLAIM
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default NewChildBirth;
