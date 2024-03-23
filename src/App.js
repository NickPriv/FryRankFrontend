import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Header } from './components/Common';
import { routes } from "./routes"
import { Container, Row, Col } from 'reactstrap'

function App() {
  return (
    <div>
      <Header />
      <Container>
      <Row>
        <Col />
        <Col xs="auto">
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
        </Col>
        <Col />
      </Row>
      </Container>
    </div>
  );
}

export default App;