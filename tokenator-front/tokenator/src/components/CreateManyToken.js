import React, { Component } from "react";
import { createListToken } from "../actions/index";
import { connect } from "react-redux";

class CreateManyToken extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: [], count: 1 };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(i, event) {
    let value = this.state.value.slice();
    value[i] = event.target.value;
    this.setState({ value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createListToken(this.state.value);
  }

  addClick() {
    this.setState({ count: this.state.count + 3 });
  }

  removeClick(i) {
    let value = this.state.value.slice();
    value.splice(i, 3);
    this.setState({
      count: this.state.count - 3,
      value
    });
  }

  createUI() {
    let uiItems = [];
    for (let i = 0; i < this.state.count; i += 3) {
      uiItems.push(
        <div key={i}>
          <input
            type="text"
            placeholder="Credit Card Number"
            value={this.state.value[i] || ""}
            onChange={this.handleChange.bind(this, i)}
          />
          <input
            type="text"
            placeholder="Expiration Date"
            value={this.state.value[i + 1] || ""}
            onChange={this.handleChange.bind(this, i + 1)}
          />
          <input
            type="text"
            placeholder="Length of Token"
            value={this.state.value[i + 2] || ""}
            onChange={this.handleChange.bind(this, i + 2)}
          />
          <input
            type="button"
            value="remove"
            onClick={this.removeClick.bind(this, i)}
          />
        </div>
      );
    }
    return uiItems || null;
  }

  render() {
    return (
      <div className="createmanytoken">
        <p> Input list of Credit card and generate token</p>
        <form onSubmit={this.handleSubmit}>
          {this.createUI()}
          <input
            type="button"
            value="add more"
            onClick={this.addClick.bind(this)}
          />
          <input type="submit" className="button" value="Submit" />
        </form>

        {this.props.tokenlist.map(function(token, index) {
          return (
            <li key={index}>
              Credit card: {token.san} Expiration date: {token.expr}
            </li>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.info("pan1", state);
  return {
    tokenlist: state.forTokenList.tokenlist
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createListToken: list => createListToken(list, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateManyToken);
