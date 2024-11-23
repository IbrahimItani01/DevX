import './../styles/base.css';
import './../styles/signup.css';
import coloredLogo from "../logo.svg"
const SignForm = ({children}) => {
  return (<>
    <div className="main signForm flex column align-center">
      <div className='sign-title'>
        <img alt='logo' src={coloredLogo} width={50}></img>
        <h1>Welcome to DevX</h1>
      </div>
     {children}
    </div>
  </>)


}
export default SignForm;
