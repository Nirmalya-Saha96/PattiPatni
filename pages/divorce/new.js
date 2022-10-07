import React, { Component } from 'react';
import { Card, Button, Input, Message, Form } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import Layout from '../../components/Layout';
import { Link, Router } from '../../routes';
import web3 from '../../ethereum/web3';

import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

class NewDivorce extends Component {
  state = {
    husband_name: "",
    wife_name: "",
    husband_adhar: "",
    wife_adhar: "",
    certificate_hash: "",
    file: null,
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

 onSubmit = async (e) => {
     e.preventDefault();

     this.setState({ loading: true, errorMessage: '' });

     try {
       // const created = await client.add(this.state.file);
       // const url = `https://ipfs.infura.io/ipfs/${created.path}`;
       const url = 'https://images.template.net/469/Boy-Birth-Certificate--2X.jpg';
       this.setState({certificate_hash: url});
     } catch (error) {
       console.log(error.message);
       this.setState({ errorMessage: error.message });
     }

     try {
       const accounts = await web3.eth.getAccounts();
       await factory.methods
         .claimDivorce(
           this.state.husband_name, this.state.wife_name, this.state.husband_adhar, this.state.wife_adhar, this.state.certificate_hash)
         .send({
           from: accounts[0]
         });

      Router.pushRoute('/divorce');
     } catch (err) {
       this.setState({ errorMessage: err.message });
     }

     this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h2>CLAIM DIVORCE</h2>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Husband Name</label>
          <Input
            label="name"
            labelPosition="right"
            value={this.state.husband_name}
            onChange={event =>
              this.setState({ husband_name: event.target.value })}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Wife Name</label>
          <Input
            label="name"
            labelPosition="right"
            value={this.state.wife_name}
            onChange={event =>
              this.setState({ wife_name: event.target.value })}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Husband Adhar Number</label>
          <Input
            label="adhar"
            labelPosition="right"
            value={this.state.husband_adhar}
            onChange={event =>
              this.setState({ husband_adhar: event.target.value })}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Wife Adhar</label>
          <Input
            label="adhar"
            labelPosition="right"
            value={this.state.wife_adhar}
            onChange={event =>
              this.setState({ wife_adhar: event.target.value })}
            required
          />
        </Form.Field>
          <Form.Field>
            <label>Upload Divorce Stampped Certificate Court</label>
            <Input label="stamp paper" labelPosition="right" type='file' onChange={this.captureFile} required></Input>
          </Form.Field>
          <Message error header="Not Married Couple" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            CLAIM DIVORCE
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default NewDivorce;
