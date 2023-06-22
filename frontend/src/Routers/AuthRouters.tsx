import { ROUTERS } from '@/Constants';
import { AuthPages } from '@pages';
import AuthLayout from '../Components/DefaultLayout/AuthLayout';

const AuthRouters = {
  path: ROUTERS.HOME,
  element: <AuthLayout />,
  children: [
    {
      path: ROUTERS.SIGN_IN,
      element: <AuthPages.SignIn />,
    },
    {
      path: ROUTERS.SIGN_UP,
      element: <AuthPages.SignUp />,
    },
  ],
};

export default AuthRouters;
