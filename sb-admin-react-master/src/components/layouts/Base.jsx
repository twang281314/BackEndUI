import React from "react";
import { Route } from "react-router";

var Base = React.createClass({

  render: function() {
  	return (
      <div id="container">
        //<RouteHandler {...this.props} />
        {this.props.children}
      </div>
    );
  }

});

export default Base;