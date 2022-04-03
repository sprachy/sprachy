<script lang="ts">
  /** Page title for <title> element and embed cards */
  export let title: string
  /** Absolute path to this page for the canonical url */
  export let canonicalPath: string
  /** Page description for Google. Omit this if the page has more useful text in it */
  export let metaDesc: string | null = null
  /** How to describe this page on embed cards */
  export let cardDesc: string
  /** Image for the embed card, if any */
  export let cardImg: string | null = null
  /** Whether to show a prominent image on the embed card */
  export let cardBig: boolean = false

  if (canonicalPath.endsWith("/")) {
    canonicalPath = canonicalPath.slice(0, -1)
  }

  $: canonicalUrl = `https://sprachy.com${canonicalPath}`
  $: imgUrl = cardImg
    ? `https://sprachy.com${cardImg}`
    : `https://sprachy.com/meta-image.jpg`
</script>

<svelte:head>
  {#if title === "Sprachy"}
    <title>Sprachy</title>
  {:else}
    <title>{title} - Sprachy</title>
  {/if}
  <link rel="canonical" href={canonicalUrl} />

  {#if metaDesc}
    <meta name="description" content={metaDesc} />
  {/if}

  <meta property="og:title" content={title} />
  <meta property="og:description" content={cardDesc} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Sprachy" />
  {#if imgUrl}
    <meta property="og:image" content={imgUrl} />
  {/if}

  <meta
    name="twitter:card"
    content={cardBig ? "summary_large_image" : "summary"}
  />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={cardDesc} />
  <meta name="twitter:site" content="@SprachyApp" />
  <meta name="twitter:creator" content="@SprachyApp" />
  {#if imgUrl}
    <meta name="twitter:image" content={imgUrl} />
  {/if}
</svelte:head>

<slot />
