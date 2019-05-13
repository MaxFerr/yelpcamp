import React from 'react';
import './NewCamp.css';
import {Redirect} from "react-router-dom";


class NewCamp extends React.Component {
	constructor(props){
		super(props);
		this.state={
			newcampName:'',
			newcampImage:'',
			newcampLocation:'',
			imgUrl:'',
			newcampPrice:'',
			campDescritpion:'',
			campSent:false
		}
	}

	onPriceChange =(event)=>{
		this.setState({newcampPrice:event.target.value})
	}
	onDescritpionChange =(event)=>{
		this.setState({campDescritpion:event.target.value})
	}
	onNameChange =(event)=>{
		this.setState({newcampName:event.target.value})
	}
	onImageChange =(event)=>{
		this.setState({newcampImage:event.target.value})
	}
	onLocationChange =(event)=>{
		this.setState({newcampLocation:event.target.value})
	}
	onSubmitNewcamp=()=>{
		const errorImgMsg=document.getElementById('errorImgMsg');
		const globalErr=document.getElementById('globalErr');
		this.setState({imgUrl:this.state.newcampImage})

    fetch('https://yelpcamp-api.herokuapp.com/handleApiCall',{
          method:'post',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
          input: this.state.newcampImage
        })
      })
    .then(response=>response.json())    
    .then(response=>{			
			for (var i = 0; i < response.outputs[0].data.concepts.length; i++) {
				if (response.outputs[0].data.concepts[i].name ==="safe"){
					if(response.outputs[0].data.concepts[i].value>0.6){
						fetch('https://yelpcamp-api.herokuapp.com/newcamp',{
							method:'post',
							headers:{'Content-Type':'application/json'},
							body:JSON.stringify({
								name:this.state.newcampName,
								img:this.state.newcampImage,
								location:this.state.newcampLocation,
								price:this.state.newcampPrice,
								description:this.state.campDescritpion,
								user_id:this.props.user.id
							})
						}).then(response=>{							
							if(response.status===400){								
								globalErr.innerHTML='All the fields need to be filled !'
							}else{
								globalErr.innerHTML='Camp sent.'								
								this.setState({campSent:true})
								fetch('https://yelpcamp-api.herokuapp.com/').then(response=>{
									return response.json()
								})
								.then(camp=>{
									this.props.updateCampsArray(camp)
									this.setState({campSent:true})			
								})			
							}
						})												
					}else{
						errorImgMsg.innerHTML='Your image contains prohibited content.'
					}
				}
			}
		}) 
   }

render (){
	if(this.props.isLoggedIn){
		if(this.state.campSent){
		return <Redirect to='/Home'/>
		}else{
			return (
		<div style={{width: '95%' ,height: '620px'}}
		className= 'tc bg-washed-green shadow-4 br1 pa3 ba dark-gray b--black-10 mv4 w-100 w-75-m w-45-l mw6 center'>
			<main className="pa4 black-80">
			<div className="measure center">
			<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			<legend className="f4 fw6 ph0 mh0">New campground</legend>
			<div className="mt3">
				<label className="db fw6 lh-copy f6" forhtml="camp-name">Camp's name</label>
				<input 
				className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" 
				style={{width:'94%'}} 
				type="camp-name" 
				name="camp-name"  
				id="camp-name"
				onChange={this.onNameChange}
				/>
			</div>
			<div className="mt3">
				<label className="db fw6 lh-copy f6" forhtml="image-link">Image link</label>
				<input 
				className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				type="text" 
				name="image-link"  
				id="image-link"
				onChange={this.onImageChange}
				/>
				<span id='errorImgMsg' className='red'></span>
			</div>
			<div className="mv3">
				<label className="db fw6 lh-copy f6" forhtml="location">Location</label>
				<input 
				className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				type="text" 
				name="location"  
				id="location"
				onChange={this.onLocationChange}
				/>
			</div>
			<div className="mv3">
				<label className="db fw6 lh-copy f6" forhtml="price">Price</label>
				<input 
				className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				type="text" 
				name="price"  
				id="price"
				onChange={this.onPriceChange}
				placeholder='$'
				/>
			</div>
			<div className="mv3">
				<label className="db fw6 lh-copy f6" forhtml="price">Description</label>
				<textarea 
				rows="5" 
				cols="70" 
				style={{height:'100px'}}
				type="text" 
				name="description"  
				id="description"
				onChange={this.onDescritpionChange}
				/>
			</div>
			</fieldset>
			<div className="">
				<input 
				className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				type="submit" 
				value="Add"
				onClick={this.onSubmitNewcamp} 
				/>
				<br/>
				<span className='red'id='globalErr'></span>
			</div>
			</div>
			</main>
		</div>
		)
		}		
	}else {
		return (
		<div style={{width: '95%' ,height: '100px'}}
		className= 'tc bg-washed-green shadow-4 br1 pa3 ba dark-gray b--black-10 mv4 w-100 w-75-m w-45-l mw6 center'>
			<main className="pa2 black-80">
				<div className="measure center">
					<h4 className='red'>You need to be logged in to add a new campground.</h4>
				</div>
			</main>
		</div>
			)
		}
	}
}

export default NewCamp;