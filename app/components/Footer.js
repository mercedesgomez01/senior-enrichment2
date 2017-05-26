import React from 'react';

const Footer = (props) => {
	const currentUser = props.currentUser;
	const userList = props.userList
	const toggle = props.toggle;
	const next = props.next;
	const prev = props.prev;
	const progress = props.progress;
	return (
		<footer>
			<div class="pull-left">
			  <button className="btn btn-default" onClick={prev}>
			    <span className="glyphicon glyphicon-step-backward"></span>
			  </button>
			  <button className="btn btn-default" onClick={next}>
			    <span className="glyphicon glyphicon-step-forward"></span>
			  </button>
			</div>
		</footer>
	)
}

export default Footer