import React from 'react';


class ResetPassword extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isValidToken:false,
			passwordChange:'',
			passwordChangeConfirm:'',
			errorPassword:false,
			isPassChanged:false		
		}
	}

	onPasswordChange=(event)=>{
		this.setState({passwordChange:event.target.value})
		if(event.target.value.length < 6){
			this.setState({errorPassword:false});
		}else{
			this.setState({errorPassword:true});
		}
	}

	onPasswordChangeConfirm=(event)=>{
		this.setState({passwordChangeConfirm:event.target.value})
		if(event.target.value.length < 6){
			this.setState({errorPassword:false});
		}else{
			this.setState({errorPassword:true});
		}
	}

	onChangePassword=()=>{
		const a=document.getElementById('noMatch');
		const b=document.getElementById('errorPasswordMsg');
		if(this.state.passwordChange===this.state.passwordChangeConfirm && this.state.errorPassword ){
			a.innerHTML="";
			fetch('https://yelpcamp-api.herokuapp.com/updatePassword',{
				method:'put',
				headers:{'Content-Type':'application/json'},
				body:JSON.stringify({
					resetpasstoken:this.props.match.params.token,
					password:this.state.passwordChangeConfirm
				})
			}).then(response=>{
				return response.json()
			}).then(data=>{
				if(data.email){
					this.setState({isPassChanged:true})
				}else{
					this.setState({isPassChanged:false})
				}
			})			
		}if(!this.state.errorPassword) {
			b.innerHTML="Password should be at least 6 characters long"
		}else{
			b.innerHTML=""
		}if(this.state.passwordChange!==this.state.passwordChangeConfirm) {
			a.innerHTML="Passwords doesn't match";
		}else{
			a.innerHTML=""
		}
	}
	
	componentDidMount(){
		fetch(`https://yelpcamp-api.herokuapp.com/resetPass/${this.props.match.params.token} `)
		.then(response=>{			
			return response.json()
		})
		.then(data=>{			
			if(data.email){
				this.setState({isValidToken:true})
			}else{
				this.setState({isValidToken:false})
			}						
		})
	}
	
	render(){
		if(!this.state.isPassChanged){
			if(this.state.isValidToken){
				return (			
					<div id='forgetDiv' style={{width: 'auto' ,height: '350px'}}
					className= 'tc bg-washed-green shadow-4 br2 pa3 ba dark-gray b--black-10 mv4 w-100 w-75-m w-45-l mw6 center'>
					<main className="pa4 black-80">
					<div className="measure center">
					<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					<legend className="f4 fw6 ph0 mh0">Change your password</legend>
					<div className="mv3">
					<label className="db fw6 lh-copy f6" forhtml="password">New password</label>
					<input 
					className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					type="password" 
					name="password"  								
					onChange={this.onPasswordChange}
					pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
					title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
					/>
					<span id='errorPasswordMsg' className='red'></span>								
					</div>
					<div className="mv3">
					<label className="db fw6 lh-copy f6" forhtml="password">Confirm password</label>
					<input 
					className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					type="password" 
					name="password"  								
					onChange={this.onPasswordChangeConfirm}
					pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
					title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
					/>
					<span id='noMatch' className='red'></span>									
					</div>
					</fieldset>
					<br/>
					<div>
					<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Reset password"
					onClick={this.onChangePassword}
					/>							
					</div>									
					</div>
					</main>
					</div>
					)
			}else{
				return (
					<div id='correctDiv' style={{width: 'auto' ,height: '60px'}}
					className= 'tc bg-washed-green shadow-4 br2 pa3 ba dark-gray b--black-10 mv4 w-100 w-75-m w-45-l mw6 center'>
					<p className='red mt1'>Password reset token is invalid or has expired</p>
					</div>
					)
			}
		}else{
			return (
				<div id='correctDiv' style={{width: 'auto' ,height: '60px'}}
				className= 'tc bg-washed-green shadow-4 br2 pa3 ba dark-gray b--black-10 mv4 w-100 w-75-m w-45-l mw6 center'>
				<p className='green mt1'>Password has been changed</p>
				</div>
				)
		}
	}
}


export default ResetPassword;