import mongoose from "mongoose";
import { Server } from "socket.io";
import {
  scheduledFunctions,
  Seender,
  intiChatSocket,
  initInterventionSocket,
  startmoonBootInterval,
} from "./services";
import app from "./app";
import config from "./config/config";
import logger from "./logger/logger";

declare global {
  var io: Server;
}

let server: any;
mongoose.connect(config.mongoose.url).then(() => {
  logger.info("Connected to MongoDB");
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
  const io = new Server(server);
  global.io = io;
  io.on("connection", (socket) => {
    console.log("a user connected");
    initInterventionSocket(socket);
    intiChatSocket(socket);
  });
  io.on("accessChatPage", (socket) => {
    intiChatSocket(socket);
  });
  Seender.createSeedAdmin();
  Seender.createSeedCoins();
  Seender.createSeedMoonbots();
  scheduledFunctions();
  startmoonBootInterval();
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: string) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
