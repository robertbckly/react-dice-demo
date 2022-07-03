import { Component } from 'react';
import Dice from './Dice';
import './DiceRoll.css';

export default class DiceRoll extends Component {
  static defaultProps = {
    diceCount: 6,
    faceCount: 6,
    rollDelay: 750, // ms
  };

  constructor(props) {
    super(props);

    // Must fill with null; undefined indexes are ignored by Array.map()
    this.state = {
      dice: Array(this.props.diceCount).fill(null),
      isRolling: false,
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.roll = this.roll.bind(this);
  }

  componentDidMount() {
    // Roll upon mounting
    this.setState((exState) => {
      return { dice: this.roll(exState.dice) };
    });
  }

  // Using an intermediate event handling function...
  // because it prevents function creation every render...
  // and is a convention that I like.
  handleButtonClick(e) {
    // Roll upon click with simulated delay
    this.setState({
      isRolling: true,
    });
    // Perform roll after timeout
    setTimeout(() => {
      this.setState((exState) => {
        return {
          dice: this.roll(exState.dice),
          isRolling: false,
        };
      });
    }, this.props.rollDelay);
  }

  // Now a pure function!
  // Nicer, easier unit to test, etc...
  // Moves setState (side-affect) into lifecycle / event-handler methods.
  roll(diceArray) {
    return diceArray.map(() => {
      return Math.floor(Math.random() * this.props.faceCount) + 1;
    });
  }

  render() {
    return (
      <section className="DiceRoll">
        {/* Dice... */}
        <div className="DiceRoll-dice">
          {this.state.dice.map((value, i) => {
            return <Dice key={i} val={value} isRolling={this.state.isRolling} />;
          })}
        </div>
        {/* Total... */}
        <p
          className={` ${
            this.state.isRolling === false
              ? 'DiceRoll-total DiceRoll-total--animate'
              : 'DiceRoll-total'
          }`}>
          {/* Only reduce dice array if contains elements... */}
          {this.state.dice.length > 0 && this.state.dice.reduce((total, dice) => total + dice)}
        </p>
        {/* Roll button... */}
        <button
          onClick={this.handleButtonClick}
          disabled={this.state.isRolling}
          className="DiceRoll-roll-button">
          Roll Dice!
        </button>
      </section>
    );
  }
}
