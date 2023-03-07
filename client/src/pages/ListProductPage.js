import React, {useState,useEffect} from "react"
import {Col,Container,Row,Form,Navbar,Nav,Button,Modal} from 'react-bootstrap'
// import {Modal} from 'bootstrap'
// import './App.css';
import Axios from "axios"
import Select from 'react-select'

import NavbarApp from "../components/NavbarApp"

export default function Product() {
    const [sort, setSort] = useState('')
    const [listProduct, setListProduct] = useState([])
    const [keywords, setKeywords] = useState('')
    const [keyword, setKeyword] = useState('')
    const [count, setCount] = useState(0)
    const [productName, setProductName] = useState('')
    // const [productDesc, setProductDesc] = useState('')
    const [productWeight, setProductWeight] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [listCategory, setListCategory] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [editId, setEditId] = useState(false)
    const [modalName, setModalName] = useState('')
    const [modalWeight, setModalWeight] = useState('')
    const [modalPrice, setModalPrice] = useState('')
    useEffect(() => {
        if(keywords===''&& sort===''){
            Axios.get("http://localhost:3001/api/product/", {            
            }).then((res)=>{
                setListProduct(res.data.data)
            })
            Axios.get(`http://localhost:3001/api/category/getDropDown`)
            .then((res)=>{
                setListCategory(res.data.data)
            })
        }else{
            Axios.post("http://localhost:3001/api/product/search", { 
                keywords:keywords,     
                sort:sort      
            }).then((res)=>{
                setListProduct(res.data.data)
            })
        }          
    }, [keywords,sort,count])    

    const search = async (e)=>{
        e.preventDefault()        
        setKeywords(keyword)
    }

    const delProduct = async (id)=>{
        await Axios.delete(`http://localhost:3001/api/product?id=${id}`)              
        .then((res)=>{
            alert('Delete success')
            setCount(count+1)
        })
    }

    const addProduct = async (e)=>{
        e.preventDefault()        
        try{
            await Axios.put("http://localhost:3001/api/product/", {
              name: productName,
              weight: productWeight,
              price:productPrice,
              create_by:sessionStorage.getItem('user')
            }).then((res)=>{
              if(res.data.status === true){
                  alert('Add product complete')
                  setProductWeight('')
                  setProductName('')
                  setProductPrice('')
                  setCount(count+1)                   
                       
              }else{
                alert(res.data.error)
              }
            })            
          }catch(e){
            alert(e)
          }
    }
    const editProduct = async (e)=>{
        e.preventDefault()        
        try{
            await Axios.post("http://localhost:3001/api/product/", {
                id:editId,
                name: modalName,
                weight: modalWeight,
                price:modalPrice
            }).then((res)=>{
              if(res.data.status === true){
                  alert('Edit product copmplete')                 
                  setModalShow(false)
                  setCount(count+1)  
              }else{
                alert(res.data.error)
              }
            })            
          }catch(e){
            alert(e)
          }
    }
    const initModal = async (id)=>{
        listProduct.forEach(rows => {
            if(rows.id===id){
                setModalName(rows.name)
                setModalWeight(rows.weight)
                setModalPrice(rows.price)
            }
        });
        // for (let i = 0; i < listProduct.length; i++) {
        //     const rows = listProduct[i];
        //     setModalName(rows.name)
        //     setModalDesc(rows.desc)
        //     setModalCatId(rows.category)
        // }
        await setEditId(id)
        await setModalShow(true)

    }
    
    const MyVerticallyCenteredModal = (props)=> {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                edit product
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                        <Form.Control 
                                type="text"
                                value={modalName}
                                placeholder="product name" 
                                onChange={(e) => {
                                    setModalName(e.target.value)
                                }}
                            />  
                        </Col>
                        <Col>
                            <Form.Control 
                                type="text"
                                value={modalWeight}
                                placeholder="product weight" 
                                onChange={(e) => {
                                    setModalWeight(e.target.value)
                                }}
                            />                        
                        </Col>      
                        <Col>                            
                        <Form.Control 
                                type="text"
                                value={modalPrice}
                                placeholder="product price" 
                                onChange={(e) => {
                                    setModalPrice(e.target.value)
                                }}
                            /> 
                        </Col> 
                        <Col>                        
                            <Button variant="primary" type="submit" 
                                onClick={(e)=>editProduct(e)}>
                                edit
                            </Button>
                        </Col>                                        
                    </Row>
                </Form>               
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }

    return (
        // <div>
            <Container>
                {/* <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">Login</Navbar.Brand>
                        <Nav className="me-auto">
                        <Nav.Link href="/product">product</Nav.Link>
                        <Nav.Link href="/category">category</Nav.Link>              
                        </Nav>
                    </Container>
                </Navbar> */}

                <NavbarApp />


                <h1>list product</h1>
                
                <Form>
                    <Row>
                        <Col xs={8}></Col>
                        <Col>
                            <Form.Control 
                                type="text"
                                placeholder="search" 
                                onChange={(e) => {
                                    setKeyword(e.target.value)
                                }}
                            />                        
                        </Col>      
                        <Col>                        
                            <Button variant="primary" type="submit" 
                            onClick={(e)=>search(e)}>
                                search
                            </Button>
                        </Col>                                        
                    </Row>
                </Form>
                <table class="table">
                    <thead>
                        <tr>                           
                            <th style={{cursor:'pointer'}} scope="col" title='sort by status' onClick={() => {
                                setSort('p.name');
                                }}>name</th>
                            <th style={{cursor:'pointer'}} scope="col" title='sort by last update' onClick={() => {
                                setSort('p.weight');
                                }}>weight</th>
                            <th style={{cursor:'pointer'}} scope="col" title='sort by last update' onClick={() => {
                                setSort('p.price');
                                }}>price</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>                    
                    {
                        listProduct.map((val)=> {
                            return (
                                <tr key={val.id}>
                                <td>{val.name}</td>
                                <td>{val.weight}</td>
                                <td>{val.price}</td>                                
                                <td>
                                    <Button variant="warning" onClick={() => initModal(val.id)}>
                                        edit
                                    </Button>
                                    <MyVerticallyCenteredModal
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                    />
                                </td>
                                <td>
                                    <Button variant="danger" onClick={()=>delProduct(val.id) }>
                                        delete
                                    </Button>                                   
                                </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <br />
                <br />
                <br />    
                <h2>add product</h2>
                <Form>
                    <Row>
                        <Col>
                        <Form.Control 
                                type="text"
                                value={productName}
                                placeholder="product name" 
                                onChange={(e) => {
                                    setProductName(e.target.value)
                                }}
                            />  
                        </Col>
                        <Col>
                            <Form.Control 
                                type="text"
                                value={productWeight}
                                placeholder="product weight" 
                                onChange={(e) => {
                                    setProductWeight(e.target.value)
                                }}
                            />                        
                        </Col>      
                        <Col>                            
                        <Form.Control 
                                type="text"
                                value={productPrice}
                                placeholder="product price" 
                                onChange={(e) => {
                                    setProductPrice(e.target.value)
                                }}
                            />     
                        </Col> 
                        <Col>                        
                            <Button variant="primary" type="submit" 
                                onClick={(e)=>addProduct(e)}>
                                add
                            </Button>
                        </Col>                                        
                    </Row>
                </Form>      
            </Container>
        // </div>
    )
}
