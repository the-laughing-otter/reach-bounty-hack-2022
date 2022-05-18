import React from 'react';
import CommonViews from './CommonViews.js';

const exports = {...CommonViews};

const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

exports.Wrapper = class extends React.Component {
  render() {
    const {content} = this.props;
    return (
      <div className="Deployer">
        <h2>Let's set up the music challenge.</h2>
        {content}
      </div>
    );
  }
}

exports.Setchallenge = class extends React.Component {
  render() {
    const {parent, defaultreward, defaultprice, standardUnit} = this.props;
    const reward = (this.state || {}).reward || defaultreward;
    const payment = (this.state || {}).payment || defaultprice;
    //const price1 = (this.state || {}).price1 || defaultprice;
    //const price2 = (this.state || {}).price2 || defaultprice;
    return (
      <div>
        <p></p>
        The reward value
        <input
          type='number'
          placeholder={defaultreward}
          onChange={(e) => this.setState({reward: e.currentTarget.value})}
        /> {standardUnit}
        <br />
        The player pays
         <input
          type='number'
          placeholder={defaultprice}
          onChange={(e) => this.setState({payment: e.currentTarget.value})}
        /> {standardUnit}
        <br />
       
        <br />
        
        <button
          onClick={() => parent.setchallenge(reward, payment)}
        >Let's set it up</button>
        
      </div>
    );
  }
}



exports.Deploy = class extends React.Component {
  render() {
    const {parent, reward, payment, standardUnit} = this.props;
    return (
      <div>
        <br />
      The reward is set to: {reward} {standardUnit}
      <br />
      The player pays
      <br /> {payment} {standardUnit} <br /> 

       <br />
      Let's get started.
        <br />
        
        <button
          onClick={() => parent.deploy()}
        >Deploy</button>
      </div>
    );
  }
}

exports.Deploying = class extends React.Component {
  render() {
    return (
      <div>Deploying... please wait.
    
      </div>
    );
  }
}


exports.WaitingForAttacher = class extends React.Component {
  async copyToClipborad(button) {
    const {ctcInfoStr} = this.props;
    navigator.clipboard.writeText(ctcInfoStr);
    const origInnerHTML = button.innerHTML;
    button.innerHTML = 'Copied!';
    button.disabled = true;
    await sleep(1000);
    button.innerHTML = origInnerHTML;
    button.disabled = false;
  }

  render() {
    const {ctcInfoStr} = this.props;
    return (
      <div>
        Waiting for a player to join...
        <br /> Please give them this contract info:
        <pre className='ContractInfo'>
          {ctcInfoStr}
        </pre>
        <button
          onClick={(e) => this.copyToClipborad(e.currentTarget)}
        >Copy to clipboard</button>
      </div>
    )
  }
}


export default exports;
