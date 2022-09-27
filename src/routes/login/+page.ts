import type { Load } from "@sveltejs/kit"

export const load: Load = ({ url, data }) => {
  const next = url.searchParams.get("next")
  if (data?.userId) {
    return {
      status: 303,
      redirect: next || "/learn",
    }
  }

  return { next }
}
