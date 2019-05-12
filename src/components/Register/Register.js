import React from 'react';
import './Register.css';
import {Redirect} from "react-router-dom";

class Register extends React.Component{
	constructor(props){
		super(props);
		this.state={
			email:'',
			password:'',
			name:'',
			errorMail:false,
			errorPassword:false,
			errorName:false,
			isRegister:false
			}
	}

	onEmailChange =(event)=>{
		this.setState({email:event.target.value})
		if(event.target.value.split('').filter(x => x === '@').length !== 1){
        this.setState({errorMail:false});
    	}else{
    		this.setState({errorMail:true});
    	}
	}

	onPasswordChange =(event)=>{
		this.setState({password:event.target.value})
		if(event.target.value.length < 6){
        this.setState({errorPassword:false});
    	}else{
    		this.setState({errorPassword:true});
    	}
	}

	onNameChange =(event)=>{
		this.setState({name:event.target.value})
		if(event.target.value.length < 3){
        	this.setState({errorName:false});
    	}else{
    		this.setState({errorName:true});
    	}
	}
	
	onRegister=()=>{
		const a=document.getElementById('errorMailMsg');
		const b=document.getElementById('errorPasswordMsg');
		const c=document.getElementById('errorNameMsg');
		const d=document.getElementById('alreadyUsed');
		if(this.state.errorMail && this.state.errorPassword && this.state.errorName){
			fetch('https://yelpcamp-api.herokuapp.com/register',{
					method:'post',
					headers:{'Content-Type':'application/json'},
					body:JSON.stringify({
						email:this.state.email,
						password:this.state.password,
						name:this.state.name
					})
				})
				
			.then(response=>{				
				return response.json()
			})
			.then(user=>{
				if(user.id){
				this.props.loadUser(user);
				this.props.checkIfLoggedIn(user);
				this.setState({isRegister:true})
				}else{
					return d.innerHTML="Email or username already used."
				}				
			})			
		}if(!this.state.errorMail) {
			a.innerHTML="Invalid email"
		}else{
			a.innerHTML=""
		}if(!this.state.errorPassword) {
			b.innerHTML="Password should be at least 6 characters long"
		}else{
			b.innerHTML=""
		}if(!this.state.errorName) {
			c.innerHTML="Name should be at least 3 characters long"
		}else{
			c.innerHTML=""
		}
	}
render(){
	if(this.state.isRegister){
		return <Redirect to='/Home' />
	}else{
			return (
			<div style={{width: '400px' ,height: '460px'}}
			className= 'tc bg-washed-green shadow-4 br2 pa3 ba dark-gray b--black-10 mv4 w-100 w-75-m w-45-l mw6 center'>
				<main className="pa4 black-80">
				<div className="measure center">
				<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				<span id='alreadyUsed' className='red' ></span>
				<legend className="f4 fw6 ph0 mh0">Register</legend>
					<div className="mt3">
					<label className="db fw6 lh-copy f6" forhtml="Name">Name</label>
					<input 
					className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" 
					style={{width:'94%'}} 
					type="name" 
					name="name"  
					id="name"
					onChange={this.onNameChange}
					/>
					<span id='errorNameMsg' className='red'></span>
					</div>
						<div className="mt3">
						<label className="db fw6 lh-copy f6" forhtml="email-address">Email</label>
						<input 
						className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						type="email" 
						name="email-address"  
						id="email-address"
						onChange={this.onEmailChange}
						/>
						<span id='errorMailMsg' className='red'></span>
						</div>
				<div className="mv3">
				<label className="db fw6 lh-copy f6" forhtml="password">Password</label>
				<input 
				className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				type="password" 
				name="password"  
				id="password"
				onChange={this.onPasswordChange}
				pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
				title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
				/>
				<span id='errorPasswordMsg' className='red'></span>
				</div>
				</fieldset>
					<div className="">
					<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"
					onClick={this.onRegister}
					/>
					</div>
				</div>
				</main>
			</div>
			)
		}	
	}
}


export default Register;