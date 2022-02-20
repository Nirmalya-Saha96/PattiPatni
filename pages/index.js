import React, { Component } from 'react';
import { Card, Button, Icon, Divider, Grid, Image, Header, Search, Segment } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import Accordiction from '../components/Accordiction';
import { Link } from '../routes';

class Index extends Component {
  static async getInitialProps() {
    const totalMarriage = await factory.methods.totalMarriage().call();
    const totalChild = await factory.methods.totalChild().call();
    const totalDivorce = await factory.methods.getDivorceCount().call();
    const sum = totalMarriage + totalDivorce;

    return { totalMarriage, totalChild, totalDivorce, sum };
  }

  render() {
    return (
      <Layout>
      <div>
        <Card.Group style={{marginTop: '25px', padding: '50px'}}>
        <Card style={{margin: '25px'}}
           image='https://tse1.mm.bing.net/th?id=OIP.QNWrXsL3p9kA_Dk22zx8XQHaHa&pid=Api&P=0&w=168&h=168'
           header='Marriage Registry'
           meta='Wedding'
           description='Government certified marriage certificate, secured stored in unalterable BlockChain, to prevent all types of marriage frauds.'
           extra={
             <Link route="/marriage">
               <a>
                <Icon name='pointing right' />
                Total {this.props.totalMarriage} Marriage
                </a>
             </Link>}
        />
        <Card style={{margin: '25px'}}
           image='https://tse4.mm.bing.net/th?id=OIP.iDusV36f9ROqMjOlLXGEkQHaGj&pid=Api&P=0&w=192&h=170'
           header='Child Birth Registry'
           meta='Birth Certificate'
           description='Government certified child birth certificate, securely stored in unalterable BlockChain, to keep a track record of child birth and fine regulation'
           extra={
             <Link route='/childbirth'>
               <a>
                  <Icon name='pointing right' />
                  Total {this.props.totalChild} Birth
               </a>
             </Link>
        }
        />
        <Card style={{margin: '25px'}}
           image='https://tse4.mm.bing.net/th?id=OIP.67faCQhiYN8lKTGFrXb0yAHaH6&pid=Api&P=0&w=158&h=169'
           header='Government Control Body'
           meta='Control Pannel'
           description='Controls and Regulates the total system.'
           extra={
             <Link route='/government'>
                 <a>
                  <Icon name='pointing right' />
                  Admin
                </a>
              </Link>
        }
        />
        <Card style={{margin: '25px'}}
           image='https://image.freepik.com/free-vector/divorce-illustration-concept_23-2148591118.jpg'
           header='DIVORCE FILE'
           meta='Divorce'
           description='Claim Divorce for only married couple, secured stored in unalterable BlockChain, to prevent all types of marriage frauds.'
           extra={
             <Link route="/divorce">
               <a>
                <Icon name='pointing right' />
                Total {this.props.totalDivorce} Divorce
                </a>
             </Link>}
        />
        <Card style={{margin: '25px'}}
           image='https://thumbs.dreamstime.com/b/checkmark-color-icon-successfully-tested-tick-mark-quality-assurance-approved-verification-validation-badge-isolated-vector-175558755.jpg'
           header='ETHEREUM CERTIFICATES'
           meta='Certificates'
           description='Government certified marriage and child certificate at one place, secured stored in unalterable BlockChain, to prevent all types of frauds.'
           extra={
             <Link route="/certificate">
               <a>
                <Icon name='pointing right' />
                Total {this.props.sum} Certificates
                </a>
             </Link>}
        />
        <Card style={{margin: '25px'}}
           image='https://image.shutterstock.com/image-vector/client-people-public-icon-vector-260nw-289926491.jpg'
           header='PUBLIC FOREUM'
           meta='public'
           description='Government certified platform to check the marital and parental status of any person, secured stored in unalterable BlockChain, to prevent all types of frauds.'
           extra={
             <Link route="/publicforeum">
               <a>
                <Icon name='pointing right' />
                PUBLIC FOREUM
                </a>
             </Link>}
        />
        </Card.Group>

        <Divider horizontal>
          <Header as='h4'>
            <Icon name='tag' />
            FRAUD MANAGEMENT
          </Header>
        </Divider>

        <Accordiction />

      </div>
      </Layout>
    );
  }
}

export default Index;
