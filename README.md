# react学习笔记

## 学习react的过程
在开始学习 react 已经过去了两周了，在这个学习过程踩了许多坑，现在就来总结我学习 react 的过程吧。
- - - -
### Hello World
首先，学习任何语言都是从 Hello World 开始，那么我们就从用react写一个简单的 Hello World 开始吧

```
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Hello extends Component {
	render() {
		return <h1>Hello World</h1>
	}
}
ReactDOM.render(<Hello />,document.getElementById('root'))
```



你可以看到这是屏幕上已经显示你想要的 Hello World ，你已经成功了第一步。这段代码写的是定义一个类 Hello, 它继承了**Component**类，这个类中有一个 render 的方法，这个方法中有一个 return ，它返回的是一个 HTML 结构，最后使用 ReactDOM 渲染到页面上，这时小白就会问，这不是一个 JS 代码吗，为什么可以在里面写HTML代码，其实这种语法叫做**JSX**语法

**JSX**语法就是可以的 JS 代码里面写 HTML 结构，babel 会把这些结构编译成 JS 对象，所以你可以放心的在 JS 里面写 HTML 代码。

### 使用JSX语法

接下来我们想要渲染一个列表，那么这时我们应该怎么做呢？来看看下面这个例子吧

```
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class List extends Component {
	state = {
		names: ['vue','react','angular']
	}
	render() {
		const {names} = this.state
		return(
			<ul>
				{
					names.map((name,index) => <li key={index}>{name}</li>)
				}
			</ul>
		)
	}
}
ReactDOM.render(<List />,document.getElementById('root'))
```

首先解释一下 state 这个新出现的东西，这个 state 属性是 react 中每个组件的状态，在这个状态中你可以写**这个组件**所拥有的各种状态，注意是这个组件，因为在别的组件你是访问不到这个 state 里的属性，并且你想要改变这个 state 里面的值也只能在当前的组件进行操作。

我们看到在`<ul></ul>`中我们使用了一个`{}`，这个大括号的作用就是在里面可以使用 JS 代码，所以你看到我在里面写了一个数组的`map`方法，我们把 state 里面的 names 数组遍历一遍，遍历的结果就是每一项都渲染一个 li 标签，所以上面的结果就是渲染三个 li 标签。

而且你可以看到每一个 li 标签都有一个唯一 key 值，这是 react 要求的循环出来的每一个子项都要有一个唯一的 key 值，这个 key 值最好使用后端返回数据的唯一 id 值。

### 函数组件和类组件

在 react 中组件分为两种，一种是工厂函数组件，一种是 ES6 类组件。如何判断去使用哪种组件，就是如果你的组件中没有状态的话就使用函数组件（简单组件）。如果你的组件中有状态的话就使用类组件（复杂组件）。不过一般使用的都是类组件

```
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

function Mycomponent() {
	return <h2>工厂函数组件</h2>
}

class Mycompent2 extends React.Component{
    render(){
      return <h2>ES6类组件(复杂组件)</h2>
    }
}
// ReactDOM.render(<Mycomponent />,document.getElementById('root'))
ReactDOM.render(<Mycomponent2 />,document.getElementById('root'))
```

### 组件之props, refs, state属性

组件有这三个属性——**props、refs、state**，接下来我们用几个例子介绍下这几个属性。

1.props
```
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Person extends Component {
	render() {
		return (
			<ul>
				<li>姓名：{this.props.name}</li>
				<li>性别：{this.props.sex}</li>
				<li>年龄：{this.props.age}</li>
			</ul>
		)
	}
}

const p1 = {
	name: 'Tom',
	sex: '男',
	age: 22
}

// ReactDOM.render(<Person name={p1.name} sex={p1.sex} age={p1.age}/>, document.getElementById('root'))

ReactDOM.render(<Person {...p1}/>,document.getElementById('root))

```

在上面这个例子中，我们定义了一个 Person 的类组件，这个类组件你能看到它有三个 li 标签，每个 li 标签使用了`{this.props.xxx}`,先不管这个属性的作用,往下看，我们定义了一个**p1**对象，这个对象有三个属性**name,sex,age**。在这里你应该猜到这三个属性是用来干嘛的，是不是跟上面的`{this.props.xxx}`一一对应。没错，我们就是想把这个三个属性值传到组件里面去。接下来就是在组件标签<Person />中把属性传进去

你可以使用上面第一种方式一个一个的把属性传进去，组件内部通过**props**获取外部传进来的属性，你也可以使用扩展运算符`…p1`把对象传进去。

2.refs
```
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Mycomponent extends Component {
	showInput = () => {
		const input = this.refs.content
		console.log(input.value)
		console.log(this.input.value)
	}
	render(){
		return (
			<div>
	          <input type="text" ref="content"/>
	          <input type="text" ref={input => this.input = input}/>
	          <button onClick={this.showInput}>提示输入</button>
	          <input type ="text" placeholder="失去焦点提示" onBlur={this.handleBlur}/>
        </div>
		)
	}
}
```


refs 这个属性看起来是不是很熟悉，在 vue 中也有这个属性，而且在 react 中用法也类似，它就是一个标识符。在上面的这个例子中，我先在两个输入框中输入一些值，然后希望在点击按钮后可以打印出两个输入框的值。第一种方法就是给这个输入框一个`ref=“content”`的值，然后在点击事件中就可以通过`this.refs.content`获取到这个输入框，第二种给 ref 定义一个函数，这个函数的作用就是把这个输入框赋值给这个组件类的一个input属性`this.input`。

3.state
```
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Like extends Component {
	state = {
		isLikeMe: false
	}
	handleClick = () => {
		this.setState(isLikeMe: !this.state.isLikeMe)
	}
	render(){
		const {isLikeMe} = this.state
		return <h2 onClick={this.handleClick}>{isLikeMe ? '你喜欢我' : '我喜欢你'}</h2>
	}
}
ReactDOM.render(<Like />,document.getElementById('root'))
	
```

在上面的例子中，我们首先定义了一个属性`isLikeMe:false`,它的初始值为 false ,在下面的 render 函数中，通过解构获取当前 state 的isLikeMe的值，然后用三元运算符判断当前应该渲染什么值。

并且给h2标签绑定监听事件，通过点击的时候去改变 state 里面的 isLikeMe 的值，每次点击都会取反。结果就是每次点击后所渲染的值都会改变。注意我们是如何去改变 state 里面 isLikeMe 的值的。

如果现在在写 Vue ,我们肯定会想如果我想要改变 state 里面的值只需要这样`this.state.isLikeMe = true`，如果你在  react 这样写想去改变 state 的值那不会奏效，具体的原因在我会在后面去分析。

在 react 中，如果想要改变 state 的状态，必须通过 setsState 这个函数去改变，并且这个函数可以接受两个参数，第一个就是你想要改变的对象，第二个是一个回调函数，你可以在里面基于改变后的 state 进行一些逻辑的处理。

## 未完待续...
