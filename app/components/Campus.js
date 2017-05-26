import React from 'react';
// import User from './User';

const Campus = (props) => {
	const campus = props.campus;
	const currentUser = props.currentUser
	// const isPlaying = props.isPlaying
	const toggle = props.toggle

	console.log('campus', props)

	return (
		<div className="album col-xs-10">
		  <div>
		    <h3>I SHOULD BE AN CAMPUS NAME</h3>
		    <img src={campus.imageUrl} className="img-thumbnail" />
		  </div>
		  <table className='table'>
		    <thead></thead>
		  	<User 
		  		users = {campus.users}
		  		currentUser={currentUser}
		  		toggle = {toggle}
		  	/>
		  </table>
		</div>
	)
}

export default Campus;


// isPlaying = {isPlaying}