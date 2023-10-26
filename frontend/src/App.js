import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { routes } from "./routes"

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            {routes.map((route, key) => (
                    <Route
                        exact
                        path={route.path}
                        key={key}
                        component={route.component}
                    />
                  ))}
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;