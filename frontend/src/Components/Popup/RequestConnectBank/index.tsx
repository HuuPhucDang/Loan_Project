import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, OutlinedInput, Stack } from '@mui/material';

interface IProps {
  open: boolean;
  onClose(): void;
}

const RequestConnectBank: React.FC<IProps> = ({ open = false, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ color: 'text.primary' }}>
        Yêu cầu liên kết ngân hàng
      </DialogTitle>
      <DialogContent>
        <Stack
          direction="column"
          sx={{ maxWidth: '600px', padding: "20px 0" }}
          spacing={2}
        >
          <Stack direction="row">
            <b>Người dùng</b>: Anonymous-User-b5b47p
          </Stack>

          <FormControl>
            <InputLabel
              htmlFor="component-outlined-name"
              sx={{ color: 'text.primary' }}
            >
              Họ và tên người nhận
            </InputLabel>
            <OutlinedInput
              id="component-outlined-name"
              label="Họ và tên"
              defaultValue=""
              sx={{
                backgroundColor: 'background.chargeInput',
              }}
            />
          </FormControl>
          <FormControl>
            <InputLabel
              htmlFor="component-outlined-number"
              sx={{ color: 'text.primary' }}
            >
              Số tài khoản
            </InputLabel>
            <OutlinedInput
              id="component-outlined-number"
              label="Số tài khoản"
              sx={{
                backgroundColor: 'background.chargeInput',
              }}
            />
          </FormControl>
          <FormControl>
            <InputLabel
              htmlFor="component-outlined-bank"
              sx={{ color: 'text.primary' }}
            >
              Ngân hàng
            </InputLabel>
            <OutlinedInput
              id="component-outlined-bank"
              label="Ngân hàng"
              sx={{
                backgroundColor: 'background.chargeInput',
              }}
            />
          </FormControl>
          <FormControl>
            <InputLabel
              htmlFor="component-outlined-desc"
              sx={{ color: 'text.primary' }}
            >
              Chi nhánh ngân hàng
            </InputLabel>
            <OutlinedInput
              id="component-outlined-desc"
              label="Chi nhánh ngân hàng"
              sx={{
                backgroundColor: 'background.chargeInput',
              }}
            />
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ textTransform: 'unset', fontWeight: 600 }}
          onClick={onClose}
          color="error"
        >
          Hủy
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
          color="warning"
          sx={{ textTransform: 'unset', fontWeight: 600 }}
        >
          Từ chối
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
          color="success"
          sx={{ textTransform: 'unset', fontWeight: 600 }}
        >
          Duyệt
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestConnectBank;
