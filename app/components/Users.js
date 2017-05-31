import React from 'react';

const Users = (props) => {
	const users = props.users
	const currentUser = props.currentUser
	// const isPlaying = props.isPlaying
	const toggle = props.toggle

	return(
		<tbody>
			{
				users.map((user, idx) => {
					return (
						{/*<tr key={idx} className={(user.id === currentUser.id && isPlaying) ? 'active' : 'null'}>*/}
              	<tr key={idx} className={(user.id === currentUser.id) ? 'active' : 'null'}>
					        <td>
					          <button className="btn btn-default btn-xs" onClick={() => toggle(user, users)}>
					            {	
                                    {/*(song.id === currentSong.id && isPlaying) ? <span></span> : <span className="glyphicon glyphicon-play"></span>*/}
					            	(user.id === currentUser.id) ? <span></span> : <span className="glyphicon glyphicon-play"></span>
					            }
					          </button>
					        </td>
					        <td>{user.name}</td>
					        {/*<td>{user.campus}</td>*/}
					        <td>{user.genre}</td>
					      </tr>

					)
				})
			}
		</tbody>
		
	   
	)
}

export default Users