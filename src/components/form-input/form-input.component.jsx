
import './form-input.styles.scss';

const FormInput = ({ label, ...inputOptions }) => {
    return(
        <div className='form-input-container'>
            <input className='form-input' {...inputOptions} />
            <label className='form-input-label'><img className={inputOptions.name} src={label} alt='label' /></label>
        </div>
    )
}

export default FormInput; 