import React from 'react';

const exports = {};

// Common views must be extended.
// It does not have its own Wrapper view.



exports.seeTransfer = class extends React.Component {
 
  render() {
    const {parent} = this.props;
    return (
      <div>
        The reward has been given.
        <button
            onClick={() => parent.seeTransfer()}
          >Do it.</button>
      </div>
    );
  }
}

exports.setTask1 = class extends React.Component {
  render() {
    const {parent} = this.props;
    const Task1 = 'Listen to a song you love and turn the volume up loud!!.'   
    return (
      <div>
        1st task.<br></br> {Task1}
        <p> </p>
        <img src = {require('../images/loudmusic.png')} ></img>
        <button
            onClick={() => parent.setTask2()}
          >Done it!</button>
      </div>
    );
}
}

exports.setTask2 = class extends React.Component {
  render() {
    const {parent} = this.props;
    const Task2 = 'Listen to a song that reminds you of your best friend.'
    return (
      <div>
        2nd task.
        <br />
        {Task2}
        <p></p>
        <img src = {require('../images/bestfriend.png')} ></img>
        <button
            onClick={() => parent.setTask3()}
          >Done it!</button>
      </div>
    );
  }

}

exports.setTask3 = class extends React.Component {
  render() {
    const {parent} = this.props;
    const Task3 = 'Listen to a song by your favourite artist.'
    return (
      <div>
        3rd task. 
        <br /> {Task3}
        <p> </p>
        <img src = {require('../images/favouriteartist.png')} ></img>
        <button
            onClick={() => parent.setTask04()}
          >Done it!</button>
      </div>
    );
  }
}


// Doesn't work using "Task4". Just doesn't. CHange it to "Task04"
// and everything's fine. "Task1"---"Task7" are fine. Weird.
// Conflict with "Task4" from somewhere else. Investigate later. 
exports.setTask04 = class extends React.Component {
  render() {
    const {parent} = this.props;
    const Task04 = 'Introduce a friend or family member to a song you love.'
    return (
      <div>
        4th task. 
        <br /> {Task04}
        <p> </p>
        <img src = {require('../images/introduce.png')} ></img>
        <button
            onClick={() => parent.setTask5()}
          >Done it!</button>
      </div>
    );
  }
}

exports.setTask5 = class extends React.Component {
  render() {
    const {parent} = this.props;
    const Task5 = 'Listen to a song that always puts you in a great mood.'
    return (
      <div>
        5th task. 
        <br /> {Task5}
        <p> </p>
        <img src = {require('../images/greatmood.png')} ></img>
        <button
            onClick={() => parent.setTask6()}
          >Done it!</button>
      </div>
    );
  }
}

exports.setTask6 = class extends React.Component {
  render() {
    const {parent} = this.props;
    const Task6 = 'Listen to a song that has a positive message.'
    return (
      <div>
        6th task. 
        <br /> {Task6}
        <p> </p>
        <img src = {require('../images/positivemessage.png')} ></img>
        <button
            onClick={() => parent.setTask7()}
          >Done it!</button>
      </div>
    );
  }
}

exports.setTask7 = class extends React.Component {
  render() {
    const {parent} = this.props;
    const Task7 = 'Listen to an album or playlist that has no bad songs.'
    return (
      <div>
        7th task. 
        <br /> {Task7}
        <p> </p>
        <img src = {require('../images/nobadsongs.png')} ></img>
        <button
            onClick={() => parent.taskFinish()}
          >Done it!</button>
      </div>
    );
  }
}
exports.taskFinish = class extends React.Component {
  render() {
    const {parent} = this.props;
    return (
      <div>
        !!CONGRATULATIONS!! 
        <p> </p>
        <img src = {require('../images/finish.png')} ></img>
        <button
            onClick={() => parent.seeTransfer()}
          >All done!</button>
      </div>
    );
  }
}

exports.Done = class extends React.Component {
  render() {
    return (
      <div>
        Thank you for playing.
      </div>
    );
  }
}


exports.Timeout = class extends React.Component {
  render() {
    return (
      <div>
        There's been a timeout. (Someone took too long.)
      </div>
    );
  }
}

export default exports;
