import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'



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
		$.ajax({
			url: '/api/donors/',
			contentType: 'application/json', 
			type: 'POST',
			data: JSON.stringify(this.state),
			success: function(data) {
				console.log('Joya');
			}.bind(this),
			error: function(xhr, status, err) {
				console.log('Mal');
			}.bind(this)
		});
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
	_fetchData: function() {
		$.ajax({
			url: '/api/donors/',
			type: 'GET',
			success: function(data) {
				this.setState({
					donorsList: data
				})
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
		setInterval(this._fetchData, 1000);
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
								<td>{donor.first_name}</td>
								<td>{donor.last_name}</td>
							</tr>
						)
					})}
					</tbody>

				</table>
			</div>
		)
	}
})

ReactDOM.render((
  <Router history={browserHistory}>
        <Route path="/" component={MainLayout} />
        <Route path="donors" component={DonorLayout} />
        <Route path="patients" component={PatientLayout} />
  </Router>
), document.getElementById('app'))


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
