import * as React from 'react';
import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
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

import Assets from '@/Assets';
import { RootState, useTypedDispatch } from '@/Reducers/store';
import { VerificationActions } from '@/Reducers/Actions';


interface IProps {
  open: boolean;
  onClose(): void;
}

const schema = yup
  .object({
    frontImage: yup
      .mixed()
      .test('required', 'Ảnh mặt trước là trường bắt buộc', (file) => {
        const resolveFile: FileList = file as FileList;
        if (resolveFile && resolveFile.length > 0) return true;
        return false;
      })
      .required(''),
    backImage: yup
      .mixed()
      .test('required', 'Ảnh mặt sau là trường bắt buộc', (file) => {
        const resolveFile: FileList = file as FileList;
        if (resolveFile && resolveFile.length > 0) return true;
        return false;
      }),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const { uploadCardsId, resetVerificationReducer } = VerificationActions;

const UploadIDCard: React.FC<IProps> = ({ open = false, onClose }) => {
  const dispatch = useTypedDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    // resolver: yupResolver(schema),
  });

  const frontImage: FileList | null = watch('frontImage') as FileList | null;
  const backImage: FileList | null = watch('backImage') as FileList | null;
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
    formData.append('frontImage', data.frontImage[0]);
    formData.append('backImage', data.backImage[0]);
    dispatch(uploadCardsId(formData));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle sx={{ color: 'text.primary' }}>
        Cập nhật thẻ CCCD/CMND
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontSize: '12px', color: 'text.primary' }}>
          Vui lòng tải lên ảnh nhìn rõ, không bị chóa, mờ
        </DialogContentText>
        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid item xs={12} height="100%">
            <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
              Mặt trước
            </Typography>
            <Box
              component="img"
              src={
                frontImage?.[0]
                  ? URL.createObjectURL(frontImage?.[0])
                  : Assets.frontIDCard
              }
              sx={{
                width: '100%',
                aspectRatio: 16 / 10,
                objectFit: 'cover',
              }}
            />
            <input type="file" multiple={false} {...register('frontImage')} />
            {errors?.frontImage?.message ? (
              <Typography color="error" sx={{ fontSize: '14px' }}>
                {errors?.frontImage?.message}
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
              Mặt sau
            </Typography>
            <Box
              component="img"
              src={
                backImage?.[0]
                  ? URL.createObjectURL(backImage?.[0])
                  : Assets.backIDCard
              }
              sx={{
                width: '100%',
                aspectRatio: 16 / 10,
                objectFit: 'cover',
              }}
            />
            <input type="file" {...register('backImage')} />
            {errors?.backImage?.message ? (
              <Typography color="error" sx={{ fontSize: '14px' }}>
                {errors?.backImage?.message}
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

export default UploadIDCard;
