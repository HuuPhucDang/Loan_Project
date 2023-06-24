import { ROUTERS } from '@/Constants';
import { AuthPages } from '@pages';
import AuthLayout from '../Components/DefaultLayout/AuthLayout';
import { AUTH_ROUTER_ROOT } from '@/Constants/Routers';

const AuthRouters = {
  path: AUTH_ROUTER_ROOT,
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
