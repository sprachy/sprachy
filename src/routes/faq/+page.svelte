<script lang="ts">
  import { md } from "$lib/util"
  import _ from "lodash"
  import Sprachdown from "$lib/Sprachdown.svelte"
  import PublicPage from "$lib/PublicPage.svelte"

  const faq = md`
# Frequently asked questions

### What will the pricing model be?

Sprachy is free to use while it is in early development. After we add sufficient
content, we'll likely introduce a subscription fee to do exercises beyond
a certain point. The text of patterns will remain openly accessible, so it'll always
act as a free grammar reference/textbook of sorts.

Since we're just a couple of internet friends and not a VC-backed startup, we're
not really interested in pursuing tech company hypergrowth. It would be nice to make
a decent income from our work, but we don't need to like, launch cars into space
or anything.

We're not interested in ad funding and won't add those, unless it's something actually
useful like job ads for work in Germany or such.

### Is there an Android or iOS app?

Not yet! If the web version is successful enough and there's interest in
a mobile app, we'll investigate building one.

### Who made this?

Sprachy is made by [Toggle](https://github.com/tgle) and [Twokay](https://github.com/two-kay).
Toggle wanted to learn German, and it's Twokay's native language, so we decided to team up
and make a fancy website for it!

### Typing in German

German mostly uses the same alphabet as English, but it has a few extra characters. These are:

The umlaut + vowel combinations: Ä/ä, Ö/ö, and Ü/ü

The Eszett or "scharfes S": ß

Here's how to type them on an English keyboard.

#### MacOS

ä, ö, ü: alt+u then the base letter (a/o/u)
ß: alt+s

TODO expand this section for other platforms
  `
</script>

<PublicPage
  title="FAQ"
  canonicalPath="/faq"
  cardDesc="Frequently asked questions"
>
  <main class="container">
    <Sprachdown source={faq} />
  </main>
</PublicPage>

<style>
  .container :global(h3) {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-size: 1.4rem;
  }
</style>
