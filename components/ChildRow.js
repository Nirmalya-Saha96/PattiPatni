import React, { Component } from 'react';
import { Table, Button, Message, Icon } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import { Router } from '../routes';

class ChildRow extends Component {
  state = {
    loading: false
  };

  onChildBirthApprove = async () => {
    this.setState({ loading: true });
      const accounts = await web3.eth.getAccounts();
      await factory.methods.governmentChildCertificate(this.props.id).send({
        from: accounts[0]
      });
      Router.replaceRoute(`/government`);
    this.setState({ loading: false });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, check } = this.props;

    return (
      <Row positive={!check.isApproved}>
        <Cell>{check.childName}</Cell>
        <Cell>{check.fatherName}</Cell>
        <Cell>{check.MotherName}</Cell>
        <Cell>{check.fatherAdhar}</Cell>
        <Cell>{check.motherAdhar}</Cell>
        <Cell>
          <Button color='yellow'><a target='blank' href={check.fatherHash}><Icon name='check circle outline' /></a></Button>
        </Cell>
        <Cell>
          <Button color='yellow'><a target='blank' href={check.motherHash}><Icon name='check circle outline' /></a></Button>
        </Cell>
        <Cell>
          {check.isApproved ? null : (
            <Button loading={this.state.loading} color="green" onClick={this.onChildBirthApprove}>
              Approve
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default ChildRow;
