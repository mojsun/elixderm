import { useMemo } from 'react';
import { useClient } from 'sanity';
import clientConfig from '../config/client-config';

/**
 * The signed-in editor's Studio client, limited to published documents so
 * custom tools don't list drafts.
 */
export function usePublishedClient() {
  const client = useClient({ apiVersion: clientConfig.apiVersion });
  return useMemo(() => client.withConfig({ perspective: 'published' }), [client]);
}
