<template>
  <div class="q-pa-lg">
    <q-option-group
      :options="options"
      color="primary"
      v-model="type"
      @update:model-value="update"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ItemType',
  data() {
    return {
      type: this.modelValue,
      options: [
        {
          label: 'Point',
          value: 'point',
        },
        {
          label: 'Box',
          value: 'box',
        },
        {
          label: 'Background',
          value: 'background',
        },
        {
          label: 'Range',
          value: 'range',
        },
      ],
    };
  },
  props: ['modelValue'],
  emits: ['update:modelValue'],
  methods: {
    update(value: string) {
      this.$emit('update:modelValue', value);
    },
  },
});
</script>
