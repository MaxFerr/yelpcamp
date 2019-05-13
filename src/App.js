import React, { Component } from 'react';
import {Route} from "react-router-dom";
import './App.css';
import TopNavBar from './components/TopNavBar/TopNavBar.js';
import Title from './components/Title/Title.js';
import MainNavBar from './components/MainNavBar/MainNavBar.js';
import CampList from './components/CampList/CampList.js';
import BotNav from './components/BotNav/BotNav.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import Shop from './components/Shop/Shop.js';
import MoreInfo from './components/MoreInfo/MoreInfo.js';
import NewCamp from './components/NewCamp/NewCamp.js';
import UserInfo from './components/UserInfo/UserInfo.js';
import UpdateCamp from './components/UpdateCamp/UpdateCamp.js';
import CartList from './components/CartList/CartList.js';
import ForgotPass from './components/ForgotPass/ForgotPass.js';
import ResetPassword from './components/ResetPassword/ResetPassword.js';

class App extends Component {
	constructor(){
		super();
		this.state={
			camps:[],
			btnName:["Home","Shop","Cart"],
			scrolling:'',			
			updatedCamp:[],
			isLoggedIn:false,
			isAdminIn:false,
			searchfield:'',
			user:{
			        id:'',
			        name:'',
			        email:'',
			        joined:''
			     },
			cart:[],
			updatedCart:[]
		}
	}

	onDeleteItem=(id)=>{
	  for (var i = 0; i < this.state.cart.length; i++) {     
	      if(this.state.cart[i].m_shop_item_id===id){            
	        this.setState({updatedCart:this.state.updatedCart.push(this.state.cart[i])})
	        fetch('https://yelpcamp-api.herokuapp.com/deleteOrder',{
	        method:'delete',
	        headers:{'Content-Type':'application/json'},
	        body:JSON.stringify({
	          shop_item_id:this.state.updatedCart[0].m_shop_item_id,
	          user_id:this.state.user.id
	          })
	        })
	        this.state.cart.splice(i,1)
	        this.setState({updatedCart:[]})
	        const size=this.state.cart.length;
         	this.updateCartBtn(size);
         	this.onBtnPress(`${size} items in cart `,2)
	      }
	    }     
	  }

	updateCartBtn=(size)=>{
		this.setState({btnName:["Home","Shop",`${size} items in cart `]})		
	}

	onCartArray=(cartArray)=>{
		this.setState({cart:cartArray})
	}

	loadUser=(data)=>{
		this.setState({user:{
			id:data.id,
			name:data.name,
			email:data.email,
			joined: data.created_at
		}})
	}

	checkIfLoggedIn=(data)=>{
		if(this.state.user.email===data.email){
			this.setState({isLoggedIn:true})
		}else{
			this.setState({isLoggedIn:false})
		}
	}

	checkIfAdmin=(data)=>{
		fetch(`https://yelpcamp-api.herokuapp.com/admin/${data.id}`)
		.then(response=>{
			return response.json()
		})
		.then(admin=>{
			if(data.id===Number(admin)){
			this.setState({isAdminIn:true})
		}else{
			this.setState({isAdminIn:false})
		}			
		})		
		
	}

	onDeleteCamp=(id)=>{
		for (var i = 0; i < this.state.camps.length; i++) {			
			if(this.state.camps[i].id===id){						
				this.setState({updatedCamp:this.state.updatedCamp.push(this.state.camps[i])})
				fetch('https://yelpcamp-api.herokuapp.com/deleteCamp',{
				method:'delete',
				headers:{'Content-Type':'application/json'},
				body:JSON.stringify({
					camp_id:this.state.updatedCamp[0].id,
					user:this.state.user.id
					})
				})
				this.state.camps.splice(i,1)
				this.setState({updatedCamp:[]})
			}
		}			
	}

	onBtnPress=(route,index)=>{
		this.setState({route:route});
		const btnList=document.getElementsByClassName('mainnavbtn');
		for (var i = 0; i < btnList.length; i++) {
			btnList[i].classList.value="f6  unstyled-button pointer w4 dim   mb2 dib white bg-green underline-hover mainnavbtn"
		}
		btnList[index].classList.value="f6  unstyled-button pointer w4 dim  mb2 dib white underline mainnavbtn";
		this.setState({searchfield:''});
		const mainSearch=document.getElementById('mainSearch');
		mainSearch.value='';
	}
	
	onBtnPressAdd=(route)=>{
		this.setState({route:route});
		this.setState({searchfield:''});
		const mainSearch=document.getElementById('mainSearch');
		mainSearch.value='';
		
		fetch('https://yelpcamp-api.herokuapp.com/').then(response=>{
			return response.json()
		})
		.then(camp=>{
			this.setState({camps:camp})			
		})		
		
	}
	
