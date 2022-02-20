import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class WifeMarriageForm extends Component {
  state = {
    adhar_number: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.wifeSignature(this.state.adhar_number, this.props.index).send({
        from: accounts[0]
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
        <Message error header="Something Went Wrong" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          WIFE SIGNATURE
        </Button>
      </Form>
    );
  }
}

export default WifeMarriageForm;
