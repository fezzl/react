import React,{Component} from 'react'

import * as actions from '../redux/actions'

export default class App extends Component {
  
  add = () => {
    //1.获取选择框的值
    const number = this.select.value*1;
    //2.更新store里的状态
    this.props.store.dispatch(actions.increase(number));
  }

  dec = () => {
    //1.获取选择框的值
    const number = this.select.value*1;
    //2.获取当前的state值
    this.props.store.dispatch(actions.decrease(number));
  }

  increatIfOdd = () => {
    //1.获取选择框的值
    const number = this.select.value*1;
    //2.获取当前的state值
    const count = this.props.store.getState();
    //3.更新状态
    if(count%2 === 1) {
      this.props.store.dispatch(actions.increase(number));
    }
  }  

  asyncAdd = () => {
    //1.获取选择框的值
    const number = this.select.value*1;
    //2.更新状态
    setTimeout(() => {
      this.props.store.dispatch(actions.increase(number));
    },1000);
  }
  
  render(){
    const count = this.props.store.getState();
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