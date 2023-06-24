import React, { useRef, useEffect, useState } from 'react';
import _ from 'lodash';
import { Editor } from '@tinymce/tinymce-react';
import { Box } from '@mui/material';

interface IEditorStructure {
  value?: string;
  onChange(e?: string): void;
  config?: { [key: string]: any };
  height?: number;
  disabled?: boolean;
  message?: string;
  hiddenToolbar?: boolean;
}

const DEFAULT_PLUGIN: string[] = [
  'advlist',
  'autolink',
  'lists',
  'link',
  'image',
  'charmap',
  'preview',
  'searchreplace',
  'visualblocks',
  'code',
  'fullscreen',
  'insertdatetime',
  'media',
  'table',
  'tableofcontents',
  'wordcount',
  'lists',
  'help',
  'pagebreak',
  'quickbars',
  'codesample',
];

// const DEFAULT_MENU_BAR = 'edit insert format table tools';
const DEFAULT_TOOLBAR = [
  { name: 'history', items: ['undo', 'redo'] },
  { name: 'styles', items: ['styles', 'fontsize'] },
  { name: 'bgColor', items: ['backcolor'] },
  { name: 'textColor', items: ['forecolor'] },
  {
    name: 'formatting',
    items: ['bold', 'italic', 'underline', 'bullist', 'numlist', 'pagebreak'],
  },
  {
    name: 'alignment',
    items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify'],
  },
  { name: 'indentation', items: ['outdent', 'indent'] },
  { name: 'table', items: ['table'] },
];

const DEFAULT_TOOLBAR_FINDING = [
  { name: 'history', items: ['undo', 'redo'] },
  {
    name: 'formatting',
    items: ['bold', 'italic', 'underline', 'bullist', 'numlist', 'pagebreak'],
  },
  {
    name: 'alignment',
    items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify'],
  },
  { name: 'indentation', items: ['outdent', 'indent'] },
  { name: 'table', items: ['table'] },
];

const TextEditor: React.FC<IEditorStructure> = ({
  value = '',
  onChange,
  config,
  height = 500,
  disabled,
  message = '',
  hiddenToolbar = false,
}) => {
  const refEditor = useRef<Editor>(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(value);
    return () => {};
  }, []);

  useEffect(() => {
    if (!value) setContent('');
  }, [value]);

  return (
    <Box
      className={!_.isEmpty(message) ? 'required' : ''}
      component="div"
      sx={{
        position: 'relative',
        '&.required .tox.tox-tinymce': {
          outline: '1px solid #d32f2f',
          borderColor: 'transparent',
        },
      }}
    >
      <Editor
        apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
        value={content}
        disabled={disabled}
        ref={refEditor}
        init={{
          plugins: DEFAULT_PLUGIN,
          // menubar: DEFAULT_MENU_BAR,
          menubar: 'edit insert format table tools help',
          quickbars_selection_toolbar:
            'bold italic underline | blocks | bullist numlist | blockquote quicklink',
          quickbars_insert_toolbar: false,
          toolbar:
            hiddenToolbar && hiddenToolbar
              ? DEFAULT_TOOLBAR_FINDING
              : DEFAULT_TOOLBAR,
          branding: false,
          contextmenu: false,
          image_uploadtab: true,
          automatic_uploads: false,
          resize: true,
          setup: (editor) => {
            editor.on('focus', (e) => {
              if (e?.target?.editorContainer) {
                e.target.editorContainer.classList.add('focused');
              }
            });
            editor.on('blur', (e) => {
              if (e?.target?.editorContainer) {
                e.target.editorContainer.classList.remove('focused');
              }
            });
          },
          height,
          ...config,
        }}
        onEditorChange={(e, editor) => {
          setContent(e);
          const count =
            editor.plugins.wordcount.body.getCharacterCountWithoutSpaces();
          if (count === 1 || (count === 0 && !e.includes('&nbsp;')))
            onChange(e);
          if (count === 0 && e.includes('&nbsp;')) onChange('');
        }}
        onBlur={() => {
          const tinyBookmark = refEditor.current?.editor;
          if (tinyBookmark) {
            const count =
              tinyBookmark.plugins.wordcount.body.getCharacterCountWithoutSpaces();
            if (count === 0 && !content.includes('img')) onChange('');
            else onChange(content);
          }
        }}
        onPaste={(e) => onChange((e?.currentTarget as HTMLElement).innerHTML)}
      />
    </Box>
  );
};

export default TextEditor;
