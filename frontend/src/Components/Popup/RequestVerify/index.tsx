import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Stack, Typography } from '@mui/material';

interface IProps {
  open: boolean;
  onClose(): void;
}

const RequestVerifyIDCard: React.FC<IProps> = ({ open = false, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ color: 'text.primary' }}>Yêu cầu xác thực</DialogTitle>
      <DialogContent>
        <Stack direction="column">
          <Stack direction="row">
            <b>Người dùng</b>: Anonymous-User-b5b47p
          </Stack>
          <Typography
            sx={{ fontWeight: 600, marginTop: '20px', marginBottom: '5px' }}
          >
            Ảnh CCCD/CMND
          </Typography>
          <Box
            component="img"
            src="https://binhthuan.gov.vn/SiteFolders/bandantoc/hinh%20anh%202021/03.38.cccd.jpg"
            sx={{ width: '100%' }}
          />
          <Typography
            sx={{ fontWeight: 600, marginTop: '20px', marginBottom: '5px' }}
          >
            Ảnh chân dung
          </Typography>
          <Box
            component="img"
            src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
            sx={{ width: '100%' }}
          />
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

export default RequestVerifyIDCard;
