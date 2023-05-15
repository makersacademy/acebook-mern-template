import React from 'react';

class Comment extends Component {
constructor() {
 super();
 this.state = {
  commentValue: "",
  commentLine: [{ commentId:"", text: "", }],
  };
}