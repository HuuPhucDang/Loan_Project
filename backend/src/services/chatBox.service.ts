import { Socket } from "socket.io";
import _ from "lodash";
import { chatBoxService } from "../modules/chatBox";

let rooms: {
  members: string[];
  roomId: string;
}[] = [];

const joinRoom = (userId: string, roomId: string) => {
  const findRoom = _.find(rooms, ["roomId", roomId]);
  if (!findRoom) {
    rooms.push({ members: [userId], roomId });
  } else {
    rooms = _.map(rooms, (room) => {
      if (room.roomId === roomId)
        return {
          ...room,
          members: _.uniq([...room.members, userId]),
        };
      return room;
    });
  }
};

const leaveRoom = (userId: string, roomId: string) => {
  rooms = _.map(rooms, (room) => {
    if (room.roomId === roomId)
      return {
        ...room,
        members: _.filter(room.members, (el) => el !== userId),
      };
    return room;
  });
};

const intiChatSocket = (socket: Socket) => {
  socket.on("joinRoom", async (data: any, callback: any) => {
    joinRoom(data?.userId, data?.roomId);
    socket.join(data?.roomId);
    callback({ message: `Join room ${data?.roomId} success!` });
  });
  socket.on("sendMessage", async (data: any) => {
    const sendedMessage = await chatBoxService.createMessage(
      data?.userId,
      data
    );
    io.to(data?.roomId).emit("receiveMessage", sendedMessage);
  });
  socket.on("leaveRoom", (data: any, callback: any) => {
    // leave room
    leaveRoom(data?.userId, data?.roomId);
    callback({ message: `Leave room ${data?.roomId} success!` });
  });
};

export default intiChatSocket;
