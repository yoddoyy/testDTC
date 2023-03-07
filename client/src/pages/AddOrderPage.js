import React from 'react'
import {Col,Container,Row,Form,Navbar,Nav,Button,Modal} from 'react-bootstrap'

import NavbarApp from "../components/NavbarApp"
import AddOrder from '../components/AddOrder'

const AddOrderPage = () => {
  return (
    <Container>
      <NavbarApp />
      <h1>Add order</h1> 
      <AddOrder /> 
    </Container>
  )
}

export default AddOrderPage