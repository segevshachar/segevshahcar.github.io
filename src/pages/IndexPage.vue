<template>
  <div class="home">
    <div class="row">
      <div class="small-12 text-center" style="margin-left: 40px">
        <h4>{{ this.$data.title }}: {{ this.zoomDisplay }} </h4>
      </div>
      <div id="chart4" style="height: 500px; width: 100%"></div>
    </div>
    <EditItem
      ref="editItem"
      @add-new-item="handleAddItem"
      @update-item="handleUpdateItem"
    ></EditItem>
    <EditGroup
      ref="editGroup"
      @add-new-group="handleAddGroup"
      @update-group="handleUpdateGroup"
    ></EditGroup>
    <EditZoom ref="editZoom" @update-zoom="refresh"></EditZoom>
    <LoadJson ref="loadJson" @load-json="handleLoadJson"></LoadJson>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Timeline } from 'vis-timeline/standalone'
import 'vis-timeline/styles/vis-timeline-graph2d.css'
import EditItem from 'src/components/EditItem.vue'
import EditGroup from 'src/components/EditGroup.vue'
import LoadJson from 'src/components/LoadJson.vue'
import EditZoom from 'src/components/EditZoom.vue'
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
      zoomIndex: -1,
      zoom_data:[
        {
          months: 12,
          item_data: [
          {
            content: 'Hypertension 12',
            start: '2020-01-01',
            end: '2020-11-31',
            group: 'diseases'
          },
          {
            content: 'Diabetes 12',
            start: '2020-01-01',
            end: '2020-05-31',
            group: 'diseases'
          }],
        },
        {
          months: 6,
          item_data: [
          {
            content: 'Hypertension 6',
            start: '2020-02-01',
            end: '2020-03-31',
            group: 'diseases'
          },
          {
            content: 'Diabetes6',
            start: '2020-01-01',
            end: '2020-02-31',
            group: 'diseases'
          }],
        }],
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
          subgroupStack: true
        },
        {
          id: 'diagnosis',
          content: 'Diagnosis',
        },
        {
          id: 'diseases',
          content: 'Diseases',
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
    timeline.on('contextmenu', this.handleSellect);
    timeline.on('rangechanged', this.rangechanged);
    this.zoom_data.sort((a, b) => a.months > b.months ? 1 : -1);
  },
  methods: {
    deep_copy(input) {
      return JSON.parse(JSON.stringify(input));
    },
    handleResetClicked () {
      timeline.setWindow(
        new Date(this.$data.from_date),
        new Date(this.$data.to_date)
      )
    },
    loadDataFromTimeline () {
      const items = timeline.itemsData.get();
      if (this.zoomIndex == -1) {
        this.item_data = items;
      } else {
        this.zoom_data[this.zoomIndex].item_data = items;
      }
      this.$data.group_data = timeline.groupsData.get();
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
      if (properties.what == 'item') {
        const item = timeline.itemsData
          .get()
          .find((i) => i.id === properties.item)
        item.type = item.type || 'range'
        item.title = item.title || '';
        this.$refs.editItem.showDialog({...item}, false)
      } else if (properties.what == 'background') {
        const item = timeline.itemsData.get()
          .find((i) => i.type == 'background' && i.start <= properties.time && i.end >= properties.time)

        if (item) {
          item.type = item.type || 'background'
          item.title = item.title || '';
          this.$refs.editItem.showDialog({...item}, false)
        } else {
        let item = {};
        item.group = properties.group;
        item.start = properties.time;
        item.content = '';
        item.title = '';
        item.type = 'range';
        this.$refs.editItem.showDialog(item, true)
        }
      } else if (properties.what == 'group-label') {
        const group = timeline.groupsData
          .get()
          .find((i) => i.id === properties.group)
        if (group && group.id) {
          this.$refs.editGroup.showDialog({...group}, false)
        }
      } else if (!properties.what) {
        const group = {};
        this.$refs.editGroup.showDialog(group, true)
      }

      properties.event.preventDefault();
    },
    rangechanged (properties) {
      const months = (properties.end.getTime() - properties.start.getTime()) / (1000*60*60*24*30);
      const currentZoomIndex = this.zoomIndex;
      this.zoomIndex = this.zoom_data.findIndex((i) => i.months > months);
      if (currentZoomIndex != this.zoomIndex) {
        const items = this.deep_copy(timeline.itemsData.get());
        if (currentZoomIndex == -1) {
          this.item_data = items;
        } else {
          this.zoom_data[currentZoomIndex].item_data = items;
        }
        const item_data = this.zoomIndex == -1 ? this.item_data : this.zoom_data[this.zoomIndex].item_data;
        timeline.setItems(this.deep_copy(item_data));
      }
    },
    prepareItem(item) {
      const type = item.type
      const end = item.end
        ? item.end
        : type === 'point' || type === 'box'
          ? undefined
          : new Date(item.start.getTime() + 86400000 * 30)
      const group = type === 'background' ? undefined : item.group || this.group_data[0].id;
      const subgroup = type === 'background' ? undefined : item.subgroup;
      const newItem = {
        content: item.content,
        title: item.title,
        start: item.start,
        end,
        group,
        type,
        subgroup: subgroup,
        className: item.className,
      }
      return newItem;
    },
    handleAddItem (item) {
      const newItem = this.prepareItem(item);
      const newItems = timeline.itemsData.get()
      newItems.push(newItem)
      timeline.setItems(newItems)
    },
    handleAddGroup (group) {
      const newItem = group;
      const newItems = timeline.groupsData.get()
      newItems.push(newItem)
      timeline.setGroups(newItems)
    },

    handleUpdateItem (item) {
      const newItems = timeline.itemsData.get()
      const index = newItems.findIndex((i) => i.id === item.id)
      const newItem = this.prepareItem(item);
      newItems[index] = newItem
      timeline.setItems(newItems)
    },
    handleUpdateGroup (group) {
      const newGroups = timeline.groupsData.get();
      const index = newGroups.findIndex((i) => i.id === group.id);
      newGroups[index] = group;
      timeline.setGroups(newGroups);
    },
    handleAddItemClick (item, callback) {
      callback(null)
      item.content = ''
      item.title = ''
      item.type = 'range'
      this.$refs.editItem.showDialog({...item}, true)
    },
    handleLoadJson (json, filename) {
      this.$data.filename = filename;
      const data = JSON.parse(json)
      this.$data.from_date = data.from_date
      this.$data.to_date = data.to_date
      this.$data.title = data.title
      this.$data.item_data = data.item_data
      this.$data.group_data = data.group_data
      this.$data.zoom_data = data.zoom_data

      if (this.zoom_data) {
        this.$data.zoom_data.sort((a, b) => a.months > b.months ? 1 : -1);
        const months = ((new Date(data.to_date)).getTime() - (new Date(data.from_date)).getTime()) / (1000*60*60*24*30);
        this.$data.zoomIndex = this.$data.zoom_data.findIndex((i) => i.months > months);
      } else {
        this.zoomIndex = -1;
      }

      const item_data = this.zoomIndex == -1 ? data.item_data : data.zoom_data[this.zoomIndex].item_data;
      timeline.setItems(item_data);
      timeline.setGroups(data.group_data);
      timeline.setWindow(
        new Date(this.$data.from_date),
        new Date(this.$data.to_date)
      );
    },
    editZoom () {
      this.loadDataFromTimeline();
      this.$refs.editZoom.showDialog(this.$data.zoom_data);
    },
    refresh (zoom_data) {
      this.$data.zoom_data = zoom_data;

      if (this.zoom_data) {
        this.$data.zoom_data.sort((a, b) => a.months > b.months ? 1 : -1);
        const window = timeline.getWindow();
        const months = (window.end.getTime() - window.start.getTime()) / (1000*60*60*24*30);
        this.zoomIndex = this.zoom_data.findIndex((i) => i.months > months);
      } else {
        this.zoomIndex = -1;
      }
      const item_data = this.zoomIndex == -1 ? this.item_data : this.zoom_data[this.zoomIndex].item_data;
      timeline.setItems(this.deep_copy(item_data));
    },

  },
  computed: {
    zoomDisplay () {
      return this.zoomIndex == -1 ? 'Overview' : 'Zoom ' + this.zoom_data[this.zoomIndex].months + ' months';
    }
  },
  components: { EditItem, LoadJson, EditGroup, EditZoom }
})
</script>
