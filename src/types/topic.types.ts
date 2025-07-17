import type { PartialBlock } from '@blocknote/core';

export interface Topic {
    title: string;
    category: string;
    thumbnail: string | null;
    content: PartialBlock[] | null;
}
