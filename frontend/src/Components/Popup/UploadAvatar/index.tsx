import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Grid, Typography } from '@mui/material';

import { RootState, useTypedDispatch } from '@/Reducers/store';
import { VerificationActions } from '@/Reducers/Actions';

interface IProps {
  open: boolean;
  onClose(): void;
}

const schema = yup
  .object({
    selfieImage: yup
      .mixed()
      .test('required', 'Ảnh chân dung là trường bắt buộc', (file) => {
        const resolveFile: FileList = file as FileList;
        if (resolveFile && resolveFile.length > 0) return true;
        return false;
      }),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const { uploadCardsId, resetVerificationReducer } = VerificationActions;

const UploadAvatar: React.FC<IProps> = ({ open = false, onClose }) => {
  const dispatch = useTypedDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const selfieImage: FileList | null = watch('selfieImage') as FileList | null;
  const isUploadSuccess: boolean = useSelector((state: RootState) =>
    _.get(state.VERIFICATION, 'isUploadSuccess')
  );

  React.useEffect(() => {
    if (!open) reset();
  }, [open]);

  React.useEffect(() => {
    if (isUploadSuccess) {
      reset();
      onClose();
      dispatch(resetVerificationReducer());
    }
  }, [isUploadSuccess]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('selfieImage', data.selfieImage[0]);
    dispatch(uploadCardsId(formData));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle sx={{ color: 'text.primary' }}>
        Cập nhật ảnh chân dung
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontSize: '12px', color: 'text.primary' }}>
          Vui lòng tải lên ảnh nhìn rõ, không bị chóa, mờ
        </DialogContentText>
        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
              Ảnh chân dung
            </Typography>
            <Box
              component="img"
              src={
                selfieImage?.[0]
                  ? URL.createObjectURL(selfieImage?.[0])
                  : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg'
              }
              sx={{
                width: '100%',
                aspectRatio: 4 / 3,
                objectFit: 'cover',
              }}
            />
            <input type="file" {...register('selfieImage')} />
            {errors?.selfieImage?.message ? (
              <Typography color="error" sx={{ fontSize: '14px' }}>
                {errors?.selfieImage?.message}
              </Typography>
            ) : null}
          </Grid>
        </Grid>
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
          onClick={handleSubmit(onSubmit)}
        >
          Cập nhật
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadAvatar;
