import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import './CommentSection.css';

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function CommentForm({ onSubmit, placeholder = 'Write a comment…', autoFocus = false }) {
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!body.trim()) return;
    setLoading(true);
    setError(null);
    const err = await onSubmit(body.trim());
    if (err) {
      setError(err.message);
    } else {
      setBody('');
    }
    setLoading(false);
  }

  return (
    <form className="cs-form" onSubmit={handleSubmit}>
      <textarea
        className="cs-textarea"
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder={placeholder}
        maxLength={1000}
        autoFocus={autoFocus}
        rows={3}
      />
      <div className="cs-form-footer">
        <span className="cs-char-count">{body.length}/1000</span>
        <button className="cs-submit-btn" type="submit" disabled={loading || !body.trim()}>
          {loading ? 'Posting…' : 'Post'}
        </button>
      </div>
      {error && <p className="cs-post-error">{error}</p>}
    </form>
  );
}

function Comment({ comment, allComments, onDelete, onReply, kudosMap, userKudosSet, onKudos }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const replies = allComments.filter(c => c.parent_id === comment.id);
  const isOwner = user?.id === comment.user_id;
  const kudosCount = kudosMap[comment.id] ?? 0;
  const userHasKudos = userKudosSet.has(comment.id);

  const avatar = comment.avatar ?? '/charIcons/smashball.png';

  function goToProfile() {
    navigate(`/profile/${comment.user_id}`);
  }

  return (
    <div className="cs-comment">
      <div className="cs-comment-header">
        <img
          src={avatar}
          alt={comment.username}
          className="cs-avatar cs-avatar--link"
          style={avatar.endsWith('smashball.png') ? { backgroundColor: '#fff' } : {}}
          onClick={goToProfile}
        />
        <span className="cs-username cs-username--link" onClick={goToProfile}>{comment.username}</span>
        <span className="cs-timestamp">{timeAgo(comment.created_at)}</span>
        {isOwner && (
          <button className="cs-delete-btn" onClick={() => onDelete(comment.id)}>Delete</button>
        )}
      </div>
      <p className="cs-body">{comment.body}</p>
      <div className="cs-comment-actions">
        {user && !isOwner && (
          <button
            className={`cs-kudos-btn${userHasKudos ? ' cs-kudos-btn--active' : ''}`}
            onClick={() => onKudos(comment.id, userHasKudos)}
            title={userHasKudos ? 'Remove kudos' : 'Give kudos'}
          >
            ★ {kudosCount > 0 ? kudosCount : ''}
          </button>
        )}
        {(!user || isOwner) && kudosCount > 0 && (
          <span className="cs-kudos-display">★ {kudosCount}</span>
        )}
        {user && (
          <button className="cs-reply-btn" onClick={() => setShowReplyForm(v => !v)}>
            {showReplyForm ? 'Cancel' : 'Reply'}
          </button>
        )}
      </div>
      {showReplyForm && (
        <CommentForm
          placeholder={`Replying to ${comment.username}…`}
          autoFocus
          onSubmit={async body => {
            await onReply(body, comment.id);
            setShowReplyForm(false);
          }}
        />
      )}
      {replies.length > 0 && (
        <div className="cs-replies">
          {replies.map(reply => (
            <Comment
              key={reply.id}
              comment={reply}
              allComments={allComments}
              onDelete={onDelete}
              onReply={onReply}
              kudosMap={kudosMap}
              userKudosSet={userKudosSet}
              onKudos={onKudos}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CommentSection({ pageType, pageId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [kudosMap, setKudosMap] = useState({});
  const [userKudosSet, setUserKudosSet] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    const { data: commentData } = await supabase
      .from('comments')
      .select('*')
      .eq('page_type', pageType)
      .eq('page_id', pageId)
      .order('created_at', { ascending: true });

    const comments = commentData ?? [];
    setComments(comments);

    if (comments.length > 0) {
      const ids = comments.map(c => c.id);
      const { data: kudosData } = await supabase
        .from('kudos')
        .select('comment_id, user_id')
        .in('comment_id', ids);

      const counts = {};
      const userSet = new Set();
      for (const k of kudosData ?? []) {
        counts[k.comment_id] = (counts[k.comment_id] ?? 0) + 1;
        if (user && k.user_id === user.id) userSet.add(k.comment_id);
      }
      setKudosMap(counts);
      setUserKudosSet(userSet);
    } else {
      setKudosMap({});
      setUserKudosSet(new Set());
    }

    setLoading(false);
  }, [pageType, pageId, user]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  async function handlePost(body, parentId = null) {
    if (!user) return null;
    const { error } = await supabase.from('comments').insert({
      user_id: user.id,
      username: user.user_metadata?.username ?? user.email,
      avatar: user.user_metadata?.avatar ?? '/charIcons/smashball.png',
      page_type: pageType,
      page_id: pageId,
      parent_id: parentId,
      body,
    });
    if (!error) fetchComments();
    return error;
  }

  async function handleDelete(id) {
    await supabase.from('comments').delete().eq('id', id);
    fetchComments();
  }

  async function handleKudos(commentId, alreadyGiven) {
    if (!user) return;
    if (alreadyGiven) {
      await supabase.from('kudos').delete()
        .eq('comment_id', commentId)
        .eq('user_id', user.id);
    } else {
      await supabase.from('kudos').insert({ comment_id: commentId, user_id: user.id });
    }
    // Optimistic update
    setKudosMap(prev => ({
      ...prev,
      [commentId]: (prev[commentId] ?? 0) + (alreadyGiven ? -1 : 1),
    }));
    setUserKudosSet(prev => {
      const next = new Set(prev);
      alreadyGiven ? next.delete(commentId) : next.add(commentId);
      return next;
    });
  }

  const topLevel = comments.filter(c => c.parent_id === null);

  return (
    <div className="cs-wrapper">
      <h2 className="cs-title">Comments</h2>

      {user ? (
        <CommentForm onSubmit={body => handlePost(body, null)} />
      ) : (
        <button className="cs-signin-prompt" onClick={() => setShowAuthModal(true)}>
          Sign in to leave a comment
        </button>
      )}

      {showAuthModal && createPortal(<AuthModal onClose={() => setShowAuthModal(false)} />, document.body)}

      <div className="cs-list">
        {loading ? (
          <p className="cs-empty">Loading…</p>
        ) : topLevel.length === 0 ? (
          <p className="cs-empty">No comments yet. Be the first!</p>
        ) : (
          topLevel.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              allComments={comments}
              onDelete={handleDelete}
              onReply={handlePost}
              kudosMap={kudosMap}
              userKudosSet={userKudosSet}
              onKudos={handleKudos}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection;
