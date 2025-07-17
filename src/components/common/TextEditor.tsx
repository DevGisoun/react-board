import { ko } from '@blocknote/core/locales';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';

export default function TextEditor() {
    // Creates a new editor instance.
    const editor = useCreateBlockNote({
        dictionary: ko,
    });

    // Renders the editor instance using a React component.
    return <BlockNoteView editor={editor} className="w-full" />;
}
