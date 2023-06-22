import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Avatar,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { RootState, useTypedDispatch } from '../../../Reducers/store';
import { UserActions } from '../../../Reducers/Actions';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { ENUMS } from '../../../Constants';
import randomstring from 'randomstring';

interface IProps {
  currentUser: string;
  open: boolean;
  onClose(): void;
}

interface IDetails {
  avatar: string;
  nickname: string;
  onwCode?: string;
  inviteCode?: string;
  role: string;
  userType: {
    name: string;
    type: string;
  };
  username: string;
  verification?: {
    status:
      | ENUMS.EVerifyType.APPROVED
      | ENUMS.EVerifyType.DENY
      | ENUMS.EVerifyType.PENDING;
  };
}

const status = {
  [ENUMS.EVerifyType.APPROVED]: 'Đã xác thực',
  [ENUMS.EVerifyType.DENY]: 'Đã từ chối',
  [ENUMS.EVerifyType.PENDING]: 'Đang chờ',
};

const { getUserById, updateUserType, updateUser } = UserActions;

const RequestVerifyIDCard: React.FC<IProps> = ({
  open = false,
  currentUser = '',
  onClose,
}) => {
  const dispatch = useTypedDispatch();
  const details: IDetails = useSelector((state: RootState) =>
    _.get(state.USER, 'details')
  );

  React.useEffect(() => {
    if (open) dispatch(getUserById(currentUser));
  }, [open]);

  const onChangeUserType = (_newValue: string) => {
    dispatch(updateUserType({ userId: currentUser, userType: _newValue }));
  };

  const onGenerateInviteCode = () => {
    const newInviteCode = randomstring.generate({
      length: 6,
      capitalization: 'lowercase',
      charset: 'alphabetic',
    });
    dispatch(updateUser(currentUser, { onwCode: newInviteCode }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ color: 'text.primary' }}>
        Chi tiết người dùng
      </DialogTitle>
      <DialogContent>
        <Stack direction="column">
          <Stack direction="column" spacing={1}>
            <Avatar src={details?.avatar} sx={{ width: 70, height: 70 }} />
            <Typography>
              <b>Người dùng</b>: {details?.nickname}
            </Typography>
            <Typography>
              <b>Tên đăng nhập</b>: {details?.username}
            </Typography>
            <Typography>
              <b>Số điện thoại</b>: 0123487989
            </Typography>
            {details?.onwCode ? (
              <Stack direction="row" alignItems="center">
                <Typography>
                  <b>Mã mời</b>: {details?.onwCode}
                </Typography>
                <Button
                  sx={{ marginLeft: '10px' }}
                  size="small"
                  onClick={() => onGenerateInviteCode()}
                >
                  Tạo mã mới
                </Button>
              </Stack>
            ) : null}
            {details?.inviteCode ? (
              <Typography>
                <b>Mã mời</b>: {details?.inviteCode}
              </Typography>
            ) : null}
            <Typography>
              <b>Xác thực</b>:{' '}
              {!details?.verification
                ? 'Chưa xác thực'
                : status[details.verification.status]}
            </Typography>
            <Typography>
              <b>Loại người dùng</b>:
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={details?.userType?.type}
              exclusive
              onChange={(_event: any, newValue: string) =>
                onChangeUserType(newValue)
              }
              aria-label="Platform"
            >
              <ToggleButton
                disabled={details?.role === 'admin'}
                value={ENUMS.EUserType.BEGINNER}
              >
                Sơ cấp
              </ToggleButton>
              <ToggleButton
                disabled={details?.role === 'admin'}
                value={ENUMS.EUserType.INTERMEDIATE}
              >
                Trung cấp
              </ToggleButton>
              <ToggleButton
                disabled={details?.role === 'admin'}
                value={ENUMS.EUserType.ADVANCE}
              >
                Nâng cao
              </ToggleButton>
              <ToggleButton
                disabled={details?.role === 'admin'}
                value={ENUMS.EUserType.PROFESSINAL}
              >
                Chuyên nghiệp
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ textTransform: 'unset', fontWeight: 600 }}
          onClick={onClose}
          color="error"
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestVerifyIDCard;
