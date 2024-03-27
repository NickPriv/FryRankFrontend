import { PropTypes } from 'prop-types';
import scoreStyles from "./Score.module.css"

const propTypes = {
    score: PropTypes.number.isRequired,
    size: PropTypes.oneOf([
        'lg',
        'sm'
    ])
}

const Score = ({score, size}) => {
    return <span className={`${scoreStyles[size]}`}>{score}</span>
}

Score.defaultProps = {
    size: 'lg',
}

Score.propTypes = propTypes;

export default Score;