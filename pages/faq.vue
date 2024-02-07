<script setup lang="ts">
import { md } from "~/lib/util"

const faq = md`
# Frequently asked questions

### Isn't it harder to learn a foreign language as an adult?

Actually, no! Adults generally [learn faster](https://en.wikipedia.org/wiki/List_of_common_misconceptions_about_language_learning) by making use of their advanced cognition and knowledge of their native language.  

This misconception probably arises because the many years kids spend mastering their native language are part of the expected educational process for everyone, whereas adults have to go out of their way a bit to learn a new language.

One area where children do have a clear advantage is in pronunciation. If you want to reach native level pronunciation as an adult, you'll need to work a bit harder at it than a bilingual kid. Fortunately, many people consider a light accent to be charming!

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

Sprachy is made by [Evan](https://github.com/evrys) and [Twokay](https://github.com/two-kay).
Evan wanted to learn German, and it's Twokay's native language, so we decided to team up
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

<template>
  <main class="container">
    <Sprachdown :source="faq" />
  </main>
</template>
<!-- <PublicPage
  title="FAQ"
  canonicalPath="/faq"
  cardDesc="Frequently asked questions"
>
</PublicPage> -->

<style scoped>
.container :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
}
</style>
