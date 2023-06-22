import { ROUTERS } from '@/Constants';
import { MainPages } from '@pages';

const UserRouter = {
  path: ROUTERS.HOME,
  children: [
    {
      path: ROUTERS.HOME,
      element: <MainPages.Home />,
    },
    {
      path: ROUTERS.OVERVIEW,
      element: <MainPages.Overview />,
    },
    {
      path: ROUTERS.SECURITY,
      element: <MainPages.Security />,
    },
    {
      path: ROUTERS.VERIFY,
      element: <MainPages.Verify />,
    },
    {
      path: ROUTERS.CONNECT_BANK,
      element: <MainPages.ConnectBank />,
    },
    {
      path: ROUTERS.INVOICE,
      element: <MainPages.Invoice />,
    },
    {
      path: ROUTERS.SUPPORT,
      element: <MainPages.Support />,
    },
    {
      path: ROUTERS.RECHARGE,
      element: <MainPages.Recharge />,
    },
    {
      path: ROUTERS.WITHDRAW_MONEY,
      element: <MainPages.WithdrawMoney />,
    },
    {
      path: ROUTERS.TRANSACTION,
      element: <MainPages.Transaction />,
    },
  ],
};

const NotFoundRouter = {
  path: '*',
  element: <MainPages.NotFound />,
};

export default UserRouter;
export { NotFoundRouter };
