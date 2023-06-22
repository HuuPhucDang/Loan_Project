import React from 'react';

import { usePagination, DOTS } from './usePagination';
import { Button, Stack, Typography } from '@mui/material';
import { mainStyles } from './Pagination.styles';

interface IMeta {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

interface IProps {
  onPageChange?: (page: number) => void;
  payload: IMeta;
  siblingCount?: number;
}

const Pagination: React.FC<IProps> = ({
  payload,
  onPageChange,
  siblingCount = 1,
}) => {
  const { totalItems, currentPage, itemsPerPage, totalPages } = payload;

  const paginationRange = usePagination({
    currentPage,
    totalItems,
    siblingCount,
    itemsPerPage,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onPrevious = () => {
    onPageChange != null && onPageChange(currentPage - 1);
  };

  const onSelectPage = (page: number | string) => {
    currentPage !== page &&
      onPageChange != null &&
      typeof page === 'number' &&
      onPageChange(page);
  };

  const onNext = () => {
    onPageChange != null && onPageChange(currentPage + 1);
  };

  const isDisableLeftArrow = currentPage === 1;

  const isDisabledRightArrow = currentPage === totalPages;

  return (
    <Stack
      direction="row"
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '40px',
      }}
    >
      {!isDisableLeftArrow ? (
        <Button onClick={onPrevious} variant="outlined" sx={mainStyles}>
          <Typography
            component="span"
            sx={{
              fontSize: 'inherit',
              color: 'inherit',
              fontWeight: 700
            }}
          >
            &lt;
          </Typography>
          <Typography
            component="span"
            display={{ xs: 'none', md: 'inline-block' }}
            sx={{
              fontSize: 'inherit',
              color: 'inherit',
              marginLeft: '4px',
            }}
          >
            Previous
          </Typography>
        </Button>
      ) : null}

      {paginationRange.map((pageNumber: string | number, idx: number) => {
        const key = `paginate-page-${pageNumber}-${idx}`;
        const isActivePage = pageNumber === currentPage;

        if (pageNumber === DOTS)
          return (
            <Button
              key={key}
              color="black"
              sx={{
                ...mainStyles,
                width: '28px',
                margin: '0 2px',
                borderColor: '#000000',
                padding: '0',
              }}
              disabled
            >
              ...
            </Button>
          );

        return (
          <Button
            onClick={() => {
              onSelectPage(pageNumber);
            }}
            key={key}
            variant="outlined"
            sx={{
              ...mainStyles,
              width: '28px',
              borderColor: isActivePage ? '#000000' : 'transparent',
              background: {
                xs: isActivePage ? '#000000' : 'transparent',
                md: 'transparent'
              },
              color: {
                xs: isActivePage ? '#ffffff' : '#000000',
                md: '#000000'
              },
              padding: '0',
            }}
          >
            {pageNumber}
          </Button>
        );
      })}
      {!isDisabledRightArrow ? (
        <Button onClick={onNext} variant="outlined" sx={mainStyles}>
          <Typography
            component="span"
            display={{
              xs: 'none',
              md: 'inline-block',
            }}
            sx={{
              fontSize: 'inherit',
              color: 'inherit',
              marginRight: '4px',
            }}
          >
            Next
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: 'inherit',
              color: 'inherit',
              fontWeight: 700
            }}
          >
            &gt;
          </Typography>
        </Button>
      ) : null}
    </Stack>
  );
};

export default Pagination;
