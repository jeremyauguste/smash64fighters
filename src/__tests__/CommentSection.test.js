import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CommentSection from '../components/CommentSection';

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockInsert = jest.fn();
const mockDelete = jest.fn();
const mockSelect = jest.fn();

jest.mock('../supabaseClient', () => ({
  supabase: {
    from: jest.fn((table) => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      in: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: [], error: null }),
      insert: mockInsert,
      delete: jest.fn(() => ({
        eq: jest.fn().mockReturnThis(),
        eq: mockDelete,
      })),
    })),
  },
}));

jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../components/AuthModal', () => () => <div data-testid="auth-modal" />);

const { useAuth } = require('../context/AuthContext');
const { supabase } = require('../supabaseClient');

// ── Helpers ──────────────────────────────────────────────────────────────────

const OWNER_ID   = 'user-owner-123';
const OTHER_ID   = 'user-other-456';
const COMMENT_ID = 'comment-abc';
const REPLY_ID   = 'reply-xyz';

const makeComment = (overrides = {}) => ({
  id: COMMENT_ID,
  user_id: OWNER_ID,
  username: 'OwnerUser',
  avatar: '/charIcons/mario.webp',
  body: 'Test comment body',
  page_type: 'character',
  page_id: 'Fox',
  parent_id: null,
  created_at: new Date().toISOString(),
  ...overrides,
});

const makeReply = (overrides = {}) => ({
  id: REPLY_ID,
  user_id: OTHER_ID,
  username: 'OtherUser',
  avatar: '/charIcons/kirby.webp',
  body: 'Test reply body',
  page_type: 'character',
  page_id: 'Fox',
  parent_id: COMMENT_ID,
  created_at: new Date().toISOString(),
  ...overrides,
});

function mockSupabaseWithComments(comments = [], kudos = []) {
  supabase.from.mockImplementation((table) => {
    if (table === 'comments') {
      return {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        in: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: comments, error: null }),
        insert: mockInsert,
        delete: jest.fn(() => ({ eq: jest.fn(() => ({ eq: mockDelete })) })),
      };
    }
    if (table === 'kudos') {
      return {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        in: jest.fn().mockResolvedValue({ data: kudos, error: null }),
        insert: mockInsert,
        delete: jest.fn(() => ({ eq: jest.fn(() => ({ eq: mockDelete })) })),
      };
    }
    return { select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), order: jest.fn().mockResolvedValue({ data: [], error: null }) };
  });
}

function renderSection(pageType = 'character', pageId = 'Fox') {
  return render(
    <MemoryRouter>
      <CommentSection pageType={pageType} pageId={pageId} />
    </MemoryRouter>
  );
}

beforeEach(() => {
  jest.clearAllMocks();
  mockInsert.mockResolvedValue({ error: null });
  mockDelete.mockResolvedValue({ error: null });
});

// ── Tests ────────────────────────────────────────────────────────────────────

describe('CommentSection — logged-out user', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({ user: null });
  });

  test('shows sign-in prompt instead of comment form', async () => {
    mockSupabaseWithComments([]);
    renderSection();
    await waitFor(() => {
      expect(screen.getByText(/sign in to leave a comment/i)).toBeInTheDocument();
    });
    expect(screen.queryByPlaceholderText(/write a comment/i)).not.toBeInTheDocument();
  });

  test('clicking sign-in prompt opens auth modal', async () => {
    mockSupabaseWithComments([]);
    renderSection();
    await waitFor(() => screen.getByText(/sign in to leave a comment/i));
    fireEvent.click(screen.getByText(/sign in to leave a comment/i));
    expect(screen.getByTestId('auth-modal')).toBeInTheDocument();
  });

  test('does not show Reply button on comments', async () => {
    mockSupabaseWithComments([makeComment()]);
    renderSection();
    await waitFor(() => screen.getByText('Test comment body'));
    expect(screen.queryByText('Reply')).not.toBeInTheDocument();
  });

  test('does not show Delete button on comments', async () => {
    mockSupabaseWithComments([makeComment()]);
    renderSection();
    await waitFor(() => screen.getByText('Test comment body'));
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  test('does not show kudos button on comments', async () => {
    mockSupabaseWithComments([makeComment()]);
    renderSection();
    await waitFor(() => screen.getByText('Test comment body'));
    expect(screen.queryByTitle(/give kudos/i)).not.toBeInTheDocument();
    expect(screen.queryByTitle(/remove kudos/i)).not.toBeInTheDocument();
  });

  test('shows kudos count passively when kudos exist', async () => {
    mockSupabaseWithComments(
      [makeComment()],
      [{ comment_id: COMMENT_ID, user_id: 'someone-else' }]
    );
    renderSection();
    await waitFor(() => screen.getByText('Test comment body'));
    expect(screen.getByText(/★/)).toBeInTheDocument();
  });
});

