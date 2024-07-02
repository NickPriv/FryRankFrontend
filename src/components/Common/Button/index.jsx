import { Button as ReactstrapButton } from 'reactstrap';

const Button = ({ children, color, onClick, disabled }) => {
    return (
        <ReactstrapButton color={color} className="me-2 my-2" onClick={onClick} disabled={disabled}>
            {children}
        </ReactstrapButton>
    );
}

export default Button;