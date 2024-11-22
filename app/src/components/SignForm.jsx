import './../styles/base.css';
import './../styles/signup.css';
import FormInput from './FormInput';
const SignForm = () => {

  return (<>
    <div className="signForm flex column align-center">
      <div className='row flex justify-center'>
        <FormInput label="Name" type="text" name="text" placeholder="Enter your name" />
        <FormInput label="Email" type="text" name="email" placeholder="Enter your email" />
      </div>

      <div className='row flex justify-center'>
        <FormInput label="Password" type="password" name="password" placeholder="Enter your password" />
        <FormInput label="Confirm Password" type="password" name="text" placeholder="Confirm your password" />
      </div>
      <div><button>Sign in</button></div>
      <p>Have an Account? LOGIN</p>

    </div>
  </>)


}
export default SignForm;
