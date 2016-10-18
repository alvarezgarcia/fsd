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
			'donorFirstName': '',
			'donorLastName': ''
		}
	},
	handleOnChange: function(t) {
		this.setState({
			[t.target.name]: t.target.value	
		});
	},
	handleOnSubmit: function(e) {
		e.preventDefault();
		console.log(this.state);
		$.ajax({
			url: '/api/donors/',
			contentType: 'application/json', 
			type: 'POST',
			data: JSON.stringify(this.state),
			success: function(data) {
				console.log('Joya');
				//this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.log('Mal');
			}.bind(this)
		});
	},
	render: function() {
		return (
			<div>
				<div>Map</div>
				<form onSubmit={this.handleOnSubmit}>
					<input type="text" placeholder="Ingrese" value={this.state.donorFirstName} name="donorFirstName" onChange={this.handleOnChange}/>
					<input type="text" placeholder="Ingrese" value={this.state.donorLastName} name="donorLastName" onChange={this.handleOnChange}/>
					<input type="submit" value="Post"/>
				</form>
			</div>
		)
	}
})

var PatientLayout = React.createClass({
	render: function() {
		return (
			<div>Implement</div>
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
