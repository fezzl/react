import React,{Component} from 'react'

export default class Comment extends Component {
  state = {
    timeString: ''
  }
  componentWillMount() {
    this._updateTimeString();
    this.timer = setInterval(() => {
      this._updateTimeString();
    },5000)
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  _updateTimeString() {
    const {comment} = this.props;
    const duration = (+Date.now() - comment.createdTime) / 1000;
    // debugger
    this.setState({
      timeString: duration > 60
        ? `${Math.round(duration / 60)} 分钟前`
        : `${Math.round(Math.max(duration, 1))} 秒前`
    })
  }
  handleClick = () => {
    if(this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index);
    }
  }
  _getProcessedContent(content) {
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
 
  }
  render(){
    return (
      <div className="comment">
        <div className="comment-user">
          <span>{this.props.comment.username}:</span>
        </div>
        <p dangerouslySetInnerHTML={{
          __html: this._getProcessedContent(this.props.comment.content)
        }} />
        <span className='comment-createdtime'>
          {this.state.timeString}
        </span>
        <span className='comment-delete' onClick={this.handleClick}>
          删除
        </span>
      </div>
    )
  }
}
