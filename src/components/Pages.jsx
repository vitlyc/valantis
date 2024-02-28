import React, { useState, useEffect } from 'react'
import ProductsList from './ProductsList'
import Spinner from 'react-bootstrap/Spinner'
import { useContext } from 'react'
import { ProductsContext } from '../context/products'
import Filter from './Filter'
import ReactPaginate from 'react-paginate'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

export default function Pages() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)
  const { sortedIDs } = useContext(ProductsContext)

  const totalPages = []

  for (let i = 1; i <= Math.ceil(sortedIDs.length / itemsPerPage); i++) {
    totalPages.push(i)
  }
  const lastIndex = currentPage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage
  const IDsToRender =
    sortedIDs.length > 1 ? sortedIDs.slice(firstIndex, lastIndex) : []

  const handlePageClick = (e) => {
    const clickedPage = e.selected + 1
    setCurrentPage(clickedPage)
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [sortedIDs])

  // const startTime = performance.now()
  //  const endTime = performance.now()
  // const executionTime = endTime - startTime

  return (
    <Container>
      <Col>
        <Filter />
        {IDsToRender ? (
          <ProductsList IDsToRender={IDsToRender} />
        ) : (
          <Spinner
            className="align-self-center m-5"
            animation="grow"
            variant="primary"
          />
        )}
        <ReactPaginate
          previousLabel="Prev"
          nextLabel="Next"
          breakLabel="..."
          pageCount={totalPages.length}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          nextClassName="page-item"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </Col>
    </Container>
  )
}
