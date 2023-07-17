import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Homepage from './components/Homepage';
import RestaurantReviews from './components/RestaurantReviews';

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/reviews/:restaurantId" component={RestaurantReviews} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
