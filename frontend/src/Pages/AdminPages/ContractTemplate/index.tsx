import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import { Button, Grid, Stack, Typography } from '@mui/material';
import { AdminLayout } from '@/Components/DefaultLayout';
import TextEditor from '@/Components/TextEditor';
import { RootState, useTypedDispatch } from '@/Reducers/store';
import { SystemInfoActions } from '@/Reducers/Actions';

const { getSystemInfo, updateSystemInfo } = SystemInfoActions;

const ContractTemplate = () => {
  const dispatch = useTypedDispatch();
  const systemInfo: any = useSelector((state: RootState) =>
    _.get(state.SYSTEM_INFO, 'payload')
  );
  const [content, setContent] = React.useState<string | undefined>('');
  const [renderKey, setRenderkey] = React.useState<number>();

  React.useEffect(() => {
    dispatch(getSystemInfo());
  }, []);

  React.useEffect(() => {
    if (systemInfo) {
      setContent(systemInfo?.content);
      setRenderkey(Math.random());
    }
  }, [systemInfo]);

  const onSubmit = () => {
    if (systemInfo?.id) {
      console.log(content);
      dispatch(updateSystemInfo(systemInfo.id, { content }));
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
            <TextEditor
              onChange={(newContent: string) => {
                if (newContent) setContent(newContent);
              }}
              value={`${content}`}
              key={`whatis${renderKey}`}
              height={800}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ fontSize: 14, fontWeight: 400, marginBottom: '16px' }}
            >
              Họ và tên: $_HOVATEN ; CMND/CCCD: $_IDCARD ; Tiền vay: $_TIENVAY ; Thời gian vay: $_THANGVAY ;Thời gian vay: $_LAIXUAT
            </Typography>
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
