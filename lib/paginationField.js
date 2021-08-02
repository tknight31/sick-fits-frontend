import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells Apollo we'll handle everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      // read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // if there are items,
      //   AND there arent enough items to satisfy how many were requested
      //   AND we are on the last page,
      //   THEN just send it
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // we dont have any items. go to network to fetch them
        return false;
      }

      // if there are items, just return from the cache
      if (items.length) {
        console.log(
          `there are ${items.length} in the cache. Gonna send them to apollo`
        );
        return items;
      }
      return false; // fallback to network
    },
    merge(existing, incoming, { args }) {
      const { skip } = args;
      console.log(`merging items from the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      // eslint-disable-next-line no-plusplus
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      // return the merged items from the cache
      return merged;
    },
  };
}
