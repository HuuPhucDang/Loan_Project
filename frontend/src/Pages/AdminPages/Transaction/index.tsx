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
} from '@mui/material';

import { AdminLayout } from '@/Components/DefaultLayout';
import { ResetPassword } from '@/Components/Popup';
import { RootState, useTypedDispatch } from '@/Reducers/store';
import { TransactionActions } from '@/Reducers/Actions';
import { ENUMS } from '@/Constants';
import { Utils } from '@/Libs';

interface IFilterParam {
  type: string;
  status: string;
  page: number;
  limit: number;
  sortBy: string;
  populate: string;
}

interface IUser {
  id: string;
  nickname: string;
  username: string;
}

interface ITransaction {
  id: string;
  amount: number;
  balance: number;
  date: string;
  status: string;
  time: string;
  type: string;
  userId: IUser;
}

interface IPayload {
  limit: number;
  page: number;
  results: ITransaction[];
  totalPages: number;
  totalResults: number;
}

const statusOptions: {
  [key: string]: {
    label: string;
    color: 'error' | 'success' | 'warning';
  };
} = {
  [ENUMS.ETransactionStatus.CANCELED]: {
    color: 'error',
    label: 'Đã hủy',
  },
  [ENUMS.ETransactionStatus.RESOLVED]: {
    color: 'success',
    label: 'Đã duyệt',
  },
  [ENUMS.ETransactionStatus.PENDING]: {
    color: 'warning',
    label: 'Đang chờ',
  },
  [ENUMS.ETransactionStatus.DENIED]: {
    color: 'error',
    label: 'Đã từ chối',
  },
};

interface ICreateData {
  id: string;
  user: IUser;
  date: string;
  time: string;
  type: 'recharge' | 'withdraw' | 'bonus';
  status: string;
  total: number;
  surplus: number;
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
  date: string,
  time: string,
  type: string,
  status: string,
  total: number,
  surplus: number,
  action: React.ReactNode
) {
  return { id, user, date, time, type, status, total, surplus, action };
}

const initialFilterParam = {
  type: 'all',
  status: 'all',
  page: 1,
  limit: 15,
  sortBy: 'date:desc,time:desc,status:desc',
  populate: 'userId',
};
const types = {
  recharge: 'Nạp',
  withdraw: 'Rút',
  bonus: 'Thưởng',
};

const { fetchTransactions, rechargeMoney, denyTransaction, withdrawMoney } =
  TransactionActions;

const Transaction: React.FC = () => {
  const dispatch = useTypedDispatch();
  const userData = Utils.getUserData();
  const [isShowResetPassword, setIsShowResetPassword] =
    React.useState<boolean>(false);
  const [currentUser, setCurrentUser] = React.useState<any>(null);

  const payload: IPayload = useSelector((state: RootState) =>
    _.get(state.TRANSACTION, 'payload')
  );

  const [filterParams, setFilterParams] =
    React.useState<IFilterParam>(initialFilterParam);

  React.useEffect(() => {
    dispatch(fetchTransactions(filterParams));
  }, [filterParams]);

  const onRowAction = (action: 'approve' | 'deny', item: ITransaction) => {
    if (action === 'approve') {
      const approvePayload = {
        userId: item.userId.id,
        amount: item.amount,
      };
      if (item.type === 'recharge')
        dispatch(rechargeMoney(item.id, approvePayload, filterParams));
      else if (item.type === 'withdraw')
        dispatch(withdrawMoney(item.id, approvePayload, filterParams));
    } else if (action === 'deny')
      dispatch(denyTransaction(item.id, filterParams));
  };

  const rows = React.useMemo(() => {
    const result: any[] = [];
    if (payload.results && payload.results?.length > 0) {
      payload.results.forEach((item: ITransaction) =>
        result.push(
          createData(
            item.id,
            item.userId || userData,
            item.date,
            item.time,
            item.type,
            item.status,
            item.amount,
            item.balance,
            <Stack direction="row" justifyContent="center">
              <Tooltip title="Chấp nhận">
                <span>
                  <IconButton
                    color="success"
                    onClick={() =>
                      item.status == 'pending' && onRowAction('approve', item)
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
            </Stack>
          )
        )
      );
    }
    return result;
  }, [payload]);

  const _renderMain = () => {
    return (
      <Stack sx={{ padding: '20px' }} direction="column">
        <ResetPassword
          user={currentUser}
          open={isShowResetPassword}
          onClose={() => {
            setIsShowResetPassword(false);
            setCurrentUser(null);
          }}
        />
        <Typography sx={{ fontSize: '17px', fontWeight: 600 }}>
          Giao dịch
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
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Thời gian
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Loại
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Trạng thái
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Số tiền (USDT)
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Số dư (USDT)
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
                      {row.user?.username}
                    </TableCell>
                    <TableCell align="center">
                      {row.date}, {row.time}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={types[row?.type]}
                        sx={{ textTransform: 'capitalize', width: '100px' }}
                        color="info"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        color={statusOptions[row.status]?.color}
                        label={statusOptions[row.status]?.label}
                        sx={{
                          width: '130px',
                          borderRadius: '5px',
                          fontWeight: 600,
                        }}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">{row.total.toFixed(2)}</TableCell>
                    <TableCell align="center">{row.surplus.toFixed(2)}</TableCell>
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
  return <AdminLayout content={_renderMain()} screenTitle="Giao dịch" />;
};

export default Transaction;
