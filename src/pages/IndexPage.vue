<template>
  <div class="home">
    <div class="row">
      <div class="small-12 text-center" style="margin-left: 40px">
        <h4>{{ this.$data.title }}</h4>
      </div>
      <div id="chart4" style="height: 700px; width: 100%"></div>
    </div>
    <div class="q-pa-md">
      <div class="row">
        <div class="col" style="max-width: 200px margin: 50px;">
          <q-input
            label="From"
            filled
            v-model="from_date"
            :rules="[(val) => Date.parse(val) || 'Invalid date.']"
            input-class="cursor-pointer"
            mask="####-##-##"
          >
            <q-popup-proxy ref="qDateProxy" :breakpoint="0" behavior="menu">
              <q-date
                v-model="from_date"
                minimal
                @update:model-value="$refs.qDateProxy.hide()"
                no-unset
                mask="YYYY-MM-DD"
              >
                <div class="row items-center justify-end">
                  <q-btn
                    v-close-popup
                    label="Close"
                    color="primary"
                    flat
                  ></q-btn>
                </div>
              </q-date>
            </q-popup-proxy>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer"></q-icon>
            </template>
          </q-input>
        </div>
        <div class="col">
          <q-input
            label="To"
            filled
            v-model="to_date"
            :rules="[(val) => Date.parse(val) || 'Invalid date.']"
            input-class="cursor-pointer"
            mask="####-##-##"
          >
            <q-popup-proxy ref="qDateProxy" :breakpoint="0" behavior="menu">
              <q-date
                v-model="to_date"
                minimal
                @update:model-value="$refs.qDateProxy.hide()"
                no-unset
                mask="YYYY-MM-DD"
              >
                <div class="row items-center justify-end">
                  <q-btn
                    v-close-popup
                    label="Close"
                    color="primary"
                    flat
                  ></q-btn>
                </div>
              </q-date>
            </q-popup-proxy>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer"></q-icon>
            </template>
          </q-input>
        </div>
        <div class="col">
          <q-btn
            color="primary"
            label="Reset"
            @click="handleResetClicked"
            padding="15px 30px"
          />
        </div>
      </div>
    </div>
    <EditItem
      ref="editItem"
      @add-new-item="handleAddItem"
      @update-item="handleUpdateItem"
    ></EditItem>
    <LoadJson ref="loadJson" @load-json="handleLoadJson"></LoadJson>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Timeline } from 'vis-timeline/standalone'
import 'vis-timeline/styles/vis-timeline-graph2d.css'
import EditItem from 'src/components/EditItem.vue'
import LoadJson from 'src/components/LoadJson.vue'
import { dateToyyyymmdd } from 'src/util/date';
import { api } from 'boot/axios'

