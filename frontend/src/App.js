import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Breadcrumb, Header } from './components/Common';
import { routes } from "./routes"

function App() {
  return (
    <div>
      <Header />
      <div class="p-3 d-flex justify-content-center">
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
    </div>
  );
}

export default App;