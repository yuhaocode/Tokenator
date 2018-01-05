import React, { Component } from "react";
import { connect } from "react-redux";
import { submitOneToken } from "../actions";

class GetOnePrimary extends Component {
  constructor(props) {
    super(props);
    // this.state = { value: "", expr: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    // alert("A name was submitted: " + this.token.value + this.expr.value);
    event.preventDefault();
    this.props.submitOneToken(this.token.value, this.expr.value);
  }
  render() {
    var divStyle = {
      display: this.props.failure ? "block" : "none"
    };
    var divStyleReverse = {
      display: this.props.success ? "block" : "none"
    };
    return (
      <div className="getOneP">
        <p style={divStyle}>Please enter correct Token</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            <p>Input token to get credit</p>
            <input
              type="text"
              placeholder="Token"
              ref={node => {
                this.token = node;
              }}
            />
            <br />
            <input
              type="text"
              placeholder="Expiration Date"
              ref={node => {
                this.expr = node;
              }}
            />
          </label>
          <br />
          <input type="submit" className="button" value="Submit" />
        </form>
        <div style={divStyleReverse}> credit : {this.props.pan}</div>
        <div style={divStyleReverse}> expr : {this.props.expr}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.info("pan", state);
  return {
    pan: state.forToken.pan,
    expr: state.forToken.expr,
    failure: state.forToken.failure,
    success: state.forToken.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitOneToken: (token, expr) => submitOneToken(token, expr, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GetOnePrimary);
