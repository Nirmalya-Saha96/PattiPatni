import React, { Component } from 'react';
import { Card, Button, Table, Grid, Step, Divider, Header, Icon, Form, Input, Breadcrumb } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import Layout from '../../components/Layout';
import MarriageRow from '../../components/MarriageRow';
import ChildRow from '../../components/ChildRow';
import DivorceRow from '../../components/DivorceRow';
import { Link, Router } from '../../routes';
import web3 from '../../ethereum/web3';

class Government extends Component {
  state = {
    government_address: "0x5c3F4c0D5b2b6C62669f9a4976b09C0B8a1D4fc0",
    husband_adhar: "",
    wife_adhar: "",
    adhar_number: "",
    isMarried: false,
    childCount: 0,
    singleChildCount: 0,
    type: 0,
    isDivorced: false,
    singleMarriageCount: 0
  };

  static async getInitialProps() {
    const appointCount = await factory.methods.getAppointMarriageCount().call();
    const childCount = await factory.methods.getChildRequestCount().call();
    const divorceCount = await factory.methods.getDivorceCount().call();
    const summary = await factory.methods.getSummary().call();

    const appointRequest = await Promise.all(
      Array(parseInt(appointCount))
        .fill()
        .map((element, index) => {
          return factory.methods.appointMarriage(index).call();
        })
    );

    const workRequest = await Promise.all(
      Array(parseInt(appointCount))
        .fill()
        .map((element, index) => {
          return factory.methods.work(index).call();
        })
    );

    const childRequest = await Promise.all(
      Array(parseInt(childCount))
        .fill()
        .map((element, index) => {
          return factory.methods.child(index).call();
        })
    );

    const divorceRequest = await Promise.all(
      Array(parseInt(divorceCount))
        .fill()
        .map((element, index) => {
          return factory.methods.divorce(index).call();
        })
    );

    return { appointCount, summary, appointRequest, workRequest, childCount, childRequest, divorceRequest, divorceCount };
  }

  onBothCheck = async event => {
    event.preventDefault();
      const checkMarriage = await factory.methods.checkMarried(this.state.husband_adhar, this.state.wife_adhar).call();
      const birth = await factory.methods.getChildCount(this.state.husband_adhar, this.state.wife_adhar).call();
      const checkSingleHusband = await factory.methods.publicCheckDetails(this.state.husband_adhar).call();
      const checkSingleWife = await factory.methods.publicCheckDetails(this.state.wife_adhar).call();
      if(checkSingleHusband[0].length > 0 && checkSingleWife[0].length > 0){
        this.setState({isMarried: checkMarriage, childCount: birth, isDivorced: true });
      }else{
        this.setState({isMarried: checkMarriage, childCount: birth, isDivorced: false });
      }
      Router.replaceRoute('/government');
  };

  onSingleCheck = async event => {
    event.preventDefault();
      const checkSingle = await factory.methods.publicCheckDetails(this.state.adhar_number).call();
      this.setState({singleMarriageCount: checkSingle[0].length, singleChildCount: checkSingle[1].length});
      Router.replaceRoute('/government');
  };

  onTransfer = async () => {
    const accounts = await web3.eth.getAccounts();
    await factory.methods.moneyTransfer(this.state.government_address).send({
      from: accounts[0]
    });
  }

  renderRows() {
    return this.props.appointRequest.map((check, index) => {
      if(this.props.workRequest[index].isComplete){
        return (
          <MarriageRow
            key={index}
            id={index}
            check={check}
            work={this.props.workRequest[index]}
          />
        );
      }
    });
  }

  renderChildRows(){
    return this.props.childRequest.map((check, index) => {
        return (
          <ChildRow
            key={index}
            id={index}
            check={check}
          />
        );
    });
  }

