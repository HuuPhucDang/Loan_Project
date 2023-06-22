import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/material';
import { Utils } from '../../../Libs';
import { RootState, useTypedDispatch } from '../../../Reducers/store';
import { UserActions } from '../../../Reducers/Actions';
import { useSelector } from 'react-redux';
import _ from 'lodash';

interface IProps {
  open: boolean;
  onClose(): void;
}

const { updateNickname, resetUserReducer } = UserActions;

const EditName: React.FC<IProps> = ({ open = false, onClose }) => {
  const dispatch = useTypedDispatch();
  const userData = Utils.getUserData();
  const nicknameMsg = 'Nickname is a required field';
  const [isError, setIsError] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>(userData.nickname);
  const isUpdateNicknameSuccess: boolean = useSelector((state: RootState) =>
    _.get(state.USER, 'isUpdateNicknameSuccess')
  );

  React.useEffect(() => {
    if (isUpdateNicknameSuccess) {
      setIsError(false);
      setName(userData.nickname);
      onClose();
      dispatch(resetUserReducer());
    }
  }, [isUpdateNicknameSuccess]);

  const onSubmit = async () => {
    if (!name.trim()) setIsError(true);
    else dispatch(updateNickname({ nickname: name }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle sx={{ color: 'text.primary' }}>Chỉnh sửa tên</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontSize: '12px', color: 'text.primary' }}>
          Tên chỉ phục vụ việc hiển thị , không có giá trị sử dụng , có thể sử
          dụng tên ảo
        </DialogContentText>
        <Stack direction="column">
          <TextField
            hiddenLabel
            variant="outlined"
            size="small"
            type="text"
            placeholder="Tên"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setIsError(false);
            }}
            error={isError}
            helperText={isError ? nicknameMsg : ''}
            sx={{
              marginTop: '10px',
              ' .MuiInputBase-root': {
                backgroundColor: 'background.secondary',
              },
              color: 'text.secondary',
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button sx={{ textTransform: 'unset' }} onClick={onClose} color="error">
          Hủy
        </Button>
        <Button
          sx={{
            textTransform: 'unset',
            backgroundColor: 'background.burntSienna',
          }}
          variant="contained"
          onClick={() => onSubmit()}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditName;
