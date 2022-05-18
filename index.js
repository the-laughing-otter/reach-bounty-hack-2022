import React from 'react';
import AppViews from './views/AppViews.js';
import DeployerViews from './views/DeployerViews.js';
import AttacherViews from './views/AttacherViews.js';
import {renderDOM, renderView} from './views/render.js';
import './index.css';
import * as backend from './build/index.main.mjs';
import { loadStdlib } from '@reach-sh/stdlib';
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';

const reach = loadStdlib(process.env);
const {standardUnit} = reach;
const defaults = {defaultFundAmt: '10', defaultprice: '1', defaultreward: '2', standardUnit};

reach.setWalletFallback(reach.walletFallback({
  providerEnv: 'TestNet', MyAlgoConnect }));

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {view: 'ConnectAccount', ...defaults};
    }
    async componentDidMount() {
      const acc = await reach.getDefaultAccount();
      const balAtomic = await reach.balanceOf(acc);
      const bal = reach.formatCurrency(balAtomic, 4);
      this.setState({acc, bal});
      if (await reach.canFundFromFaucet()) {
        this.setState({view: 'FundAccount'});
      } else {
        this.setState({view: 'DeployerOrAttacher'});
      }
    }
    async fundAccount(fundAmount) {
        await reach.fundFromFaucet(this.state.acc, reach.parseCurrency(fundAmount));
        this.setState({view: 'DeployerOrAttacher'});
      }
    async skipFundAccount() { this.setState({view: 'DeployerOrAttacher'}); } 
    async updateBal(newbal) {newbal = reach.parseCurrency(balAtomic + fundAmount);}
    selectAttacher() { this.setState({view: 'Wrapper', ContentView: Attacher}); }
    selectDeployer() { this.setState({view: 'Wrapper', ContentView: Deployer}); }

    render() { return renderView(this, AppViews); }
}

class Common extends React.Component {
    random() { return reach.hasRandom.random(); }
    informTimeout() { this.setState({view: 'Timeout'}); }
    seeTransfer() {
       this.setState({view: 'Done'}); }
    settask1() { this.setState({view:'setTask1'}); }
    setTask2() { this.setState({view:'setTask2'}); }
    setTask3() { this.setState({view:'setTask3'}); }
    setTask04() { this.setState({view:'setTask04'}); }
    setTask5() { this.setState({view:'setTask5'}); }
    setTask6() { this.setState({view:'setTask6'}); }
    setTask7() { this.setState({view:'setTask7'}); }
    taskFinish() { this.setState({view:'taskFinish'}); }
  }
class Deployer extends Common {
    constructor(props) {
        super(props);
        this.state = {view: 'Setchallenge'};
    } 
    
    setchallenge(reward, payment, deadline) 
    { this.setState({view: 'Deploy', reward, payment, deadline}); }
    async deploy() {
      const ctc = this.props.acc.contract(backend);
      this.setState({view: 'Deploying', ctc});
      this.reward = reach.parseCurrency(this.state.reward); // UInt
      this.deadline = {ETH: 10, ALGO: 100, CFX: 1000}[reach.connector];
      this.payment = reach.parseCurrency(this.state.payment);

      backend.Alice(ctc, this);
      const ctcInfoStr = JSON.stringify(await ctc.getInfo(), null, 2);
      this.setState({view: 'WaitingForAttacher', ctcInfoStr});
    }
   
    render() { return renderView(this, DeployerViews); }
  }
  class Attacher extends Common {
    constructor(props) {
      super(props);
      this.state = {view: 'Attach'};
    }
    attach(ctcInfoStr) {
      const ctc = this.props.acc.contract(backend, JSON.parse(ctcInfoStr));
      this.setState({view: 'Attaching'});

    backend.Bob(ctc, this);
    }
  
    async accchallenge(rewardAtomic, paymentAtomic){
      const reward = reach.formatCurrency(rewardAtomic, 4);
      const payment = reach.formatCurrency(paymentAtomic, 4);  
       return await new Promise(resolveAcceptedP => {
        this.setState({view: 'AcceptTerms', reward, payment, resolveAcceptedP});
      });
    }
    
    termsAccepted() {
      this.state.resolveAcceptedP();
  //    this.setState({view: 'setTask1', Task1});
      this.setState({view: 'setTask1'});
    }
    render() { return renderView(this, AttacherViews); }
  }

renderDOM(<App />);