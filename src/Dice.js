import { Component } from 'react';
import './Dice.css';

export default class Dice extends Component {
  static NUM_STRINGS = ['one', 'two', 'three', 'four', 'five', 'six'];
  static DICE_ICON_CLASS_TEMPLATE = 'fa-solid fa-dice-';
  static DICE_ICON_CLASS_FAIL = 'fa-solid fa-square';

  constructor(props) {
    super(props);
    this.state = { animate: false };
  }

  // Dynamic class for Font Awesome icon
  static resolveIconClass(num) {
    // INVALID
    if (isNaN(num) || num < 1 || num > 6) return Dice.DICE_ICON_CLASS_FAIL;
    // VALID
    return Dice.DICE_ICON_CLASS_TEMPLATE + Dice.NUM_STRINGS[num - 1];
  }

  render() {
    return (
      <div className={`${this.props.isRolling ? 'Dice Dice--animate' : 'Dice'}`}>
        <i className={Dice.resolveIconClass(this.props.val)}></i>
      </div>
    );
  }
}
