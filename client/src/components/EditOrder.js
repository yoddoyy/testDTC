import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios'

import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap'

const EditOrder = () => {

  const history = useHistory()
  const { id } = useParams()
  
  const [ templateProduct, setTemplateProduct ] = useState([])
  const [ templateVehicle, setTemplateVehicle ] = useState([])

  const [ name, setName ] = useState('')
  const [ address, setAddress ] = useState('')
  const [ date, setDate ] = useState('')
  const [ time, setTime ] = useState('')

  const initVehicle = ''
  const initVehicleId = 0
  const initVehicleName = 'Select Vehicle'
  const [ vehicleId, setVehicleId ] = useState(initVehicleId)
  const [ vehicleName, setVehicleName ] = useState(initVehicleName)

  const initProduct = ''
  const initProductId = 0
  const initProductName = 'Select Product'
  const [ productId, setProductId ] = useState(initProductId)
  const [ productName, setProductName ] = useState(initProduct)
  const [ productPrice, setProductPrice ] = useState(initProduct)
  const [ productWeight, setProductWeight ] = useState(initProduct)
  const [ productQty, setProductQty ] = useState(initProduct)

  const [ detail, setDetail ] = useState([]) 

  useEffect(async () => {
    const url = 'http://localhost:3001/api/order/edit?id=' + id
    const response = await axios.get(url)

    if (response.status === 200) {
        setName(response.data.data.cus_name)
        setAddress(response.data.data.cus_address)
        setDate(response.data.data.ship_date)
        setTime(response.data.data.ship_time)
        setVehicleId(response.data.data.vehicle_id)
        setVehicleName(response.data.data.vehicle_name)
        setDetail(response.data.data.orders)
    } else {
        alert('Fail')
    }
  }, [])

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

  const handleClickEditOrder = async () => {  
    const url = 'http://localhost:3001/api/order/edit'
    const payload = {
      "order_id": id,
      "cus_name": name,
      "cus_address": address,
      "ship_date": date,
      "ship_time": time,
      "vehicle_id": vehicleId,
      "products": detail
    }
    const response = await axios.put(url, payload)
    console.log('payload', payload)
    if (response.status === 200) {
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
          <Button variant='primary' onClick={handleClickEditOrder}
            disabled={
              detail.length == 0 ||
              name.trim() == '' ||
              address.trim() == '' ||
              date.trim() == '' ||
              time.trim() == ''
            }
          >
              Edit Order
          </Button>
        </Col>
        <Col xs={5}></Col>
      </Row>
    </Container>
  )
}

export default EditOrder