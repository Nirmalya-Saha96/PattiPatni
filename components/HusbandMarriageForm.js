import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

class HusbandMarriageForm extends Component {
  state = {
    vHash: "",
    rHash: "",
    adhar_number: "",
    value: "0.1",
    vFile: null,
    rFile: null,
    errorMessage: '',
    loading: false
  };

  captureFile = (e) => {
     const data = e.target.files[0];
     const reader = new window.FileReader();
     reader.readAsArrayBuffer(data);

     reader.onloadend = () => {
       this.setState({vFile: Buffer(reader.result)});
     };

     e.preventDefault();
   }

   captureFilee = (e) => {
      const data = e.target.files[0];
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(data);

      reader.onloadend = () => {
        this.setState({rFile: Buffer(reader.result)});
      };

      e.preventDefault();
    }

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      // const created = await client.add(this.state.vFile);
      // const url = `https://ipfs.infura.io/ipfs/${created.path}`;
      const url = 'https://www.youtube.com/embed/3RU1zEbnssE';
      this.setState({vHash: url});
    } catch (error) {
      console.log(error.message);
      this.setState({ errorMessage: error.message });
    }

    try {
      // const created = await client.add(this.state.rFile);
      // const url = `https://ipfs.infura.io/ipfs/${created.path}`;
      const url = 'https://us.123rf.com/450wm/alexraths/alexraths2101/alexraths210100031/163769152-broken-gold-wedding-rings-as-divorce-symbol-isolated-on-white-background-3d-render-.jpg?ver=6';
      this.setState({rHash: url});
    } catch (error) {
      console.log(error.message);
      this.setState({ errorMessage: error.message });
    }

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.uploadHusband(this.state.vHash, this.state.rHash, this.state.adhar_number, this.props.index).send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });

      Router.replaceRoute(`/marriage/${this.props.index}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: '' });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>ADHAR NUMBER</label>
          <Input
            value={this.state.adhar_number}
            onChange={event => this.setState({ adhar_number: event.target.value })}
            label="number"
            labelPosition="right"
          />
        </Form.Field>
        <Form.Field>
          <label>UPLOAD VOW TAKING VIDEO</label>
          <Input label="vow" labelPosition="right" type='file' onChange={this.captureFile} required></Input>
        </Form.Field>
        <Form.Field>
          <label>UPLOAD RING CERIMONY COUPLE PICTURE</label>
          <Input label="ring-picture" labelPosition="right" type='file' onChange={this.captureFilee} required></Input>
        </Form.Field>
        <Message error header="Something Went Wrong" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          HUSBAND FORMALITIES
        </Button>
      </Form>
    );
  }
}

export default HusbandMarriageForm;
