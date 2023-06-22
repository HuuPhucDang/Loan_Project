import React from 'react';
import {
  Avatar,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { AdminLayout } from '@/Components/DefaultLayout';
import { RootState, useTypedDispatch } from '@/Reducers/store';
import { ChatBoxActions } from '@/Reducers/Actions';
import { Utils } from '../../../Libs';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const { fetchChatBox } = ChatBoxActions;

const Support = () => {
  const userData = Utils.getUserData();
  const dispatch = useTypedDispatch();
  const payload: any[] = useSelector((state: RootState) =>
    _.get(state.CHAT_BOX, 'payload')
  );
  const [currentRoom, setCurrentRoom] = React.useState<any>({
    roomId: '',
    receiverId: '',
  });
  const [, setCurrentPayload] = React.useState<any>([]);
  const valueRef = React.useRef<any>([]);
  const [message, setMessage] = React.useState<string>('');
  const messageBoxRef = React.useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messageBoxRef && messageBoxRef.current) {
        messageBoxRef.current.scrollTo({
          top: messageBoxRef.current.scrollHeight,
          behavior: 'auto',
        });
      }
    }, 100);
  };

  React.useEffect(() => {
    dispatch(fetchChatBox());
    return () => {
      Utils.WebSocket.off('receiveMessage');
    };
  }, []);

  React.useEffect(() => {
    if (payload.length > 0) {
      payload.forEach((item: any) => {
        Utils.WebSocket.emit(
          'joinRoom',
          { userId: userData.id, roomId: item.id },
          (data: any) => {
            console.log(data?.message);
          }
        );
      });
      valueRef.current = payload;
      setCurrentPayload(payload);

      Utils.WebSocket.on('receiveMessage', (data: any) => {
        if (valueRef.current.length > 0) {
          const resolvePayload = valueRef.current.map((item: any) => {
            if (item.id === data.id) {
              return {
                ...item,
                ...data,
              };
            }
            return item;
          });
          valueRef.current = resolvePayload;
          // setCurrentPayload(resolvePayload);
        }
        setMessage('');
        setCurrentRoom({ roomId: data.id, ...data });
        scrollToBottom();
      });
    }
  }, [payload]);

  const onSendMessage = () => {
    Utils.WebSocket.emit(
      'sendMessage',
      {
        userId: userData.id,
        roomId: currentRoom.roomId,
        receiverId: currentRoom.receiverId,
        message,
      },
      () => {
        setMessage('');
      }
    );
  };

  const _renderMsg = () => {
    // const findUser = users.find((user: any) => user.id === selectedUser);
    const { messages } = currentRoom;
    return (
      <Stack direction="column" sx={{ height: '100%' }}>
        <Stack
          direction="column"
          flex={1}
          spacing={2}
          padding="10px"
          sx={{ maxHeight: 'calc(100vh - 121.5px)', overflow: 'auto' }}
          ref={messageBoxRef}
        >
          {messages && messages.length > 0 ? (
            messages.map((item: any) => {
              const isSender = item.senderId === userData.id;
              return (
                <Stack
                  key={`message-${item.id}`}
                  direction="row"
                  justifyContent={isSender ? 'flex-end' : 'flex-start'}
                >
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      order: isSender ? 2 : 1,
                      marginRight: isSender ? 0 : 1,
                    }}
                  />
                  <Typography
                    sx={{
                      padding: '10px',
                      backgroundColor: isSender
                        ? 'background.lightSilver'
                        : 'background.mainContent',
                      borderRadius: '5px',
                      fontSize: '14px',
                      order: isSender ? 1 : 2,
                      marginRight: isSender ? 1 : 0,
                    }}
                  >
                    {item?.message}
                  </Typography>
                </Stack>
              );
            })
          ) : (
            <Typography sx={{ fontSize: '14px', padding: '10px' }}>
              Không có dữ liệu về tin nhắn với người dùng này
            </Typography>
          )}
        </Stack>
        <Stack direction="row">
          <TextField
            size="small"
            fullWidth
            placeholder="Nhập tin nhắn trước khi gửi"
            value={message}
            onChange={(e: any) => setMessage(e.target.value)}
          />
          <Button
            size="small"
            variant="contained"
            disabled={!Boolean(message.trim())}
            onClick={() => onSendMessage()}
          >
            Gửi
          </Button>
        </Stack>
      </Stack>
    );
  };

  const _renderRequiredUser = () => {
    return (
      <Typography sx={{ fontSize: '14px', padding: '15px' }}>
        Vui lòng chọn người dùng trước khi hỗ trợ
      </Typography>
    );
  };

  const _renderMain = () => {
    return (
      <Stack sx={{ padding: '20px', height: '100%' }} direction="column">
        <Typography
          sx={{ fontSize: '17px', fontWeight: 600, marginBottom: '16px' }}
        >
          Hỗ trợ trực tuyến
        </Typography>
        <Grid
          container
          height="100%"
          // maxWidth="800px"
          border="1px solid #BEBEBE"
        >
          <Grid item xs={5} md={3} borderRight="1px solid #BEBEBE">
            <Stack direction="column">
              {valueRef.current.length > 0
                ? valueRef.current.map((item: any) => {
                    const { messages, senderId, receiverId } = item;
                    const lastMsg = messages[messages.length - 1];
                    const user =
                      senderId.id === userData.id ? receiverId : senderId;
                    const isActive = item.id === currentRoom.roomId;
                    return (
                      <Stack
                        direction="row"
                        key={`user-${user.id}`}
                        padding="10px"
                        sx={{
                          color: isActive ? 'text.secondary' : 'text.primary',
                          backgroundColor: isActive
                            ? 'background.primary'
                            : 'background.default',
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '10px',
                          ':hover': {
                            cursor: 'pointer',
                            backgroundColor: isActive
                              ? 'background.primary'
                              : 'background.lightSilver',
                            color: 'text.secondary',
                          },
                        }}
                        onClick={() => {
                          setCurrentRoom({ ...item, roomId: item.id });
                          scrollToBottom();
                        }}
                      >
                        <Avatar
                          sx={{
                            width: '40px',
                            height: '40px',
                            marginRight: '10px',
                          }}
                          src={user.avatar}
                        />
                        <Stack direction="column">
                          <Typography
                            sx={{ fontSize: '15px', fontWeight: 600 }}
                          >
                            {user.nickname}
                          </Typography>
                          <Typography sx={{ fontSize: '13px' }}>
                            {lastMsg?.senderId !== '00' ? '' : 'You: '}
                            {lastMsg ? lastMsg.message : 'No message'}
                          </Typography>
                        </Stack>
                      </Stack>
                    );
                  })
                : null}
              {valueRef.current.length === 0 ? (
                <Typography sx={{ fontSize: '14px', padding: '15px' }}>
                  Không có thông tin về người dùng
                </Typography>
              ) : null}
            </Stack>
          </Grid>
          <Grid item xs={7} md={9}>
            {currentRoom?.roomId ? _renderMsg() : _renderRequiredUser()}
          </Grid>
        </Grid>
      </Stack>
    );
  };
  return <AdminLayout content={_renderMain()} screenTitle="Hỗ trợ" />;
};

export default Support;
