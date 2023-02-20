<template>
  <DataTable
    :value="data"
    editMode="cell"
    @cell-edit-complete="onCellEditComplete"
    class="editable-cells-table"
    responsiveLayout="scroll"
  >
    <ColumnGroup type="header">
      <Row>
        <Column header="Trips" :rowspan="4" :colspan="1" />
        <!-- <Column header="Sale Rate" :colspan="4" /> -->
      </Row>
      <Row>
        <!-- <Column header="Sales" :colspan="2" /> -->
        <Column style="display: none; width: 150px" header="" :colspan="6" />
      </Row>

      <Row>
        <Column
          style="font-size: 13px; width: 150px"
          header="Before Delivery Time"
          :colspan="3"
        />
        <Column
          style="font-size: 13px; width: 150px"
          header="Returning schedule Time (For Direction Collect)"
          :colspan="3"
        />
        <Column
          style="font-size: 13px; width: 150px"
          header="Returning schedule Time (For Deliver & Collect)"
          :colspan="3"
        />
      </Row>
      <Row>
        <Column
          style="font-size: 12px; width: 120px"
          header="Normal"
          :sortable="false"
          field="before_delivery_normal_time"
        />
        <Column
          style="font-size: 12px; width: 120px"
          header="Urgent"
          :sortable="false"
          field="before_delivery_urgent_time"
        />
        <Column
          style="font-size: 12px; width: 60px"
          header="Next Day"
          :sortable="false"
          field="before_delivery_select"
        />
        <!--  -->
        <Column
          style="font-size: 12px; width: 120px"
          header="Normal"
          :sortable="false"
          field="return_direction_normal_time"
        />
        <Column
          style="font-size: 12px; width: 120px"
          header="Urgent"
          :sortable="false"
          field="return_direction_urgent_time"
        />
        <Column
          style="font-size: 12px; width: 60px"
          header="Next Day"
          :sortable="false"
          field="return_direction_select"
        />
        <!--  -->
        <Column
          style="font-size: 12px; width: 120px"
          header="Normal"
          :sortable="false"
          field="return_delivery_normal_time"
        />
        <Column
          style="font-size: 12px; width: 120px"
          header="Urgent"
          :sortable="false"
          field="return_delivery_urgent_time"
        />
        <Column
          style="font-size: 12px; width: 60px"
          header="Next Day"
          :sortable="false"
          field="return_delivery_select"
        />
      </Row>
    </ColumnGroup>

    <Column field="trip_no" />
    <Column
      field="before_delivery_normal_time"
      style="width: 120px; height: 50px"
    >
      <template #editor="{ data, field }">
        <Calendar
          v-model="data[field]"
          :showTime="true"
          autofocus
          :timeOnly="true"
        />
      </template>
    </Column>
    <Column
      field="before_delivery_urgent_time"
      style="width: 120px; height: 50px"
    >
      <template #editor="{ data, field }">
        <Calendar
          v-model="data[field]"
          :showTime="true"
          autofocus
          :timeOnly="true"
          style="height: 30px"
        />
      </template>
    </Column>
    <Column field="before_delivery_select" style="width: 60px; height: 50px">
      <template #body="slotProps">
        <Checkbox
          v-model="slotProps.data['before_delivery_select']"
          :binary="true"
        />
      </template>
      <template #editor="{ data, field }">
        <Checkbox v-model="data[field]" :binary="true" />
      </template>
    </Column>
    <!--  -->
    <Column
      field="return_direction_normal_time"
      style="width: 120px; height: 50px"
    >
      <template #editor="{ data, field }">
        <Calendar
          v-model="data[field]"
          :showTime="true"
          autofocus
          :timeOnly="true"
        />
      </template>
    </Column>
    <Column
      field="return_direction_urgent_time"
      style="width: 120px; height: 50px"
    >
      <template #editor="{ data, field }">
        <Calendar
          v-model="data[field]"
          :showTime="true"
          autofocus
          :timeOnly="true"
        />
      </template>
    </Column>
    <Column field="return_direction_select" style="width: 60px; height: 50px">
      <template #body="slotProps">
        <Checkbox
          v-model="slotProps.data['return_direction_select']"
          :binary="true"
        />
      </template>
      <template #editor="{ data, field }">
        <Checkbox v-model="data[field]" :binary="true" />
      </template>
    </Column>
    <!--  -->
    <Column
      field="return_delivery_normal_time"
      style="width: 120px; height: 50px"
    >
      <template #editor="{ data, field }">
        <Calendar
          v-model="data[field]"
          :showTime="true"
          autofocus
          :timeOnly="true"
        />
      </template>
    </Column>
    <Column
      field="return_delivery_urgent_time"
      style="width: 120px; height: 50px"
    >
      <template #editor="{ data, field }">
        <Calendar
          v-model="data[field]"
          :showTime="true"
          autofocus
          :timeOnly="true"
        />
      </template>
    </Column>
    <Column field="return_delivery_select" style="width: 60px; height: 50px">
      <template #body="slotProps">
        <Checkbox
          v-model="slotProps.data['return_delivery_select']"
          :binary="true"
        />
      </template>
      <template #editor="{ data, field }">
        <Checkbox v-model="data[field]" :binary="true" />
      </template>
    </Column>
  </DataTable>
</template>

<script>
import Calendar from "primevue/calendar";
import DataTable from "primevue/datatable";
import Row from "primevue/row";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import moment from "moment";
import Checkbox from "primevue/checkbox";
export default {
  props: ["data"],
  components: {
    DataTable,
    Row,
    Column,
    ColumnGroup,
    Calendar,
    Checkbox,
  },
  data() {
    return {
      table_data: [],
    };
  },
  methods: {
    onCellEditComplete(event) {
      let { data, newValue, field } = event;
      if (
        field == "before_delivery_select" ||
        field == "return_direction_select" ||
        field == "return_delivery_select"
      ) {
        data[field] = newValue;
      } else {
        if (newValue != "00:00") {
          data[field] = moment(newValue).format("HH:mm");
        }
      }
    },
  },
};
</script>

<style></style>
