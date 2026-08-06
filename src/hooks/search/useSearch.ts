import { useEffect, useMemo, useState } from 'react';

import type { PostMetadata } from '@/types';
import { searchPosts } from '@/utils';

export function useSearch(posts: PostMetadata[], onDismiss: () => void) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchPosts(posts, query), [posts, query]);

  useEffect(() => {
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismiss();
    };

    window.addEventListener('keydown', dismissOnEscape);
    return () => window.removeEventListener('keydown', dismissOnEscape);
  }, [onDismiss]);

  return { query, results, setQuery };
}
