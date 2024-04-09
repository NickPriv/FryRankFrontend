import { Link } from 'react-router-dom';
import logo from '../../FrenchFryFoodCritic.png';
import { WELCOME_MESSAGE } from '../../constants';
import './styles.css';
import MessageCard from "./MessageCard";

const Homepage = () => {
    return (
        <div className="App">
            <img src={logo} className="Food-critic" alt="food-critic" />
            <Link to="/restaurants" className="enter">
                <h2>Enter FryRank</h2>
            </Link>
            <MessageCard message={WELCOME_MESSAGE} />
        </div>
    );
}

export default Homepage;
