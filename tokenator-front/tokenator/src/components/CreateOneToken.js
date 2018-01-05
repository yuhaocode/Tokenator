import React, { Component } from "react";
import { connect } from "react-redux";
import { createToken } from "../actions/index";
class CreateOneToken extends Component {
  constructor(props) {
    super(props);
    // this.state = { value: "", expr: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert(
      "A name was submitted: " +
        this.credit.value +
        this.month.value +
        this.length.value
    );
    event.preventDefault();
    this.props.createToken(
      this.credit.value,
      this.year.value,
      this.month.value,
      this.length.value
    );
  }
  render() {
    var divStyleReverse = {
      display: this.props.sanSuccess ? "block" : "none"
    };
    return (
      <div className="createonetoken">
        <p>Input Credit card and generate token</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              placeholder="Credit Card Number"
              ref={node => {
                this.credit = node;
              }}
            />
            <br />
            <span className="expiration">
              <input
                type="text"
                name="year"
                placeholder="YY"
                maxLength="2"
                size="2"
                ref={node => {
                  this.year = node;
                }}
              />
              <span>/</span>

              <input
                type="text"
                name="month"
                placeholder="MM"
                maxLength="2"
                size="2"
                ref={node => {
                  this.month = node;
                }}
              />
            </span>
            <br />
            <input
              type="text"
              placeholder="Length of Token"
              ref={node => {
                this.length = node;
              }}
            />
          </label>
          <br />
          <input type="submit" className="button" value="Submit" />
        </form>
        <div style={divStyleReverse}> token : {this.props.san}</div>
        <div style={divStyleReverse}> expr : {this.props.sanExpr}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.info("pan", state);
  return {
    // pan: state.forToken.pan,
    // expr: state.forToken.expr,
    // failure: state.forToken.failure,
    // success: state.forToken.success
    san: state.forToken.san,
    sanExpr: state.forToken.sanExpr,
    sanSuccess: state.forToken.sanSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // submitOneToken: (token, expr) => submitOneToken(token, expr, dispatch)
    createToken: (credit, year, month, length) =>
      createToken(credit, year, month, length, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateOneToken);
