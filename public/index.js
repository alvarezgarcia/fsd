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
	render: function() {
		return (
			<div>Implement</div>
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
