import httpStatus from "http-status";
import { Request, Response } from "express";
import { catchAsync, responsePayload } from "../../utils";
import { tokenService } from "../token";
import { userService } from "../user";
import * as authService from "./auth.service";
// import { emailService } from '../../services';

export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.registerUser(req.body);
  res
    .status(httpStatus.CREATED)
    .send(
      responsePayload(
        true,
        `Welcome ${user.username}! register successfully! Please login to continue...`,
        user
      )
    );
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await authService.loginUserWithUsernameAndPassword(
    username,
    password
  );
  const tokens = await tokenService.generateAuthTokens(user);
  res.send(
    responsePayload(true, `Login successfully!`, {
      user,
      tokens,
    })
  );
});

// export const logout = catchAsync(async (req: Request, res: Response) => {
//   await authService.logout(req.body.refreshToken);
//   res.status(httpStatus.NO_CONTENT).send();
// });

export const refreshTokens = catchAsync(async (req: Request, res: Response) => {
  const userWithTokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...userWithTokens });
});

export const forgotPassword = catchAsync(async (res: Response) => {
  // const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  // await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await authService.resetPassword(req.query["token"], req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

export const sendVerificationEmail = catchAsync(async (res: Response) => {
  // const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  // await emailService.sendVerificationEmail(req.user.email, verifyEmailToken, req.user.name);
  res.status(httpStatus.NO_CONTENT).send();
});

// export const verifyEmail = catchAsync(async (req: Request, res: Response) => {
//   await authService.verifyEmail(req.query['token']);
//   res.status(httpStatus.NO_CONTENT).send();
// });
