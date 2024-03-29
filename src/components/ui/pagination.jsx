// import React from 'react';
// import RCPagination, { PaginationProps } from 'rc-pagination';
// import 'rc-pagination/assets/index.css';
// import { ArrowNext } from '@/components/icons/arrow-next';
// import { ArrowPrev } from '@/components/icons/arrow-prev';

// // : React.FC<PaginationProps>

// const Pagination: React.FC<PaginationProps> = (props) => {
//   return (
//     <RCPagination
//       nextIcon={<ArrowNext />}
//       prevIcon={<ArrowPrev />}
//       {...props}
//     />
//   );
// };

// export default Pagination;

import React from 'react';
import RCPagination, { PaginationProps } from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { ArrowNext } from '@/components/icons/arrow-next';
import { ArrowPrev } from '@/components/icons/arrow-prev';

const Pagination = ({ props, PaginationProps }) => {
  return (
    <RCPagination
      nextIcon={<ArrowNext />}
      prevIcon={<ArrowPrev />}
      {...props}
    />
  );
};

export default Pagination;