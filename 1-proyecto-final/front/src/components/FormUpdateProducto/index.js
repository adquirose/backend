import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom';
const INITIAL_STATE = {
    name: '',
    description: '',
    codigo: '',
    thumbnail: '',
    price: '',
    stock: ''
}
function FormUpdateProducto() {
    const history = useHistory()
    const { id } = useParams()
    const [data, setData] = useState(INITIAL_STATE)
    const onChangeInput = event => {
        setData({ ...data, [event.target.name]: event.target.value })
    }
    useEffect(() => {
        const traerProducto = () => {
            return fetch(`http://localhost:8080/api/productos/listar/${id}`)
                .then(response => response.json())
                .then(data => {
                    setData(data[0])
                })
        }
        traerProducto()
    },[id])
    const onSubmit = event => {
        event.preventDefault()
        fetch(`http://localhost:8080/api/productos/actualizar/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(data)
        }).then(() => {
            setData(INITIAL_STATE)
            history.push('/')
        })

    }
    return (
        <div>
            <Container>
                <Row>
                    <Col md="6">
                        <Form onSubmit={onSubmit}>
                            <FormGroup>
                                <Label>Nombre</Label>
                                <Input type="text" name="name" value={data.name} onChange={onChangeInput} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Descripción</Label>
                                <Input type="text" name="description" value={data.description} onChange={onChangeInput} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Codigo</Label>
                                <Input type="text" name="codigo" value={data.codigo} onChange={onChangeInput} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Foto Url</Label>
                                <Input type="text" name="thumbnail" value={data.thumbnail} onChange={onChangeInput} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Precio</Label>
                                <Input type="text" name="price" value={data.price} onChange={onChangeInput} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Stock</Label>
                                <Input type="text" name="stock" value={data.stock} onChange={onChangeInput} />
                            </FormGroup>
                            <Button type="submit">Actualizar producto</Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </div>
    );
}
export default FormUpdateProducto;