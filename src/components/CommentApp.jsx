import React,{Component} from 'react'

import CommentList from './CommentList'
import CommentInput from './CommentInput'

export default class CommentApp extends Component{
  state = {
    comments: []
  }
  componentWillMount(){
    this._getComment();
  }

  _getComment() {
    let comments = localStorage.getItem('comments');
    if(comments) {
      comments = JSON.parse(comments);
      this.setState({comments});
    }
  }
  _setComment(comments) {
    localStorage.setItem('comments',JSON.stringify(comments));
  }

  handleSubmit = (comment) => {
    if(!comment.username) {
      return alert('用户名不为空')
    }
    if(!comment.content) {
      return alert('内容不为空')
    }
    if(!comment) {
      return 
    }
    const { comments } = this.state;
    comments.push(comment);
    this.setState({comments});
    this._setComment(comments);
  }
  onDeleteComment = (index) => {
    const {comments} = this.state;
    comments.splice(index,1);
    this.setState({comments});
    this._setComment(comments);
  }
  render() {
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.handleSubmit}/>
        <CommentList comments={this.state.comments} onDeleteComment={this.onDeleteComment}/>
      </div>
    )
  }
}
