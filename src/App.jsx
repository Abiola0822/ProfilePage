import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import ProfileCard from './ProfileCard';

function generateUserData() {
  return {
    avatar: faker.image.avatar(),
    fullName: faker.person.fullName(),
    nickname: faker.internet.userName(),
    about: faker.lorem.paragraph(),
    interests: faker.helpers.arrayElements(
      ['Music', 'Travel', 'Sports', 'Reading', 'Cooking', 'Gaming', 'Photography', 'Fitness'],
      faker.number.int({ min: 2, max: 5 })
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
    setUser(prev => {
      const hasInterest = prev.interests.includes(interest);
      const newInterests = hasInterest
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: newInterests };
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <ProfileCard
        user={user}
        editMode={editMode}
        updateField={updateField}
        toggleInterest={toggleInterest}
        onAvatarClick={() => updateField('avatar', faker.image.avatar())}
        onRandomizeClick={() => setUser(generateUserData())}
        onToggleEdit={() => setEditMode(!editMode)}
      />
    </div>
  );
}