	onBtnPressInfo=(route,id)=>{
		for (var i = 0; i < this.state.camps.length; i++) {
			if(this.state.camps[i].id===id){
				this.setState({route:route});
				this.setState({updatedCamp:this.state.camps[i]})
			}
		}
		this.setState({searchfield:''});
		const mainSearch=document.getElementById('mainSearch');
		mainSearch.value='';
	}

	componentDidMount(){
		window.addEventListener('scroll', this.handleScroll);
		fetch('https://yelpcamp-api.herokuapp.com/').then(response=>{
			return response.json()
		})
		.then(camp=>{
			this.setState({camps:camp})			
		})				
	}

	handleScroll=(event)=> {
		if (window.scrollY < 570 && this.state.scrolling === true) {
			this.setState({scrolling: false})
		}
		else if (window.scrollY > 570 && this.state.scrolling !== true) {
			this.setState({scrolling: true})
		}
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	onClickLogout=()=>{
		this.setState({isLoggedIn:false});
		this.setState({isAdminIn:false});
		this.setState({user:{
			id:'',
			name:'',
			email:'',
			joined:''
		}});
		this.setState({route:'Home'});
	}

	searchChange=(event)=>{
		this.setState({searchfield:event.target.value})
	}

	updateCampsArray=(camp)=>{
		this.setState({camps:camp})
	}

	render() {
		const filteredInfo = this.state.camps.filter(data => {
        return data.camps_name.toLowerCase().indexOf(this.state.searchfield.toLowerCase()) !==-1
        });
        
		return (
			<div className="App">
				<TopNavBar onClickLogout={this.onClickLogout} isLoggedIn={this.state.isLoggedIn} user={this.state.user} onBtnPressAdd={this.onBtnPressAdd} />
				<Title onBtnPressAdd={this.onBtnPressAdd}/>				
				<div style={{position: this.state.scrolling ? 'fixed' : 'relative', top: 0, width: '100%', zIndex: 1,backgroundColor:'#F1E4E4',marginTop:'-10px'}}>
					<MainNavBar onBtnPress={this.onBtnPress} btnList={this.state.btnName} searchChange={this.searchChange} />
				</div>
					<Route path="/" exact render={(props)=><CampList isAdminIn={this.state.isAdminIn}  onBtnPressInfo={this.onBtnPressInfo} campsData={filteredInfo} onDeleteCamp={this.onDeleteCamp} />}/>
					<Route path="/Home" exact render={(props)=><CampList isAdminIn={this.state.isAdminIn}  onBtnPressInfo={this.onBtnPressInfo} campsData={filteredInfo} onDeleteCamp={this.onDeleteCamp} />}/>
					<Route path="/login" exact render={(props)=><Login checkIfLoggedIn={this.checkIfLoggedIn} checkIfAdmin={this.checkIfAdmin} loadUser={this.loadUser} onBtnPressAdd={this.onBtnPressAdd}/>}/>
					<Route path="/register" exact render={(props)=><Register checkIfLoggedIn={this.checkIfLoggedIn} loadUser={this.loadUser} onBtnPressAdd={this.onBtnPressAdd}/>}/>
					<Route path="/shop" exact render={(props)=><Shop cart={this.state.cart} onCartArray={this.onCartArray} updateCartBtn={this.updateCartBtn} isLoggedIn={this.state.isLoggedIn} user={this.state.user}/>}/>
						<div className='container' >
							<Route path="/moreinfo/:id" exact render={(props)=><MoreInfo {...props}  isAdminIn={this.state.isAdminIn} isLoggedIn={this.state.isLoggedIn} user={this.state.user} campsData={this.state.updatedCamp}/>}/>
						</div>
					<Route path="/NewCamp" exact render={(props)=><NewCamp isLoggedIn={this.state.isLoggedIn} user={this.state.user} onBtnPressAdd={this.onBtnPressAdd} updateCampsArray={this.updateCampsArray}/>}/>
					<Route path="/UserInfo" exact render={(props)=><UserInfo user={this.state.user}/>}/>
					<Route path={`/UpdateCamp/${this.state.updatedCamp.id}`} exact render={(props)=><UpdateCamp onBtnPressAdd={this.onBtnPressAdd} isAdminIn={this.state.isAdminIn} isLoggedIn={this.state.isLoggedIn} user={this.state.user} campsData={this.state.updatedCamp}/>}/>
					<Route path={`/${this.state.btnName[2]}`} exact render={(props)=><CartList cart={this.state.cart} onDeleteItem={this.onDeleteItem} />}/>
					<Route path="/ForgotPass" exact render={(props)=><ForgotPass/>}/>
					<Route path="/ResetPassword/:token" exact component={ResetPassword}/>			
					<BotNav/>
			</div>
			)
	}
}

export default App;

 