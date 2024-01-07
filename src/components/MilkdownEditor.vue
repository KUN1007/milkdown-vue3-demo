<script setup lang="ts">
import { computed, ref } from 'vue'
// KUN Visual Novel Menu
import MilkdownMenu from './plugins/MilkdownMenu.vue'
// Milkdown core
import { Editor, rootCtx, rootAttrsCtx, defaultValueCtx } from '@milkdown/core'
import { Milkdown, useEditor } from '@milkdown/vue'
import { commonmark } from '@milkdown/preset-commonmark'
import { gfm } from '@milkdown/preset-gfm'
// Milkdown Plugins
import { history } from '@milkdown/plugin-history'
import { prism, prismConfig } from '@milkdown/plugin-prism'
import { listener, listenerCtx } from '@milkdown/plugin-listener'
import { clipboard } from '@milkdown/plugin-clipboard'
import { indent } from '@milkdown/plugin-indent'
import { trailing } from '@milkdown/plugin-trailing'
import { usePluginViewFactory } from '@prosemirror-adapter/vue'
// KUN Visual Novel Custom tooltip
import { tooltipFactory } from '@milkdown/plugin-tooltip'
import Tooltip from './plugins/Tooltip.vue'
// Custom text size calculate
import Size from './plugins/Size.vue'
import { $prose } from '@milkdown/utils'
import { Plugin } from '@milkdown/prose/state'

// KUN Visual Novel style
import '@/styles/editor/index.scss'

// Syntax highlight
import c from 'refractor/lang/c'
import cpp from 'refractor/lang/cpp'
import csharp from 'refractor/lang/csharp'
import css from 'refractor/lang/css'
import go from 'refractor/lang/go'
import haskell from 'refractor/lang/haskell'
import python from 'refractor/lang/python'
import java from 'refractor/lang/java'
import javascript from 'refractor/lang/javascript'
import typescript from 'refractor/lang/typescript'
import jsx from 'refractor/lang/jsx'
import kotlin from 'refractor/lang/kotlin'
import r from 'refractor/lang/r'
import rust from 'refractor/lang/rust'
import scala from 'refractor/lang/scala'
import sql from 'refractor/lang/sql'
import tsx from 'refractor/lang/tsx'
import markdown from 'refractor/lang/markdown'

// Editor markdown preset
// const value = ref(`## Source:

// **AstralAir no Shiroki Towa (アストラエアの白き永遠)**, and its \`FD\`, \`psv\` versions

// [Official Website](http://www.favo-soft.jp/soft/product/WhiteEternity/index.html)

// ## Famous Quotes

// > Babble babble~ All babble babble~

// ![](https://cdn.jsdelivr.net/gh/kun-moe/kun-image@main/img/sd_102_30.png)

// # I want to marry Yuki Yuki Yuki!!!!!

// ![](https://cdn.jsdelivr.net/gh/kun-moe/kun-image@main/img/yuki_exs_e01a%20\(Image%200\).png)
// `)

const value = ref('')

const editorHight = computed(() => 300 + 'px')
const valueMarkdown = computed(() => value.value)
const tooltip = tooltipFactory('Text')
const pluginViewFactory = usePluginViewFactory()
const container = ref<HTMLElement | null>(null)
const isEditorFocus = ref(false)
const editorContent = ref('')

const editorInfo = useEditor((root) =>
  Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root)
      ctx.set(rootAttrsCtx, {
        roles: 'kun-galgame-milkdown-editor',
        'aria-label': 'kun-galgame-milkdown-editor',
      })
      ctx.set(defaultValueCtx, valueMarkdown.value)

      const listener = ctx.get(listenerCtx)
      listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
        if (markdown !== prevMarkdown) {
          console.log(markdown)

          editorContent.value = markdown
        }
      })
      listener.blur(() => {
        isEditorFocus.value = false
      })
      listener.focus(() => {
        isEditorFocus.value = true
      })

      ctx.set(prismConfig.key, {
        configureRefractor: (refractor) => {
          refractor.register(c)
          refractor.register(cpp)
          refractor.register(csharp)
          refractor.register(css)
          refractor.register(go)
          refractor.register(haskell)
          refractor.register(python)
          refractor.register(markdown)
          refractor.register(java)
          refractor.register(javascript)
          refractor.register(typescript)
          refractor.register(jsx)
          refractor.register(kotlin)
          refractor.register(r)
          refractor.register(rust)
          refractor.register(scala)
          refractor.register(sql)
          refractor.register(tsx)
        },
      })

      ctx.set(tooltip.key, {
        view: pluginViewFactory({
          component: Tooltip,
        }),
      })
    })
    .use(history)
    .use(commonmark)
    .use(gfm)
    .use(prism)
    .use(listener)
    .use(clipboard)
    .use(indent)
    .use(trailing)
    .use(tooltip)
    // Add custom plugin view, calculate markdown text size
    .use(
      $prose(
        () =>
          new Plugin({
            view: pluginViewFactory({
              component: Size,
              root: () => (container.value ? container.value : root),
            }),
          })
      )
    )
)
</script>

<!-- MilkdownEditor.vue -->
<template>
  <div ref="container" class="editor-container">
    <MilkdownMenu :editorInfo="editorInfo" />
    <Milkdown
      class="editor"
      :class="isEditorFocus || editorContent ? 'active' : ''"
    />
  </div>
</template>

<style lang="scss">
.editor-container {
  .editor {
    position: relative;

    .milkdown {
      width: 100%;
      padding: 10px;

      /* Silence css check */
      * {
        white-space: pre-wrap;
      }

      & > div:nth-child(1) {
        transition: all 0.2s;
        margin: 0 auto;
        min-height: v-bind(editorHight);
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

      img {
        max-width: 100%;
      }

      del {
        text-decoration: line-through;
      }

      p {
        margin: 17px 0;
      }

      blockquote {
        margin: 17px 0;
        padding: 10px;
        font-size: 18px;
        border-left: 4px solid var(--kungalgame-blue-4);
        background-color: var(--kungalgame-trans-blue-0);

        p {
          margin: 0;
        }
      }

      pre {
        margin: 17px 0;
        border: 1px solid var(--kungalgame-blue-4);
        border-radius: 5px;
        padding: 17px;
        background-color: var(--kungalgame-trans-white-2);
        position: relative;

        code {
          font-size: 15px;
          font-family: monospace;
        }
      }

      a {
        cursor: pointer;
        font-style: oblique;
        font-weight: bold;
        color: var(--kungalgame-blue-4);

        &:hover {
          text-decoration: underline;
        }
      }

      table {
        border: 1px solid var(--kungalgame-blue-4);
        border-radius: 5px;
        white-space: nowrap;
      }

      th,
      td {
        border: 1px solid var(--kungalgame-blue-4);
        padding: 3px;
        text-align: left;
      }

      tr:nth-child(even) {
        background-color: var(--kungalgame-trans-blue-1);
      }

      ul li,
      ol li {
        color: var(--kungalgame-blue-4);
      }

      .tableWrapper {
        color: var(--kungalgame-font-color-3);
        position: relative;
        overflow-x: auto;
      }
    }
  }
}
</style>
