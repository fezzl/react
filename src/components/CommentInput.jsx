import React,{Component} from 'react'

export default class CommentInput extends Component {
  state = {
    username: '',
    content: ''
  }

  componentWillMount() {
    this._getUsername();
  }

  componentDidMount() {
    this.textarea.focus();
  }

  changeUsername = (e) => {
    const username = e.target.value;
    this.setState({username});
  }

  changeContent = (e) => {
    const content = e.target.value;
    this.setState({content});
  }

  submit = () => {
    const {username,content} = this.state;
    if(this.props.onSubmit) {
      this.props.onSubmit(
        {
          username,
          content,
          createdTime: +new Date()
        }
      );
      this.setState({content: ''});
    }
  }

  blurUsernma = (e) => {
    const username = e.target.value;
    this._saveUsername(username);
  }

  _saveUsername(name) {
    localStorage.setItem('username',name);
  }

  _getUsername(){
    const name = localStorage.getItem('username');
    if(name) {
      this.setState({username:name});
    }
  }

  render(){
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input 
            value={this.state.username} 
            onChange={this.changeUsername}
            onBlur={this.blurUsernma}
            />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea 
            value={this.state.content} 
            onChange={this.changeContent}
            ref={textarea => this.textarea = textarea}
            />
          </div>
        </div>
        <div className='comment-field-button'>
          <button onClick={this.submit}>
            发布
          </button>
        </div>
      </div>
    )
  }
}