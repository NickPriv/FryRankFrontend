import { Button as ReactstrapButton } from 'reactstrap';

const Button = ({ children, color, onClick }) => {
    return (
        <ReactstrapButton color={color} className="me-2 my-2" onClick={onClick}>
            {children}
        </ReactstrapButton>
    );
}

export default Button;