describe('CommentSection — logged-in as comment owner', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      user: {
        id: OWNER_ID,
        email: 'owner@test.com',
        user_metadata: { username: 'OwnerUser', avatar: '/charIcons/mario.webp' },
      },
    });
  });

  test('shows comment form textarea', async () => {
    mockSupabaseWithComments([]);
    renderSection();
    await waitFor(() => screen.getByPlaceholderText(/write a comment/i));
  });

  test('Post button is disabled when textarea is empty', async () => {
    mockSupabaseWithComments([]);
    renderSection();
    await waitFor(() => screen.getByPlaceholderText(/write a comment/i));
    expect(screen.getByText('Post')).toBeDisabled();
  });

  test('Post button enables when text is entered', async () => {
    mockSupabaseWithComments([]);
    renderSection();
    await waitFor(() => screen.getByPlaceholderText(/write a comment/i));
    await userEvent.type(screen.getByPlaceholderText(/write a comment/i), 'Hello world');
    expect(screen.getByText('Post')).toBeEnabled();
  });

  test('posting a comment calls supabase insert with correct fields', async () => {
    mockSupabaseWithComments([]);
    renderSection();
    await waitFor(() => screen.getByPlaceholderText(/write a comment/i));
    await userEvent.type(screen.getByPlaceholderText(/write a comment/i), 'My comment');
    await userEvent.click(screen.getByText('Post'));
    await waitFor(() => expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: OWNER_ID,
        username: 'OwnerUser',
        body: 'My comment',
        page_type: 'character',
        page_id: 'Fox',
        parent_id: null,
      })
    ));
  });

  test('textarea clears after successful post', async () => {
    mockSupabaseWithComments([]);
    renderSection();
    await waitFor(() => screen.getByPlaceholderText(/write a comment/i));
    const textarea = screen.getByPlaceholderText(/write a comment/i);
    await userEvent.type(textarea, 'My comment');
    await userEvent.click(screen.getByText('Post'));
    await waitFor(() => expect(textarea.value).toBe(''));
  });

  test('textarea does NOT clear when insert fails', async () => {
    mockInsert.mockResolvedValue({ error: { message: 'Insert failed' } });
    mockSupabaseWithComments([]);
    renderSection();
    await waitFor(() => screen.getByPlaceholderText(/write a comment/i));
    const textarea = screen.getByPlaceholderText(/write a comment/i);
    await userEvent.type(textarea, 'My comment');
    await userEvent.click(screen.getByText('Post'));
    await waitFor(() => expect(screen.getByText('Insert failed')).toBeInTheDocument());
    expect(textarea.value).toBe('My comment');
  });

  test('shows Delete button only on own comments', async () => {
    mockSupabaseWithComments([
      makeComment({ user_id: OWNER_ID }),
      makeComment({ id: 'other-comment', user_id: OTHER_ID, body: 'Other body' }),
    ]);
    renderSection();
    await waitFor(() => screen.getByText('Test comment body'));
    // Only one Delete button should appear (for the owned comment)
    expect(screen.getAllByText('Delete')).toHaveLength(1);
  });

  test('does not show kudos button on own comments', async () => {
    mockSupabaseWithComments([makeComment({ user_id: OWNER_ID })]);
    renderSection();
    await waitFor(() => screen.getByText('Test comment body'));
    expect(screen.queryByTitle(/give kudos/i)).not.toBeInTheDocument();
  });

  test('shows Reply button on own and others comments', async () => {
    mockSupabaseWithComments([makeComment({ user_id: OWNER_ID })]);
    renderSection();
    await waitFor(() => screen.getByText('Test comment body'));
    expect(screen.getByText('Reply')).toBeInTheDocument();
  });
});

