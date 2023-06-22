import React from 'react';

const range = (start: number, end: number) => {
  const length = end - start + 1;
  /*
  	Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({ length }, (_, idx) => idx + start);
};

const DOTS = '...';

const usePagination = ({
  totalItems = 0,
  itemsPerPage = 0,
  siblingCount = 1,
  currentPage = 0,
}) => {
  const paginationRange = React.useMemo(() => {
    const result = [];
    const totalPageCount = Math.ceil(totalItems / itemsPerPage);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
    	Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;
    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      result.push(...range(1, totalPageCount));
    } else if (!shouldShowLeftDots && shouldShowRightDots) {
      /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
      const leftItemCount = 1 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      result.push(...[...leftRange, DOTS, totalPageCount]);
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      /*
    	Case 3: No right dots to show, but left dots to be shown
    */
      const rightItemCount = 1 + 2 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      result.push(...[firstPageIndex, DOTS, ...rightRange]);
    } else if (shouldShowLeftDots && shouldShowRightDots) {
      /*
    	Case 4: Both left and right dots to be shown
    */
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      result.push(
        ...[firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
      );
    }
    return result;
  }, [totalItems, itemsPerPage, siblingCount, currentPage]);

  return paginationRange;
};

export { usePagination, DOTS };
