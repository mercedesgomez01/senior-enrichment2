import React from 'react';

const Campuses = (props) => {
	const campuses = props.campuses;
	const selectCampus = props.selectCampus;

	console.log("campuses", props)
	return(
		<div>
			<h3>Campuses</h3>
					{
						campuses.map((campus, idx) => {
							return (
								<div className="col-xs-4" key={idx}>
							      <a className="thumbnail" href="#" onClick = {() => selectCampus(campus.id)}>
							        <img src={campus.imageUrl} />
							        <div className="caption">
							          <h5>
							            <span>{campus.name}</span>
							          </h5>
							          <small>{campus.user.length}</small>
							        </div>
							      </a>
						    </div>)
						}
  						)
					}
		</div>
	)
}

export default Campuses