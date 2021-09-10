import { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, ButtonGroup } from 'reactstrap'
function Home() {
  const history = useHistory()
  const [productos, setProductos] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const traerProductos = () => {
    return fetch('http://localhost:8080/api/productos/listar')
        .then(response => response.json())
        .then(data => {
            setIsAdmin(data[1].isAdmin)
            setProductos(data[0].productos)
        })
  }

  useEffect(() => {
    traerProductos()
  },[])
  
  const addCart = () => {
    console.log('producto agregado')
  }
  const updateProducto = id => {
    history.push(`/update/${id}`)
  }
  const deleteProducto = id => {
    fetch(`http://localhost:8080/api/productos/borrar/${id}`,{
      method:'DELETE'
    })
      .then(() => traerProductos())
      .catch(error => console.log('error al eliminar producto'))
  }
  return (
    <div>
      
    <Container>
      <Row className="pt-5">
        <h1>Productos</h1>
        {productos.length ? 
          productos.map( producto =>
            <Col md="3" key={producto.id}>
              <Card>
                <CardImg top width="10%" src={producto.thumbnail} alt="Card image cap" />
                <CardBody>
                  <CardTitle tag="h5">{producto.name}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">stock: {producto.stock}</CardSubtitle>
                  <CardText>{producto.description}</CardText>
                  <ButtonGroup>
                    <Button className="btn-sm" onClick={addCart}>Add Cart</Button>
                    {isAdmin && 
                        <Fragment>
                            <Button className="btn-sm" onClick={() => updateProducto(producto.id)}>Update</Button>
                            <Button className="btn-sm" onClick={() => deleteProducto(producto.id)}>Delete</Button>
                        </Fragment>    
                    }
                  </ButtonGroup>
                </CardBody>
              </Card>
            </Col>
        ):
        <div><h2>No hay Productos</h2></div>
        }
      </Row>
    </Container>

    </div>
  );
}

export default Home;
