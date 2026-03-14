import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import BackButton from '../components/BackButton';
import './Profile.css';

const DEFAULT_AVATAR = '/charIcons/smashball.png';

const icons = [
  { name: 'Mario',          src: '/charIcons/mario.webp' },
  { name: 'Luigi',          src: '/charIcons/luigi.webp' },
  { name: 'Donkey Kong',    src: '/charIcons/donkeykong.webp' },
  { name: 'Link',           src: '/charIcons/link.webp' },
  { name: 'Samus',          src: '/charIcons/samus.webp' },
  { name: 'Captain Falcon', src: '/charIcons/captainfalcon.webp' },
  { name: 'Ness',           src: '/charIcons/ness.webp' },
  { name: 'Yoshi',          src: '/charIcons/yoshi.webp' },
  { name: 'Kirby',          src: '/charIcons/kirby.webp' },
  { name: 'Fox',            src: '/charIcons/fox.webp' },
  { name: 'Pikachu',        src: '/charIcons/pikachu.webp' },
  { name: 'Jigglypuff',     src: '/charIcons/jigglypuff.webp' },
  { name: 'Smash Ball',     src: '/charIcons/smashball.png' },
];

async function upsertProfile(userId, username, avatar) {
  await supabase.from('profiles').upsert({ id: userId, username, avatar });
}

// ── Own profile ──────────────────────────────────────────────────────────────

