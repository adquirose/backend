import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';
const INITIAL_STATE = {
    name: '',
    description: '',
    codigo: '',
    thumbnail: '',
    price: '',
    stock: ''
}
function FormAddProducto() {
    const history = useHistory()
    const [data, setData] = useState(INITIAL_STATE)
    const onChangeInput = event => {
        setData({ ...data, [event.target.name]: event.target.value })
    }
    const onSubmit = event => {
        event.preventDefault()
        fetch('http://localhost:8080/api/productos/agregar', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
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
                                <Input type="text" name="name" onChange={onChangeInput} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Descripción</Label>
                                <Input type="text" name="description" onChange={onChangeInput} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Codigo</Label>
                                <Input type="text" name="codigo" onChange={onChangeInput} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Foto Url</Label>
                                <Input type="text" name="thumbnail" onChange={onChangeInput} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Precio</Label>
                                <Input type="text" name="price" onChange={onChangeInput} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Stock</Label>
                                <Input type="text" name="stock" onChange={onChangeInput} />
                            </FormGroup>
                            <Button type="submit">Agregar producto</Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </div>

    );
}
export default FormAddProducto;