import express, { Router } from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import transactionRoute from "./transaction.route";
import bankRoute from "./bank.route";
import requestRoute from "./request.route";
import contractRoute from "./contract.route";
import employeeRoute from "./employee.route";
import verificationRoute from "./verification.route";

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
    path: "/transactions",
    route: transactionRoute,
  },
  {
    path: "/bank",
    route: bankRoute,
  },
  {
    path: "/requests",
    route: requestRoute,
  },
  {
    path: "/contract",
    route: contractRoute,
  },
  {
    path: "/employee",
    route: employeeRoute,
  },
  {
    path: "/verification",
    route: verificationRoute,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
