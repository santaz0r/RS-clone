import { NavLink, useParams } from 'react-router-dom';
import RegisterForm from '../../components/ui/RegisterForm';
import LoginForm from '../../components/ui/LoginForm';

function LoginLayout() {
  const { type } = useParams();
  console.log(type);
  return type === 'register' ? (
    <>
      <h3>Register</h3>
      <RegisterForm />
      <p>
        Already have account?
        <NavLink to="/login">
          <button type="button">Sign In</button>
        </NavLink>
      </p>
    </>
  ) : (
    <>
      <h3>Login</h3>
      <LoginForm />
      <p>
        Already have account?
        <NavLink to="/register">
          <button type="button">Sign Up</button>
        </NavLink>
      </p>
    </>
  );
}

export default LoginLayout;
