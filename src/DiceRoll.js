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
    this.state = { dice: Array(this.props.diceCount).fill(null), status: 'ready' };
    this.roll = this.roll.bind(this);
  }

  componentDidMount() {
    // Roll with no delay upon mounting
    this.roll(true);
  }

  roll(immediate = false) {
    let delay = 0;
    // If should delay...
    if (!immediate) {
      // Set delay interval
      delay = this.props.rollDelay;
      // Set pending status to trigger animation
      this.setState({
        status: 'pending',
      });
    }
    // After (optional) delay...
    setTimeout(() => {
      // Update dice and reset status to ready
      this.setState({
        dice: this.state.dice.map(() => {
          return Math.floor(Math.random() * this.props.faceCount) + 1;
        }),
        status: 'ready',
      });
    }, delay);
  }

  render() {
    const renderedDice = this.state.dice.map((value, i) => {
      return (
        <Dice key={i} val={value} isRolling={this.state.status === 'pending'} />
      );
    });

    return (
      <section className="DiceRoll">
        {/* Dice... */}
        <div className="DiceRoll-dice">{renderedDice}</div>
        {/* Total... */}
        <p
          className={` ${
            this.state.status === 'ready'
              ? 'DiceRoll-total DiceRoll-total--animate'
              : 'DiceRoll-total'
          }`}>
          {this.state.dice.reduce((total, dice) => total + dice)}
        </p>
        {/* Roll button... */}
        <button
          onClick={() => {
            this.roll();
          }}
          disabled={this.state.status === 'pending'}
          className="DiceRoll-roll-button">
          Roll Dice!
        </button>
      </section>
    );
  }
}
