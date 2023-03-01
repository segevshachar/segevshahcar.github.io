<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu">
          <TheToolbarMenu @load="load" @download-json="download">
          </TheToolbarMenu>
        </q-btn>
        <q-toolbar-title> App </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <IndexPage ref="index"></IndexPage>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import TheToolbarMenu from 'src/components/TheToolbarMenu.vue'
import IndexPage from 'src/pages/IndexPage.vue'
import { saveTextAsFile } from 'src/util/download'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MainLayout',
  components: { IndexPage, TheToolbarMenu },
  data () {
    return { name: '' }
  },
  methods: {
    load () {
      (this.$refs as any).index.handleLoadClicked();
    },
    download () {
      saveTextAsFile(JSON.stringify((this.$refs as any).index.$data))
    }
  }
})
</script>
