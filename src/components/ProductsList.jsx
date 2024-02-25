import React, { memo } from 'react'
import Product from './Product'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { v4 as uuidv4 } from 'uuid'

const ProductsList = ({ IDsToRender }) => {
  return (
    <Container>
      <Row className="d-flex flex-wrap" sm={8}>
        {IDsToRender.map((id) => {
          return (
            <Col key={uuidv4()} lg={3} md={4} sm={6} xs={12} className="mb-4">
              <Product id={id} key={uuidv4()} />
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default ProductsList
