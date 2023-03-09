<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px">
      <q-form ref="form">
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
        <q-card-section class="q-pt-none"  label="Tooltip">
          <p>Tooltip</p>
          <q-editor
            label="Tooltip"
            v-model="item.title"
            :dense="$q.screen.lt.md"
            :toolbar="[
              [
                {
                  icon: $q.iconSet.editor.align,
                  fixedLabel: true,
                  list: 'only-icons',
                  options: ['left', 'center', 'right', 'justify']
                },'bold', 'italic', 'strike', 'underline', 'subscript', 'superscript', 'removeFormat'
              ],
              [
                {
                  label: $q.lang.editor.fontSize,
                  icon: $q.iconSet.editor.fontSize,
                  fixedLabel: true,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'size-1',
                    'size-2',
                    'size-3',
                    'size-4',
                    'size-5',
                    'size-6',
                    'size-7'
                  ]
                },
                {
                  label: $q.lang.editor.defaultFont,
                  icon: $q.iconSet.editor.font,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'default_font',
                    'arial',
                    'arial_black',
                    'comic_sans',
                    'courier_new',
                    'impact',
                    'lucida_grande',
                    'times_new_roman',
                    'verdana'
                  ]
                },
              ],
              ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

              ['undo', 'redo', 'viewsource']
            ]"
            :fonts="{
              arial: 'Arial',
              arial_black: 'Arial Black',
              comic_sans: 'Comic Sans MS',
              courier_new: 'Courier New',
              impact: 'Impact',
              lucida_grande: 'Lucida Grande',
              times_new_roman: 'Times New Roman',
              verdana: 'Verdana'
            }"
          ></q-editor>
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
        <q-card-section class="q-pt-none">
          <q-select
            v-model="item.className"
            label="Color"
            :options="colors"
            style="width: 250px"
            behavior="menu"
          />
        </q-card-section>
      </q-form>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn
          v-if="newItem"
          flat
          label="Add item"
          @click="addNewItem"
        />
        <q-btn v-else flat label="Save" @click="updateItem" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ItemType from 'src/components/ItemType.vue';
import { Item, colors } from 'src/types/item';

export default defineComponent({
  name: 'EditItem',
  data() {
    return {
      show: false,
      newItem: false,
      item: { content: '', title: '', type: 'box', group: '', subgroup: '', className: '', start: new Date(), end: new Date() },
      start: '',
      end: '',
      colors: colors,
    };
  },
  methods: {
    showDialog(item: Item, newItem: boolean) {
      this.$data.show = true;
      this.$data.newItem = newItem;
      this.$data.item = item;
    },
    addNewItem() {
      (this.$refs.form as any).validate().then((success: boolean) => {
        if (success) {
          this.$emit('add-new-item', this.$data.item);
          this.show = false;
        }
      });

    },
    updateItem() {
      (this.$refs.form as any).validate().then((success: boolean) => {
        if (success) {
          this.$emit('update-item', this.$data.item);
          this.show = false;
        }
      });
    },
  },
  emits: ['add-new-item', 'update-item'],
  components: { ItemType },
});
</script>
