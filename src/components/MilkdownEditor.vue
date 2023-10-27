<script setup lang="ts">
import MilkdownMenu from './MilkdownMenu.vue'
import { Editor, rootCtx } from '@milkdown/core'
import { Milkdown, useEditor } from '@milkdown/vue'
import { commonmark } from '@milkdown/preset-commonmark'
import { gfm } from '@milkdown/preset-gfm'
import { history } from '@milkdown/plugin-history'

const editorInfo = useEditor((root) =>
  Editor.make()
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

<style>
del {
  text-decoration: line-through;
}

ul li {
  list-style: circle;
}

/* Clear css check warning */
p {
  white-space: pre-wrap;
}
</style>
