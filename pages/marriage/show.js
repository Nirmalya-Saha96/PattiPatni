import React, { Component, useState } from 'react';
import { Card, Button, Icon, Divider, Header, Grid, Input, Message, Form, Image, Step } from 'semantic-ui-react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import factory from '../../ethereum/factory';
import Layout from '../../components/Layout';
import ApproveMarriageForm from '../../components/ApproveMarriageForm';
import WifeMarriageForm from '../../components/WifeMarriageForm';
import HusbandMarriageForm from '../../components/HusbandMarriageForm';
import { Link, Router } from '../../routes';
import web3 from '../../ethereum/web3';

class ShowMarriageApplication extends Component {
  static async getInitialProps(props) {
    const appointMarriageRequest = await factory.methods.appointMarriage(props.query.index).call();
    const appointMarriageAddressRequest = await factory.methods.appointMarriageAddress(props.query.index).call();
    const workRequest = await factory.methods.work(props.query.index).call();
    const accounts = await web3.eth.getAccounts();
    const curr_account = accounts[0];

    return {
      index: props.query.index,
      appointMarriageRequest,
      appointMarriageAddressRequest,
      workRequest,
      curr_account
    };
  }

  renderCards() {
    const {
      appointMarriageRequest,
      appointMarriageAddressRequest,
      workRequest
    } = this.props;

    const items = [
      {
        header: appointMarriageRequest.husbandName,
        meta: 'HUSBAND',
        extra: (
          <CopyToClipboard text={appointMarriageRequest.husbandName}>
            <a><Icon name='copy' /> Copy</a>
          </CopyToClipboard>
        )
      },
      {
        header: appointMarriageRequest.wifeName,
        meta: 'WIFE',
        extra: (
          <CopyToClipboard text={appointMarriageRequest.wifeName}>
            <a><Icon name='copy' /> Copy</a>
          </CopyToClipboard>
        )
      },
      {
        header: appointMarriageRequest.approverName,
        meta: 'APPROVER',
        extra: (
          <CopyToClipboard text={appointMarriageRequest.approverName}>
            <a><Icon name='copy' /> Copy</a>
          </CopyToClipboard>
        ),
        style: { overflowWrap: 'break-word' }
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h1>MARRIAGE APPOINTMENT STATUS</h1>
        <br />
	           <Step.Group ordered>
                {this.props.workRequest.isApprove ?(
                  <Step completed  style={ { overflowWrap: 'break-word'} }>
                    <Step.Content>
                      <Step.Title>APPROVER</Step.Title>
                      <Step.Description>Your marriage has to me approve by atleast one person</Step.Description>
                    </Step.Content>
                  </Step>
                ):(
                  <Step active>
                    <Step.Content>
                      <Step.Title>APPROVER</Step.Title>
                      <Step.Description>Your marriage has to me approve by atleast one person</Step.Description>
                    </Step.Content>
                  </Step>
                )}
                {this.props.workRequest.signature ?(
                  <Step completed>
                    <Step.Content>
                      <Step.Title>WIFE SIGNATURE</Step.Title>
                      <Step.Description>Wife has to sign</Step.Description>
                    </Step.Content>
                  </Step>
                ):(
                  <Step active>
                    <Step.Content>
                      <Step.Title>WIFE SIGNATURE</Step.Title>
                      <Step.Description>Wife has to sign</Step.Description>
                    </Step.Content>
                  </Step>
                )}
                {this.props.workRequest.isComplete ?(
                  <Step completed>
                    <Step.Content>
                      <Step.Title>HUSBAND FORMALITIES</Step.Title>
                      <Step.Description>Husband has to upload vedio proofs of ring and vow ceremony</Step.Description>
                    </Step.Content>
                  </Step>
                ):(
                  <Step active>
                    <Step.Content>
                    <Step.Title>HUSBAND FORMALITIES</Step.Title>
                    <Step.Description>Husband has to upload vedio proofs of ring and vow ceremony</Step.Description>
                    </Step.Content>
                  </Step>
                )}
                </Step.Group>
        <Grid>
          <Grid.Row>
            <Grid.Column width={9}>
              {this.renderCards()}
            </Grid.Column>

            <Grid.Column width={7}>
            <Card style={{overflowWrap: 'break-word'}} >
               <Card.Content>
                 <Image
                   floated='right'
                   size='mini'
                   src='data:image/png;base64,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'
                 />
                 <Card.Header>Your Credentials</Card.Header>
                 <Card.Meta>Roles and Responsibilities</Card.Meta>
                 <Card.Description>
                   Displays your role <strong>HUSBAND/WIFE/APPROVER</strong>
                 </Card.Description>
               </Card.Content>
               <Card.Content extra>
               {this.props.curr_account === this.props.appointMarriageAddressRequest.husbandAddress ?
                 (
                   <Button color="green" style={{overflowWrap: 'break-word'}}>
                     HUSBAND
                   </Button>
                 )
                  : (
                 this.props.curr_account === this.props.appointMarriageAddressRequest.wifeAddress ? (
                   <Button color="yellow" style={{overflowWrap: 'break-word'}}>
                     WIFE
                   </Button>
                 ) : (
                    this.props.curr_account === this.props.appointMarriageAddressRequest.approverAddress ? (
                      <Button color="red" style={{overflowWrap: 'break-word'}}>
                        APPROVER
                      </Button>
                    ): null
                 )
               )}
               </Card.Content>
             </Card>
             <Divider horizontal>
               <Header as='h4'>
                 <Icon name='tag' />
                 BEING AN APPROVER
               </Header>
             </Divider>
             <ApproveMarriageForm index={this.props.index} />
             <Divider horizontal>
               <Header as='h4'>
                 <Icon name='tag' />
                 WIFE SIGNATURE
               </Header>
             </Divider>
             <WifeMarriageForm index={this.props.index} />
             <Divider horizontal>
               <Header as='h4'>
                 <Icon name='tag' />
                 HUSBAND FORMALITIES
               </Header>
             </Divider>
             <HusbandMarriageForm index={this.props.index} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default ShowMarriageApplication;
