import React from 'react';

export default function InventoryItem(props) {
    const {productName, price, inStock, selectedCount, onBuyClick} = props
    return <div>
        {productName} - ${price}
        <button disabled={inStock === 0} onClick={onBuyClick}>Buy</button>
        <span>({selectedCount} selected, {inStock} in stock)</span>
    </div>
}