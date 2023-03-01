<!-- eslint-disable semi -->
<!-- eslint-disable semi -->
<template>
  <q-menu>
    <q-list style="min-width: 100px">
      <q-item clickable v-close-popup @click="load">
        <q-item-section>Load</q-item-section>
      </q-item>
      <q-item clickable v-close-popup @click="save">
        <q-item-section>Download Json</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TheToolbarMenu',
  methods: {
    load () {
      this.$emit('load')
    },
    save () {
      this.$emit('download-json')
    }
  },
  emits: ['download-json', 'load']
})
</script>
