<!-- eslint-disable semi -->
<template>
  <q-dialog
    transition-show="rotate"
    transition-hide="rotate"
    v-model="show"
    persistent
  >
    <q-card style="width: 1400px; max-width: 90vw">
      <q-card-section>
        <div class="text-h6">JSON data</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-select
          filled
          v-model="filename"
          label="Select file:"
          :options="filterFiles"
          style="width: 250px"
          behavior="menu"
          use-input
          input-debounce="0"
          @filter="filterFn"
          @update:model-value="chooseFile"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="json" filled autogrow type="textarea" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" v-close-popup />
        <q-btn flat label="Load" color="primary" v-close-popup @click="load" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { api } from 'boot/axios'
export default defineComponent({
  name: 'LoadJson',
  data () {
    return {
      show: false,
      json: '',
      files: [''],
      filterFiles: [''],
      filename: ''
    }
  },
  mounted () {
   this.loadData();
  },
  methods: {
    showDialog (json: string) {
      this.$data.show = true
      this.$data.json = json
      this.loadData();
    },
    load () {
      this.$emit('load-json', this.$data.json)
    },
    loadData () {
    api.get('/files')
      .then((response) => {
        this.$data.files = response.data.data
      })
      .catch(() => {
        console.log('error');
        /*
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          icon: 'report_problem'
        })
        */
      })
    },
    filterFn (val:string, update: (arg0: { (): void; (): void; }) => void) {
      if (val === '') {
        update(() => {
          this.$data.filterFiles = this.$data.files
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.$data.filterFiles = this.$data.files.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    chooseFile(file: string) {
      api.get('/files/' + file)
      .then((response) => {
        this.$data.json = response.data.data
      })
      .catch(() => {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          icon: 'report_problem'
        })
      })
    },
  },
  emits: ['load-json']
})
</script>
