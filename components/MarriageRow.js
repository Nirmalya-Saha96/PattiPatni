import React, { Component } from 'react';
import { Table, Button, Message, Icon } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import { Router } from '../routes';

class MarriageRow extends Component {
  state = {
    loading: false
  };

  onMarriageApprove = async () => {
    this.setState({ loading: true });
      const accounts = await web3.eth.getAccounts();
      await factory.methods.governmentMarriageCertificate(this.props.id).send({
        from: accounts[0]
      });
      Router.replaceRoute(`/government`);
    this.setState({ loading: false });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, check, work } = this.props;

    return (
      <Row positive={!work.isCertified}>
        <Cell>{`Husband: ${check.husbandName} \n Wife: ${check.wifeName} \n Approver: ${check.approverName}`}</Cell>
        <Cell>{`Husband: ${check.husbandAdhar} \n Wife: ${check.wifeAdhar} \n Approver: ${check.approverAdhar}`}</Cell>
        <Cell>
          <Button color='yellow'><a target='blank' href={check.husbandAdharHash}><Icon name='check circle outline' /></a></Button>
        </Cell>
        <Cell>
          <Button color='yellow'><a target='blank' href={check.wifeAdharHash}><Icon name='check circle outline' /></a></Button>
        </Cell>
        <Cell>
          <Button color='yellow'><a target='blank' href={work.vowHash}><Icon name='check circle outline' /></a></Button>
        </Cell>
        <Cell>
          <Button color='yellow'><a target='blank' href={work.ringHash}><Icon name='check circle outline' /></a></Button>
        </Cell>
        <Cell>
          {work.isCertified ? null : (
            <Button loading={this.state.loading} color="green" onClick={this.onMarriageApprove}>
              Approve
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default MarriageRow;
