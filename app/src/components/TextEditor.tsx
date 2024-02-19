import { Editor, EditorState, Modifier, RichUtils, getDefaultKeyBinding } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { inlineStyles, inlineStyleOfCommand } from '../constants';

interface TextEditorProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

const TextEditor: React.FC<TextEditorProps> = ({ editorState, setEditorState }) => {
  const handleChange = (newEditorState: EditorState): void => {
    setEditorState(newEditorState);
  };

  const handleRemoveStyles = (editorState: EditorState): EditorState => {
    let newEditorState = editorState;
    const currentStyle = newEditorState.getCurrentInlineStyle();
    Object.keys(inlineStyles).forEach((style) => {
      if (currentStyle.has(style)) {
        newEditorState = RichUtils.toggleInlineStyle(newEditorState, style);
      }
    });
    return newEditorState;
  };

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    if (command === 'remove-style') {
      const newState = handleRemoveStyles(editorState);
      handleChange(newState);
      return 'handled';
    }

    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const handleBeforeInput = (char: string, editorState: EditorState) => {
    let newEditorState = editorState;
    const selection = newEditorState.getSelection();
    const contentState = newEditorState.getCurrentContent();
    const block = contentState.getBlockForKey(selection.getStartKey());
    const text = block.getText();
    const newInlineStyle = inlineStyleOfCommand[text] || null;

    if (char === ' ' && newInlineStyle) {
      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: selection.getStartOffset() - text.length,
          focusOffset: selection.getStartOffset(),
        }),
        ''
      );

      if (newInlineStyle) {
        let newState = EditorState.push(newEditorState, newContentState, 'change-inline-style');
        newState = handleRemoveStyles(newState);
        const withInlineStyle = RichUtils.toggleInlineStyle(newState, newInlineStyle);
        handleChange(withInlineStyle);
        return 'handled';
      }
    }

    return 'not-handled';
  };

  const myKeyBindingFn = (e: React.KeyboardEvent): string | null => {
    if (e.keyCode === 13) {
      const currentStyle = editorState.getCurrentInlineStyle();
      for (const style in inlineStyles) {
        if (currentStyle.has(style)) {
          return 'remove-style';
        }
      }
    }
    return getDefaultKeyBinding(e);
  };

  return (
    <Editor
      editorState={editorState}
      onChange={handleChange}
      handleBeforeInput={handleBeforeInput}
      handleKeyCommand={handleKeyCommand}
      keyBindingFn={myKeyBindingFn}
      customStyleMap={inlineStyles}
    />
  );
};

export default TextEditor;
