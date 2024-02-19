import { useState } from 'react';
import { Container, Grid, Paper } from '@mui/material';
import Title from './components/Title';
import SaveBtn from './components/SaveBtn';
import TextEditor from './components/TextEditor';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

const App: React.FC = () => {
  const [editorState, setEditorState] = useState(() => {
    const initialContent = localStorage.getItem('draftEditorContent') || null;
    if (initialContent) {
      const rawContentState = JSON.parse(initialContent);
      const contentState = convertFromRaw(rawContentState);
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  });

  const handleSave = (): void => {
    const contentState = editorState.getCurrentContent();
    const contentStateJSON = convertToRaw(contentState);
    localStorage.setItem('draftEditorContent', JSON.stringify(contentStateJSON));
  };

  return (
    <Container maxWidth='lg' className='app-container'>
      <Grid container spacing={3} justifyContent='space-between' alignItems='center' className='app-header'>
        <Grid item md={3} xs={0}></Grid>
        <Grid item md='auto' xs={12}>
          <Title initialTitle={'Demo Editor By Raj Patel'} />
        </Grid>
        <Grid item md={3} xs={12} textAlign='center'>
          <SaveBtn onClick={handleSave} />
        </Grid>
      </Grid>

      <Paper elevation={5} className='app-content'>
        <TextEditor editorState={editorState} setEditorState={setEditorState} />
      </Paper>
    </Container>
  );
};

export default App;
