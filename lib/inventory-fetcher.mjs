// Read this Worker's public inventory from its deployed asset binding, avoiding a
// recursive same-domain Worker request. Admin authorization still goes to the API.
export function createInventoryFetcher(assets, networkFetch = fetch) {
  return (url, init) => url === 'https://matematik-ai.com/content-inventory.json' && assets
    ? assets.fetch(new Request(url, { method: 'GET' }))
    : networkFetch(url, init);
}
