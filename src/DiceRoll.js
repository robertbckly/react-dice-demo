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
    this.state = { dice: Array(this.props.diceCount).fill(null), isRolling: false };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.roll = this.roll.bind(this);
  }

  componentDidMount() {
    // Roll with no delay upon mounting
    this.roll(true);
  }

  // Using an intermediate event handling function...
  // because it prevents function creation every render...
  // and is a convention that I like.
  handleButtonClick(e) {
    this.roll();
  }

  roll(immediate = false) {
    let delay = 0;
    // If should delay...
    if (!immediate) {
      // Set delay interval
      delay = this.props.rollDelay;
      // Set pending status to trigger animation
      this.setState({
        isRolling: true,
      });
    }
    // After (optional) delay...
    setTimeout(() => {
      // Update dice and reset status to ready
      // IMPROVEMENT:
      // now using callback form of setState...
      // because state can be updated asynchronously...
      // so can't depend on it ('currState' below is a copy of current state).
      // = Good practice even if strictly not a problem in this case.
      this.setState((currState) => {
        return {
          dice: currState.dice.map(() => {
            return Math.floor(Math.random() * this.props.faceCount) + 1;
          }),
          isRolling: false,
        };
      });
    }, delay);
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
          {this.state.dice.reduce((total, dice) => total + dice)}
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
