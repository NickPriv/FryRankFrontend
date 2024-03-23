import { Component } from 'react';
import { Card, CardBody } from 'reactstrap';
import logo from '../../FrenchFryFoodCritic.png';
import { BACKEND_SERVICE_PATH } from '../../constants';
import styles from './styles.css';
import Typewriter from "./Typewriter";

export class Homepage extends Component {

  state = {
    message: ""
  };

  async componentDidMount() {
    const response = await fetch(`${BACKEND_SERVICE_PATH}/welcome`);
    const body = await response.text();
    this.setState({message: body});
  }

  render() {
    const {message} = this.state;
    return (
        <div className="App">
            <img src={logo} className="Food-critic" alt="food-critic" />
            <a href="/restaurants" className='enter'>
                <h2>Enter FryRank</h2>
            </a>
            <Card
                color="warning"
                className="text-box"
            >
                <CardBody>
                    <Typewriter text={message} delay={35} />
                </CardBody>
            </Card>
        </div>
    );
  }
}

export default Homepage;
