import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../Home'
import FormAddProducto from '../FormAddProducto'
import FormUpdateProducto from '../FormUpdateProducto'
import Navigator from '../Navigator'
function App(){
  return(
    <BrowserRouter>
        <Navigator/>
        <div>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/addproducto" component={FormAddProducto}/>
                <Route path="/update/:id" component={FormUpdateProducto}/>
            </Switch>
        </div>
    </BrowserRouter>
  )
}
export default App