import type { PartialBlock } from '@blocknote/core';

export interface Topic {
    user_id: string; // Supabase Auth User Id (uuid)
    title: string;
    category: string;
    thumbnail: string | null;
    content: PartialBlock[] | null;
}
