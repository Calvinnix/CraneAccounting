var EventRow = React.createClass({
  render: function() {
    return (
      <div className="row row-striped">
        <div className="row">
          <div className="col-md-2 text-center">{this.props.event.timestamp}</div> 
          <div className="col-md-2">{this.props.event.user}</div> 
          <div className="col-md-8 wrap-words">{this.props.event.description}</div>
        </div>
      </div>
    );
  }
});

var EventsTable = React.createClass({
    propTypes: {
            events: React.PropTypes.array.isRequired
    },
    render: function() {
        var self = this;
        var rows = [];
        var index = 0;
        this.props.events.forEach(function(event) {
            rows.push(<EventRow event={event} key={index++}/>);
        });
        return (
            <div className="container">
                {rows}
            </div>
        );
    }
});

var AllEvents = React.createClass({

    getInitialState: function() {
        return {
            events: [],
            sortedByDescending: false
        };
    },
    componentDidMount: function () {
        this.loadEventsFromServer();
    },
    loadEventsFromServer: function() {
        var self = this;
        $.ajax({
            url: "http://localhost:8080/api/eventLogs"
        }).then(function (data) {
            self.setState({events: data._embedded.eventLogs});
        });
    },
    sortEvents: function () {
      var events = this.state.events;

      if (this.state.sortedByDescending) {
        events.sort(this.ascending)
        this.setState({
          sortedByDescending: false,
          events: events
        });
      } else {
        events.sort(this.descending)
        this.setState({
          sortedByDescending: true,
          events: events
        });
      }
    },
    descending: function(a,b) {
      if (a.timestamp > b.timestamp)
        return -1;
      if (a.timestamp < b.timestamp)
        return 1;
      return 0;
    },
    ascending: function(a,b) {
      if (a.timestamp < b.timestamp)
        return -1;
      if (a.timestamp > b.timestamp)
        return 1;
      return 0;
    },
    render: function() {
      var self = this;
      return (
        <div>
          <div className="container">
            <h1>Event Log</h1>
            <div className="faq">
              <div className="container">
                <input id="searchBar" type="search" className="form-control" placeholder="Search" />
                <div className="faq_not_found">
                  <p>No Matches were found</p>
                </div>
              </div>
              <div className="row header-row">
                <div className="col-md-2 text-center" onClick={this.sortEvents}><h5>Timestamp&nbsp;
                  {this.state.sortedByDescending ? (
                      <span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                    ) : (
                      <span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                    )}</h5></div>
                <div className="col-md-2"><h5>User</h5></div>
                <div className="col-md-8"><h5>Description</h5></div>
              </div>
              <EventsTable events={this.state.events} />
            </div>
          </div>
        </div>
      );
    }

});

if (document.getElementById('AllEvents') != null) {
    ReactDOM.render(<AllEvents />, document.getElementById('AllEvents'));
}
