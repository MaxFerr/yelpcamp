import React from 'react';


class ForgotPass extends React.Component{
	constructor(props){
		super(props);
		this.state={
			email:''			
		}
	}

	onEmailChange =(event)=>{
		this.setState({email:event.target.value})
	}
	
	
	onResetPass=()=>{
		fetch('https://yelpcamp-api.herokuapp.com/forgot',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				email:this.state.email				
			})
		})
		
	.then(response=>{
		return response.json()
	})
	.then(data=>{
		if(data==='Wrong email !'){			
				document.getElementById("errorEmail").innerHTML = "Wrong Email !";
			}else {				
				document.getElementById("correctEmail").innerHTML = "Check your mail box ! A mail has been sent.";
				document.getElementById("forgetDiv").style.display = "none";
				document.getElementById("correctDiv").style.display = "block";
			}
		})
	}
render(){
	return (
		<div>
			<div id='correctDiv' style={{width: 'auto' ,height: '60px',display:'none'}}
			className= 'tc bg-washed-green shadow-4 br2 pa3 ba dark-gray b--black-10 mv4 w-100 w-75-m w-45-l mw6 center'>
			<span id='correctEmail' className='green'></span>
			</div>
			<div id='forgetDiv' style={{width: 'auto' ,height: '300px'}}
			className= 'tc bg-washed-green shadow-4 br2 pa3 ba dark-gray b--black-10 mv4 w-100 w-75-m w-45-l mw6 center'>
				<main className="pa4 black-80">
					<div className="measure center">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f4 fw6 ph0 mh0">Forgot your password ?</legend>
								<div className="mt3">
									<label className="db fw6 lh-copy f6" forhtml="email-address">Enter your email address and you will receive a mail shortly :</label> <br/>
									<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="email" 
									name="email-address"  
									id="email-address"
									onChange={this.onEmailChange}
									/>
								</div>
							</fieldset>
								<br/>
							<div>
								<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Reset password"
								onClick={this.onResetPass}
								/>							
						</div>
						<br/><span id='errorEmail' className='red'></span>					
					</div>
				</main>
			</div>
		</div>		
		)
	}
}


export default ForgotPass;