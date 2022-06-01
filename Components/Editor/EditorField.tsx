import React from 'react';
import { useField } from 'formik';
import { Editor, IAllProps } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { ErrorIndicator } from '@/Input/index';

interface EditorFieldProps extends IAllProps {
  label?: string;
  name: string;
}

const EditorField = (props: EditorFieldProps) => {
  const { label, name, ...otherProps } = props;
  const [field, meta] = useField(name);
  const type = 'text';
  const handleEditorChange = (value: string, _editor: TinyMCEEditor) => {
    field.onChange({ target: { type, name, value } });
  };

  const handleBlur = (e: unknown, editor: TinyMCEEditor) => {
    field.onBlur({ target: { name } });
  };

  return (
    <>
      {label && <label>{label}</label>}
      <Editor
        {...otherProps}
        id="#createTask_description"
        value={field.value}
        onEditorChange={handleEditorChange}
        onBlur={handleBlur}
        init={{
          plugins:
            'lists link advlist autolink paste emoticons searchreplace autosave help wordcount',
          toolbar:
            'undo redo | blocks | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor emoticons',
          branding: false,
          height: 300,
        }}
      ></Editor>
      {/* {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </>
  );
};

export default EditorField;
