export type PatternNavigationItem = {
  title: string
  slug: string
  shortdesc: string
}

export async function fetchPatternIndex() {
  const items = await fetchContentNavigation()
  return items.map(item => ({
    id: item.id,
    title: item.title,
    slug: item._path.slice(1),
    shortdesc: item.shortdesc
  })) satisfies PatternNavigationItem[]
}