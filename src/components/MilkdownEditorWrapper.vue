<script setup lang="ts">
import { MilkdownProvider } from '@milkdown/vue'
import MilkdownEditor from './MilkdownEditor.vue'
</script>

<!-- MilkdownEditorWrapper.vue -->
<template>
  <div class="root">
    <MilkdownProvider>
      <MilkdownEditor />
    </MilkdownProvider>
  </div>
</template>

<style lang="scss" scoped>
.root {
  border: 1px solid var(--kungalgame-blue-4);
}
</style>
