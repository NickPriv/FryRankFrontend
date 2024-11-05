import { Link } from 'react-router-dom';
import logo from '../../FrenchFryFoodCritic.png';
import { WELCOME_MESSAGE } from '../../constants';
import './styles.css';
import MessageCard from './MessageCard';
import StoreItems from './StoreItems';

const Homepage = () => {
    return (
        <div>
            <div className="pitch">
                <h1 style={{'text-align': 'center'}}>The best fries, <span class="text-danger">ranked.</span></h1>
                <div className="subtitle">
                    <h4 className="inline"><span class="text-danger">Read</span> reviews</h4>
                    <h4 className="inline"><span class="text-danger">Discover</span> fries</h4>
                    <h4 className="inline"><span class="text-danger">Write</span> a review</h4>
                </div>
            </div>
            <div className="welcome">
                <img src={logo} className="Food-critic inline" alt="food-critic" />
                <div>
                    <MessageCard message={WELCOME_MESSAGE} />
                    <Link style={{'text-align': 'left'}} to="/restaurants" className="enter">
                        <h3>Explore restaurants</h3>
                    </Link>
                </div>
            </div>
            <div className="merch">
                <div className="merch-title center">
                    <h1 className="text-danger">Shop FryRank Merch</h1>
                </div>
                <div className="store-items">
                    <StoreItems />
                </div>
            </div>
        </div>
    );
}

export default Homepage;
