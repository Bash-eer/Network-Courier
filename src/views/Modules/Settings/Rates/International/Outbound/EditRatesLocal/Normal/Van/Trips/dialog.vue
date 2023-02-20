<template>
  <Dialog
    v-model:visible="showDialog"
    :style="{
      width: '600px',
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <template #header>
      <div>Add</div>
    </template>
    <div class="content">
      <div class="input-wrapper p-o col">
        <div class="label mb-2 flex">
          Region <span class="required-field ml-2">*</span>
        </div>
        <DropDownField
          :data="regionOpts"
          v-model="region"
          :value="region"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.region.$invalid && !isValid,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
          code="code"
        />
      </div>
      <div>Select Trips</div>
      <DataTable
        tableName="tripsTable"
        :tableData="tableData"
        :tableColumns="tableColumns"
        type="bike"
        @selectedRows="selectedRows"
      />
    </div>
    <template #footer>
      <Buttons
        label="Cancel"
        button_class="p-button-sm mr-4 p-button-outlined add-btn custom-add-btn"
        v-on:childToParent="$emit('close')"
      />
      <Buttons
        label="Save"
        button_class="p-button-sm mr-4 add-btn custom-add-btn"
        v-on:childToParent="save"
        :loading="isloading"
      />
    </template>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import DataTable from "./DataTable.vue";
import { mapActions, mapGetters } from "vuex";
import { tripsTable } from "../../../const";
import { errhandler } from "@/services/httpClient";

export default {
  components: {
    Dialog,
    DataTable,
  },
  props: ["show"],
  data() {
    return {
      isValid: true,
      showDialog: this.$props.show,
      tableColumns: tripsTable,
      tableData: [],
      region: "",
      regionOpts: [],
      trips: [],
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      region: { required },
    };
  },
  watch: {
    region() {
      this.getTripsData();
    },
    show(value) {
      this.showDialog = value;
    },
    showDialog(value) {
      if (!value) this.$emit("close");
    },
  },
  computed: {
    ...mapGetters({
      local_edit: "Outbound/Edit/local_edit",
      editData: "Outbound/Edit/editData",
    }),
  },
  methods: {
    ...mapActions({
      getRegion: "Outbound/getRegion",
      getTrips: "Outbound/getTrips",
      updateTrips: "Outbound/Edit/updateTrips",
    }),
    selectedRows(value) {
      this.trips = value;
    },
    async getRegionData() {
      const res = await this.getRegion();

      if (res) {
        res.data.results.map((list) => {
          this.regionOpts.push({ name: list.region, code: list.id });
        });
      }
    },
    async getTripsData() {
      const res = await this.getTrips(this.region);
      this.tableData = [];
      if (res) {
        res.data.results.map((list, idx) => {
          this.tableData.push({
            sl_no: idx + 1,
            from_time: list.from_time,
            to_time: list.to_time,
            trip_days: list.trip_days,
            trip_type: list.trip_type,
            createdAt: list.createdAt,
            id: list.id,
          });
        });
      }
    },
    async save() {
      let payload = [];

      this.trips.map((list) => {
        payload.push({ region_trip_id: list.id });
      });

      try {
        this.isloading = true;
        await this.updateTrips({
          service_id: this.local_edit.type_id,
          trips: payload,
        });
        this.$emit("close");
        this.$emit("save");
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "Details updated successfully",
          life: 3000,
        });
        this.isloading = false;
      } catch (err) {
        this.isloading = false;
        let toastMsg = await errhandler(err);
        this.$toast.add({
          severity: toastMsg.serverity,
          summary: toastMsg.summary,
          detail: toastMsg.msg,
          life: 3000,
        });
      }
    },
  },
  created() {
    this.getRegionData();
  },
};
</script>

<style>
</style>