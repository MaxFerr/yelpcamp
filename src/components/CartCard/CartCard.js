import React from 'react';


const CartCard= ({name,price,image,id,onDeleteItem}) => {
	return (
		<div style={{width: '400px' ,height: '480px', margin: '10px'}}
		className= 'tc bg-washed-green shadow-4 br2 pa3 ba dark-gray b--black-10 mv4 w-100 w-75-m w-45-l mw6 center'>
			<img src={image} alt='camp' style={{width: '350px' ,height: '250px'}} />
			<h3>{name}</h3>
			<p>Price : {price}$</p>
			<button 
			className='f6  pointer w4 shadow-4 dim br2 ph3 pv2 mb2 dib white bg-green'
			onClick={()=>onDeleteItem(id)}
			> Remove from cart	</button>	
		</div>
		);
}
export default CartCard;