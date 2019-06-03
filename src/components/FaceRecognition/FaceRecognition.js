import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({imageUrl, boxes}) => {

	const detectedFaces = boxes.map(box => {
		return (
			<div key={box.topRow} className='bounding_box' style={{top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.bottomRow}}></div>
		);
	})
	return (
			<div className='center'>
			<div className='absolute mt2'>
				<img id='inputimage' src= {imageUrl} alt='' width='300px' height='auto'/>
				{detectedFaces}
			</div> 
			</div>
		);
}

export default FaceRecognition;