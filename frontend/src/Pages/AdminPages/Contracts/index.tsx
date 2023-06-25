import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import {
  Chip,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  Button,
  TextField,
  Grid,
  Box,
  Link,
} from '@mui/material';
// import TextEditor from '@/Components/TextEditor';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { AdminLayout } from '@/Components/DefaultLayout';
import { RootState, useTypedDispatch } from '@/Reducers/store';
import { ContractActions } from '@/Reducers/Actions';
import { ENUMS } from '@/Constants';
import { Utils } from '@/Libs';

interface IFilterParam {
  page: number;
  limit: number;
  sortBy: string;
  populate: string;
}

interface IUser {
  id: string;
  fullname: string;
}

interface IVerify {
  id: string;
  backImage: string;
  frontImage: string;
  selfieImage: string;
  signedImage: string;
  status: string;
  userId: IUser;
  employeeId: any;
  money: any;
  month: any;
}

interface IPayload {
  limit: number;
  page: number;
  results: IVerify[];
  totalPages: number;
  totalResults: number;
}

const statusOptions: {
  [key: string]: {
    label: string;
    color: 'error' | 'success' | 'warning' | 'info';
  };
} = {
  [ENUMS.EVerifyType.DONE]: {
    color: 'success',
    label: 'Đã thanh toán',
  },
  [ENUMS.EVerifyType.PENDING]: {
    color: 'warning',
    label: 'Đang chờ',
  },
  [ENUMS.EVerifyType.ONPROCESSING]: {
    color: 'info',
    label: 'Đang thanh toán',
  },
};

interface ICreateData {
  id: string;
  user: IUser;
  employee: any;
  money: any;
  month: any;
  date: string;
  time: string;
  type: 'recharge' | 'withdraw' | 'bonus';
  status: string;
  total: number;
  surplus: number;
  view: React.ReactNode;
  action: React.ReactNode;
}

interface IFilterParam {
  sortBy: string;
  populate: string;
  page: number;
  limit: number;
}

function createData(
  id: string,
  user: IUser,
  employee: any,
  money: any,
  month: any,
  status: string,
  view: React.ReactNode,
  action: React.ReactNode
) {
  return { id, user, employee, money, month, status, view, action };
}

const initialFilterParam = {
  page: 1,
  limit: 15,
  sortBy: 'createdAt:desc',
  populate: 'userId,employeeId',
};

const {
  fetchAllContract,
  approveContract,
  denyContract,
  updateContract,
  completeContract,
} = ContractActions;

