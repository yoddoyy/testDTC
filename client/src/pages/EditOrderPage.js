import React, {useState,useEffect} from "react"
import { useHistory } from "react-router-dom";
import axios from "axios";

import { Container, Button, Table } from 'react-bootstrap'

import NavbarApp from "../components/NavbarApp"
import EditOrder from "../components/EditOrder"

const EditOrderPage = () => {
  return (
    <Container>
      <NavbarApp />
      <h1>Edit order</h1>
      <EditOrder />
    </Container>
  )
}

export default EditOrderPage