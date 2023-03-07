import React, {useState,useEffect} from "react"
import { useHistory } from "react-router-dom";
import axios from "axios";

import { Container, Button, Table } from 'react-bootstrap'

import NavbarApp from "../components/NavbarApp"

const Order = () => {

  const history = useHistory()

  const [ orders, setOrders ] = useState([])

  useEffect(async () => {
    const url = 'http://localhost:3001/api/order'
    const response = await axios.get(url)
    if (response.status === 200) {
      setOrders([ ...response.data.data ])
    } else {
      alert('Fail')
    }
  }, [])

  return (
    <Container>
      <NavbarApp />
      <h1>list order</h1>
      <Button variant="primary" type="submit" onClick={() => history.push('/order/add')}>
        Add order
      </Button>
      <Table striped>
        <thead>
          <tr>
            <th>No.</th>
            <th>Customer name</th>
            <th>Customer address</th>
            <th>Vehicle name</th>
            <th>Ship date</th>
            <th>Ship time</th>
            <th>Total weight</th>
            <th>Total price</th>
            <th>Ship price</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map((order, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.cus_name}</td>
                  <td>{order.cus_address}</td>
                  <td>{order.name}</td>
                  <td>{order.ship_date}</td>
                  <td>{order.ship_time}</td>
                  <td>{order.total_weight}</td>
                  <td>{order.total_price}</td>
                  <td>{order.total_ship_price}</td>
                  <td>
                    <Button variant="warning" onClick={() => history.push(`/order/${order.id}/edit`)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </Container>
  )
}

export default Order