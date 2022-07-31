import React from 'react';
import { Container, Pagination } from 'react-bootstrap';

interface PagePaginationProps {
  limitPage: number
  page: number
  onChange: (page: number)=> void
  totalCount?: number
}

function PagePagination({
  page, limitPage, totalCount = 0, onChange,
}: PagePaginationProps) {
  const total = Math.ceil(totalCount / limitPage) || 1;

  return (
    <>
      <div style={{ height: '100px' }} />
      <Container className="fixed-bottom rounded-2 bg-body pt-2">
        <Pagination className="float-end">
          <Pagination.Prev
            disabled={page === 0}
            onClick={() => onChange(page - 1)}
          />
          {Array.from(Array(total).keys()).map((index) => (
            <Pagination.Item active={page === index} key={index} onClick={() => onChange(index)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={page === total - 1}
            onClick={() => onChange(page + 1)}
          />
        </Pagination>
      </Container>
    </>
  );
}

export default PagePagination;
