import React, { Component } from 'react';
import { Card, Button, Input, Message, Form } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import Layout from '../../components/Layout';
import { Link, Router } from '../../routes';
import web3 from '../../ethereum/web3';

import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

class NewMarriage extends Component {
  state = {
    h_name: "",
    h_adhar: "",
    h_address: "",
    w_name: "",
    w_adhar: "",
    w_address: "",
    a_name: "",
    a_adhar: "",
    a_address: "",
    h_adhar_hash: "",
    w_adhar_hash: "",
    file: null,
    filee: null,
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
       const created = await client.add(this.state.file);
       const url = `https://ipfs.infura.io/ipfs/${created.path}`;
       this.setState({h_adhar_hash: url});
     } catch (error) {
       console.log(error.message);
       this.setState({ errorMessage: error.message });
     }

     try {
       const createdd = await client.add(this.state.filee);
       const urll = `https://ipfs.infura.io/ipfs/${createdd.path}`;
       this.setState({w_adhar_hash: urll});
     } catch (error) {
       console.log(error.message);
       this.setState({ errorMessage: error.message });
     }

     try {
       const accounts = await web3.eth.getAccounts();
       await factory.methods
         .bookMarriageAppointment(
           this.state.h_name, this.state.h_adhar, this.state.h_address,
            this.state.w_name, this.state.w_adhar, this.state.w_address,
            this.state.a_name, this.state.a_adhar, this.state.a_address, this.state.h_adhar_hash, this.state.w_adhar_hash)
         .send({
           from: accounts[0],
         });

      Router.pushRoute('/marriage');
     } catch (err) {
       this.setState({ errorMessage: err.message });
     }

     this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h2>Book A Marriage Appointment</h2>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Husband Name</label>
          <Input
            label="name"
            labelPosition="right"
            value={this.state.h_name}
            onChange={event =>
              this.setState({ h_name: event.target.value })}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Husband Adhar Number</label>
          <Input
            label="adhar"
            labelPosition="right"
            value={this.state.h_adhar}
            onChange={event =>
              this.setState({ h_adhar: event.target.value })}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Husband Account Address</label>
          <Input
            label="address"
            labelPosition="right"
            value={this.state.h_address}
            onChange={event =>
              this.setState({ h_address: event.target.value })}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Wife Name</label>
          <Input
            label="name"
            labelPosition="right"
            value={this.state.w_name}
            onChange={event =>
              this.setState({ w_name: event.target.value })}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Wife Adhar Number</label>
          <Input
            label="adhar"
            labelPosition="right"
            value={this.state.w_adhar}
            onChange={event =>
              this.setState({ w_adhar: event.target.value })}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Wife Account Address</label>
          <Input
            label="address"
            labelPosition="right"
            value={this.state.w_address}
            onChange={event =>
              this.setState({ w_address: event.target.value })}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Approver Name</label>
          <Input
            label="name"
            labelPosition="right"
            value={this.state.a_name}
            onChange={event =>
              this.setState({ a_name: event.target.value })}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Approver Adhar Number</label>
          <Input
            label="adhar"
            labelPosition="right"
            value={this.state.a_adhar}
            onChange={event =>
              this.setState({ a_adhar: event.target.value })}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Approver Account Address</label>
          <Input
            label="address"
            labelPosition="right"
            value={this.state.a_address}
            onChange={event =>
              this.setState({ a_address: event.target.value })}
            required
          />
        </Form.Field>

          <Form.Field>
            <label>Upload Husband's Adhar Card</label>
            <Input label="ID proof" labelPosition="right" type='file' onChange={this.captureFile} required></Input>
          </Form.Field>
          <Form.Field>
            <label>Upload Wife's Adhar Card</label>
            <Input label="ID proof" labelPosition="right" type='file' onChange={this.captureFilee} required></Input>
          </Form.Field>
          <Message error header="Something Went Wrong" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Book
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default NewMarriage;
