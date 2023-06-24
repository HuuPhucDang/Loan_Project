import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, TextField } from '@mui/material';
import { RootState, useTypedDispatch } from '../../../Reducers/store';
import { UserActions } from '../../../Reducers/Actions';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { ENUMS } from '../../../Constants';

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
  [key: string]: any;
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
    [key: string]: any;
  };
}

const { getUserById, updateUser } = UserActions;

const RequestVerifyIDCard: React.FC<IProps> = ({
  open = false,
  currentUser = '',
  onClose,
}) => {
  const dispatch = useTypedDispatch();
  const details: IDetails = useSelector((state: RootState) =>
    _.get(state.USER, 'details')
  );
  const [changedPayload, setChangedPayload] = React.useState<any>({});

  React.useEffect(() => {
    if (open) dispatch(getUserById(currentUser));
    else setChangedPayload({});
  }, [open]);

  const onUpdateUser = () => {
    dispatch(updateUser(details.id, changedPayload));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ color: 'text.primary' }}>
        Chi tiết người dùng
      </DialogTitle>
      <DialogContent sx={{ minWidth: 500 }}>
        <Stack direction="column" spacing={1} rowGap={1}>
          <TextField
            label="Người dùng"
            value={details?.nickname}
            size="small"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            disabled
          />
          <TextField
            label="Tên đăng nhập"
            value={details?.username}
            size="small"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            disabled
          />
          <TextField
            label="Mật Khẩu"
            value={changedPayload?.password || details?.password}
            size="small"
            InputLabelProps={{ shrink: true }}
            variant="standard"
            onChange={(e) =>
              setChangedPayload({ ...changedPayload, password: e.target.value })
            }
          />
          {details.role === 'user' && (
            <>
              <TextField
                label="Họ và Tên"
                value={changedPayload?.fullname || details?.fullname}
                size="small"
                InputLabelProps={{ shrink: true }}
                variant="standard"
                onChange={(e) =>
                  setChangedPayload({
                    ...changedPayload,
                    fullname: e.target.value,
                  })
                }
              />
              <TextField
                label="CCCD/CMND"
                value={changedPayload?.idNumber || details?.idNumber}
                size="small"
                InputLabelProps={{ shrink: true }}
                variant="standard"
                onChange={(e) =>
                  setChangedPayload({
                    ...changedPayload,
                    idNumber: e.target.value,
                  })
                }
              />
              <TextField
                label="Giới Tính"
                value={changedPayload?.gender || details?.gender}
                size="small"
                InputLabelProps={{ shrink: true }}
                variant="standard"
                onChange={(e) =>
                  setChangedPayload({
                    ...changedPayload,
                    gender: e.target.value,
                  })
                }
              />
              <TextField
                label="Ngày Tháng Năm Sinh"
                value={changedPayload?.dob || details?.dob}
                size="small"
                InputLabelProps={{ shrink: true }}
                variant="standard"
                onChange={(e) =>
                  setChangedPayload({ ...changedPayload, dob: e.target.value })
                }
              />
              <TextField
                label="Địa chỉ"
                value={changedPayload?.address || details?.address}
                size="small"
                InputLabelProps={{ shrink: true }}
                variant="standard"
                onChange={(e) =>
                  setChangedPayload({
                    ...changedPayload,
                    address: e.target.value,
                  })
                }
              />
              <TextField
                label="Nghề nghiệp"
                value={changedPayload?.job || details?.job}
                size="small"
                InputLabelProps={{ shrink: true }}
                variant="standard"
                onChange={(e) =>
                  setChangedPayload({ ...changedPayload, job: e.target.value })
                }
              />
              <TextField
                label="Thu Nhập"
                value={changedPayload?.income || details?.income}
                size="small"
                InputLabelProps={{ shrink: true }}
                variant="standard"
                onChange={(e) =>
                  setChangedPayload({
                    ...changedPayload,
                    income: e.target.value,
                  })
                }
              />
              <TextField
                label="Lý do vay"
                multiline
                rows={5}
                value={changedPayload?.purpose || details?.purpose}
                size="small"
                InputLabelProps={{ shrink: true }}
                variant="standard"
                onChange={(e) =>
                  setChangedPayload({
                    ...changedPayload,
                    purpose: e.target.value,
                  })
                }
              />
              <TextField
                label="SĐT người thân"
                value={
                  changedPayload?.relativesPhoneNumber ||
                  details?.relativesPhoneNumber
                }
                size="small"
                InputLabelProps={{ shrink: true }}
                variant="standard"
                onChange={(e) =>
                  setChangedPayload({
                    ...changedPayload,
                    relativesPhoneNumber: e.target.value,
                  })
                }
              />
              <TextField
                label="Quan hệ với người thân"
                InputLabelProps={{ shrink: true }}
                value={
                  changedPayload?.relationshipWithRelatives ||
                  details?.relationshipWithRelatives
                }
                size="small"
                variant="standard"
                onChange={(e) =>
                  setChangedPayload({
                    ...changedPayload,
                    relationshipWithRelatives: e.target.value,
                  })
                }
              />
            </>
          )}
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
        <Button
          sx={{ textTransform: 'unset', fontWeight: 600 }}
          onClick={onClose}
          color="success"
          disabled={_.isEmpty(changedPayload)}
          onClickCapture={() => onUpdateUser()}
        >
          Lưu thay đổi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestVerifyIDCard;
