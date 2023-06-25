import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import { Button, Grid, Stack, Typography, TextField } from '@mui/material';
import { AdminLayout } from '@/Components/DefaultLayout';
import { RootState, useTypedDispatch } from '@/Reducers/store';
import { SystemInfoActions } from '@/Reducers/Actions';

const { getSystemInfo, updateSystemInfo } = SystemInfoActions;

const ContractTemplate = () => {
  const dispatch = useTypedDispatch();
  const systemInfo: any = useSelector((state: RootState) =>
    _.get(state.SYSTEM_INFO, 'payload')
  );
  const [content, setContent] = React.useState({
    header: '',
    nameOfContract: '',
    sideA: '',
    sideB: '',
    terms: '',
  });
  const [renderKey, setRenderkey] = React.useState<number>();

  React.useEffect(() => {
    dispatch(getSystemInfo());
  }, []);

  React.useEffect(() => {
    if (systemInfo) {
      setContent(systemInfo);
      setRenderkey(Math.random());
    }
  }, [systemInfo]);

  const onSubmit = () => {
    if (systemInfo?.id) {
      dispatch(
        updateSystemInfo(
          systemInfo.id,
          _.pick(content, [
            'header',
            'nameOfContract',
            'sideA',
            'sideB',
            'terms',
          ])
        )
      );
    }
  };
  const _renderMain = () => {
    return (
      <Stack sx={{ padding: '20px' }} direction="column">
        <Typography
          sx={{ fontSize: '17px', fontWeight: 600, marginBottom: '16px' }}
        >
          Thông tin hợp đồng
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Stack direction="column" gap={2}>
              <TextField
                label="Tiêu ngữ"
                key={`header${renderKey}`}
                value={content.header}
                onChange={(e) =>
                  setContent({ ...content, header: e.target.value })
                }
                multiline
                fullWidth
                minRows={4}
              />
              <TextField
                label="Tên hợp đồng"
                key={`nameOfContract${renderKey}`}
                value={content.nameOfContract}
                onChange={(e) =>
                  setContent({ ...content, nameOfContract: e.target.value })
                }
                multiline
                fullWidth
                minRows={4}
              />
              <TextField
                label="Bên A"
                key={`sideA${renderKey}`}
                value={content.sideA}
                onChange={(e) =>
                  setContent({ ...content, sideA: e.target.value })
                }
                multiline
                fullWidth
                minRows={4}
              />
              <TextField
                label="Bên B"
                key={`sideB${renderKey}`}
                value={content.sideB}
                onChange={(e) =>
                  setContent({ ...content, sideB: e.target.value })
                }
                multiline
                fullWidth
                minRows={4}
                helperText="Họ và tên: $_HOVATEN ; CMND/CCCD: $_IDCARD ; Tiền vay: $_TIENVAY ; Thời gian vay: $_THANGVAY ;Thời gian vay: $_LAIXUAT"
              />
              <TextField
                key={`terms${renderKey}`}
                label="Điều khoản hợp đồng"
                value={content.terms}
                onChange={(e) =>
                  setContent({ ...content, terms: e.target.value })
                }
                multiline
                fullWidth
                minRows={10}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <Button
                variant="contained"
                color="yellowOrange"
                sx={{ textTransform: 'unset' }}
                onClick={() => onSubmit()}
              >
                Cập nhật
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    );
  };
  return (
    <AdminLayout content={_renderMain()} screenTitle="Thông tin hợp đồng" />
  );
};

export default ContractTemplate;
