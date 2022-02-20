import React, { Component } from 'react';
import { Table, Button, Message, Icon } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import { Router } from '../routes';

class DivorceRow extends Component {
  state = {
    loading: false
  };

  onDivorceApprove = async () => {
    this.setState({ loading: true });
      const accounts = await web3.eth.getAccounts();
      await factory.methods.governmentCertifyDivorce(this.props.id).send({
        from: accounts[0]
      });
      Router.replaceRoute(`/government`);
    this.setState({ loading: false });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, check } = this.props;

    return (
      <Row positive={!check.isCertified}>
        <Cell>{check.husbandName}</Cell>
        <Cell>{check.wifeName}</Cell>
        <Cell>{check.husbandAdhar}</Cell>
        <Cell>{check.wifeAdhar}</Cell>
        <Cell>
          <Button color='yellow'><a target='blank' href={check.certificate}><Icon name='check circle outline' /></a></Button>
        </Cell>
        <Cell>
          {check.isCertified ? null : (
            <Button loading={this.state.loading} color="green" onClick={this.onDivorceApprove}>
              Approve
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default DivorceRow;
