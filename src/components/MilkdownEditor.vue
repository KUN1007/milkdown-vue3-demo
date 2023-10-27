<script setup lang="ts">
import MilkdownMenu from './MilkdownMenu.vue'
import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core'
import { Milkdown, useEditor } from '@milkdown/vue'
import { commonmark } from '@milkdown/preset-commonmark'
import { gfm } from '@milkdown/preset-gfm'
import { history } from '@milkdown/plugin-history'
import { prism, prismConfig } from '@milkdown/plugin-prism'
import { listener, listenerCtx } from '@milkdown/plugin-listener'

import '@/styles/editor/code-theme.css'

// Syntax highlight
import cpp from 'refractor/lang/cpp'
import csharp from 'refractor/lang/csharp'
import css from 'refractor/lang/css'
import go from 'refractor/lang/go'
import python from 'refractor/lang/python'
import javascript from 'refractor/lang/javascript'
import typescript from 'refractor/lang/typescript'
import jsx from 'refractor/lang/jsx'
import rust from 'refractor/lang/rust'
import sql from 'refractor/lang/sql'
import tsx from 'refractor/lang/tsx'
import markdown from 'refractor/lang/markdown'

const valueMarkdown = `# Milkdown Vanilla Shiki Highlight

> You're scared of a world where you're needed.

\`\`\`rust
Editor
  .make()
  .config(ctx => {
    ctx.set(rootCtx, '#app')
    ctx.set(defaultValueCtx, markdown)
  })
  .config(nord)
  .use(commonmark)
  .use(milkShiki)
  .create()
\`\`\`

This is a demo for using Milkdown with **Vanilla Typescript**.
The code block is highlighted by [shiki](https://shiki.matsu.io/).`

const editorInfo = useEditor((root) =>
  Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root)
      ctx.set(defaultValueCtx, valueMarkdown)

      const listener = ctx.get(listenerCtx)

      listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
        if (markdown !== prevMarkdown) {
        }
      })

      ctx.set(prismConfig.key, {
        configureRefractor: (refractor) => {
          refractor.register(cpp)
          refractor.register(csharp)
          refractor.register(css)
          refractor.register(go)
          refractor.register(python)
          refractor.register(markdown)
          refractor.register(javascript)
          refractor.register(typescript)
          refractor.register(jsx)
          refractor.register(rust)
          refractor.register(sql)
          refractor.register(tsx)
        },
      })
    })
    .use(listener)
    .use(commonmark)
    .use(prism)
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