let timeline

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      filename: 'try.json',
      title: 'Prostate Cancer Disease Progression',
      from_date: '2020-01-01',
      to_date: '2022-12-31',
      item_data: [
        {
          content: 'Hypertension',
          start: '2010-01-01',
          end: '2022-12-31',
          group: 'diseases'
        },
        {
          content: 'Diabetes',
          start: '2010-01-01',
          end: '2022-12-31',
          group: 'diseases'
        },
        {
          content: 'PSA 47',
          start: '2020-01-30',
          type: 'point',
          group: 'diagnosis'
        },
        {
          content: 'Reoccurrence Castration-Resistant',
          start: '2020-07-16',
          type: 'point',
          group: 'diagnosis'
        },
        {
          content: 'Treatment-Resistant',
          start: '2021-07-16',
          type: 'point',
          group: 'diagnosis'
        },
        {
          content: 'PET CT Bone Metastasis',
          start: '2022-07-16',
          type: 'point',
          group: 'diagnosis'
        },
        {
          content: 'Anemia (HgB<6) Iron Deficiency',
          start: '2022-10-16',
          type: 'point',
          group: 'diagnosis'
        },
        {
          content: 'Hormonal Castration',
          start: '2020-02-01',
          end: '2020-06-30',
          group: 'treatment',
          subgroup: '3'
        },
        {
          content: 'Treatment',
          start: '2020-08-15',
          end: '2021-10-15',
          group: 'treatment',
          subgroup: '3'
        },
        {
          content: 'Taxoter',
          start: '2020-02-15',
          end: '2020-04-15',
          group: 'treatment',
          subgroup: '2'
        },
        {
          content: 'Radiation Therapy',
          start: '2020-02-15',
          end: '2020-06-15',
          group: 'treatment',
          subgroup: '1'
        },
        {
          id: 11,
          content: 'Radiation Therapy',
          title: 'Radiation Therapy title',
          start: '2021-06-15',
          end: '2021-07-15',
          group: 'treatment',
          subgroup: '1'
        }
      ],
      group_data: [
        {
          id: 'treatment',
          content: 'Treatment',
          title: 'Treatment title',
          subgroupStack: true
        },
        {
          id: 'diagnosis',
          content: 'Diagnosis'
        },
        {
          id: 'diseases',
          content: 'Diseases'
        }
      ]
    }
  },
  mounted () {
    const chart4 = document.getElementById('chart4')
    const options = {
      editable: true,
      itemsAlwaysDraggable: {
        item: true,
        range: true
      },
      start: new Date(this.$data.from_date),
      end: new Date(this.$data.to_date),
      onAdd: this.handleAddItemClick,
    }
    // Create a Timeline
    timeline = new Timeline(
      chart4,
      this.$data.item_data,
      this.$data.group_data,
      options
    )
    timeline.on('contextmenu', this.handleSellect)
  },
  methods: {
    handleResetClicked () {
      timeline.setWindow(
        new Date(this.$data.from_date),
        new Date(this.$data.to_date)
      )
    },
    loadDataFromTimeline () {
      const items = timeline.itemsData.get()
      this.$data.item_data = items
      const window = timeline.getWindow();
      this.$data.from_date = dateToyyyymmdd(window.start);
      this.$data.to_date = dateToyyyymmdd(window.end);
    },
    saveAs (filename) {
      this.loadDataFromTimeline();

      const data = this.$data;
      api.post('/files', { id: filename, data: JSON.stringify(data) })
      .then(() => {
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Saved',
          icon: 'report_problem'
        })
      })
      .catch((err) => {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Save failed:' + err,
          icon: 'report_problem'
        })
      })
    },
    save (filename) {
      this.loadDataFromTimeline();

      const data = this.$data;
      api.put('/files/'+ filename, { data: JSON.stringify(data) })
      .then(() => {
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Saved',
          icon: 'report_problem'
        })
      })
      .catch((err) => {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Save failed:' + err,
          icon: 'report_problem'
        })
      })
    },
    handleLoadClicked () {
      this.loadDataFromTimeline();
      this.$refs.loadJson.showDialog(JSON.stringify(this.$data))
    },
    open (filename) {
      api.get('/files/' + filename)
      .then((response) => {
        this.handleLoadJson(response.data.data, filename);
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
    handleSellect (properties) {
      if (!properties.item) {
        let item = {};
        item.group = properties.group;
        item.start = properties.time;
        item.content = '';
        item.type = 'range';
        this.$refs.editItem.showDialog(item, true)

      } else {
      const item = timeline.itemsData
        .get()
        .find((i) => i.id === properties.item)
      item.type = item.type || 'range'
      this.$refs.editItem.showDialog(item, false)
      }
      properties.event.preventDefault();
    },
    handleAddItem (item) {
      const type = item.type
      const end = item.end
        ? item.end
        : type === 'point' || type === 'box'
          ? undefined
          : new Date(item.start.getTime() + 86400000 * 30)
      const group = type === 'background' ? undefined : item.group
      const newItem = {
        content: item.content,
        title: item.title,
        start: item.start,
        end,
        group,
        type,
        subgroup: item.subgroup,
        className: item.className,
      }
      const newItems = timeline.itemsData.get()
      newItems.push(newItem)
      timeline.setItems(newItems)
    },
    handleUpdateItem (item) {
      const newItems = timeline.itemsData.get()
      const index = newItems.findIndex((i) => i.id === item.id)

      const type = item.type
      const end = item.end
        ? item.end
        : type === 'point' || type === 'box'
          ? undefined
          : new Date(item.start.getTime() + 86400000 * 30)
      const group = type === 'background' ? undefined : item.group
      const newItem = {
        content: item.content,
        title: item.title,
        start: item.start,
        end,
        group,
        type,
        subgroup: item.subgroup,
        className: item.className,
      }

      newItems[index] = newItem
      timeline.setItems(newItems)
    },
    handleAddItemClick (item, callback) {
      callback(null)
      item.content = ''
      item.type = 'range'
      this.$refs.editItem.showDialog(item, true)
    },
    handleLoadJson (json, filename) {
      this.$data.filename = filename;
      const data = JSON.parse(json)
      this.$data.from_date = data.from_date
      this.$data.to_date = data.to_date
      this.$data.title = data.title
      this.$data.item_data = data.item_data
      this.$data.group_data = data.group_data
      timeline.setItems(data.item_data);
      timeline.setGroups(data.group_data);
      timeline.setWindow(
        new Date(this.$data.from_date),
        new Date(this.$data.to_date)
      );
    }
  },
  components: { EditItem, LoadJson }
})
</script>
