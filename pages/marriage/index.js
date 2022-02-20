import React, { Component } from 'react';
import { Card, Button, Grid, Form, Input, Divider, Header, Icon } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import Layout from '../../components/Layout';
import { Link } from '../../routes';

class Marriage extends Component {
  state={
    search_adhar: "",
    type: 0,
    search: false
  };

  static async getInitialProps() {
    const requestLength = await factory.methods.getAppointMarriageCount().call();
    const requests = await Promise.all(
      Array(parseInt(requestLength))
        .fill()
        .map((element, index) => {
          return factory.methods.appointMarriage(index).call();
        })
    );
    const workRequests = await Promise.all(
      Array(parseInt(requestLength))
        .fill()
        .map((element, index) => {
          return factory.methods.work(index).call();
        })
    );

    return { requestLength, requests, workRequests };
  }

  handleChange = event => this.setState({search_adhar: event.target.value});
 
  renderCards(){
    if(this.state.type === 0){
      const fill = this.props.requests.filter(profile => (
                 profile.husbandAdhar.includes(this.state.search_adhar.toLowerCase())
              ));
              const items = fill.map((address, index) => {
                if(this.props.workRequests[address.index].isCertified === false && this.props.workRequests[address.index].isComplete === false){
                  return {
                    header: [address.husbandName, " and ", address.wifeName],
                    description: (
                      ["Approver is: ", address.approverName]
                    ),
                    extra: (
                      <Link route={`/marriage/${address.index}`}>
                        <a>VIEW MARRIAGE APPOINTMENT</a>
                      </Link>
                    ),
                    style: { overflowWrap: 'break-word' },
                    fluid: true
                  };
                }
                else if(this.props.workRequests[address.index].isCertified === false && this.props.workRequests[address.index].isComplete === true){
                  return {
                    header: [address.husbandName, " and ", address.wifeName],
                    description: (
                      ["Approver is: ", address.approverName]
                    ),
                    extra: (
                      <p>APPLICATION UNDER REVIEW</p>
                    ),
                    style: { overflowWrap: 'break-word' },
                    fluid: true
                  };
                }
                else if(this.props.workRequests[address.index].isCertified === true){
                  return {
                    header: [address.husbandName, " and ", address.wifeName],
                    description: (
                      ["Approver is: ", address.approverName]
                    ),
                    extra: (
                      <p>APPLICATION APPROVED</p>
                    ),
                    style: { overflowWrap: 'break-word' },
                    fluid: true
                  };
                }
              });

              return <Card.Group items={items} />;
              this.setState({search: false});
    }else if(this.state.type === 1){
      const fill = this.props.requests.filter(profile => (
                 profile.wifeAdhar.includes(this.state.search_adhar.toLowerCase())
              ));
              const items = fill.map((address, index) => {
                if(this.props.workRequests[address.index].isCertified === false && this.props.workRequests[address.index].isComplete === false){
                    return {
                      header: [address.husbandName, " and ", address.wifeName],
                      description: (
                        ["Approver is: ", address.approverName]
                      ),
                      extra: (
                        <Link route={`/marriage/${address.index}`}>
                          <a>VIEW MARRIAGE APPOINTMENT</a>
                        </Link>
                      ),
                      style: { overflowWrap: 'break-word' },
                      fluid: true
                    };
                }
                else if(this.props.workRequests[address.index].isCertified === false && this.props.workRequests[address.index].isComplete === true){
                    return {
                      header: [address.husbandName, " and ", address.wifeName],
                      description: (
                        ["Approver is: ", address.approverName]
                      ),
                      extra: (
                        <p>APPLICATION UNDER REVIEW</p>
                      ),
                      style: { overflowWrap: 'break-word' },
                      fluid: true
                    };
                }
                else if(this.props.workRequests[address.index].isCertified === true){
                    return {
                      header: [address.husbandName, " and ", address.wifeName],
                      description: (
                        ["Approver is: ", address.approverName]
                      ),
                      extra: (
                        <p>APPLICATION APPROVED</p>
                      ),
                      style: { overflowWrap: 'break-word' },
                      fluid: true
                    };
                }
              });

              return <Card.Group items={items} />;
              this.setState({search: false});
    }else{
      const fill = this.props.requests.filter(profile => (
                 profile.approverAdhar.includes(this.state.search_adhar.toLowerCase())
              ));
              const items = fill.map((address, index) => {
                if(this.props.workRequests[address.index].isCertified === false && this.props.workRequests[address.index].isComplete === false){
                  return {
                    header: [address.husbandName, " and ", address.wifeName],
                    description: (
                      ["Approver is: ", address.approverName]
                    ),
                    extra: (
                      <Link route={`/marriage/${address.index}`}>
                        <a>VIEW MARRIAGE APPOINTMENT</a>
                      </Link>
                    ),
                    style: { overflowWrap: 'break-word' },
                    fluid: true
                  };
                }
                else if(this.props.workRequests[address.index].isCertified === false && this.props.workRequests[address.index].isComplete === true){
                  return {
                    header: [address.husbandName, " and ", address.wifeName],
                    description: (
                      ["Approver is: ", address.approverName]
                    ),
                    extra: (
                      <p>APPLICATION UNDER REVIEW</p>
                    ),
                    style: { overflowWrap: 'break-word' },
                    fluid: true
                  };
                }
                else if(this.props.workRequests[address.index].isCertified === true){
                  return {
                    header: [address.husbandName, " and ", address.wifeName],
                    description: (
                      ["Approver is: ", address.approverName]
                    ),
                    extra: (
                      <p>APPLICATION APPROVED</p>
                    ),
                    style: { overflowWrap: 'break-word' },
                    fluid: true
                  };
                }
              });

              return <Card.Group items={items} />;
              this.setState({search: false});
    }
  }

  render() {
    return (
      <Layout>
        <br />
        <div>
          <Link route='/marriage/new'>
            <Button
              floated="right"
              basic
              color='yellow'
              content='Marriage Appointment'
              icon='add'
              label={{
                as: 'a',
                basic: true,
                color: 'yellow',
                pointing: 'left',
                content: [this.props.requestLength],
              }}
            />
          </Link>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
              <Button.Group vertical labeled icon>
                <Button icon='male' content='HUSBAND' onClick={()=> this.setState({type: 0, search_adhar: "", search: false})} primary />
                <Button icon='female' content='WIFE' onClick={()=> this.setState({type: 1, search_adhar: "", search: false})} primary />
                <Button icon='plus' content='APPROVER' onClick={()=> this.setState({type: 2, search_adhar: "", search: false})} primary />
              </Button.Group>
              </Grid.Column>
              <Grid.Column width={12}>
                <Form onSubmit={()=> this.setState({search: true})}>
                  <Form.Field>
                    <label>Adhar Card Number</label>
                    <Input
                      label="Number"
                      labelPosition="right"
                      value={this.state.search_adhar}
                      onChange={this.handleChange}
                      required
                    />
                  </Form.Field>
                  {this.state.type === 0 ? (
                    <Button primary>
                      HUSBAND
                    </Button>
                  ) : (
                    this.state.type === 1 ? (
                      <Button primary>
                        WIFE
                      </Button>
                    ) : (
                      <Button primary>
                        APPROVER
                      </Button>
                  )
                  )}
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {this.state.search ? this.renderCards()
          :(
            <Divider horizontal>
              <Header as='h4'>
                <Icon name='tag' />
                NOT FOUND
              </Header>
            </Divider>
          )}

        </div>
      </Layout>
    );
  }
}

export default Marriage;
