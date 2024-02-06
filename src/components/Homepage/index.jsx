import { Component } from 'react';
import logo from '../../FrenchFryFoodCritic.png';
import '../../App.css';

export class Homepage extends Component {

  state = {
    message: ""
  };

  async componentDidMount() {
    const response = await fetch('https://pure-monk-4ba7721dd9fb.herokuapp.com/api/welcome');
    const body = await response.text();
    this.setState({message: body});
  }

  render() {
    const {message} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="Food-critic" alt="logo" />
            <div className="App-intro">
              <h2>Welcome</h2>
              <p>{message}</p>
            </div>
        </header>
      </div>
    );

  }
}

export default Homepage;