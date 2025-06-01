import React from 'react';

export default function ProfileCard({
  user,
  editMode,
  updateField,
  toggleInterest,
  onAvatarClick,
  onRandomizeClick,
  onToggleEdit,
}) {
  return (
    <div className="bg-white rounded-xl shadow-xl p-8 max-w-xl w-full">
      {/* Avatar and regenerate button */}
      <div className="flex items-center justify-between mb-6">
        <img
          src={user.avatar}
          alt="User avatar"
          className="rounded-full w-32 h-32 border-4 border-indigo-500 cursor-pointer hover:opacity-80"
          title="Click to randomize avatar"
          onClick={onAvatarClick}
        />
        <button
          onClick={onRandomizeClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
        >
          Randomize All
        </button>
      </div>

      {/* Name and nickname */}
      <div className="mb-4">
        {editMode ? (
          <>
            <input
              type="text"
              value={user.fullName}
              onChange={e => updateField('fullName', e.target.value)}
              className="w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500 mb-2 text-2xl font-bold"
              placeholder="Full Name"
            />
            <input
              type="text"
              value={user.nickname}
              onChange={e => updateField('nickname', e.target.value)}
              className="w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500 italic text-gray-600"
              placeholder="Nickname"
            />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold">{user.fullName}</h1>
            <p className="italic text-indigo-600">@{user.nickname}</p>
          </>
        )}
      </div>

      {/* About Me */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">About Me</h2>
        {editMode ? (
          <textarea
            value={user.about}
            onChange={e => updateField('about', e.target.value)}
            rows={4}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        ) : (
          <p className="text-gray-700 whitespace-pre-line">{user.about}</p>
        )}
      </div>

      {/* Interests */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Interests</h2>
        {editMode ? (
          <div className="flex flex-wrap gap-2">
            {[
              'Music',
              'Travel',
              'Sports',
              'Reading',
              'Cooking',
              'Gaming',
              'Photography',
              'Fitness',
              'Art',
              'Technology',
            ].map(interest => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-3 py-1 rounded-full border ${
                  user.interests.includes(interest)
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-gray-200 border-gray-300'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        ) : (
          <ul className="list-disc list-inside text-gray-700">
            {user.interests.map((interest, i) => (
              <li key={i}>{interest}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Achievements */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Achievements</h2>
        <ul className="list-disc list-inside text-gray-700">
          {user.achievements.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </div>

      {/* Contact Info */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        {editMode ? (
          <>
            <input
              type="email"
              value={user.email}
              onChange={e => updateField('email', e.target.value)}
              placeholder="Email"
              className="w-full mb-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="tel"
              value={user.phone}
              onChange={e => updateField('phone', e.target.value)}
              placeholder="Phone"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </>
        ) : (
          <p className="text-gray-700">
            📧 {user.email} <br />
            📞 {user.phone}
          </p>
        )}
      </div>

      {/* Edit Mode Toggle */}
      <button
        onClick={onToggleEdit}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded"
      >
        {editMode ? 'Save Profile' : 'Edit Profile'}
      </button>
    </div>
  );
}
