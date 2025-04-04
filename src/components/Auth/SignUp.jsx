import { Link } from "react-router-dom";
import "./Auth.css"; 
import {WelcomeMessage} from './WelcomeMessage'

const SignUp = () => {
  return (
    <div className="auth-page flex min-h-screen">
  <div className="w-1/2 p-8 flex justify-center items-center">
    <SignInForm /> {/* Or <SignUpForm /> */}
  </div>
  <div className="w-1/2 p-8 flex justify-center items-center bg-gray-100">
    <WelcomeMessage />
  </div>
</div>

  );
};

export default SignUp;
