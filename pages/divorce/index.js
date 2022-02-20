import React, { Component } from 'react';
import { Card, Button, Grid, Form, Input, Divider, Header, Icon } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import Layout from '../../components/Layout';
import { Link } from '../../routes';

class Divorce extends Component {
  state={
    search_adhar: "",
    type: 0,
    search: false
  };

  static async getInitialProps() {
    const requestLength = await factory.methods.getDivorceCount().call();
    const requests = await Promise.all(
      Array(parseInt(requestLength))
        .fill()
        .map((element, index) => {
          return factory.methods.divorce(index).call();
        })
    );

    return { requestLength, requests };
  }

  renderCards(){
    if(this.state.type === 0){
      const fill = this.props.requests.filter(profile => (
                 profile.husbandAdhar.includes(this.state.search_adhar.toLowerCase())
              ));
              const items = fill.map((address, index) => {
                if(address.isCertified === false ){
                  return {
                    header: [address.husbandName, " and ", address.wifeName],
                    description: (
                      <Button primary><a target="blank" href={address.certificate}>DIVORCE FILE</a></Button>
                    ),
                    extra: (
                      <a>APPLICATION UNDER REVIEW</a>
                    ),
                    style: { overflowWrap: 'break-word' },
                    fluid: true
                  };
                }
                else {
                  return {
                    header: [address.husbandName, " and ", address.wifeName],
                    description: (
                      <Button primary><a target="blank" href={address.certificate}>DIVORCE FILE</a></Button>
                    ),
                    extra: (
                      <p>APPROVED</p>
                    ),
                    style: { overflowWrap: 'break-word' },
                    fluid: true
                  };
                }
              });

              return <Card.Group items={items} />;
              this.setState({search: false});
    }else {
      const fill = this.props.requests.filter(profile => (
                 profile.wifeAdhar.includes(this.state.search_adhar.toLowerCase())
              ));
              const items = fill.map((address, index) => {
                if(address.isCertified === false ){
                  return {
                    header: [address.husbandName, " and ", address.wifeName],
                    description: (
                      <Button primary><a target="blank" href={address.certificate}>DIVORCE FILE</a></Button>
                    ),
                    extra: (
                      <a>APPLICATION UNDER REVIEW</a>
                    ),
                    style: { overflowWrap: 'break-word' },
                    fluid: true
                  };
                }
                else {
                  return {
                    header: [address.husbandName, " and ", address.wifeName],
                    description: (
                      <Button primary><a target="blank" href={address.certificate}>DIVORCE FILE</a></Button>
                    ),
                    extra: (
                      <p>APPROVED</p>
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
          <Link route='/divorce/new'>
            <Button
              floated="right"
              basic
              color='yellow'
              content='DIVORCE FILE'
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
                      onChange={event =>
                        this.setState({ search_adhar: event.target.value })}
                      required
                    />
                  </Form.Field>
                  {this.state.type === 0 ? (
                    <Button primary>
                      HUSBAND
                    </Button>
                  ) : (
                      <Button primary>
                        WIFE
                      </Button>
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

export default Divorce;
