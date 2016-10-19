import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

var socket = io()



var MainLayout = React.createClass({
  render: function() {
    return (
      <div className="app">
      	<div><Link to="/donors">Donors</Link></div>
      	<div><Link to="/patients">Patients</Link></div>
      </div>
      )
  }
})


var DonorLayout = React.createClass({
	getInitialState: function() {
		return {
			'firstName': '',
			'lastName': ''
		}
	},
	handleOnChange: function(t) {
		this.setState({
			[t.target.name]: t.target.value	
		});
	},
	handleOnSubmit: function(e) {
		e.preventDefault();
		socket.emit('new-donor', this.state);
		
		this.setState({
			'firstName': '',
			'lastName': ''
		});
	},
	render: function() {
		return (
			<div>
				<div>Map</div>
				<form onSubmit={this.handleOnSubmit}>
					<input type="text" placeholder="Ingrese" value={this.state.firstName} name="firstName" onChange={this.handleOnChange}/>
					<input type="text" placeholder="Ingrese" value={this.state.lastName} name="lastName" onChange={this.handleOnChange}/>
					<input type="submit" value="Post"/>
				</form>
			</div>
		)
	}
})

var PatientLayout = React.createClass({
	_fetchData: function(cb) {
		$.ajax({
			url: '/api/donors/',
			type: 'GET',
			success: function(dl) {
				this.setState({
					donorsList: dl
				});
				cb();
			}.bind(this),
			error: function(xhr, status, err) {
				console.log('Mal');
			}.bind(this)
		});
	},
	getInitialState: function() {
		return({
			'donorsList': []	
		})
	},
	componentDidMount: function() {
		var self = this;
		this._fetchData(function() {

			socket.on('update-donors', function(d) {
				self.setState({
					donorsList: self.state.donorsList.concat(d)
				});

				console.log(self.state);
			});	
		})
	},
	render: function() {
		return (
			<div>
				<div>Implement</div>
				<table>

					<thead>
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
						</tr>
					</thead>

					<tbody>
					{this.state.donorsList.map(function(donor, i) {
						return (
							<tr key={i}>
								<td>{donor.firstName}</td>
								<td>{donor.lastName}</td>
							</tr>
						)
					})}
					</tbody>

				</table>
			</div>
		)
	}
})

var MapComponent = React.createClass({
	getInitialState: function() {
		return({
			zoom: 13
		})
	},
	render: function() {

		return (
			<Map center={[51.505, -0.09]} zoom={this.state.zoom}>
					<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
					/>
			</Map>
		)
	}
});

ReactDOM.render((
  <Router history={browserHistory}>
        <Route path="/" component={MainLayout} />
        <Route path="donors" component={DonorLayout} />
        <Route path="patients" component={PatientLayout} />
  </Router>
), document.getElementById('app'))

//ReactDOM.render(<MapComponent/>, document.getElementById('app'));


/*
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Home} />
      <Route component={SearchLayout}>
        <Route path="users" component={UserList} />
        <Route path="widgets" component={WidgetList} />
      </Route> 
    </Route>
  </Router>
), document.getElementById('app'))
*/
