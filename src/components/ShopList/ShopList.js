import React from 'react';
import ShopCard from '../ShopCard/ShopCard';


const ShopList= ({itemsShop,onAddItem}) => {
	const cardLoop=itemsShop.map((data,i)=>{
		return (
			<ShopCard
			key={i}
			name={data.item_name}
			price={data.price}
			image={data.item_image}
			id={data.m_shop_item_id}
			onAddItem={onAddItem}				
			/>
			)
	})

	return (		
		<div className='container' >
			{cardLoop}
		</div>
		);
}
export default ShopList;