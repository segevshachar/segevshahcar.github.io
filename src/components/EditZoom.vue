<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px">
      <q-table
        title="Zooms"
        :rows="rows"
        :columns="columns"
        row-key="id"
        hide-bottom
      >
        <template v-slot:top>
          <q-btn color="secondary" label="Add zoom" @click="addRow" />
          <q-btn class="q-ml-sm" color="secondary" label="Remove last row" @click="removeRow" />
          <q-space />
        </template>
        <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="months" :props="props">
            {{ props.row.months }}
            <q-popup-edit v-model="props.row.months"  title="Update months" buttons v-slot="scope">
              <q-input v-model="scope.value" type="number" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="numOfItems" :props="props">{{ props.row.numOfItems }}</q-td>
        </q-tr>
      </template>
      </q-table>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Save" @click="updateZoom" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { QTableProps } from 'quasar';

export default defineComponent({
  name: 'EditZoom',
  data() {
    return {
      show: false,
      zoom_data: [{ months: 0, item_data: [{}]}],
      rows: [{id: 0, months: 1, numOfItems: 0}],
      columns: [
        { name: 'months', align: 'center', label: 'Months', field: (row: any) => row.months},
        { name: 'numOfItems', align: 'center', label: 'numebr of Items', field: 'numOfItems'},
      ] as QTableProps['columns'],
    };
  },
  methods: {
    showDialog(zoom_data: any[]) {
      this.$data.show = true;
      this.$data.zoom_data = zoom_data;
      this.$data.rows = zoom_data.map((row, index) => {
        return {
          id: index,
          months: row.months,
          numOfItems: row.item_data.length,
        }
      })
    },
    addNewZoom(months: number) {
      this.$data.zoom_data.push({months: months, item_data: [{}]})
    },
    addRow () {
      const row = {
        id: this.$data.rows.length + 1,
        months: 0,
        numOfItems:0
       }
      this.$data.rows.push(row);
    },

    removeRow () {
      this.$data.rows.pop();
    },
    updateZoom () {
      const new_items = this.rows
        .map((r, i) => {
          const item_data = i < this.zoom_data.length ? this.zoom_data[i].item_data : [];
          return { months: Number(r.months), item_data}
        });
      this.$emit('update-zoom',new_items)
    }
  },
  emits: ['update-zoom'],
});
</script>
