<!-- eslint-disable semi -->
<template>
    <q-menu>
      <q-list style="min-width: 100px">
        <q-item clickable v-close-popup @click="openClicked">
          <q-item-section>Open</q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="loadClicked">
          <q-item-section>Show Json</q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="downloadClicked">
          <q-item-section>Download Json</q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="saveClicked" v-if="showSave">
          <q-item-section>Save</q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="saveAsClick">
          <q-item-section>Save As...</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  <FileSaveAs ref="file" @saveAs="saveAs"></FileSaveAs>
  <OpenFile ref="openFile" @open-file="open"></OpenFile>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FileSaveAs from 'src/components/FileSaveAs.vue';
import OpenFile from './OpenFile.vue';


export default defineComponent({
  name: 'TheToolbarMenu',
  props: {
    showSave : {
      type: Boolean,
    }
  },
  methods: {
    openClicked () {
      (this.$refs.openFile as typeof OpenFile).showDialog();
    },
    open (filename: string) {
      this.$emit('open', filename);
    },

    loadClicked () {
      this.$emit('load')
    },
    saveClicked () {
      this.$emit('saveAs','')
    },
    saveAsClick () {
      (this.$refs.file as typeof FileSaveAs).showDialog();
    },
    saveAs (filename: string) {
      this.$emit('saveAs', filename)
    },
    downloadClicked () {
      this.$emit('download-json')
    }
  },
  emits: ['download-json', 'load', 'open', 'saveAs'],
  components: { FileSaveAs, OpenFile },
})
</script>
