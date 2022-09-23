
import FormInput from '../form-input/form-input.component';

import './sign-in.styles.scss';

const SignIn = () => {
    return (
        <div className='sign-in-container'>
           <form>
                <FormInput placeholder="Username" label="UserName" name="userName" type="text" value={userName} />
                <FormInput placeholder="Email" label="Email" name="email" type="text" value={email} />
                <FormInput placeholder="Full Name" label="FullName" name="fullName" type="text" value={fullName} />
                <FormInput placeholder="Sth else" Label="Sth else" name="sthElse" type="text" value={sthElse} />
            </form>  
        </div>
    )
}

export default SignIn;