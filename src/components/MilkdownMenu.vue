<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { UseEditorReturn } from '@milkdown/vue'
import type { CmdKey } from '@milkdown/core'
import { callCommand } from '@milkdown/utils'
import {
  toggleEmphasisCommand,
  toggleStrongCommand,
  wrapInBlockquoteCommand,
  wrapInBulletListCommand,
  wrapInOrderedListCommand,
} from '@milkdown/preset-commonmark'
import {
  insertTableCommand,
  toggleStrikethroughCommand,
} from '@milkdown/preset-gfm'
import { redoCommand, undoCommand } from '@milkdown/plugin-history'

const props = defineProps<{
  editorInfo: UseEditorReturn
}>()

const { get, loading } = props.editorInfo

const call = <T>(command: CmdKey<T>, payload?: T) => {
  return get()?.action(callCommand(command, payload))
}
</script>

<template>
  <div class="menu">
    <button icon="undo" @click="call(undoCommand.key)">
      <Icon icon="material-symbols:undo-rounded" />
    </button>

    <button icon="redo" @click="call(redoCommand.key)">
      <Icon icon="material-symbols:redo-rounded" />
    </button>

    <button icon="format_bold" @click="call(toggleStrongCommand.key)">
      <Icon icon="material-symbols:format-bold-rounded" />
    </button>

    <button icon="format_italic" @click="call(toggleEmphasisCommand.key)">
      <Icon icon="material-symbols:format-italic-rounded" />
    </button>

    <button
      icon="format_strikethrough"
      @click="call(toggleStrikethroughCommand.key)"
    >
      <Icon icon="material-symbols:strikethrough-s-rounded" />
    </button>

    <button icon="table" @click="call(insertTableCommand.key)">
      <Icon icon="material-symbols:table" />
    </button>

    <button
      icon="format_list_bulleted"
      @click="call(wrapInBulletListCommand.key)"
    >
      <Icon icon="material-symbols:format-list-bulleted-rounded" />
    </button>

    <button
      icon="format_list_numbered"
      @click="call(wrapInOrderedListCommand.key)"
    >
      <Icon icon="material-symbols:format-list-numbered-rounded" />
    </button>

    <button icon="format_quote" @click="call(wrapInBlockquoteCommand.key)">
      <Icon icon="material-symbols:format-quote-rounded" />
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
