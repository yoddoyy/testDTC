import { Container, Navbar, Nav } from 'react-bootstrap'

const NavbarApp= () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
          <Nav className="me-auto">
            <Nav.Link href="/order">Order</Nav.Link>
            <Nav.Link href="/product">Product</Nav.Link>
            <Nav.Link href="/report">Report</Nav.Link>
          </Nav>
      </Container>
    </Navbar>    
  )
}

export default NavbarApp