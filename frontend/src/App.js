import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from './components/Homepage';
import RestaurantReviews from './components/RestaurantReviews';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/reviews/:id" component={RestaurantReviews} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
