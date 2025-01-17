import React from 'react';
import { MessageSquare, Check } from 'lucide-react';
import type { Comment } from '../../lib/types/team';

interface CommentThreadProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
  onResolveComment: (commentId: string) => void;
}

export default function CommentThread({ comments, onAddComment, onResolveComment }: CommentThreadProps) {
  const [newComment, setNewComment] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <MessageSquare className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-medium">Comments</h2>
      </div>

      <div className="space-y-4 mb-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={`p-4 rounded-lg ${
              comment.resolved ? 'bg-gray-50' : 'bg-white border'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-900">{comment.text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
              {!comment.resolved && (
                <button
                  onClick={() => onResolveComment(comment.id)}
                  className="text-green-600 hover:text-green-700"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          rows={3}
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          Add Comment
        </button>
      </form>
    </div>
  );
}