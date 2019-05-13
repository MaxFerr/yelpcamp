import React from 'react';
import Button from '../Button/Button';
import './MainNavBar.css';

const MainNavBar=({btnList,onBtnPress,searchChange,path})=>{
	const btnLoop=btnList.map((info,i)=>{
		return (
			<Button
			key={i}
			name={info}
			onBtnPress={onBtnPress}
			index={i}
			/>
			) 
	})
	
		if(path==='/Home' ||path==='/' ){
			return(
					<div className='shadow-1 bg-green navigation' >
						{btnLoop}
						<div style={{display:'inline'}} >
							<input id='mainSearch' placeholder='Search' 
							className='mt2 ml3 mb2 input-reset ba b--green bg-white hover-bg-light-green hover-black'
							style={{padding:'6px', paddingTop:'5px',paddingBottom:'7px'}}
							onChange={searchChange}
							/>
						</div>
					</div>
				)
			
	}else{
		return (
				<div className='shadow-1 bg-green navigation' >
						{btnLoop}
						<div style={{display:'none'}} >
							<input id='mainSearch' placeholder='Search' 
							className='mt2 ml3 mb2 input-reset ba b--green bg-white hover-bg-light-green hover-black'
							style={{padding:'6px', paddingTop:'5px',paddingBottom:'7px'}}
							onChange={searchChange}
							/>
						</div>
					</div>
			)
		
	}
		
		
}
export default MainNavBar;