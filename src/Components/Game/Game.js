import React, { Component } from "react";
import _ from "lodash";

const Stars = props => {
  return (
    <div className="col-5">
      {_.range(props.numberOfStars).map(i => <i key={i} className="fas fa-star" ></i>)}
    </div>
  );
};

const Button = props => {
  return (
    <div className="col-2">
      <button className="btn btn-secondary" disabled={props.selectedNumbers.length === 0}>=</button>
    </div>
  );
};

const Answer = props => {
  return (
    <div className="col-5">
      {props.selectedNumbers.map((number, i) =>
        <span key={i} onClick={() => props.rollBackAnswer(number)}>{number}</span>
      )}
    </div>
  )
};

const Numbers = props => {
  const numberClassName = (number) => {
    if(props.selectedNumbers.indexOf(number) >= 0) {
      return 'selected';
    }
  }

  return (
    <div className="card text-center">
      <div>
        {Numbers.list.map((number, i) =>
          <span key={i} className={numberClassName(number)}
                onClick={() => props.selectNumber(number)}>
            {number}
          </span>
        )}
      </div>
    </div>
  );
};
Numbers.list = _.range(1, 10);

class Game extends Component {
  state = {
    selectedNumbers: [],
    randomNumberOfStars: 1 + Math.floor(Math.random() * 9),
  };

  selectNumber = (clickedNumber) => {
    if(this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return }
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };

  rollBackAnswer = (clickedNumber) => {
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
    }));
  };

  render() {
    const { selectedNumbers, randomNumberOfStars } = this.state;
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars numberOfStars={randomNumberOfStars}/>
          <Button selectedNumbers={selectedNumbers}/>
          <Answer selectedNumbers={selectedNumbers} rollBackAnswer={this.rollBackAnswer}/>
        </div>
        <br />
        <Numbers selectedNumbers={selectedNumbers} selectNumber={this.selectNumber}/>
      </div>
    );
  }
}

export default Game;
