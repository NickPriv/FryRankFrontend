import { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../FrenchFryFoodCritic.png';
import { BACKEND_SERVICE_PATH } from '../../constants';
import './styles.css';
import MessageCard from "./MessageCard";

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
            <Link to="/restaurants" className="enter">
                <h2>Enter FryRank</h2>
            </Link>
<<<<<<< HEAD
            <Card
                color="warning"
                className="text-box"
            >
                <CardBody>
                    <Typewriter text={message} delay={35} />
                </CardBody>
            </Card>
=======
            <MessageCard message={message} />
>>>>>>> spinnerUpdate
        </div>
    );
  }
}

export default Homepage;
