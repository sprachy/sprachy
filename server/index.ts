import { resolve } from './urls'

// Workers require that this be a sync callback
addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
})

export async function handleEvent(event: FetchEvent) {
  // Performing some conversion/annotation of the event here
  const req = await EventRequest.from(event)
  return maybeCached(req)
}