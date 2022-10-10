import { Link } from 'react-router-dom';

import './navigation.styles.scss';

const Navigation = () => {
    return(
        <nav className='nav-container'>
            <Link className='nav-signin' to='/signin'>Sign In</Link>
        </nav>
    )
}

export default Navigation;