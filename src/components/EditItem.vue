<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div v-if="newItem" class="text-h6">New Item</div>
        <div v-else class="text-h6">Update Item</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          label="Content"
          dense
          v-model="item.content"
          autofocus
          :rules="[(val) => !!val || 'Field is required']"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input label="Tooltip" dense v-model="item.title" autofocus />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <ItemType v-model="item.type"></ItemType>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="small-12">Group {{ item.group }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input label="Sub Group" dense v-model="item.subgroup" autofocus />
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn
          v-if="newItem"
          flat
          label="Add item"
          v-close-popup
          @click="addNewItem"
        />
        <q-btn v-else flat label="Save" v-close-popup @click="updateItem" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ItemType from 'src/components/ItemType.vue';
import { Item } from 'src/types/item';

export default defineComponent({
  name: 'EditItem',
  data() {
    return {
      show: false,
      newItem: false,
      item: { content: '', title: '', type: 'box', group: '', subgroup: '' },
    };
  },
  methods: {
    showDialog(item: Item, newItem: boolean) {
      this.$data.show = true;
      this.$data.newItem = newItem;
      this.$data.item = item;
    },
    addNewItem() {
      this.$emit('add-new-item', this.$data.item);
    },
    updateItem() {
      this.$emit('update-item', this.$data.item);
    },
  },
  emits: ['add-new-item', 'update-item'],
  components: { ItemType },
});
</script>