function OwnProfile({ user, signOut }) {
  const navigate = useNavigate();

  const currentAvatar = user.user_metadata?.avatar ?? DEFAULT_AVATAR;

  const [username, setUsername] = useState(user.user_metadata?.username ?? '');
  const [usernameMsg, setUsernameMsg] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [usernameLoading, setUsernameLoading] = useState(false);

  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);
  const [showIconPicker, setShowIconPicker] = useState(false);

  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [totalKudos, setTotalKudos] = useState(0);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchComments();
    upsertProfile(user.id, user.user_metadata?.username, currentAvatar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchComments() {
    const { data: commentData } = await supabase
      .from('comments')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    const comments = commentData ?? [];
    setComments(comments);

    if (comments.length > 0) {
      const ids = comments.map(c => c.id);
      const { count } = await supabase
        .from('kudos')
        .select('*', { count: 'exact', head: true })
        .in('comment_id', ids);
      setTotalKudos(count ?? 0);
    } else {
      setTotalKudos(0);
    }
    setCommentsLoading(false);
  }

  async function handleUsernameChange(e) {
    e.preventDefault();
    setUsernameMsg(null);
    setUsernameError(null);
    if (!username.trim()) { setUsernameError('Username cannot be empty.'); return; }
    setUsernameLoading(true);
    const { error } = await supabase.auth.updateUser({ data: { username: username.trim() } });
    if (error) {
      setUsernameError(error.message);
    } else {
      setUsernameMsg('Username updated.');
      upsertProfile(user.id, username.trim(), selectedAvatar);
    }
    setUsernameLoading(false);
  }

  async function handleAvatarSelect(src) {
    setSelectedAvatar(src);
    await supabase.auth.updateUser({ data: { avatar: src } });
    upsertProfile(user.id, user.user_metadata?.username, src);
  }

  async function handleDeleteAccount() {
    setDeleteLoading(true);
    await supabase.rpc('delete_user');
    await signOut();
    navigate('/');
  }

  async function handleDeleteComment(id) {
    await supabase.from('comments').delete().eq('id', id);
    setComments(prev => prev.filter(c => c.id !== id));
  }

  function pageLabel(comment) {
    if (comment.page_type === 'item') return 'Items';
    return `${comment.page_type.charAt(0).toUpperCase() + comment.page_type.slice(1)}: ${comment.page_id}`;
  }

  function timeAgo(dateStr) {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-top-bar">
        <h1 className="profile-title">Profile</h1>
        <BackButton />
      </div>

      <div className="profile-identity">
        <img src={selectedAvatar} alt="avatar" className="profile-avatar"
          style={selectedAvatar.endsWith('smashball.png') ? { backgroundColor: '#fff' } : {}} />
        <div>
          <div className="profile-display-name">{username || user.email}</div>
          <div className="profile-email">{user.email}</div>
          <div className="profile-kudos-total">★ {totalKudos} kudos received</div>
        </div>
      </div>

      <section className="profile-section">
        <button className="profile-btn" onClick={() => setShowIconPicker(v => !v)}>
          {showIconPicker ? 'Cancel' : 'Change Profile Picture'}
        </button>
        {showIconPicker && (
          <>
            <h2 className="profile-section-title" style={{ marginTop: '1rem' }}>Choose your icon!!!</h2>
            <div className="profile-icon-grid">
              {icons.map(icon => (
                <button key={icon.src}
                  className={`profile-icon-btn${selectedAvatar === icon.src ? ' profile-icon-btn--active' : ''}`}
                  onClick={() => handleAvatarSelect(icon.src)} title={icon.name}>
                  <img src={icon.src} alt={icon.name} className="profile-icon-img" />
                  <span className="profile-icon-name">{icon.name}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </section>

      <section className="profile-section">
        <h2 className="profile-section-title">Change Username</h2>
        <form className="profile-username-form" onSubmit={handleUsernameChange}>
          <input className="profile-input" type="text" value={username}
            onChange={e => setUsername(e.target.value)} maxLength={32} placeholder="New username" />
          <button className="profile-btn" type="submit" disabled={usernameLoading}>
            {usernameLoading ? 'Saving…' : 'Save'}
          </button>
        </form>
        {usernameMsg && <p className="profile-success">{usernameMsg}</p>}
        {usernameError && <p className="profile-error">{usernameError}</p>}
      </section>

      <section className="profile-section">
        <h2 className="profile-section-title">Comment History</h2>
        {commentsLoading ? (
          <p className="profile-empty">Loading…</p>
        ) : comments.length === 0 ? (
          <p className="profile-empty">You haven't posted any comments yet.</p>
        ) : (
          <div className="profile-comments">
            {comments.map(comment => (
              <div key={comment.id} className="profile-comment">
                <div className="profile-comment-meta">
                  <span className="profile-comment-page">{pageLabel(comment)}</span>
                  <span className="profile-comment-time">{timeAgo(comment.created_at)}</span>
                  <button className="profile-comment-delete" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                </div>
                <p className="profile-comment-body">{comment.body}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="profile-section profile-section--danger">
        <h2 className="profile-section-title profile-section-title--danger">Danger Zone</h2>
        {!confirmDelete ? (
          <button className="profile-btn profile-btn--danger" onClick={() => setConfirmDelete(true)}>
            Delete Account
          </button>
        ) : (
          <div className="profile-delete-confirm">
            <p className="profile-delete-warning">
              This will permanently delete your account and all your comments. This cannot be undone.
            </p>
            <div className="profile-delete-actions">
              <button className="profile-btn profile-btn--danger" onClick={handleDeleteAccount} disabled={deleteLoading}>
                {deleteLoading ? 'Deleting…' : 'Yes, delete my account'}
              </button>
              <button className="profile-btn" onClick={() => setConfirmDelete(false)}>Cancel</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

// ── Public profile ────────────────────────────────────────────────────────────

function PublicProfile({ userId }) {
  const [profile, setProfile] = useState(null);
  const [comments, setComments] = useState([]);
  const [totalKudos, setTotalKudos] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      setProfile(profileData);

      const { data: commentData } = await supabase
        .from('comments')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      const comments = commentData ?? [];
      setComments(comments);

      if (comments.length > 0) {
        const ids = comments.map(c => c.id);
        const { count } = await supabase
          .from('kudos')
          .select('*', { count: 'exact', head: true })
          .in('comment_id', ids);
        setTotalKudos(count ?? 0);
      }

      setLoading(false);
    }
    load();
  }, [userId]);

  function pageLabel(comment) {
    if (comment.page_type === 'item') return 'Items';
    return `${comment.page_type.charAt(0).toUpperCase() + comment.page_type.slice(1)}: ${comment.page_id}`;
  }

  function timeAgo(dateStr) {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  if (loading) return <div className="profile-wrapper"><p className="profile-empty">Loading…</p></div>;
  if (!profile) return <div className="profile-wrapper"><p className="profile-empty">User not found.</p></div>;

  const avatar = profile.avatar ?? DEFAULT_AVATAR;

  return (
    <div className="profile-wrapper">
      <div className="profile-top-bar">
        <h1 className="profile-title">Profile</h1>
        <BackButton />
      </div>

      <div className="profile-identity">
        <img src={avatar} alt="avatar" className="profile-avatar"
          style={avatar.endsWith('smashball.png') ? { backgroundColor: '#fff' } : {}} />
        <div>
          <div className="profile-display-name">{profile.username ?? 'Unknown'}</div>
          <div className="profile-kudos-total">★ {totalKudos} kudos received</div>
        </div>
      </div>

      <section className="profile-section">
        <h2 className="profile-section-title">Comment History</h2>
        {comments.length === 0 ? (
          <p className="profile-empty">No comments yet.</p>
        ) : (
          <div className="profile-comments">
            {comments.map(comment => (
              <div key={comment.id} className="profile-comment">
                <div className="profile-comment-meta">
                  <span className="profile-comment-page">{pageLabel(comment)}</span>
                  <span className="profile-comment-time">{timeAgo(comment.created_at)}</span>
                </div>
                <p className="profile-comment-body">{comment.body}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// ── Router ────────────────────────────────────────────────────────────────────

function Profile() {
  const { user, signOut } = useAuth();
  const { userId } = useParams();
  const navigate = useNavigate();

  // Viewing own profile via /profile
  if (!userId) {
    if (!user) { navigate('/'); return null; }
    return <OwnProfile user={user} signOut={signOut} />;
  }

  // Viewing own profile via /profile/:ownId
  if (user && userId === user.id) {
    return <OwnProfile user={user} signOut={signOut} />;
  }

  return <PublicProfile userId={userId} />;
}

export default Profile;
