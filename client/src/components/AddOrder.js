import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'

import { Container, Row, Col, Form, DropdownButton, Dropdown, Button, Table } from 'react-bootstrap'

const AddOrder = () => {

  const history = useHistory()
  
  const [ templateProduct, setTemplateProduct ] = useState([])
  const [ templateVehicle, setTemplateVehicle ] = useState([])

  const [ name, setName ] = useState('')
  const [ address, setAddress ] = useState('')
  const [ date, setDate ] = useState('')
  const [ time, setTime ] = useState('')

  const initProduct = ''
  const initProductId = 0
  const initProductName = 'Select Product'

  const initVehicle = ''
  const initVehicleId = 0
  const initVehicleName = 'Select Vehicle'
  const [ vehicleId, setVehicleId ] = useState(initVehicleId)
  const [ vehicleName, setVehicleName ] = useState(initVehicleName)

  const [ productId, setProductId ] = useState(initProductId)
  const [ productName, setProductName ] = useState(initProduct)
  const [ productPrice, setProductPrice ] = useState(initProduct)
  const [ productWeight, setProductWeight ] = useState(initProduct)
  const [ productQty, setProductQty ] = useState(initProduct)

  const [ detail, setDetail ] = useState([]) 

  useEffect(async () => {
    const url = 'http://localhost:3001/api/vehicle/'
    const response = await axios.get(url)
    if (response.status === 200) {
      const defaultTemp = {
          id: initVehicleId,
          name: initVehicleName,
          price: initVehicle,
          pate: initVehicle
      }
      setTemplateVehicle([
        defaultTemp,
        ...response.data.data
      ])
    } else {
      alert('fail')
    }
  }, [])

  useEffect(async () => {
    const url = 'http://localhost:3001/api/product/'
    const response = await axios.get(url)
    if (response.status === 200) {
      const defaultTemp = {
          id: initProductId,
          name: initProductName,
          price: initProduct,
          weight: initProduct,
          qty: initProduct
      }
      setTemplateProduct([
        defaultTemp,
        ...response.data.data
      ])
    } else {
      alert('fail')
    }
  }, [])

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeDate = (e) => {
    console.log('date', e.target.value)
    console.log('date', typeof e.target.value)

    setDate(e.target.value)
  }

  const handleChangeTime = (e) => {
    setTime(e.target.value)
  }

  const handleChangeAddress = (e) => {
    setAddress(e.target.value)
  }

  const handleSelectVehicle = (e) => {
    setVehicleId(e.target.value)
  }

  const handleSelectProduct = (e) => {
    const id = e.target.value
    const selected = templateProduct.filter(temp => temp.id == id)[0]
    setProductId(selected.id)
    setProductName(selected.name)
    setProductPrice(selected.price)
    setProductWeight(selected.weight)

    const qty = selected.id == 0 ? '' : 1
    setProductQty(qty)
  }

  const handleChangeQty = (e) => {
    setProductQty(e.target.value)
  }
  
  const handleClickAdd = () => {
    const item = {
      id: productId,
      name: productName,
      price: productPrice,
      weight: productWeight,
      qty: productQty
    }

    setDetail([
      ...detail,
      item
    ])
    
    setProductId(initProductId)
    setProductName(initProductName)
    setProductPrice(initProduct)
    setProductWeight(initProduct)
    setProductQty(initProduct)
  }

  const handleRemoveDetail = (id) => {
    const removed = detail.filter(item => item.id !== id)
    setDetail([ ...removed ])
  }

  const handleClickAddOrder = async () => {  
    const url = 'http://localhost:3001/api/order' // POST /api/order
    const payload = {
      "cus_name": name,
      "cus_address": address,
      "ship_date": date,
      "ship_time": time,
      "vehicle_id": vehicleId,
      "products": detail
    }
    const response = await axios.post(url, payload)
    // const response = {}
    // response.status = 201
    if (response.data.status === 201) {
      history.push('/order')
    } else {
      alert('Create order fail')
    }

  }

  return (
    <Container>
      <Row>
        <Col xs={4}>
          <Form.Group>
            <Form.Label>Customer name</Form.Label>
            <Form.Control type="text" value={name} placeholder="Customer name" onChange={handleChangeName} />  
          </Form.Group>
        </Col>
        <Col xs={2}>
          <Form.Group>
            <Form.Label>ship date</Form.Label>
            <Form.Control type="date" value={date} placeholder="Ship time" onChange={handleChangeDate} />  
          </Form.Group>
        </Col>
        <Col xs={2}>
          <Form.Group>
            <Form.Label>ship time</Form.Label>
            <Form.Control type="time" value={time} placeholder="Ship time" onChange={handleChangeTime} />  
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Label>Dropdown vehicle</Form.Label>
          <select className='form-control' onChange={handleSelectVehicle} value={vehicleId}>
          {
            templateVehicle.map((item, index) => {
              return (
                <option  key={index} value={item.id} className='form-control'>{item.name}</option>
              )
            })
          }
          </select>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Customer address</Form.Label>
            <Form.Control type="text" value={address} placeholder="Customer address" onChange={handleChangeAddress} />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col> <hr/> </Col>
      </Row>

      <Row>
        <Col xs={4}>
            <Form.Label>Dropdown Product name</Form.Label>
            <select className='form-control' onChange={handleSelectProduct} value={productId}>
            {
              templateProduct.map((item, index) => {
                return (
                  <option  key={index} value={item.id} className='form-control'>{item.name}</option>
                )
              })
            }
            </select>
        </Col>
        <Col xs={2}>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" value={productPrice} disabled readOnly />  
          </Form.Group>
        </Col>
        <Col xs={2}>
          <Form.Group>
            <Form.Label>Weight</Form.Label>
            <Form.Control type="text" value={productWeight} disabled readOnly />  
          </Form.Group>
        </Col>
        <Col xs={2}>
          <Form.Group>
            <Form.Label>Qty</Form.Label>
            <Form.Control type="number" min={1} value={productQty} onChange={handleChangeQty} />  
          </Form.Group>
        </Col>
        <Col xs={2}>
          <Button onClick={handleClickAdd} disabled={productId == initProductId}>Add</Button>
        </Col>
      </Row>

      <Row>
        <Col> <hr/> </Col>
      </Row>

      <Row>
        <Col>
          <Table striped>
            <thead>
              <tr>
                <th>No.</th>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Weight</th>
                <th>Qty</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                detail.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.weight}</td>
                      <td>{item.qty}</td>
                      <td>
                        <Button variant='danger' onClick={() => handleRemoveDetail(item.id)}>Del</Button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col xs={5}></Col>
        <Col xs={2}>
          <Button variant='primary' onClick={handleClickAddOrder}
            disabled={
              detail.length == 0 ||
              name.trim() == '' ||
              address.trim() == '' ||
              date.trim() == '' ||
              time.trim() == ''
            }
          >
              Add Order
          </Button>
        </Col>
        <Col xs={5}></Col>
      </Row>
    </Container>
  )
}

export default AddOrder

// # header

// name customer [enter]

// customer address [enter]

// ship time [enter : text]

// vehicle GET api use id, name


// # detail 

// product id, name, price, weight, qty (qty[enter] )  GET api


// # footer


// request POST /api/order

// {
//     "cus_name": '',
//     "cus_address": '',
//     "ship_time": '',
//     "vehicle_id": int,
//     "products": [
//         id: int,
//         name: String,
//         price: int,
//         weight: Float32Array,
//         qty: int
//     ]
// }