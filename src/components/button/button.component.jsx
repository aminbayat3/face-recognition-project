
import './button.styles.scss';

const Button = ({ children, login, ...otherProps }) => {
    return (
        <button className={`button-container ${login && 'login-button'}`} {...otherProps}>
            {children}
        </button>
    )
}

export default Button;