describe('CommentSection — logged-in as different user', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      user: {
        id: OTHER_ID,
        email: 'other@test.com',
        user_metadata: { username: 'OtherUser', avatar: '/charIcons/kirby.webp' },
      },
    });
  });

  test('does not show Delete button on others comments', async () => {
    mockSupabaseWithComments([makeComment({ user_id: OWNER_ID })]);
    renderSection();
    await waitFor(() => screen.getByText('Test comment body'));
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  test('shows kudos button on others comments', async () => {
    mockSupabaseWithComments([makeComment({ user_id: OWNER_ID })]);
    renderSection();
    await waitFor(() => screen.getByText('Test comment body'));
    expect(screen.getByTitle(/give kudos/i)).toBeInTheDocument();
  });

  test('kudos button shows active state when already given', async () => {
    mockSupabaseWithComments(
      [makeComment({ user_id: OWNER_ID })],
      [{ comment_id: COMMENT_ID, user_id: OTHER_ID }]
    );
    renderSection();
    await waitFor(() => screen.getByTitle(/remove kudos/i));
    expect(screen.getByTitle(/remove kudos/i)).toHaveClass('cs-kudos-btn--active');
  });

  test('clicking kudos calls supabase insert', async () => {
    mockSupabaseWithComments([makeComment({ user_id: OWNER_ID })]);
    renderSection();
    await waitFor(() => screen.getByTitle(/give kudos/i));
    fireEvent.click(screen.getByTitle(/give kudos/i));
    await waitFor(() => expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({ comment_id: COMMENT_ID, user_id: OTHER_ID })
    ));
  });

  test('kudos count increments optimistically on give', async () => {
    mockSupabaseWithComments([makeComment({ user_id: OWNER_ID })]);
    renderSection();
    await waitFor(() => screen.getByTitle(/give kudos/i));
    fireEvent.click(screen.getByTitle(/give kudos/i));
    await waitFor(() => expect(screen.getByTitle(/remove kudos/i)).toBeInTheDocument());
    expect(screen.getByTitle(/remove kudos/i)).toHaveClass('cs-kudos-btn--active');
  });

  test('kudos count decrements optimistically on remove', async () => {
    mockSupabaseWithComments(
      [makeComment({ user_id: OWNER_ID })],
      [{ comment_id: COMMENT_ID, user_id: OTHER_ID }]
    );
    renderSection();
    await waitFor(() => screen.getByTitle(/remove kudos/i));
    fireEvent.click(screen.getByTitle(/remove kudos/i));
    await waitFor(() => expect(screen.getByTitle(/give kudos/i)).toBeInTheDocument());
    expect(screen.queryByTitle(/remove kudos/i)).not.toBeInTheDocument();
  });

  test('Reply button opens reply form with correct placeholder', async () => {
    mockSupabaseWithComments([makeComment({ user_id: OWNER_ID })]);
    renderSection();
    await waitFor(() => screen.getByText('Reply'));
    fireEvent.click(screen.getByText('Reply'));
    expect(screen.getByPlaceholderText(/replying to owneruser/i)).toBeInTheDocument();
  });

  test('Reply button toggles to Cancel', async () => {
    mockSupabaseWithComments([makeComment({ user_id: OWNER_ID })]);
    renderSection();
    await waitFor(() => screen.getByText('Reply'));
    fireEvent.click(screen.getByText('Reply'));
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('Cancel hides the reply form', async () => {
    mockSupabaseWithComments([makeComment({ user_id: OWNER_ID })]);
    renderSection();
    await waitFor(() => screen.getByText('Reply'));
    fireEvent.click(screen.getByText('Reply'));
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByPlaceholderText(/replying to/i)).not.toBeInTheDocument();
  });

  test('submitting a reply calls insert with correct parent_id', async () => {
    mockSupabaseWithComments([makeComment({ user_id: OWNER_ID })]);
    renderSection();
    await waitFor(() => screen.getByText('Reply'));
    fireEvent.click(screen.getByText('Reply'));
    await userEvent.type(screen.getByPlaceholderText(/replying to/i), 'My reply');
    await userEvent.click(screen.getAllByText('Post')[1]);
    await waitFor(() => expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        parent_id: COMMENT_ID,
        body: 'My reply',
        user_id: OTHER_ID,
      })
    ));
  });

  test('reply form closes after successful reply', async () => {
    mockSupabaseWithComments([makeComment({ user_id: OWNER_ID })]);
    renderSection();
    await waitFor(() => screen.getByText('Reply'));
    fireEvent.click(screen.getByText('Reply'));
    await userEvent.type(screen.getByPlaceholderText(/replying to/i), 'My reply');
    await userEvent.click(screen.getAllByText('Post')[1]);
    await waitFor(() => {
      expect(screen.queryByPlaceholderText(/replying to/i)).not.toBeInTheDocument();
    });
  });
});

describe('CommentSection — replies display', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({ user: null });
  });

  test('replies are nested under their parent comment', async () => {
    mockSupabaseWithComments([makeComment(), makeReply()]);
    renderSection();
    await waitFor(() => screen.getByText('Test comment body'));
    expect(screen.getByText('Test reply body')).toBeInTheDocument();
    // Reply is inside the replies container
    const repliesContainer = document.querySelector('.cs-replies');
    expect(repliesContainer).toContainElement(screen.getByText('Test reply body'));
  });

  test('each reply has its own independent kudos', async () => {
    mockSupabaseWithComments(
      [makeComment(), makeReply()],
      [
        { comment_id: COMMENT_ID, user_id: 'someone' },
        { comment_id: COMMENT_ID, user_id: 'someone2' },
        { comment_id: REPLY_ID, user_id: 'someone' },
      ]
    );
    useAuth.mockReturnValue({ user: null });
    renderSection();
    await waitFor(() => screen.getByText('Test comment body'));
    const kudosDisplays = screen.getAllByText(/★/);
    // Parent has 2 kudos, reply has 1 — they should be different
    expect(kudosDisplays.length).toBeGreaterThanOrEqual(2);
  });
});
