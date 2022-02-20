import React, { Component } from 'react';
import { Card, Button, Table, Grid, Step, Divider, Header, Icon, Form, Input, Breadcrumb } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import Layout from '../../components/Layout';
import { Link, Router } from '../../routes';
import web3 from '../../ethereum/web3';

class PublicForeum extends Component {
  state = {
    adhar: "",
    marriageCertificate: [],
    childCertificate: [],
    isMarried: false,
    isDivorced: false
  };

  onCheckPublic = async event =>{
    const summary = await factory.methods.publicCheckDetails(this.state.adhar).call();
    const hMarried = await factory.methods.checkHusbandMarriage(this.state.adhar).call();
    const wMarried = await factory.methods.checkWifeMarriage(this.state.adhar).call();
    if(hMarried === false && wMarried === false){
      this.setState({isMarried: false});
    }else if(hMarried === true || wMarried === true){
      this.setState({isMarried: true});
    }else if(summary[0].length > 0){
      this.setState({isMarried: false, isDivorced: true});
    }
    this.setState({marriageCertificate: summary[0], childCertificate: summary[1]});
  };

  renderMarriageList(){
    const items = this.state.marriageCertificate.map((address, index) => {
        return {
          header: ["MARRIAGE CERTIFICATE ", index],
          description: address,
          extra: (
            <Link route={`/certificate/marriage/${address}`}>
              <a>MARRIAGE CERTIFICATE</a>
            </Link>
          ),
          style: { overflowWrap: 'break-word' },
          fluid: true
        };
      });
      return <Card.Group items={items} />;
  };

  renderChildList(){
    const items = this.state.childCertificate.map((address, index) => {
        return {
          header: ["CHILD CERTIFICATE ", index],
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
                    }}>PUBLIC FOREUM</h1>
                    <Form onSubmit={this.onCheckPublic} >
                      <Form.Field>
                        <label>ENTER ADHAR CARD NUMBER</label>
                        <Input
                          value={this.state.adhar}
                          onChange={event => this.setState({ adhar: event.target.value })}
                          label="number"
                          labelPosition="right"
                        />
                      </Form.Field>
                      <Button primary>
                        CHECK
                      </Button>
                    </Form>
                    <Step.Group centered={true}>
                     <Step link>
                       <Icon name='th large' />
                       <Step.Content>
                         <Step.Title>
                         {this.state.isMarried ? 'MARRIED' : (
                            this.state.isMarried === false && this.state.marriageCertificate.length > 0 ? ('DIVORCED'
                         ) : 'NOT MARRIED')}
                         </Step.Title>
                         <Step.Description>MARITAL STATUS</Step.Description>
                       </Step.Content>
                     </Step>
                     <Step link>
                       <Icon name='child' />
                       <Step.Content>
                         <Step.Title>
                         {this.state.childCertificate.length > 0 ? `Parent of ${this.state.childCertificate.length} child's` : 'NON-PARENT'}
                         </Step.Title>
                         <Step.Description>PARENTIAL STATUS</Step.Description>
                       </Step.Content>
                     </Step>
                    </Step.Group>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={8}>
                          <h3>MARRIAGE CERTIFICATE</h3>
                          <p>Married {this.state.marriageCertificate.length} times</p>
                          <Divider horizontal>
                            <Header as='h4'>
                              <Icon name='tag' />
                              YOUR CERTIFICATE
                            </Header>
                          </Divider>
                          {this.renderMarriageList()}
                        </Grid.Column>

                        <Grid.Column width={8}>
                          <h3>CHILD BIRTH CERTIFICATE</h3>
                          <p>Parent of {this.state.childCertificate.length} child</p>
                          <Divider horizontal>
                            <Header as='h4'>
                              <Icon name='tag' />
                              YOUR CERTIFICATE
                            </Header>
                          </Divider>
                          {this.renderChildList()}
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
        </div>
      </Layout>
    );
  }
}

export default PublicForeum;
