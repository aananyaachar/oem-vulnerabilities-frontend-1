import React, { useState } from 'react';

const discussionThreads = [
  {
    id: 1,
    title: 'Mitigation strategies for CVE-2023-5678',
    comments: [
      {
        user: 'Alice',
        text: 'Updating to version 1.2.4 solved the issue for me!',
        upvotes: 3,
        downvotes: 1,
        timestamp: '2024-12-01 14:30',
      },
      {
        user: 'Bob',
        text: 'What about users on older hardware? Any alternatives?',
        upvotes: 5,
        downvotes: 0,
        timestamp: '2024-12-01 15:00',
      },
    ],
  },
  {
    id: 2,
    title: 'Critical vulnerability in Firewall X module Y',
    comments: [
      {
        user: 'Charlie',
        text: 'Has anyone tried patching this on Linux systems?',
        upvotes: 4,
        downvotes: 2,
        timestamp: '2024-12-01 12:00',
      },
      {
        user: 'Dave',
        text: 'The official OEM patch worked fine for me.',
        upvotes: 6,
        downvotes: 1,
        timestamp: '2024-12-01 13:45',
      },
    ],
  },
];

const DiscussionForumPage = () => {
  const [threads, setThreads] = useState(discussionThreads);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [selectedThread, setSelectedThread] = useState(null);
  const [newComment, setNewComment] = useState('');

  // Add a new thread
  const handleAddThread = () => {
    if (newThreadTitle.trim()) {
      const newThread = {
        id: threads.length + 1,
        title: newThreadTitle,
        comments: [],
      };
      setThreads([newThread, ...threads]); // Add new thread at the top
      setNewThreadTitle('');
    }
  };

  // Add a comment to a thread
  const handleAddComment = (threadId) => {
    if (newComment.trim()) {
      const updatedThreads = threads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              comments: [
                ...thread.comments,
                {
                  user: 'You',
                  text: newComment,
                  upvotes: 0,
                  downvotes: 0,
                  timestamp: new Date().toISOString(),
                },
              ],
            }
          : thread
      );

      setThreads(updatedThreads);
      setSelectedThread(
        updatedThreads.find((thread) => thread.id === threadId)
      ); // Update selectedThread to reflect changes
      setNewComment('');
    }
  };

  // Handle upvotes and downvotes
  const handleVote = (threadId, commentIndex, type) => {
    const updatedThreads = threads.map((thread) =>
      thread.id === threadId
        ? {
            ...thread,
            comments: thread.comments.map((comment, index) =>
              index === commentIndex
                ? {
                    ...comment,
                    upvotes: type === 'upvote' ? comment.upvotes + 1 : comment.upvotes,
                    downvotes:
                      type === 'downvote' ? comment.downvotes + 1 : comment.downvotes,
                  }
                : comment
            ),
          }
        : thread
    );

    setThreads(updatedThreads);
    if (selectedThread && selectedThread.id === threadId) {
      setSelectedThread(
        updatedThreads.find((thread) => thread.id === threadId)
      ); // Update selectedThread if active
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Discussion Forums</h1>
      {selectedThread ? (
        <div>
          <button
            className="text-blue-500 underline mb-4"
            onClick={() => setSelectedThread(null)}
          >
            Back to Threads
          </button>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {selectedThread.title}
          </h2>
          <div className="space-y-4">
            {selectedThread.comments.map((comment, index) => (
              <div key={index} className="bg-white p-4 shadow rounded relative">
                <p>
                  <span
                    className={`font-semibold ${
                      comment.user === 'You' ? 'text-blue-600' : 'text-gray-800'
                    }`}
                  >
                    {comment.user}:{' '}
                  </span>
                  {comment.text}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(comment.timestamp).toLocaleString()}
                </p>
                <div className="flex items-center space-x-4 mt-2 absolute right-4 top-4">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleVote(selectedThread.id, index, 'upvote')}
                  >
                    👍 {comment.upvotes}
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleVote(selectedThread.id, index, 'downvote')}
                  >
                    👎 {comment.downvotes}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <textarea
            className="w-full p-3 border rounded mt-4"
            placeholder="Add your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded mt-2"
            onClick={() => handleAddComment(selectedThread.id)}
          >
            Add Comment
          </button>
        </div>
      ) : (
        <div>
          <div className="space-y-4 mb-6">
            {threads.map((thread) => (
              <div
                key={thread.id}
                className="bg-white shadow p-6 rounded cursor-pointer hover:shadow-lg"
                onClick={() => setSelectedThread(thread)}
              >
                <h2 className="text-xl font-semibold text-gray-800">{thread.title}</h2>
                <p className="text-gray-600">
                  {thread.comments.length} comments • Last activity:{' '}
                  {thread.comments.length > 0
                    ? new Date(
                        thread.comments[thread.comments.length - 1].timestamp
                      ).toLocaleString()
                    : 'No comments yet'}
                </p>
              </div>
            ))}
          </div>
          <textarea
            className="w-full p-3 border rounded"
            placeholder="Start a new thread..."
            value={newThreadTitle}
            onChange={(e) => setNewThreadTitle(e.target.value)}
          />
          <button
            className="bg-green-600 text-white py-2 px-4 rounded mt-2"
            onClick={handleAddThread}
          >
            Add Thread
          </button>
        </div>
      )}
    </div>
  );
};

export default DiscussionForumPage;
