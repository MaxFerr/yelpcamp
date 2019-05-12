import React, { Component } from 'react';
import ShopList from '../ShopList/ShopList.js';

export class Shop extends Component{
	constructor(props){
		super(props);
		this.state={
      itemsShop:[],
      updatedShop:[],
      userCart:this.props.cart
    }
  }

  onAddItem=(id)=>{  
    if(this.props.isLoggedIn){  
      for (var i = 0; i < this.state.itemsShop.length; i++) {     
        if(this.state.itemsShop[i].m_shop_item_id===id){
          this.setState({updatedShop:this.state.updatedShop.push(this.state.itemsShop[i])})
          this.state.userCart.push({
           m_shop_item_id:this.state.itemsShop[i].m_shop_item_id,
           item_image:this.state.itemsShop[i].item_image,
           item_name:this.state.itemsShop[i].item_name,
           price:this.state.itemsShop[i].price
         })        
          fetch('https://yelpcamp-api.herokuapp.com/addItem',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              shop_item_id:this.state.updatedShop[0].m_shop_item_id,
              user_id:this.props.user.id,
              order_date:new Date()
            })
          }).then(response=>{
            return response.json()
          })
          this.setState({updatedShop:[]})        
          const size=this.state.userCart.length;
          this.props.updateCartBtn(size);
          const cartArray=this.state.userCart;
          this.props.onCartArray(cartArray)              
        }
      } 
    }else{
      const errorMessage= document.getElementById('errorMessage');
      errorMessage.textContent='You need to be logged in to add items in your cart.'
    }
  }

  
componentDidMount(){
  fetch('https://yelpcamp-api.herokuapp.com/Shop').then(response=>{
    return response.json()
  })
  .then(item=>{
    this.setState({itemsShop:item})
  })
}

render(){
  return (
    <div>
      <br/>
      <span id='errorMessage' className='red tc mt5'></span>
      <ShopList itemsShop={this.state.itemsShop} onAddItem={this.onAddItem} />
    </div>
    )
  }
}

export default Shop;
