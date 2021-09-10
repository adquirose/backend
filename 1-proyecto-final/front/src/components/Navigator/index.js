import React from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'
function Navigator() {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand>Coder</NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink to={{ pathname: "/" }} tag={Link}>Lista de Productos</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={{ pathname: "/addProducto" }} tag={Link}>Add Product</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  )
}
export default Navigator