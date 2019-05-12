import React from 'react';
import Moment from 'react-moment';
import {Redirect} from "react-router-dom";

class UpdateCamp extends React.Component{
	constructor(props){
		super(props);
		this.state={					
			camp_name:this.props.campsData.camps_name,
			newCampName:this.props.campsData.camps_name,
			NewImage:this.props.campsData.image,
			NewLocation:this.props.campsData.loacation,
			NewPrice:this.props.campsData.price,
			NewDescription:this.props.campsData.description,
			NewDate:new Date(),
			error:false,
			isCampEdit:false
			}
	}

	onCampNameChange=(event)=>{
		this.setState({newCampName:event.target.value})
		if(event.target.value.length < 3){
        	this.setState({error:true});
    	}else{
    		this.setState({error:false});
    	}
	}
	onNewImage=(event)=>{
		this.setState({NewImage:event.target.value})
		if(event.target.value.length < 3){
        	this.setState({error:true});
    	}else{
    		this.setState({error:false});
    	}
	}
	onNewLocation=(event)=>{
		this.setState({NewLocation:event.target.value})
		if(event.target.value.length < 3){
        	this.setState({error:true});
    	}else{
    		this.setState({error:false});
    	}
	}
	onNewPrice=(event)=>{
		this.setState({NewPrice:event.target.value})		
	}
	onNewDescription=(event)=>{
		this.setState({NewDescription:event.target.value})
		if(event.target.value.length < 3){
        	this.setState({error:true});
    	}else{
    		this.setState({error:false});
    	}
	}

	onUpdateCamp=()=>{
		const a=document.getElementById('error');
		const d=document.getElementById('CampAlreadyUsed');		
		if(!this.state.error){
			fetch('https://yelpcamp-api.herokuapp.com/updateCamp',{
					method:'put',
					headers:{'Content-Type':'application/json'},
					body:JSON.stringify({
						camps_name:this.state.newCampName,
						loacation:this.state.NewLocation,
						description:this.state.NewDescription,
						image:this.state.NewImage,
						added:this.state.NewDate,
						price:this.state.NewPrice,
						id:this.props.campsData.id,
						user:this.props.user.id	
					})
				})
			.then(response=>{				
				return response.json()
			})
			.then(camp=>{
				if(camp.id){				
				this.setState({isCampEdit:true})
				}else{
				this.setState({isCampEdit:false})
					return d.innerHTML="Camp's name already used"
				}				
			})			
				}if(this.state.error) {
					a.innerHTML="You need to fill all the fields"
				}else{
					a.innerHTML=""
				}
		}

	render(){		
		if(this.props.isAdminIn){
			if(this.state.isCampEdit){
				return <Redirect to='/Home' />
			}else{
				return (
				<div>
					<div style={{height: '1100px', marginTop: '10px'}}
					className= 'tc bg-washed-green shadow-4 br2 pa3 ba dark-gray b--black-10 mv4 w-100 w-100-m w-100-l mw6 center'>
						<img src={this.props.campsData.image} alt='camp' style={{width: '100%' ,height: '250px'}} />
						<h1>{this.props.campsData.camps_name}</h1>
						<p>Location : {this.props.campsData.loacation} </p>
						<p><em>{this.props.campsData.description}</em></p>
						<p><em>{this.props.campsData.price}$/night</em></p>
						<p>Camp added : <Moment format="D MMM YYYY" withTitle>{this.props.campsData.added}</Moment></p>
						<hr/>
						<div>
						<h2>Edit camp's info</h2>
						<p>New camp's name : </p><input 
						className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-80" 
						placeholder={this.props.campsData.camps_name}
						onChange={this.onCampNameChange}
						/><br/>
						<span id='CampAlreadyUsed' className='red'></span>
						<p>New image : </p><input 
						className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-80" 
						placeholder={this.props.campsData.image}
						onChange={this.onNewImage}
						/>
						<p>New location : </p><input 
						className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-80" 
						placeholder={this.props.campsData.loacation}
						onChange={this.onNewLocation}
						/>
						<p>New description : </p><input 
						className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-80" 
						placeholder={this.props.campsData.description}
						onChange={this.onNewDescription}
						/>
						<p>New price : </p><input
						className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-80" 
						placeholder={this.props.campsData.price}
						onChange={this.onNewPrice}
						/>						
						<br/>
						<input 
						className='f5  pointer  shadow-4 dim br2 ph3 pv2  dib white bg-green mt3' 
						type='submit' 
						onClick={this.onUpdateCamp}
						/><br/>
						<span id='error' className='red'></span>
						</div>
					</div>
				</div>
				);				
			}
			
		}
	}
}

export default UpdateCamp;


