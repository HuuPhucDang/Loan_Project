import { ROUTERS } from '@/Constants';
import { AdminPages } from '@pages';
import { ADMIN_ROUTER_ROOT } from '../Constants/Routers';

const AdminRouters = {
  path: ADMIN_ROUTER_ROOT,
  children: [
    {
      path: ROUTERS.REQUEST,
      element: <AdminPages.Request />,
    },
    {
      path: ROUTERS.ADMIN_SUPPORT,
      element: <AdminPages.Support />,
    },
    {
      path: ROUTERS.BANK_INFORMATION,
      element: <AdminPages.BankInformation />,
    },
    {
      path: ROUTERS.USERS,
      element: <AdminPages.User />,
    },
    {
      path: ROUTERS.ADMIN_TRANSACTION,
      element: <AdminPages.Transaction />,
    },
    {
      path: ROUTERS.INTERVENTION,
      element: <AdminPages.Intervention />,
    },
    {
      path: ROUTERS.ADMIN_VERIFY,
      element: <AdminPages.Verify />,
    },
    {
      path: ROUTERS.EDIT_PRICE,
      element: <AdminPages.PriceEdit />,
    },
  ],
};

export default AdminRouters;
