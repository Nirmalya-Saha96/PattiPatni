import React, { Component, useState } from 'react';
import { Card, Button, Icon, Divider, Header, Modal, Grid, Feed, Image } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import certificate from '../../ethereum/certificate';
import Layout from '../../components/Layout';
import { Link, Router } from '../../routes';
import web3 from '../../ethereum/web3';

class BirthCertificate extends Component {
  state={
    open: true
  };

  static async getInitialProps(props) {
    const marriageCertificate = certificate(props.query.address);
    const summary = await marriageCertificate.methods.getCertificate().call();

    return {
      address: props.query.address,
      summary
    };
  }

  render() {
    return (
      <Layout>
      <h1>ETHEREUM MINED BIRTH CERTIFICATE</h1>

      <br />
      <br />

        <Modal
          basic
	        style={{'paddingBottom': '100px', 'marginTop': '0px', 'marginBottom': '50px'}}
	        centered={true}
          onClose={() => this.setState({open: false})}
          onOpen={() => this.setState({open: true})}
          open={this.state.open}
          size='large'
          trigger={<Button fluid color='blue'>CERTIFICATE OF BIRTH</Button>}
        >
          <Header style={{'marginBottom': '85px'}} icon>
            <Icon name='certificate' />
            ETHEREUM MINED BIRTH CERTIFICATE
          </Header>
          <Modal.Content style={{'paddingLeft': '65px', 'paddingRight': '65px'}}>
            <p style={{'margin': '25px'}}>
              This certifies that {this.props.summary[4]} was borned under Ethereum law.
            </p>
            <p style={{'margin': '25px'}}>
              to {this.props.summary[0]} and {this.props.summary[2]}
            </p>
          </Modal.Content>
          <Modal.Actions style={{'marginBottom': '85px'}}>
            <Button style={{'marginBottom': '85px', 'padding': '10px'}} color='green' inverted onClick={() => this.setState({open: false})}>
              <Icon name='checkmark' /> VIEW RECORD OF PROOF
            </Button>
          </Modal.Actions>
        </Modal>

        <br />
        <br />

        <Divider horizontal>
          <Header as='h4'>
            <Icon name='tag' />
            PROOF OF RECORDS
          </Header>
        </Divider>

        <br />
        <br />

        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Card>
                <Card.Content>
                  <Card.Header>ADHAR CARD NUMBERS</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Feed>
                    <Feed.Event>
                      <Feed.Label><Icon name='id card' /></Feed.Label>
                      <Feed.Content>
                        <Feed.Date content='FATHER' />
                        <Feed.Summary>
                          {this.props.summary[1]}
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                      <Feed.Label><Icon name='id card' /></Feed.Label>
                      <Feed.Content>
                        <Feed.Date content='MOTHER' />
                        <Feed.Summary>
                          {this.props.summary[3]}
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                </Card.Content>
              </Card>

              <br />
              <br />
              <br />


              <Card>
                <Card.Content>
                  <Card.Header>NAME OF CHILD</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Feed>
                    <Feed.Event>
                      <Feed.Label><Icon name='id card' /></Feed.Label>
                      <Feed.Content>
                        <Feed.Date content='APPROVER' />
                        <Feed.Summary>
                          {this.props.summary[4]}
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                </Card.Content>
              </Card>
           </Grid.Column>
            <Grid.Column width={12}>
              <h2 style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}>FATHER ID PROOF</h2>

              <br />
              <br />

              <Image
               src={this.props.summary[5]} fluid
               as='a'
               size='medium'
               centered
               href={this.props.summary[5]}
               target='_blank'
             />

             <br />

             <h2 style={{
                         display: "flex",
                         justifyContent: "center",
                         alignItems: "center"
                       }}>MOTHER ID PROOF</h2>

             <br />
             <br />

             <Image
              src={this.props.summary[6]} fluid
              as='a'
              size='medium'
              centered
              href={this.props.summary[6]}
              target='_blank'
            />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default BirthCertificate;
