import React, { useState, useMemo } from 'react'
import { useEffect } from 'react'
import { getProductInfo } from '../utils/api'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'

const Product = ({ id }) => {
  const [info, setInfo] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductInfo(id)
        setInfo(response.result[0])
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <Card
        bg="light"
        border="primary"
        style={{ height: '200px' }}
        className="align-items-center justify-content-center"
      >
        {info ? (
          <Card.Body>
            <Card.Title>{info.brand}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {info.product}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Цена: {info.price}
            </Card.Subtitle>
            <Card.Text>ID: {info.id}</Card.Text>
          </Card.Body>
        ) : (
          <Spinner
            className="align-self-center"
            animation="grow"
            variant="primary"
          />
        )}
      </Card>
    </>
  )
}
export default Product
