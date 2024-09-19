import { useParams, useNavigate } from "react-router-dom";

const withRouter = Component => props => {
  const params = useParams();
  const navigate = useNavigate();
  return <Component {...props} {...{ params, navigate }} />;
};

export default withRouter;