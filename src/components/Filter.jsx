import React, { useRef, useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import SplitButton from 'react-bootstrap/SplitButton'
import { getSortedProducts } from '../utils/api'
import { useContext } from 'react'
import { ProductsContext } from '../context/products'
import Badge from 'react-bootstrap/Badge'
import Stack from 'react-bootstrap/Stack'

const splitButtonTitle = {
  product: 'Название',
  price: 'Цена',
  brand: 'Брэнд',
}

export default function Filter() {
  const [activeInput, setActiveInput] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const { IDs, sortedIDs, setSortedIDs } = useContext(ProductsContext)
  const abortController = useRef(new AbortController())
  const opacityValue = sortedIDs.length > 1 ? 0 : 1

  const handleChangeInput = (e) => {
    setActiveInput(e.target.name)
    setInputValue('')
  }
  const handleChangeBlur = (e) => {
    if (inputValue === '' && sortedIDs.length === 0) {
      setSortedIDs(IDs)
    }
  }
  const handleChangeValue = async (e) => {
    setShowMessage(!showMessage)
    const { name, value } = e.target
    setInputValue(value)

    const parsedValue = name === 'price' ? +value : value
    try {
      const { signal } = abortController.current
      const sortedIDs = await getSortedProducts({ [name]: parsedValue }, signal)
      setSortedIDs(sortedIDs.result)
    } catch (error) {
      console.error('Error fetching sorted IDs:', error)
    }
  }
  useEffect(() => {
    return () => {
      abortController.current.abort('Request was canceled❤️')
    }
  }, [])
  return (
    <Stack>
      <InputGroup className="mb-3">
        <SplitButton
          variant="outline-primary"
          title={activeInput ? splitButtonTitle[activeInput] : 'Поиск по'}
          id="segmented-button-dropdown-1"
          onClick={handleChangeInput}
        >
          <Dropdown.Item href="#" name="product" onClick={handleChangeInput}>
            Названию
          </Dropdown.Item>
          <Dropdown.Item href="#" name="price" onClick={handleChangeInput}>
            Цене
          </Dropdown.Item>
          <Dropdown.Item href="#" name="brand" onClick={handleChangeInput}>
            Брэнду
          </Dropdown.Item>
        </SplitButton>
        <Form.Control
          type={activeInput === 'price' ? 'number' : 'text'}
          name={activeInput}
          value={inputValue}
          onChange={handleChangeValue}
          onBlur={handleChangeBlur}
          disabled={!activeInput}
        />
      </InputGroup>
      <Badge className="align-self-center " style={{ opacity: opacityValue }}>
        Nothing Found
      </Badge>
    </Stack>
  )
}
