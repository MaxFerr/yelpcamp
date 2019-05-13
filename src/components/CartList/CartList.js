import React from 'react';
import CartCard from '../CartCard/CartCard';


const CartList= ({cart,onDeleteItem}) => {
	const cardLoopCart=cart.map((data,i)=>{
		return (
			<CartCard
			key={i}
			name={data.item_name}
			price={data.price}
			image={data.item_image}
			id={data.m_shop_item_id}
			onDeleteItem={onDeleteItem}					
			/>
			)
	})

	return (		
		<div className='container' style={{minHeight:'200px'}} >
			{cardLoopCart}
		</div>
		);
}
export default CartList;