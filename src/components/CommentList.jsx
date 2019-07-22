import React,{Component} from 'react'

import Comment from './Comment'

export default class CommentList extends Component {

  onDeleteComment = (index) => {
    if(this.props.onDeleteComment) {
      this.props.onDeleteComment(index);
    }
  }

  render(){
    return (
      <div>
        {
          this.props.comments.map(
            (comment,index) => <Comment 
                                comment={comment} 
                                key={index} 
                                index={index}
                                onDeleteComment={this.onDeleteComment}
                                />
          )
        }
      </div>
    )
  }
}
