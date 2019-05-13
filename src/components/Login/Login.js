import React from 'react';
import './Login.css';
import {Link,Redirect} from "react-router-dom";


class Login extends React.Component{
	constructor(props){
		super(props);
		this.state={
			email:'',
			password:'',
			isLogged:false		
		}
	}
	
	onEmailChange =(event)=>{
		this.setState({email:event.target.value})
	}
	onPasswordChange =(event)=>{
		this.setState({password:event.target.value})
	}
	
	onLogin=()=>{
		fetch('https://yelpcamp-api.herokuapp.com/login',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				email:this.state.email,
				password:this.state.password
			})
		})
		
	.then(response=>{
		return response.json()
	})
	.then(user=>{
		if(user.id){
			this.props.loadUser(user);
			this.props.checkIfLoggedIn(user);
			this.props.checkIfAdmin(user);
			this.setState({isLogged:true})
			}else {
				document.getElementById("errorLogMsg").innerHTML = "Wrong username or password !";

			}
		})
	}
render(){
	if (this.state.isLogged){
		return <Redirect to='/Home' />
	}else{
		return (
		<div style={{maxWidth: '400px' ,height: '420px'}}		
			className= 'tc bg-washed-green shadow-4 br2 pa3 ba dark-gray b--black-10 mv4 w-100 w-75-m w-45-l mw6 center'>			
			<main className="pa4 black-80">
				<div className="measure center">
					<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					<legend className="f4 fw6 ph0 mh0">Login</legend>
						<div className="mt3">
							<label className="db fw6 lh-copy f6" forhtml="email-address">Email</label>
							<input 
							className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							type="email" 
							name="email-address"  
							id="email-address"
							onChange={this.onEmailChange}
							/>
						</div>
						<div className="mv3">
							<label className="db fw6 lh-copy f6" forhtml="password">Password</label>
							<input 
							className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							type="password" 
							name="password"  
							id="password"
							onChange={this.onPasswordChange}
							/>
						</div>
					</fieldset>
					<div className="">
						<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Login"
						onClick={this.onLogin}
						/>
					</div>
					<div className="lh-copy mt3">
						<Link to={`/register`}> 
						<span className="f6 link dim black db pointer">Register</span></Link>
						<Link to={`/ForgotPass`}><span className="f6 link dim black db pointer">												
						Forgot your password?</span></Link>
						<br/><span id='errorLogMsg' className='red'></span>
					</div>
				</div>
			</main>
		</div>
			)
		}
	}
}


export default Login;