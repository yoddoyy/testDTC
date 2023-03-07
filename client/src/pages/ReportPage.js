import React, { useState,useEffect } from "react"
import axios from "axios";

import { Container, Table } from 'react-bootstrap'

import NavbarApp from "../components/NavbarApp"

const ReportPage = () => {

  const [ reports, setReports ] = useState([])
  
  const initDropdownCusName = 'Filter cus name'
  const initDropdownSendDate = 'Filter send date'

  const [ dropdownCusName, setDropdownCusName ] = useState([ initDropdownCusName])
  const [ dropdownSendDate, setDropdownSendDate ] = useState([ initDropdownSendDate])



  const [ cusName, setCusName ] = useState(initDropdownCusName)
  const [ sendDate, setSendDate ] = useState(initDropdownSendDate)

  console.log(cusName)
  console.log(sendDate)
  useEffect(async () => {
      const url = 'http://localhost:3001/api/report'
      const payload = {
        cusName: cusName === initDropdownCusName ? null : cusName,
        sendDate: sendDate === initDropdownSendDate ? null : sendDate
      }
      const response = await axios.post(url, payload)
      
      if (response.status === 200) {

          setReports([ ...response.data.data ])
  // const [ sendDate, setSendDate ] = useState(initDropdownSendDate)
          setDropdownCusName([initDropdownCusName, ...response.data.dropdownCusName ])
          setDropdownSendDate([initDropdownSendDate, ...response.data.dropdownSendDate ])
      } else {
          alert('Fail')
      }
  }, [cusName, sendDate])

  const handleSelectCusName = (e) => {
    setCusName(e.target.value)
  }

  const handleSelectSendDate = (e) => {
    setSendDate(e.target.value)
  }

  return (
    <Container>
      <NavbarApp />
      <h1>Report</h1>
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>
              <select className='form-control' onChange={handleSelectCusName} value={cusName}>
              {
                dropdownCusName.map((cusName, index) => {
                  return (
                    <option  key={index} value={cusName} className='form-control'>{cusName}</option>
                  )
                })
              }
              </select>
            </th>
            <th>
              <select className='form-control' onChange={handleSelectSendDate} value={sendDate}>
              {
                dropdownSendDate.map((sendDate, index) => {
                  return (
                    <option  key={index} value={sendDate} className='form-control'>{sendDate}</option>
                  )
                })
              }
              </select>
            </th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>No.</th>
            <th>Send name</th>
            <th>Send date</th>
            <th>Order count</th>
            <th>Total weight</th>
            <th>Send cost</th>
          </tr>
        </thead>
        <tbody>
          {
            reports.map((report, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{report.send_name}</td>
                  <td>{report.send_date}</td>
                  <td>{report.order_count}</td>
                  <td>{report.total_weight}</td>
                  <td>{report.send_cost}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </Container> 
  )
}

export default ReportPage