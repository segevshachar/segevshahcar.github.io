<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu">
          <TheToolbarMenu @load="load" @download-json="download" @saveAs="saveAs" @open="open" :show-save="showSave">
          </TheToolbarMenu>
        </q-btn>
        <q-toolbar-title> {{ filename }} </q-toolbar-title>
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
    return {
      filename: '',
    }
  },
  computed: {
    showSave: function () {
      return this.filename != '';
    }
  },
  methods: {
    load () {
      (this.$refs.index as typeof IndexPage).handleLoadClicked();
    },
    download () {
      (this.$refs as typeof IndexPage).index.loadDataFromTimeline();
      saveTextAsFile(JSON.stringify((this.$refs.index as typeof IndexPage).$data));
    },
    saveAs (filename: string) {
      if (filename) {
        this.$data.filename = filename;
        (this.$refs.index as typeof IndexPage).saveAs(filename);
      } else {
        (this.$refs.index as typeof IndexPage).save(this.$data.filename);
      }
    },
    open (filename: string) {
      this.$data.filename = filename;
      (this.$refs.index as typeof IndexPage).open(filename);
    }
  }
})
</script>
