import React, { Component } from "react";
import GitalkComponent from "./GitalkComment";

class Comment extends Component {
  state = {
    isShow: !this.props.lazyload
  }

  handleClick = () => {
    this.setState(prevState => ({
      isShow: !prevState.isShow
    }));
  }

  render() {
    const { extraClass, postNode, btnLoadComments } = this.props;

    return (
      <div className={`comment-container ${extraClass}`}>
        {!this.state.isShow && (
          <button className="btn-primary" onClick={this.handleClick}>
            {btnLoadComments}
          </button>
        )}

        {this.state.isShow && (
          <GitalkComponent />
        )}
      </div>
    )
  }
}

export default Comment;