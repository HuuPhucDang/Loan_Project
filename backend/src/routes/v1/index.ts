import express, { Router } from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import securityRoute from "./security.route";
import bankRoute from "./bank.route";
import verificationRoute from "./verification.route";
import transactionRoute from "./transaction.route";
import requestRoute from "./request.route";
import systemInforRoute from "./systemInfor.route";
import chatBoxRoute from "./chatBox.route";
import tradeRoute from "./trade.route";
import notificationRoute from "./notification.route";

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/security",
    route: securityRoute,
  },
  {
    path: "/bank",
    route: bankRoute,
  },
  {
    path: "/verification",
    route: verificationRoute,
  },
  {
    path: "/transactions",
    route: transactionRoute,
  },
  {
    path: "/requests",
    route: requestRoute,
  },
  {
    path: "/system",
    route: systemInforRoute,
  },
  {
    path: "/chatBox",
    route: chatBoxRoute,
  },
  {
    path: "/trade",
    route: tradeRoute,
  },
  {
    path: "/notification",
    route: notificationRoute,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
