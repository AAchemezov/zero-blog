import React from 'react';

export type AvatarType = {
  name: string
  username: string
};

function Avatar({ name, username }: AvatarType) {
  return (
    <div className="d-flex align-items-center">
      <img className="me-1 rounded-1" src={`https://avatars.dicebear.com/api/initials/${username}.svg?size=24`} alt={name} />
      <span className="link-primary">
        @
        {username}
      </span>
    </div>

  );
}

export default Avatar;
