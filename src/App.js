import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {useSelector} from "react-redux";

import { Header } from './components/Common';
import { routes } from "./routes"
import { Container, Row, Col } from 'reactstrap'
import { APIProvider } from '@vis.gl/react-google-maps';

function App() {
  const loggedIn = useSelector((state) => state.userReducer.loggedIn);
  return (
    <div>
      <Router>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
        <Header loggedIn={loggedIn}/>
        <Container>
          <Row>
            <Col />
            <Col xs="auto">
              <div class="d-flex justify-content-center">
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
      </Router>
    </div>
  );
}

export default App;