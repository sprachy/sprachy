<script setup lang="ts">
import pixelWidth from "string-pixel-width"

const props = defineProps<{
  parts: string
  content: string
}>()

function estimateTextWidth(text: string) {
  return pixelWidth(text, { size: 16, font: "arial" })
}

type TextFragment =
  | {
    highlight: string
    text: string
    minWidth?: number
  }
  | {
    highlight?: undefined
    text: string
    minWidth?: undefined
  }

const state = defineState({
  get highlights() {
    return props.parts.split(",").map((p) => p.trim())
  },

  get fragments() {
    const fragments: TextFragment[] = []
    let highlightIndex = 0

    const matches = [...props.content.matchAll(/\[.+?\]/g)]
    let i = 0
    for (const m of matches) {
      if (!m || !m.index || !m[0]) continue
      fragments.push({
        text: props.content.slice(i, m.index),
      })

      const highlight = this.highlights[highlightIndex]!
      const bit = m[0].slice(1, -1)
      fragments.push({
        highlight: highlight,
        minWidth:
          highlight.length > bit.length
            ? estimateTextWidth(highlight)
            : undefined,
        text: bit,
      })
      highlightIndex += 1
      i = m.index + m[0].length
    }

    return fragments

  }
})

</script>

<template>
  <div class="TextHighlighter">
    <template v-for="fragment in state.fragments">
      <span v-if="fragment.highlight" :class="`highlight ${fragment.highlight}`"
        :style="fragment.minWidth ? `min-width: ${fragment.minWidth}px` : undefined">
        {fragment.text}
      </span>
      <template v-else>
        {{ fragment.text }}
      </template>
    </template>
  </div>
</template>

<style scoped>
.TextHighlighter {
  padding-bottom: 30px;
  margin-bottom: 1rem;
}

.TextHighlighter span.highlight {
  display: inline-block;
  font-weight: bold;
  text-align: center;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}

.TextHighlighter span.highlight::after {
  font-weight: normal;
  font-size: 16px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 100%;
  white-space: nowrap;
}

.TextHighlighter :deep(span.actor) {
  color: #a56eff;
  position: relative;
}

.TextHighlighter :deep(span.actor)::after {
  content: "actor";
}

.TextHighlighter :deep(span.indirectobject) {
  color: #005d5d;
  position: relative;
}

.TextHighlighter :deep(span.indirectobject)::after {
  content: "indirect object";
}

.TextHighlighter :deep(span.directobject) {
  color: #9f1853;
  position: relative;
}

.TextHighlighter :deep(span.directobject)::after {
  content: "direct object";
}
</style>
