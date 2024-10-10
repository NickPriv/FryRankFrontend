import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Header } from './components/Common';
import { routes } from "./routes"
import { Container, Row, Col } from 'reactstrap'
import { APIProvider } from '@vis.gl/react-google-maps';

function App() {
  return (
    <div>
      <Router>
        <Provider store={store}>
          <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
            <Header />
            <Container>
              <Row>
                <Col />
                <Col xs="auto">
                  <div class="p-3 d-flex justify-content-center">
                    <Routes>
                      {routes.map((route, key) => (
                        <Route
                          exact
                          path={route.path}
                          key={key}
                          element={<route.component />}
                        />
                      ))}
                    </Routes>
                  </div>
                </Col>
                <Col />
              </Row>
            </Container>
          </APIProvider>
        </Provider>
      </Router>
    </div>
  );
}

export default App;