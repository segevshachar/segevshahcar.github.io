<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px">
      <q-form ref="form">
        <q-card-section>
          <div v-if="newGroup" class="text-h6">New Group</div>
          <div v-else class="text-h6">Update Group</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            label="ID"
            dense
            v-model="group.id"
            autofocus
            v-bind:readonly="!newGroup"
            :rules="[(val) => !!val || 'Field is required']"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            label="Content"
            dense
            v-model="group.content"
            autofocus
            :rules="[(val) => !!val || 'Field is required']"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-checkbox v-model="group.subgroupStack" label="Sub Group Stack" />
        </q-card-section>
      </q-form>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn
          v-if="newGroup"
          flat
          label="Add item"
          @click="addNewGroup"
        />
        <q-btn v-else flat label="Save" @click="updateGroup" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent,  } from 'vue';
import { Group, colors } from 'src/types/item';

export default defineComponent({
  name: 'EditGroup',
  data() {
    return {
      show: false,
      newGroup: false,
      group: { id: '', content: '', subgroupStack: true},
      colors: colors,
    };
  },
  methods: {
    showDialog(group: Group, newGroup: boolean) {
      this.$data.show = true;
      this.$data.newGroup = newGroup;
      this.$data.group = group;
    },
    addNewGroup() {
      (this.$refs.form as any).validate().then((success: boolean) => {
        if (success) {
          this.$emit('add-new-group', this.$data.group);
          this.show = false;
        }
      });
    },
    updateGroup() {
      (this.$refs.form as any).validate().then((success: boolean) => {
        if (success) {
          this.$emit('update-group', this.$data.group);
          this.show = false;
        }
      });
    },
  },
  emits: ['add-new-group', 'update-group'],
});
</script>
