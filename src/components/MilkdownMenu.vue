<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useInstance } from '@milkdown/vue'
import type { CmdKey } from '@milkdown/core'
import { callCommand } from '@milkdown/utils'
import {
  toggleEmphasisCommand,
  toggleStrongCommand,
  wrapInBlockquoteCommand,
  wrapInBulletListCommand,
  wrapInOrderedListCommand,
  insertHrCommand,
  toggleInlineCodeCommand,
  toggleLinkCommand,
} from '@milkdown/preset-commonmark'
import {
  insertTableCommand,
  toggleStrikethroughCommand,
} from '@milkdown/preset-gfm'
import { redoCommand, undoCommand } from '@milkdown/plugin-history'

const [loading, get] = useInstance()

const call = <T>(command: CmdKey<T>, payload?: T) => {
  return get()?.action(callCommand(command, payload))
}
</script>

<template>
  <div class="menu">
    <button @click="call(undoCommand.key)">
      <Icon icon="material-symbols:undo-rounded" />
    </button>

    <button @click="call(redoCommand.key)">
      <Icon icon="material-symbols:redo-rounded" />
    </button>

    <!-- Mark Group -->
    <button @click="call(toggleStrongCommand.key)">
      <Icon icon="material-symbols:format-bold-rounded" />
    </button>

    <button @click="call(toggleEmphasisCommand.key)">
      <Icon icon="material-symbols:format-italic-rounded" />
    </button>

    <button @click="call(toggleStrikethroughCommand.key)">
      <Icon icon="material-symbols:strikethrough-s-rounded" />
    </button>

    <button @click="call(insertTableCommand.key)">
      <Icon icon="material-symbols:table" />
    </button>

    <button @click="call(wrapInBulletListCommand.key)">
      <Icon icon="material-symbols:format-list-bulleted-rounded" />
    </button>

    <button @click="call(wrapInOrderedListCommand.key)">
      <Icon icon="material-symbols:format-list-numbered-rounded" />
    </button>

    <button @click="call(wrapInBlockquoteCommand.key)">
      <Icon icon="material-symbols:format-quote-rounded" />
    </button>

    <button @click="call(insertHrCommand.key)">
      <Icon icon="material-symbols:horizontal-rule-rounded" />
    </button>

    <button @click="call(toggleLinkCommand.key)">
      <Icon icon="material-symbols:link-rounded" />
    </button>

    <button @click="call(toggleInlineCodeCommand.key)">
      <Icon icon="material-symbols:code-blocks-outline-rounded" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  display: flex;
  width: 100%;

  button {
    margin: 5px;
    font-size: 22px;
  }
}
</style>
