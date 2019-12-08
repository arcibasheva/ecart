import React from 'react';

export default function CartItem(props) {
    const {productName, price, inStock, quantity, increment, decrement} = props
    return <div>
        <span
            style={{textDecoration: quantity === 0 ? 'line-through' : 'none'}}>{productName + ' - $' + price + ' × ' + quantity}</span>
        <button disabled={inStock === 0} onClick={increment} style={{marginLeft: '5px'}}>+1</button>
        <button disabled={quantity === 0} onClick={decrement} style={{marginLeft: '5px'}}>-1</button>
        <span>({inStock} in stock)</span>
    </div>
}