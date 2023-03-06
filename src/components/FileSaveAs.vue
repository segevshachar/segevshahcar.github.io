<template>
  <q-dialog
    v-model="show"
    persistent
  >
    <q-card style="width: 1400px; max-width: 90vw">
      <q-card-section>
        <div class="text-h6">Save As...</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input v-model="filename" filled label="Filename" :rules="[val => !!val || 'Field is required']" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" v-close-popup />
        <q-btn flat label="Save" color="primary" @click="save" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FileSaveAs',
  data () {
    return {
      show: false,
      filename: ''
    }
  },
  methods: {
    showDialog () {
      this.$data.show = true;
    },
    save () {
      if (this.$data.filename) {
        this.$data.show = false;
        this.$emit('saveAs', this.$data.filename)
      }
    },
  },
  emits: ['saveAs']
})
</script>
