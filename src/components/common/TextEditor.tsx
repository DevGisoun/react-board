import { ko } from '@blocknote/core/locales';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import type { PartialBlock } from '@blocknote/core';

interface TextEditorProps {
    onEditorContentChange: (content: PartialBlock[] | null) => void;
}

export default function TextEditor({ onEditorContentChange }: TextEditorProps) {
    // Creates a new editor instance.
    const editor = useCreateBlockNote({
        dictionary: ko,
        initialContent: undefined,
    });

    editor.onChange((editor, { getChanges: _getChanges }) => {
        // const changes = getChanges();
        onEditorContentChange(editor.document);
    });

    // Renders the editor instance using a React component.
    return <BlockNoteView editor={editor} />;
}
