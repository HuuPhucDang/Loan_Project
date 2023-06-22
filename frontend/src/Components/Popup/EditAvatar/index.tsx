import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Avatar,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Utils } from '../../../Libs';
import { RootState, useTypedDispatch } from '../../../Reducers/store';
import { UserActions } from '../../../Reducers/Actions';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const avatarOptions = [
  'https://api.dicebear.com/6.x/adventurer/svg?seed=Harley',
  'https://api.dicebear.com/6.x/adventurer/svg?seed=Miss%20kitty',
  'https://api.dicebear.com/6.x/adventurer/svg?seed=Sasha',
  'https://api.dicebear.com/6.x/adventurer/svg?seed=Toby',
  'https://api.dicebear.com/6.x/adventurer/svg?seed=Jasper',
  'https://api.dicebear.com/6.x/adventurer/svg?seed=Lily',
  'https://api.dicebear.com/6.x/adventurer/svg?seed=Trouble',
  'https://api.dicebear.com/6.x/adventurer/svg?seed=Annie',
  'https://api.dicebear.com/6.x/adventurer/svg?seed=Mittens',
  'https://api.dicebear.com/6.x/adventurer/svg?seed=Molly',
];

interface IProps {
  open: boolean;
  onClose(): void;
}

const { updateAvatar, resetUserReducer } = UserActions;

const EditName: React.FC<IProps> = ({ open = false, onClose }) => {
  const dispatch = useTypedDispatch();
  const userData = Utils.getUserData();
  const [avatar, setAvatar] = React.useState<string>(userData.avatar);
  const isUpdateAvatarSuccess: boolean = useSelector((state: RootState) =>
    _.get(state.USER, 'isUpdateAvatarSuccess')
  );

  React.useEffect(() => {
    if (isUpdateAvatarSuccess) {
      setAvatar(userData.nickname);
      onClose();
      dispatch(resetUserReducer());
    }
  }, [isUpdateAvatarSuccess]);

  const onSubmit = () => {
    if (userData.avatar !== avatar) dispatch(updateAvatar({ avatar }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle sx={{ color: 'text.primary' }}>
        Chỉnh sửa ảnh đại diện
      </DialogTitle>
      <DialogContent>
        <FormControl sx={{ marginTop: '10px' }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={userData.avatar}
            name="radio-buttons-group"
            value={avatar}
            onChange={(_event: any, value: string) => setAvatar(value)}
          >
            <Grid container spacing={2}>
              {avatarOptions.map((item: string) => (
                <Grid item xs={6} key={item}>
                  <FormControlLabel
                    key={`avatar-${item}`}
                    value={item}
                    control={<Radio />}
                    label={<Avatar src={item} sx={{ width: 60, height: 60 }} />}
                  />
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </FormControl>
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
