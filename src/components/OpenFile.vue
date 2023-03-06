<!-- eslint-disable semi -->
<template>
  <q-dialog
    v-model="show"
    persistent
  >
    <q-card style="width: 400px; max-width: 90vw">
      <q-card-section>
        <div class="text-h6">Open File</div>
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
          :rules="[val => !!val || 'Field is required']"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" v-close-popup />
        <q-btn flat label="Open" color="primary" @click="open" />
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
      files: [''],
      filterFiles: [''],
      filename: ''
    }
  },
  methods: {
    showDialog () {
      this.loadData();
    },
    open () {
      if (this.filename) {
        this.show = false;
        this.$emit('open-file', this.filename);
      }
    },
    loadData () {
      api.get('/files')
        .then((response) => {
          this.$data.files = response.data.data
          this.$data.filename = this.$data.files[0];
          this.$data.show = true
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
  },
  emits: ['open-file']
})
</script>
