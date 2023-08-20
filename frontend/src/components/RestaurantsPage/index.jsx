import { Component } from 'react';
import Header from "../Common/Header"
import Breadcrumb from "../Common/Breadcrumb"
import logo from '../../FrenchFryFoodCritic.png';
import '../../App.css';

class RestaurantsPage extends Component {
    state = {
        message: ""
    };

    async componentDidMount() {
        const response = await fetch('/restaurants');
        const body = await response.text();
        this.setState({message: body});
    }

    render() {
        const {reviews} = this.state;
        return (
          <div className="App">
            <Header />
            <Breadcrumb />
          </div>
        );
    }
}

export default RestaurantsPage;