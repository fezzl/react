import React,{Component} from 'react'
import PropTypes from 'prop-types'

export default class Counter extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    increase: PropTypes.func.isRequired,
    decrease: PropTypes.func.isRequired,
    increaseAsync: PropTypes.func.isRequired
  }
  
  add = () => {
    //1.获取选择框的值
    const number = this.select.value*1;
    //2.更新store里的状态
    this.props.increase(number);
  }

  dec = () => {
    //1.获取选择框的值
    const number = this.select.value*1;
    //2.获取当前的state值
    this.props.decrease(number);
  }

  increatIfOdd = () => {
    //1.获取选择框的值
    const number = this.select.value*1;
    //2.获取当前的state值
    const count = this.props.count;
    //3.更新状态
    if(count%2 === 1) {
      this.props.increase(number);
    }
  }  

  asyncAdd = () => {
    //1.获取选择框的值
    const number = this.select.value*1;
    //2.更新状态
    this.props.increaseAsync(number);
  }
  
  render(){
    const count = this.props.count;
    return (
      <div>
        <h2>click {count} times</h2>
        <select ref={select => this.select = select}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.add}>+</button>
        <button onClick={this.dec}>-</button>
        <button onClick={this.increatIfOdd}>increatifodd</button>
        <button onClick={this.asyncAdd}>asyncadd</button>
      </div>
    )
  }
}