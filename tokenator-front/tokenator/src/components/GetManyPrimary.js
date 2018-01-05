import React, { Component } from "react";

import { connect } from "react-redux";
import { submitTokenList } from "../actions";
import ShowListToken from "./childComponents/ShowListToken";
// class GetManyPrimary extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       name: "",
//       shareholders: [{ name: "" }]
//     };
//   }

//   // ...

//   handleShareholderNameChange = idx => evt => {
//     const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
//       if (idx !== sidx) return shareholder;
//       return { ...shareholder, name: evt.target.value };
//     });

//     this.setState({ shareholders: newShareholders });
//   };

//   handleSubmit = () => {
//     const { name, shareholders } = this.state;
//     console.log(this.state);
//     alert(
//       `Incorporated: ${shareholders.name} with ${
//         shareholders.length
//       } shareholders`
//     );
//   };

//   handleAddShareholder = () => {
//     this.setState({
//       shareholders: this.state.shareholders.concat([{ name: "" }])
//     });
//   };

//   handleRemoveShareholder = idx => () => {
//     this.setState({
//       shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
//     });
//   };

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         {/* ... */}
//         <h4>Token List</h4>

//         {this.state.shareholders.map((shareholder, idx) => (
//           <div className="shareholder">
//             <input
//               type="text"
//               placeholder={`Shareholder #${idx + 1} name`}
//               value={shareholder.name}
//               onChange={this.handleShareholderNameChange(idx)}
//             />
//             <input
//               type="text"
//               placeholder={`Shareholder #${idx + 1} name`}
//               value={shareholder.name}
//               onChange={this.handleShareholderNameChange(idx)}
//             />
//             <button
//               type="button"
//               onClick={this.handleRemoveShareholder(idx)}
//               className="small"
//             >
//               -
//             </button>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={this.handleAddShareholder}
//           className="small"
//         >
//           Add Shareholder
//         </button>
//         <button>Incorporate</button>
//       </form>
//     );
//   }
// }
// export default GetManyPrimary;

class GetManyPrimary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: [], count: 1 };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(i, event) {
    let value = this.state.value.slice();
    value[i] = event.target.value;
    this.setState({ value: value });
  }

  handleSubmit(event) {
    console.log("A name was submitted: " + this.state.value);
    event.preventDefault();
    this.props.submitTokenList(this.state.value);
    let value = this.state.value;
    this.setState({ value });
  }

  addClick() {
    this.setState({ count: this.state.count + 2 });
  }

  removeClick(i) {
    let value = this.state.value.slice();
    value.splice(i, 2);
    this.setState({
      count: this.state.count - 2,
      value
    });
  }

  createUI() {
    let uiItems = [];
    for (let i = 0; i < this.state.count; i += 2) {
      uiItems.push(
        <div key={i}>
          <input
            type="text"
            placeholder="Token"
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
            type="button"
            value="remove"
            onClick={this.removeClick.bind(this, i)}
          />
        </div>
      );
    }
    return uiItems;
  }

  render() {
    return (
      <div className="getmanyprimary">
        <p> Input a list of token to get credit</p>
        <form onSubmit={this.handleSubmit}>
          {this.createUI()}
          <input
            type="button"
            value="add more"
            onClick={this.addClick.bind(this)}
          />
          <br />
          <input type="submit" className="button" value="Submit" />
        </form>
        <ShowListToken
          primarylist={this.props.primarylist}
          number={this.props.number}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.info("pan", this.state);
  return {
    primarylist: state.forTokenList.primarylist,
    number: state.forTokenList.number
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitTokenList: list => submitTokenList(list, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GetManyPrimary);
