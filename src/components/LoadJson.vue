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
export default defineComponent({
  name: 'LoadJson',
  data () {
    return {
      show: false,
      json: ''
    }
  },
  methods: {
    showDialog (json: string) {
      this.$data.show = true
      this.$data.json = json
    },
    load () {
      this.$emit('load-json', this.$data.json)
    }
  },
  emits: ['load-json']
})
</script>
