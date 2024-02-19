export const inlineStyles: Record<string, React.CSSProperties> = {
  HEADING: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: 'black',
  },
  BOLD: {
    fontWeight: 'bold',
    color: 'black',
  },
  RED: {
    color: 'red',
  },
  UNDERLINE: {
    fontWeight: 'normal',
    color: 'black',
    textDecoration: 'underline',
  },
};

export const inlineStyleOfCommand: Record<string, string> = {
  '#': 'HEADING',
  '*': 'BOLD',
  '**': 'RED',
  '***': 'UNDERLINE',
};
