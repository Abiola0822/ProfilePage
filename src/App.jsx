import React, { useState } from 'react';
import { faker } from '@faker-js/faker';

function generateUserData() {
  return {
    avatar: faker.image.avatar(),
    fullName: faker.person.fullName(),
    nickname: faker.internet.username(),
    about: faker.lorem.sentences(2),
    interests: faker.helpers.arrayElements(
      ['Music', 'Travel', 'Reading', 'Cooking', 'Photography', 'Fitness'],
      faker.number.int({ min: 6, max: 6 })
    ),
    achievements: [
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
    ],
    email: faker.internet.email(),
    phone: faker.phone.number(),
  };
}

export default function App() {
  const [user, setUser] = useState(generateUserData());
  const [editMode, setEditMode] = useState(false);

  const updateField = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest) => {
    const hasInterest = user.interests.includes(interest);
    const newInterests = hasInterest
      ? user.interests.filter(i => i !== interest)
      : [...user.interests, interest];
    setUser(prev => ({ ...prev, interests: newInterests }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-indigo-200 to-purple-500 p-6 flex items-center justify-center">
      <div className="bg-pink shadow-2xl rounded-3xl p-8 w-full max-w-3xl">
        <div className="flex flex-col items-center gap-4">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-md cursor-pointer hover:opacity-90"
            onClick={() => updateField('avatar', faker.image.avatar())}
            title="Click to change avatar"
          />

          <div className="text-center">
            {editMode ? (
              <>
                <input
                  type="text"
                  value={user.fullName}
                  onChange={e => updateField('fullName', e.target.value)}
                  className="text-2xl font-bold text-center border-b border-indigo-400 focus:outline-none mb-1"
                />
                <input
                  type="text"
                  value={user.nickname}
                  onChange={e => updateField('nickname', e.target.value)}
                  className="italic text-indigo-500 text-center border-b border-indigo-400 focus:outline-none"
                />
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold">{user.fullName}</h1>
                <p className="italic text-indigo-600">@{user.nickname}</p>
              </>
            )}
          </div>

          <div className="text-center">
            <h2 className="text-lg font-semibold">About Me</h2>
            {editMode ? (
              <textarea
                value={user.about}
                onChange={e => updateField('about', e.target.value)}
                rows={3}
                className="w-full mt-1 border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            ) : (
              <p className="text-gray-700">{user.about}</p>
            )}
          </div>

          <div className="w-full">
            <h2 className="text-center font-semibold mb-1">Interests</h2>
            {editMode ? (
              <div className="mb-1 text-center gap-2">
                {[
                  'Music', 'Travel', 'Sports', 'Reading', 'Cooking',
                  'Gaming', 'Photography', 'Fitness', 'Art', 'Tech'
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
              <div className=" gap-2">
                {user.interests.map((i, index) => (
                  <span key={index} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                    {i}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="w-full">
            <h2 className="text-center font-semibold mb-1">Achievements</h2>
            <ul className="list-disc list-inside text-gray-700 text-center">
              {user.achievements.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>

          <div className="w-full text-center">
            <h2 className="text-center font-semibold">Contact</h2>
            {editMode ? (
              <>
                <input
                  type="email"
                  value={user.email}
                  onChange={e => updateField('email', e.target.value)}
                  className="w-full mb-2 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <input
                  type="tel"
                  value={user.phone}
                  onChange={e => updateField('phone', e.target.value)}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </>
            ) : (
              <p className="text-gray-700">
                📧 {user.email} <br />
                📞 {user.phone}
              </p>
            )}
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setEditMode(!editMode)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full font-medium"
            >
              {editMode ? 'Save Profile' : 'Edit Profile'}
            </button>
            <button
              onClick={() => setUser(generateUserData())}
              className="border border-indigo-600 text-indigo-600 px-5 py-2 rounded-full font-medium hover:bg-indigo-50"
            >
              Randomize
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
