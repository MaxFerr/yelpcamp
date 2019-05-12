import React from 'react';
import CampCard from '../CampCard/CampCard';

const CampList= ({campsData,onBtnPressInfo,isAdminIn,onDeleteCamp}) => {
	const cardLoop=campsData.map((data,i)=>{
		return (
			<CampCard
			key={i}
			name={data.camps_name}
			location={data.loacation}
			joined={data.added}
			image={data.image}
			onBtnPressInfo={onBtnPressInfo}			
			index={i}
			id={data.id}
			isAdminIn={isAdminIn}
			onDeleteCamp={onDeleteCamp}
			/>
			)
	})

	return (		
		<div className='container' >
			{cardLoop}
		</div>
		);
}
export default CampList;