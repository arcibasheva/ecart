import React from 'react';
import InventoryItem from "./InventoryItem";
import CartItem from "./CartItem"

const PRODUCTS = [
    {id: 1, name: 'Apple', price: 10, inStock: 12},
    {id: 2, name: 'Melon ', price: 20, inStock: 5},
    {id: 3, name: 'Orange ', price: 8, inStock: 20},
]

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: []
        }
    }

    buyProduct = (product) => {
        let cart = this.state.cart
        let prodInCart
        if (cart.filter(item => item.id === product.id).length) {
            prodInCart = cart.filter(item => item.id === product.id).pop()
            prodInCart.quantity++
            prodInCart.inStock--
        } else {
            prodInCart = product
            prodInCart.quantity = 1
            prodInCart.inStock--
            cart.push(prodInCart)
        }
        this.setState({
            cart: cart
        })
    }

    changeQuantity = (id, action) => {
        let cart = this.state.cart
        let item = cart.find(item => item.id === id)
        item.quantity = action === 'increment' ? item.quantity + 1 : item.quantity - 1
        item.inStock = action === 'increment' ? item.inStock - 1 : item.inStock + 1
        this.setState({cart})
    }


    render() {
        const {cart} = this.state
        let totalPrice = 0
        cart.filter(item => {
            totalPrice += (item.price * item.quantity)
            return false
        })
        return <div>
            <h3>Cart</h3>
            {cart.length ? cart.map(item => <CartItem key={item.id} productName={item.name} quantity={item.quantity}
                                                      increment={() => this.changeQuantity(item.id, 'increment')}
                                                      decrement={() => this.changeQuantity(item.id, 'decrement')}
                                                      price={item.price} inStock={item.inStock}/>) :
                <p>Your cart is empty</p>}
            <div>Total: ${totalPrice} <button disabled={cart.length === 0} onClick={() => this.setState({cart: []})}>Checkout</button></div>
            <hr/>
            <h3>Inventory</h3>
            {PRODUCTS.map(prod => <InventoryItem key={prod.id}
                                                 selectedCount={cart.find(item => item.id === prod.id) ? cart.find(item => item.id === prod.id).quantity : 0}
                                                 onBuyClick={() => this.buyProduct(prod)} productName={prod.name}
                                                 price={prod.price} inStock={prod.inStock}/>
            )}
        </div>
    }
}

export default App;