  renderDivorceRows(){
    return this.props.divorceRequest.map((check, index) => {
        return (
          <DivorceRow
            key={index}
            id={index}
            check={check}
          />
        );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <div>
          <h1 style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}>GOVERNMENT CONTROL PANEL</h1>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={8}>
                        <h3> CHECK COUPLE STATUS</h3>
                          <Step.Group>
                           <Step link>
                             <Icon name='th large' />
                             <Step.Content>
                               <Step.Title>
                               {this.state.isMarried ? 'MARRIED' : (
                                  this.state.isDivorced ? ('DIVORCED'
                               ) : 'NOT MARRIED')}
                               </Step.Title>
                               <Step.Description>MARITAL STATUS</Step.Description>
                             </Step.Content>
                           </Step>
                           <Step link>
                             <Icon name='child' />
                             <Step.Content>
                               <Step.Title>
                               {this.state.childCount > 0 ? `Parent of ${this.state.childCount} child's` : 'NON-PARENT'}
                               </Step.Title>
                               <Step.Description>CHILD BIRTH</Step.Description>
                             </Step.Content>
                           </Step>
                          </Step.Group>
                          <Form onSubmit={this.onBothCheck} >
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
                              CHECK
                            </Button>
                          </Form>
                        </Grid.Column>

                        <Grid.Column width={8}>
                        <h3>INDIVIDUAL CREDENTIALS</h3>
                        <Step.Group>
                         <Step link>
                           <Icon name='th large' />
                           <Step.Content>
                             <Step.Title>{`Married ${this.state.singleMarriageCount} times`}</Step.Title>
                             <Step.Description>MARITAL STATUS</Step.Description>
                           </Step.Content>
                         </Step>
                         <Step link>
                           <Icon name='child' />
                           <Step.Content>
                             <Step.Title>{`Parent of ${this.state.singleChildCount}`}</Step.Title>
                             <Step.Description>CHILD BIRTH</Step.Description>
                           </Step.Content>
                         </Step>
                        </Step.Group>

                        <Form onSubmit={this.onSingleCheck} >
                          <Form.Field>
                            <label>ADHAR NUMBER</label>
                            <Input
                              value={this.state.adhar_number}
                              onChange={event => this.setState({ adhar_number: event.target.value })}
                              label="number"
                              labelPosition="right"
                            />
                          </Form.Field>
                          <Button primary>
                            CHECK
                          </Button>
                        </Form>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>

                    <Divider horizontal>
                      <Header as='h4'>
                        <Icon name='tag' />
                        APPLICATIONS PENDING
                      </Header>
                    </Divider>

                    <Button.Group color='blue'>
                      <Button onClick={()=> this.setState({type: 0})}>MARRIAGE REGISTERS</Button>
                      <Button onClick={()=> this.setState({type: 1})}>CHILD BIRTH</Button>
                      <Button onClick={()=> this.setState({type: 2})}>DIVORCE FILLED</Button>
                    </Button.Group>

                    <Breadcrumb floated='right'>
                      <Breadcrumb.Section link>{`Total Marriage ${this.props.summary[0]}`}</Breadcrumb.Section>
                      <Breadcrumb.Divider />
                      <Breadcrumb.Section link>{`Total Birth ${this.props.summary[1]}`}</Breadcrumb.Section>
                      <Breadcrumb.Divider icon='right angle' />
                      <Breadcrumb.Section active>
                        <Button onClick={this.onTransfer}>TRANSFER</Button>
                      </Breadcrumb.Section>
                    </Breadcrumb>
                    {this.state.type === 0 ? (
                      <Table>
                        <Header>
                          <Row>
                            <HeaderCell>NAME INFO</HeaderCell>
                            <HeaderCell>ADHAR CARDS INFO</HeaderCell>
                            <HeaderCell>Husband ID</HeaderCell>
                            <HeaderCell>Wife ID</HeaderCell>
                            <HeaderCell>VOW VIDEO</HeaderCell>
                            <HeaderCell>RING CEREMONY</HeaderCell>
                            <HeaderCell>APPROVE</HeaderCell>
                          </Row>
                        </Header>
                        <Body>{this.renderRows()}</Body>
                      </Table>
                    ):(this.state.type === 1 ?(
                      <Table>
                        <Header>
                          <Row>
                            <HeaderCell>CHILD NAME</HeaderCell>
                            <HeaderCell>FATHER NAME</HeaderCell>
                            <HeaderCell>MOTHER NAME</HeaderCell>
                            <HeaderCell>Father Adhar</HeaderCell>
                            <HeaderCell>Mother Adhar</HeaderCell>
                            <HeaderCell>FATHER ID</HeaderCell>
                            <HeaderCell>MOTHER ID</HeaderCell>
                            <HeaderCell>APPROVE</HeaderCell>
                          </Row>
                        </Header>
                        <Body>{this.renderChildRows()}</Body>
                      </Table>
                    ) : (
                      <Table>
                        <Header>
                          <Row>
                            <HeaderCell>HUSBAND NAME</HeaderCell>
                            <HeaderCell>WIFE NAME</HeaderCell>
                            <HeaderCell>HUSBAND ADHAR</HeaderCell>
                            <HeaderCell>WIFE ADHAR</HeaderCell>
                            <HeaderCell>STAMP COURT PAPER</HeaderCell>
                            <HeaderCell>APPROVE</HeaderCell>
                          </Row>
                        </Header>
                        <Body>{this.renderDivorceRows()}</Body>
                      </Table>
                    )
                    )}
        </div>
      </Layout>
    );
  }
}

export default Government;
