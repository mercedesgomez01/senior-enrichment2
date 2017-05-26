import React, {Component} from 'react';
import axios from 'axios';

// import AUDIO from './../../audio';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Campuses from './Campuses';
import Campus from './Campus';


export default class Main extends Component {
	constructor() {
		super()
		this.state = {
			selectedCampus : {},
			campuses : [],
			currentUser : {},
			userList : [],
			progress : 0
		}
		this.selectCampus = this.selectCampus.bind(this);
		this.deselectCampus = this.deselectCampus.bind(this);	
		this.prev = this.prev.bind(this);
		this.next = this.next.bind(this);
	}

	componentDidMount() {
		axios.get(`/api/campuses/`)
			.then(res => res.data)
			.then(campuses => {
				campuses.forEach(campus => {
					campus.imageUrl = `/api/albums/${campus.id}/image`
				})
				console.log("mutated campuses", campuses)
				return campuses
			})
			.then(campuses => this.setState({campuses : campuses}))

		// AUDIO.addEventListener('ended', () => this.next());
    	// AUDIO.addEventListener('timeupdate', () =>  {
    	// 	this.setProgress(AUDIO.currentTime / AUDIO.duration)
    	// });
	}

	load(user, songList) {
		// AUDIO.src = song.audioUrl;
		// AUDIO.load();
		this.setState({
			currentUser : user,
			userList : userList
		})
	}

	mod(num, m){
		return ((num % m) + m) % m
	}


	skip(interval, { userList, currentUser }){
	  let idx = userList.map(user => user.id).indexOf(currentUser.id);
	  idx = this.mod(idx + interval, userList.length);
	  const next = userList[idx];
	  return [next, userList];
	}

	startUser(user, userList) {
		// this.pause();
		this.load(user, userList);
		// this.play();
	}

	next () {
	    this.startUser(...this.skip(1, this.state));
	  }

	prev () {
	    this.startUser(...this.skip(-1, this.state));
	  }


	selectCampus (campusId) {
		axios.get(`/api/campuses/${campusId}`)
			.then(res => {
				let campus = res.data;
				campus.imageUrl = `/api/campuses/${campus.id}/image`; 
				console.log('$$$', campus)
				campus.users = campus.users.map((user, idx) => {
					user.audioUrl = `/api/users/${user.id}/audio`;
					return user;
				})
				return campus;
			})
			.then(campus => this.setState({selectedCampus : campus, userList : album.users}))
			
	}

	deselectCampus() {
		this.setState({selectedCampus : {}})
	}

	render () {
		return (
			<div id="main" className="container-fluid">
				<div className="col-xs-2">
					<Sidebar deselect = {this.deselectCampus}/>
				</div>
				<div className="col-xs-10">
				{
					this.state.selectedCampus.id ? 
					<Campus 
						campus={this.state.selectedCampus} 
						currentUser={this.state.currentUser}
					/> 
					: <Campuses campuses = {this.state.campuses} selectCampuses = {this.selectCampus}/>
				}
					<Footer 
						currentUser={this.state.currentUser}
						toggle = {this.toggle}
						userList = {this.state.userList}
						next = {this.next}
						prev = {this.prev}
					/>
				</div>
			</div>	
		)
	}
}