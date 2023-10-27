<script setup lang="ts">
import MilkdownMenu from './MilkdownMenu.vue'
import { nord } from '@milkdown/theme-nord'
import { Editor, rootCtx } from '@milkdown/core'
import { Milkdown, useEditor } from '@milkdown/vue'
import { commonmark } from '@milkdown/preset-commonmark'
import { gfm } from '@milkdown/preset-gfm'
import { history } from '@milkdown/plugin-history'

import '@milkdown/theme-nord/style.css'

const editorInfo = useEditor((root) =>
  Editor.make()
    .config(nord)
    .config((ctx) => {
      ctx.set(rootCtx, root)
    })
    .use(commonmark)
    .use(gfm)
    .use(history)
)
</script>

<!-- MilkdownEditor.vue -->
<template>
  <div class="editor-container">
    <MilkdownMenu :editorInfo="editorInfo" />
    <Milkdown />
  </div>
</template>

<style lang="scss">
del {
  text-decoration: line-through;
}

ul li {
  list-style: circle;
}

ol li {
  list-style: decimal;
}

/* Clear css check warning */
p {
  white-space: pre-wrap;
}

.milkdown {
  width: 100%;
  padding: 10px;
  & > div {
    margin: 0 auto;
    min-height: 300px;
    max-height: 500px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: inline;
      width: 7px;
      height: 0;
    }

    &::-webkit-scrollbar-thumb {
      cursor: default;
      background: var(--kungalgame-blue-4);
      border-radius: 3px;
    }

    /* Compatible with Firefox */
    scrollbar-width: thin;
    scrollbar-color: var(--kungalgame-blue-4) var(--kungalgame-blue-1); /* Firefox 64+ */
  }
}

.prose {
  max-width: 1000px !important;
}
</style>