const Contracts: React.FC = () => {
  const dispatch = useTypedDispatch();
  const userData = Utils.getUserData();
  // const [isShowResetPassword, setIsShowResetPassword] =
  //   React.useState<boolean>(false);

  const payload: IPayload = useSelector((state: RootState) =>
    _.get(state.CONTRACT, 'payload')
  );
  const [changedState, setChangedState] = React.useState<any>(null);
  const [viewMode, setViewMode] = React.useState('view');
  const [renderKey, setRenderkey] = React.useState<number>();

  const [filterParams, setFilterParams] =
    React.useState<IFilterParam>(initialFilterParam);

  React.useEffect(() => {
    dispatch(fetchAllContract(filterParams));
  }, [filterParams]);

  React.useEffect(() => {
    setRenderkey(Math.random());
  }, [viewMode]);

  const onRowAction = (action: 'approve' | 'deny' | 'done', item: IVerify) => {
    if (action === 'approve') {
      dispatch(approveContract(item.id, filterParams));
    } else if (action === 'deny') dispatch(denyContract(item.id, filterParams));
    else if (action === 'done')
      dispatch(completeContract(item.id, filterParams));
  };

  const rows = React.useMemo(() => {
    const result: any[] = [];
    if (payload.results && payload.results?.length > 0) {
      payload.results.forEach((item: IVerify) =>
        result.push(
          createData(
            item.id,
            item.userId || userData,
            item?.employeeId,
            item?.money,
            item?.month,
            item.status,
            <IconButton size="small" onClick={() => setChangedState(item)}>
              <RemoveRedEyeOutlinedIcon />
            </IconButton>,
            <Stack direction="row" justifyContent="center">
              {item.status === 'pending' && (
                <>
                  <Tooltip title="Chấp nhận">
                    <span>
                      <IconButton
                        color="success"
                        onClick={() =>
                          item.status == 'pending' &&
                          onRowAction('approve', item)
                        }
                        disabled={item.status !== 'pending'}
                      >
                        <CheckCircleOutlineIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Từ chối">
                    <span>
                      <IconButton
                        color="error"
                        onClick={() =>
                          item.status == 'pending' && onRowAction('deny', item)
                        }
                        disabled={item.status !== 'pending'}
                      >
                        <DoDisturbIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                </>
              )}
              {item.status === 'onProcessing' && (
                <Tooltip title="Hoàn thành">
                  <span>
                    <IconButton
                      color="info"
                      onClick={() => onRowAction('done', item)}
                    >
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              )}
            </Stack>
          )
        )
      );
    }
    return result;
  }, [payload]);

  const viewModeScreen = () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          component="div"
          dangerouslySetInnerHTML={{ __html: changedState?.content }}
        />
        <Stack direction="column" gap={2}>
          <Typography sx={{ textAlign: 'center' }}>
            {changedState?.content?.header}
          </Typography>
          <Typography sx={{ textAlign: 'center' }}>
            {changedState?.content?.nameOfContract}
          </Typography>
          <Typography sx={{ whiteSpace: 'pre-wrap' }}>
            {changedState?.content?.sideA}
          </Typography>
          <Typography sx={{ whiteSpace: 'pre-wrap' }}>
            {changedState?.content?.sideB}
          </Typography>
          <Typography sx={{ whiteSpace: 'pre-wrap' }}>
            {changedState?.content?.terms}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography>Ảnh xác thực:</Typography>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" gap={2}>
          <Box
            component="img"
            src={`data:image/*;base64,${changedState?.signImage}`}
            sx={{
              width: '40%',
              aspectRatio: 16 / 10,
              objectFit: 'cover',
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          Nhân viên hỗ trợ: {changedState?.employeeId?.fullname}
        </Typography>
        <Link
          href={changedState?.employeeId?.contact}
          target="_blank"
          sx={{ color: 'blue', textDecoration: 'underline' }}
        >
          Link FB
        </Link>
      </Grid>
    </Grid>
  );

  const editModeScreen = () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* <TextEditor
          onChange={(newContent: string) => {
            if (newContent)
              setChangedState({ ...changedState, content: newContent });
          }}
          value={`${changedState?.content}`}
          key={`whatis${renderKey}`}
          height={800}
        /> */}
        <Stack direction="column" gap={2}>
          <TextField
            label="Tiêu ngữ"
            key={`header${renderKey}`}
            value={changedState?.content?.header}
            onChange={(e) =>
              setChangedState({
                ...changedState,
                content: {
                  ...changedState.content,
                  header: e.target.value,
                },
              })
            }
            multiline
            fullWidth
            minRows={4}
          />
          <TextField
            label="Tên hợp đồng"
            key={`nameOfContract${renderKey}`}
            value={changedState?.content?.nameOfContract}
            onChange={(e) =>
              setChangedState({
                ...changedState,
                content: {
                  ...changedState.content,
                  nameOfContract: e.target.value,
                },
              })
            }
            multiline
            fullWidth
            minRows={4}
          />
          <TextField
            label="Bên A"
            key={`sideA${renderKey}`}
            value={changedState?.content?.sideA}
            onChange={(e) =>
              setChangedState({
                ...changedState,
                content: {
                  ...changedState.content,
                  sideA: e.target.value,
                },
              })
            }
            multiline
            fullWidth
            minRows={4}
          />
          <TextField
            label="Bên B"
            key={`sideB${renderKey}`}
            value={changedState?.content?.sideB}
            onChange={(e) =>
              setChangedState({
                ...changedState,
                content: {
                  ...changedState.content,
                  sideB: e.target.value,
                },
              })
            }
            multiline
            fullWidth
            minRows={4}
          />
          <TextField
            key={`terms${renderKey}`}
            label="Điều khoản hợp đồng"
            value={changedState?.content?.terms}
            onChange={(e) =>
              setChangedState({
                ...changedState,
                content: {
                  ...changedState.content,
                  terms: e.target.value,
                },
              })
            }
            multiline
            fullWidth
            minRows={10}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" gap={2}>
          <TextField
            variant="outlined"
            size="small"
            label="Tiền vay"
            type="number"
            sx={{
              marginTop: '10px',
              color: 'text.secondary',
              ' .MuiInputBase-root': {
                backgroundColor: 'background.secondary',
              },
            }}
            value={changedState?.money || ''}
            onChange={(e) =>
              setChangedState({ ...changedState, money: e.target.value })
            }
          />
          <TextField
            hiddenLabel
            variant="outlined"
            size="small"
            label="Kỳ hạn"
            type="number"
            sx={{
              marginTop: '10px',
              color: 'text.secondary',
              ' .MuiInputBase-root': {
                backgroundColor: 'background.secondary',
              },
            }}
            value={changedState?.month || ''}
            onChange={(e) =>
              setChangedState({ ...changedState, month: e.target.value })
            }
          />
          <TextField
            hiddenLabel
            variant="outlined"
            size="small"
            label="Lãi xuất"
            type="number"
            sx={{
              marginTop: '10px',
              color: 'text.secondary',
              ' .MuiInputBase-root': {
                backgroundColor: 'background.secondary',
              },
            }}
            value={changedState?.interestRate || ''}
            onChange={(e) =>
              setChangedState({ ...changedState, interestRate: e.target.value })
            }
          />
        </Stack>
      </Grid>
    </Grid>
  );

  const renderPopup = () => (
    <Dialog open={Boolean(changedState)} fullWidth maxWidth="lg">
      <DialogTitle sx={{ color: 'text.primary' }}>
        {viewMode === 'edit' ? 'Sửa thông tin hợp đồng' : 'Thông tin hợp đồng'}
      </DialogTitle>
      <DialogContent>
        {viewMode === 'view' && viewModeScreen()}
        {viewMode === 'edit' && editModeScreen()}
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ textTransform: 'unset' }}
          onClick={() => {
            setChangedState(null);
            setViewMode('view');
          }}
          color="error"
        >
          Hủy
        </Button>
        {viewMode === 'view' && (
          <Button
            sx={{ textTransform: 'unset' }}
            onClick={() => setViewMode('edit')}
            color="warning"
            endIcon={<EditIcon />}
          >
            Chỉnh sửa thông tin
          </Button>
        )}
        {viewMode === 'edit' && (
          <Button
            sx={{
              textTransform: 'unset',
              backgroundColor: 'background.burntSienna',
            }}
            variant="contained"
            onClick={() => {
              dispatch(
                updateContract(
                  changedState?.id,
                  _.pick(changedState, [
                    'content',
                    'money',
                    'month',
                    'interestRate',
                  ]) as any,
                  filterParams
                )
              );
            }}
          >
            Lưu chỉnh sửa
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );

  const _renderMain = () => {
    return (
      <Stack sx={{ padding: '20px' }} direction="column">
        {renderPopup()}
        <Typography sx={{ fontSize: '17px', fontWeight: 600 }}>
          Thống kê hợp đồng
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            marginTop: '30px',
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Người dùng</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Hỗ trợ</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Tiền vay
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Kỳ hạn
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Trạng thái
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Xem
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 &&
                rows.map((row: ICreateData, index: number) => (
                  <TableRow
                    key={`row-${index}-${row.id}`}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ padding: '15px' }}
                    >
                      {row.user?.fullname}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ padding: '15px' }}
                    >
                      {row.employee?.fullname}
                    </TableCell>
                    <TableCell align="center" sx={{ padding: '15px' }}>
                      {row.money}
                    </TableCell>
                    <TableCell align="center" sx={{ padding: '15px' }}>
                      {row.month}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        color={statusOptions[row.status]?.color}
                        label={statusOptions[row.status]?.label}
                        sx={{
                          width: '150px',
                          borderRadius: '5px',
                          fontWeight: 600,
                        }}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">{row.view}</TableCell>
                    <TableCell align="center">{row.action}</TableCell>
                  </TableRow>
                ))}
              {rows.length === 0 && (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {payload.totalPages > 0 && (
          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ marginTop: '15px' }}
          >
            <Pagination
              count={payload.totalPages}
              page={payload.page}
              onChange={(_e: any, newPage: number) =>
                setFilterParams({ ...filterParams, page: newPage })
              }
              shape="rounded"
            />
          </Stack>
        )}
      </Stack>
    );
  };
  return <AdminLayout content={_renderMain()} screenTitle="Hợp đồng" />;
};

export default Contracts;
