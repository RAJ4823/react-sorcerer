import React, { useState } from 'react';
import { Typography, Input } from '@mui/material';

interface EditableTitleProps {
  initialTitle: string;
}

const EditableTitle: React.FC<EditableTitleProps> = ({ initialTitle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(localStorage.getItem('draftEditorTitle') || initialTitle);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newTitle = e.target.value;
    if (newTitle.trim() === '') {
      newTitle = initialTitle;
    }
    setTitle(newTitle);
  };

  const handleBlur = () => {
    setIsEditing(false);
    localStorage.setItem('draftEditorTitle', title);
  };

  return (
    <>
      {isEditing ? (
        <Input autoFocus value={title} onChange={handleChange} onBlur={handleBlur} />
      ) : (
        <Typography textAlign='center' variant='h6' component='h6' onDoubleClick={handleDoubleClick}>
          {title}
        </Typography>
      )}
    </>
  );
};

export default EditableTitle;
