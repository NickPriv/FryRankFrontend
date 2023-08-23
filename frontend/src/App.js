import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Homepage from './components/Homepage';
import Reviews from './containers/Reviews';

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/reviews/:restaurantId" component={Reviews} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
