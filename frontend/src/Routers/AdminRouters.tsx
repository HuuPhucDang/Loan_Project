import { ROUTERS } from '@/Constants';
import { AdminPages } from '@pages';
import { USER_ROUTERS } from '../Constants/Routers';

const AdminRouters = {
  path: USER_ROUTERS.HOME,
  children: [
    {
      path: ROUTERS.HOME,
      element: <AdminPages.User />,
    },
    {
      path: ROUTERS.CONTRACT_TEMPLATE,
      element: <AdminPages.ContractTemplate />,
    },
    {
      path: ROUTERS.REQUEST,
      element: <AdminPages.Request />,
    },
    {
      path: ROUTERS.ADMIN_TRANSACTION,
      element: <AdminPages.Transaction />,
    },
    {
      path: ROUTERS.EMPLOYEE,
      element: <AdminPages.Employee />,
    },
    {
      path: ROUTERS.CONTRACT,
      element: <AdminPages.Contracts />,
    },
    {
      path: ROUTERS.ADMIN_VERIFY,
      element: <AdminPages.Verify />,
    },
  ],
};

export default AdminRouters;
