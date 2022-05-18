import React from 'react';
import CommonViews from './CommonViews.js';

const exports = {...CommonViews};

exports.Wrapper = class extends React.Component {
  render() {
    const {content} = this.props;
    return (
      <div className="Attacher">
        <h3>Player</h3>
        {content}
      </div>
    );
  }
}

exports.Attach = class extends React.Component {
  render() {
    const {parent} = this.props;
    const {ctcInfoStr} = this.state || {};
    return (
      <div>
        Please paste the contract info to attach to:
        <br />
        <textarea spellCheck="false"
          className='ContractInfo'
          onChange={(e) => this.setState({ctcInfoStr: e.currentTarget.value})}
          placeholder='{}'
        />
        <br />
        <button
          disabled={!ctcInfoStr}
          onClick={() => parent.attach(ctcInfoStr)}
        >Attach</button>
      </div>
    );
  }
}

exports.Attaching = class extends React.Component {
  render() {
    return (
      <div>
        Attaching, please wait...
      </div>
    );
  }
}

//May implement this later

// exports.Chooseprice = class extends React.Component {
//  render() {
//    const {parent, price0, price1, price2, standardUnit} = this.props;
//    const ichoice = (this.state || {}).ichoice || defaultchoice;
//    return (
//      <div>
//        <input
//          type='number'
//          placeholder={defaultchoice}
//          onChange={(e) => this.setState({ichoice: e.currentTarget.value})}
//        /> {standardUnit}
//        <br />
//        <button
//          onClick={() => parent.chooseprice (ichoice)}
//        >Let's choose the amount</button>
//      </div>
//    );
//  }
// }

exports.AcceptTerms = class extends React.Component {
  render() {
    const {reward, payment, standardUnit, parent} = this.props;
    const {disabled} = this.state || {};
    return (
      <div>
        You've opted to pay: <br></br>
         {payment} {standardUnit}.<br></br>
         You could be rewarded {reward} {standardUnit}
        <br></br> if you do some tasks.
        <br />
        <button
          disabled={disabled}
          onClick={() => {
            this.setState({disabled: true});
            parent.termsAccepted();
          }}
        >Accept terms and pay </button>
      </div>
    );
  }
}




export default exports;
