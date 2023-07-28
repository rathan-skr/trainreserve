import React from 'react';

interface UserOptionsBoxProps {
  onClickLogout: () => void;
  onClickEdit: () => void;
  showOptions: boolean;
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserOptionsBox: React.FC<UserOptionsBoxProps> = ({
  onClickLogout,
  onClickEdit,
  showOptions,
  setShowOptions,
}) => {
  return (
    <div className={`user_options_box ${showOptions ? 'show' : ''}`}>
      <ul className="user_options_list">
        <li className="user_option_item" onClick={onClickLogout}>
          Logout
        </li>
        <li className="user_option_item" onClick={onClickEdit}>
          Edit
        </li>
      </ul>
    </div>
  );
};

export default UserOptionsBox;
