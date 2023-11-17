
  import { Component } from '@angular/core';

interface Comment {
  id: number;
  text: string;
  replies?: Comment[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  comments: Comment[] = [];
  currentComment: string = '';
  editingCommentId: number | null = null;
  replyingCommentId: number | null = null;
  replyingSubcommentId: number | null = null;

  addComment() {
    if (this.currentComment) {
      const newComment: Comment = {
        id: this.comments.length + 1,
        text: this.currentComment,
        replies: []
      };
      this.comments.push(newComment);
      this.currentComment = '';
    }
  }

  editComment(comment: Comment) {
    this.currentComment = comment.text;
    this.editingCommentId = comment.id;
  }

  saveEdit() {
    if (this.editingCommentId !== null) {
      const editedComment = this.comments.find(comment => comment.id === this.editingCommentId);
      if (editedComment) {
        editedComment.text = this.currentComment;
        this.currentComment = '';
        this.editingCommentId = null;
      }
    }
  }

  cancelEdit() {
    this.currentComment = '';
    this.editingCommentId = null;
    this.replyingCommentId = null; // Cancel replying to comments as well
    this.replyingSubcommentId = null; // Cancel replying to subcomments as well
  }

  deleteComment(comment: Comment) {
    this.comments = this.comments.filter(c => c !== comment);
  }

  replyToComment(comment: Comment) {
    this.currentComment = '';
    this.replyingCommentId = comment.id;
    this.replyingSubcommentId = null; // Clear subcomment id when replying to a comment
  }

  addReply(comment: Comment) {
    if (this.currentComment) {
      comment.replies = comment.replies || [];
      
      const newReply: Comment = {
        id: comment.replies.length + 1,
        text: this.currentComment,
        replies: [] // Initialize subcomments array
      };
      comment.replies.push(newReply);
      this.currentComment = '';
      this.replyingCommentId = null;
    }
  }

  replyToSubcomment(subcomment: Comment) {
    this.currentComment = '';
    this.replyingSubcommentId = subcomment.id;
  }

  addSubcomment(comment: Comment) {
    if (this.currentComment && this.replyingSubcommentId !== null) {
      const parentComment = comment.replies?.find(subcomment => subcomment.id === this.replyingSubcommentId);
      if (parentComment) {
        parentComment.replies = parentComment.replies || [];
        
        const newSubcomment: Comment = {
          id: parentComment.replies.length + 1,
          text: this.currentComment
        };
        parentComment.replies.push(newSubcomment);
        this.currentComment = '';
        this.replyingSubcommentId = null;
      }
    }
  }
}

