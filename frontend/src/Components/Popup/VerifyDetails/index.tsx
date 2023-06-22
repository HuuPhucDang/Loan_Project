import * as React from 'react';
import _ from 'lodash';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Stack, Typography } from '@mui/material';

interface IProps {
  open: boolean;
  item: any;
  onClose(): void;
}

const UploadIDCard: React.FC<IProps> = ({ open = false, onClose, item }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle sx={{ color: 'text.primary' }}>
        Cập nhật thẻ CCCD/CMND
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'text.primary', marginBottom: '15px' }}>
          Người dùng: <b>{item?.userId?.nickname}</b>
        </DialogContentText>
        <Stack direction="column">
          {item?.frontImageUrl ? (
            <>
              <Typography sx={{ fontSize: '14px', fontWeight: 600, marginBottom: '10px' }}>
                Mặt trước
              </Typography>
              <Box
                component="img"
                src={`data:image/*;base64,${item?.frontImageUrl}`}
                sx={{
                  width: '100%',
                  aspectRatio: 16 / 10,
                  objectFit: 'cover',
                }}
              />
            </>
          ) : null}
          {item?.backImageUrl ? (
            <>
              <Typography sx={{ fontSize: '14px', fontWeight: 600, marginBottom: '10px' }}>
                Mặt sau
              </Typography>
              <Box
                component="img"
                src={`data:image/*;base64,${item?.backImageUrl}`}
                sx={{
                  width: '100%',
                  aspectRatio: 16 / 10,
                  objectFit: 'cover',
                }}
              />
            </>
          ) : null}
          {item?.selfieImageUrl ? (
            <>
              <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
                Ảnh chân dung
              </Typography>
              <Box
                component="img"
                src={`data:image/*;base64,${item?.selfieImageUrl}`}
                sx={{
                  width: '100%',
                  aspectRatio: 16 / 10,
                  objectFit: 'cover',
                }}
              />
            </>
          ) : null}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button sx={{ textTransform: 'unset' }} onClick={onClose} color="error">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadIDCard;
