import React, { Component } from 'react';
import { Card, Button, Grid, Divider, Header, Icon, Form, Input } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import Layout from '../../components/Layout';
import { Link, Router } from '../../routes';
import web3 from '../../ethereum/web3';

class Certificate extends Component {
state={
  husband_adhar: "",
  wife_adhar: "",
  marriage_address: "",
  father_adhar: "",
  mother_adhar: "",
  child_certificate: []
};

onGetMarriageCertificates = async event => {
  event.preventDefault();
    const marriageCertificate = await factory.methods.getMarriageCertificate(this.state.husband_adhar, this.state.wife_adhar).call();
    this.setState({marriage_address: marriageCertificate});
    Router.replaceRoute('/certificate');
};

onGetChildCertificate = async event => {
  event.preventDefault();
    const childCertificate = await factory.methods.getChildCertificate(this.state.father_adhar, this.state.mother_adhar).call();
    this.setState({child_certificate: childCertificate});
    Router.replaceRoute('/certificate');
}

renderChildCertificate(){
  const items = this.state.child_certificate.map((address, index) => {
      return {
        header: 'YOUR CHILD BIRTH CERTIFICATE',
        description: address,
        extra: (
          <Link route={`/certificate/child/${address}`}>
            <a>CHILD BIRTH CERTIFICATE</a>
          </Link>
        ),
        style: { overflowWrap: 'break-word' },
        fluid: true
      };
    });
    return <Card.Group items={items} />;
}

  render() {
    return (
      <Layout>
        <div>
          <h1 style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}>ETHEREUM MINED CERTIFICATES.</h1>
                    <br />
                    <br />
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={8}>
                        <h3>MARRIAGE REGISTRY CERTIFICATES</h3>
                        <Form onSubmit={this.onGetMarriageCertificates} >
                          <Form.Field>
                            <label>HUSBAND ADHAR NUMBER</label>
                            <Input
                              value={this.state.husband_adhar}
                              onChange={event => this.setState({ husband_adhar: event.target.value })}
                              label="number"
                              labelPosition="right"
                            />
                          </Form.Field>
                          <Form.Field>
                            <label>WIFE ADHAR NUMBER</label>
                            <Input
                              value={this.state.wife_adhar}
                              onChange={event => this.setState({ wife_adhar: event.target.value })}
                              label="number"
                              labelPosition="right"
                            />
                          </Form.Field>
                          <Button primary>
                            GET CERTIFICATE
                          </Button>
                        </Form>
                        <Divider horizontal>
                          <Header as='h4'>
                            <Icon name='tag' />
                            YOUR CERTIFICATE
                          </Header>
                        </Divider>
                        {this.state.marriage_address.length > 0 && this.state.marriage_address !== '0x0000000000000000000000000000000000000000' ? (
                          <Card fluid>
                            <Card.Content header='MARRIAGE REGISTRY CERTIFICATE' />
                            <Card.Content description={this.state.marriage_address} />
                            <Card.Content extra>
                            <Link route={`/certificate/marriage/${this.state.marriage_address}`}>
                              <a>YOUR CERTIFICATE</a>
                            </Link>
                            </Card.Content>
                          </Card>
                        ) : (<p>No Certificate Found</p>)}
                        </Grid.Column>
                        <Grid.Column width={8}>
                        <h3>CHILD BIRTH CERTIFICATES</h3>
                        <Form onSubmit={this.onGetChildCertificate} >
                          <Form.Field>
                            <label>FATHER ADHAR NUMBER</label>
                            <Input
                              value={this.state.father_adhar}
                              onChange={event => this.setState({ father_adhar: event.target.value })}
                              label="number"
                              labelPosition="right"
                            />
                          </Form.Field>
                          <Form.Field>
                            <label>MOTHER ADHAR NUMBER</label>
                            <Input
                              value={this.state.mother_adhar}
                              onChange={event => this.setState({ mother_adhar: event.target.value })}
                              label="number"
                              labelPosition="right"
                            />
                          </Form.Field>
                          <Button primary>
                            GET CERTIFICATE
                          </Button>
                          </Form>
                          <Divider horizontal>
                            <Header as='h4'>
                              <Icon name='tag' />
                              YOUR CERTIFICATE
                            </Header>
                          </Divider>
                          {this.renderChildCertificate()}
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
        </div>
      </Layout>
    );
  }
}
export default Certificate;
