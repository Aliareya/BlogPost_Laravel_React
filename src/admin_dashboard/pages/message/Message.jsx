import React, { useState } from 'react';

// Page Header Component
const PageHeader = () => {
  return (
    <div className="mb-8">
      <div className="mb-2 text-sm text-gray-600 font-medium">Dashboard</div>
      <h1 className="text-3xl font-serif font-bold text-gray-900">Messages</h1>
    </div>
  );
};

// Table Header Component
const TableHeader = () => {
  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600">
      <div className="col-span-4">From</div>
      <div className="col-span-3">Subject</div>
      <div className="col-span-2">Date</div>
      <div className="col-span-2">Status</div>
      <div className="col-span-1 text-right">Actions</div>
    </div>
  );
};

// Message Row Component
const MessageRow = ({ message, onView, onDelete }) => {
  return (
    <div className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors ${
      message.status === 'New' ? 'bg-orange-50/30' : ''
    }`}>
      <div className="col-span-4">
        <div className="font-medium text-gray-900">{message.from}</div>
        <div className="text-sm text-gray-500">{message.email}</div>
      </div>
      <div className="col-span-3">
        <span className="text-gray-700">{message.subject}</span>
      </div>
      <div className="col-span-2 text-sm text-gray-600">
        {message.date}
      </div>
      <div className="col-span-2">
        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
          message.status === 'New' ? 'bg-orange-100 text-orange-700' :
          message.status === 'Read' ? 'bg-gray-100 text-gray-700' :
          'bg-blue-100 text-blue-700'
        }`}>
          {message.status}
        </span>
      </div>
      <div className="col-span-1 flex items-center justify-end gap-2">
        <button
          onClick={() => onView(message)}
          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
          title="View"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(message.id)}
          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
          title="Delete"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Message Modal Component
const MessageModal = ({ message, onClose, onMarkAsRead, onDelete }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
          <div>
            <h3 className="text-xl font-serif font-bold text-gray-900">Message Details</h3>
            <p className="text-sm text-gray-500 mt-1">Received on {message.date}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* From Section */}
          <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-semibold text-lg">
                {message.from.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{message.from}</div>
              <div className="text-sm text-gray-500">{message.email}</div>
              <div className="text-sm text-gray-400 mt-1">to: admin@inkwell.blog</div>
            </div>
          </div>

          {/* Subject */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{message.subject}</h4>
          </div>

          {/* Message Body */}
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {message.message}
            </p>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Status:</span>
            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
              message.status === 'New' ? 'bg-orange-100 text-orange-700' :
              message.status === 'Read' ? 'bg-gray-100 text-gray-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {message.status}
            </span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl sticky bottom-0">
          <button
            onClick={() => { onDelete(message.id); onClose(); }}
            className="px-6 py-2.5 border border-red-300 text-red-600 rounded-full font-medium hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
          {message.status === 'New' && (
            <button
              onClick={() => { onMarkAsRead(message.id); onClose(); }}
              className="px-6 py-2.5 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
            >
              Mark as Read
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Messages Table Component
const MessagesTable = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'Alireza Ebrahimi',
      email: 'alirezaarya456@gmail.com',
      subject: 'this is test',
      message: 'Hello,\n\nThis is a test message from the contact form. I wanted to reach out regarding your recent blog post about minimalist design. I found it very insightful and would love to collaborate with you on a future project.\n\nLooking forward to hearing from you.\n\nBest regards,\nAlireza',
      date: 'Apr 15, 2026',
      status: 'New'
    },
    {
      id: 2,
      from: 'Sarah Johnson',
      email: 'sarah.j@designstudio.com',
      subject: 'Collaboration Opportunity',
      message: 'Hi there,\n\nI run a design studio and would love to discuss a potential collaboration opportunity. Your content aligns perfectly with our values.\n\nWould you be available for a quick call next week?\n\nCheers,\nSarah',
      date: 'Apr 14, 2026',
      status: 'Read'
    },
    {
      id: 3,
      from: 'Michael Chen',
      email: 'mchen@techblog.io',
      subject: 'Guest Post Inquiry',
      message: 'Hello Inkwell Team,\n\nI would like to submit a guest post about emerging design trends in 2026. Please let me know your guidelines and submission process.\n\nThank you,\nMichael',
      date: 'Apr 13, 2026',
      status: 'Replied'
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleView = (message) => {
    setSelectedMessage(message);
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
  };

  const handleDelete = (id) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  const handleMarkAsRead = (id) => {
    setMessages(messages.map(m =>
      m.id === id ? { ...m, status: 'Read' } : m
    ));
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <TableHeader />
        <div className="divide-y divide-gray-100">
          {messages.map((message) => (
            <MessageRow
              key={message.id}
              message={message}
              onView={handleView}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {selectedMessage && (
        <MessageModal
          message={selectedMessage}
          onClose={handleCloseModal}
          onMarkAsRead={handleMarkAsRead}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

// Main Messages Component
const Messages = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="ml-64">
        <div className="p-8">
          <PageHeader />
          <MessagesTable />
        </div>
      </main>
    </div>
  );
};

export default Messages;