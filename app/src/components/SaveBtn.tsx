import React, { MouseEventHandler } from 'react';
import Button from '@mui/material/Button';

interface ButtonProps {
  onClick: MouseEventHandler;
}

const SaveBtn: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <Button variant='outlined' onClick={onClick}>
      Save
    </Button>
  );
};

export default SaveBtn;
