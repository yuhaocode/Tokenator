import React, { Component } from "react";

class ShowListToken extends React.Component {
  render() {
    return (
      <div>
        {this.props.primarylist.map(function(primary, index) {
          if (primary == null) return <li key={index}> null </li>;
          else {
            return (
              <li key={index}>
                Credit card: {primary.pan} Expiration date: {primary.expr}
              </li>
            );
          }
        })}
        {this.props.number}
      </div>
    );
  }
}

export default ShowListToken;
