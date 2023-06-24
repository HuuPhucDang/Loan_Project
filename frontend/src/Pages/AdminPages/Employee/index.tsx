import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import {
  Button,
  Grid,
  Stack,
  Typography,
  Checkbox,
  TextField,
  Link,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { AdminLayout } from '@/Components/DefaultLayout';
import { RootState, useTypedDispatch } from '@/Reducers/store';
import { EmployeeActions } from '@/Reducers/Actions';

const { updateEmployee, fetchAllEmployees, createEmployee, updateContactList } =
  EmployeeActions;

const Employee = () => {
  const dispatch = useTypedDispatch();
  const employees: any = useSelector((state: RootState) =>
    _.get(state.EMPLOYEE, 'employees')
  );
  const [checked, setChecked] = React.useState<any[]>([]);
  const [changedState, setChangedState] = React.useState<any>(null);

  React.useEffect(() => {
    dispatch(fetchAllEmployees());
  }, []);

  React.useEffect(() => {
    if (!_.isEmpty(employees)) {
      const linkChecked: any = [];
      _.forEach(employees, (employee) => {
        if (employee?.isActive) linkChecked.push(employee?.id);
      });
      setChecked(linkChecked);
    }
  }, [employees]);

  const handleChecked = (id: any) => {
    let newChecked = [...checked];
    if (checked.includes(id))
      newChecked = _.filter(newChecked, (el) => el !== id);
    else newChecked.push(id);
    setChecked(newChecked);
  };

  const onSaveEmployee = () => {
    if (changedState?.id)
      dispatch(updateEmployee(changedState?.id, _.omit(changedState, ['id'])));
    else dispatch(createEmployee(changedState));
  };

  const onUpdateContactList = () => {
    dispatch(updateContactList({ ids: checked }));
  };

  const renderPopup = () => (
    <Dialog open={Boolean(changedState)} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ color: 'text.primary' }}>
        {changedState?.id ? 'Sửa thông tin nhân viên' : 'Thêm nhân viên'}
      </DialogTitle>
      <DialogContent>
        <Stack direction="column">
          <TextField
            hiddenLabel
            variant="outlined"
            size="small"
            placeholder="Họ và Tên"
            sx={{
              marginTop: '10px',
              color: 'text.secondary',
              ' .MuiInputBase-root': {
                backgroundColor: 'background.secondary',
              },
            }}
            value={changedState?.fullname || ''}
            onChange={(e) =>
              setChangedState({ ...changedState, fullname: e.target.value })
            }
          />
          <TextField
            hiddenLabel
            variant="outlined"
            size="small"
            placeholder="Link FB*"
            sx={{
              marginTop: '10px',
              color: 'text.secondary',
              ' .MuiInputBase-root': {
                backgroundColor: 'background.secondary',
              },
            }}
            value={changedState?.contact || ''}
            onChange={(e) =>
              setChangedState({ ...changedState, contact: e.target.value })
            }
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ textTransform: 'unset' }}
          onClick={() => setChangedState(null)}
          color="error"
        >
          Hủy
        </Button>
        <Button
          sx={{
            textTransform: 'unset',
            backgroundColor: 'background.burntSienna',
          }}
          variant="contained"
          onClick={() => onSaveEmployee()}
        >
          {changedState?.id ? 'Lưu' : 'Tạo mới'}
        </Button>
      </DialogActions>
    </Dialog>
  );


  const _renderMain = () => {
    return (
      <Stack sx={{ padding: '20px' }} direction="column">
        {renderPopup()}
        <Typography
          sx={{ fontSize: '17px', fontWeight: 600, marginBottom: '16px' }}
        >
          Quản lý nhân viên
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end" columnGap={2}>
              <Button
                variant="contained"
                color="success"
                sx={{ textTransform: 'unset' }}
                onClick={() => setChangedState({ fullname: '', contact: '' })}
              >
                Thêm nhân viên
              </Button>
              <Button
                variant="contained"
                color="yellowOrange"
                sx={{ textTransform: 'unset' }}
                onClick={() => onUpdateContactList()}
              >
                Cập nhật danh sách Link Hỗ Trợ ({checked.length})
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="left" sx={{ fontWeight: 600 }}>
                    Họ và Tên
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Link FB
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Hành động
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.length > 0 &&
                  employees.map((row: any, index: number) => (
                    <TableRow
                      key={`row-${index}`}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Checkbox
                          edge="start"
                          checked={_.includes(checked, row?.id)}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': row.id }}
                          onClick={() => handleChecked(row?.id)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" align="left">
                        {row.fullname}
                      </TableCell>
                      <TableCell align="center">
                        <Link
                          href={row.contact}
                          target="_blank"
                          sx={{ color: 'blue', textDecoration: 'underline' }}
                        >
                          Link
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() =>
                            setChangedState(
                              _.pick(row, ['id', 'fullname', 'contact'])
                            )
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                {employees.length === 0 && (
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
            {/* <List>
              <TransitionGroup>
                {employees.map((item: any) => (
                  <Collapse key={item.id}>
                    {renderItem(item)}
                    <Divider sx={{ width: 1 }} />
                  </Collapse>
                ))}
              </TransitionGroup>
            </List> */}
          </Grid>
        </Grid>
      </Stack>
    );
  };
  return (
    <AdminLayout content={_renderMain()} screenTitle="Thông tin hợp đồng" />
  );
};

export default Employee;
