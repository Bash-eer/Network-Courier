<template>
  <DataTable
    :loading="$store.state['CrmFeedback'].followUptableLoad"
    :value="followupData"
    :class="'p-datatable-sm w-full'"
    v-model:filters="filters"
    filterDisplay="menu"
    :showGridlines="false"
    :stripedRows="true"
    :globalFilterFields="[
      'call_received_by',
      'call_type',
      'date_and_time',
      'remarks',
      'user.display_name',
      'createdAt',
    ]"
    responsiveLayout="scroll"
  >
    <Column
      v-for="col of followupColumns"
      :field="col.field"
      :header="col.header"
      :filterField="col.field"
      :key="col.field"
      :showFilterMenu="
        col.header !== 'Actions' &&
        col.header !== 'S. No' &&
        col.header !== 'Remarks' &&
        col.header !== 'Contacts'
          ? true
          : false
      "
      :sortable="
        col.header !== 'Actions' &&
        col.header !== 'S. No' &&
        col.header !== 'Contacts'
          ? true
          : false
      "
      :dataType="col.header === 'Created On' ? 'date' : 'text'"
      :showFilterMatchModes="
        col.header !== 'Actions' && col.header !== 'S. No' ? true : false
      "
    >
      <template #body="slotProps">
        <span
          v-if="col.header === 'Actions'"
          class="flex align-items-center mr-2"
        >
          <div>
            <Button
              icon="pi pi-ellipsis-v"
              type="button"
              @click="toggle($event, slotProps)"
              aria-haspopup="true"
              aria-controls="overlay_menu"
              :class="'p-button-rounded mx-2  updateButton'"
            />
          </div>
        </span>

        <span v-if="col.header == 'S. No'">
          {{ slotProps.data["s_no"] }}
        </span>

        <span v-if="col.header == 'Caller'">
          {{ slotProps.data?.call_received_by || "-" }}
        </span>

        <span v-if="col.header == 'Call Type'">
          {{ slotProps.data?.call_type || "-" }}
        </span>

        <span v-if="col.header == 'Date & Time'">
          <span>{{ dateFormater(slotProps.data.date_and_time) }}</span
          ><br />
          <span class="secondary-info">{{
            timeFormater(slotProps.data.date_and_time)
          }}</span>
        </span>

        <span v-if="col.header == 'Contacts'">
          <span>{{ slotProps.data?.customer_contact || "-" }}</span> <br />
          <span class="secondary-info">{{
            slotProps.data?.customer_contact_no || "-"
          }}</span>
        </span>

        <span v-if="col.header == 'Remarks'">
          {{ slotProps.data?.remarks || "-" }}
        </span>

        <span v-if="col.header == 'Created By'">
          {{ slotProps.data.user?.display_name || "-" }}
        </span>

        <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data["createdAt"]) }}
        </span>
      </template>
      <template #filter="{ filterModel }">
        <span
          v-if="col.header !== 'Created On' && col.header !== 'Date & Time'"
        >
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Search by name"
          />
        </span>
        <span v-if="col.header == 'Created On' || col.header == 'Date & Time'">
          <p class="mb-2"><b>Set a date range:</b></p>
          <Calendars
            :state="filterModel.value"
            v-model="filterModel.value"
            dateFormat="mm/dd/yy"
            placeholder="mm/dd/yyyy"
          />
        </span>
      </template>
      <template #empty> No data found </template>
    </Column>
    <template #empty> No data found </template>
  </DataTable>

  <OverlayPanel
    ref="op"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    style="width: 190px"
  >
    <div class="flex flex-column flex-wrap">
      <div
        v-for="items of customDialData"
        class="flex my-1 menuDivs"
        :key="items.label"
      >
        <div
          class="flex flex-row cursor-pointer"
          @click="menuClicked(items.label)"
        >
          <div class="flex align-items-center justify-content-center mr-2">
            <i :class="items.icon"></i>
          </div>
          <div
            class="
              flex
              align-items-center
              justify-content-center
              hover-blue
              zone-route-custom-speed-dial-text
            "
          >
            {{ items.label }}
          </div>
        </div>
      </div>
    </div>
  </OverlayPanel>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
import OverlayPanel from "primevue/overlaypanel";
import Button from "primevue/button";
import { errhandler } from "@/services/httpClient";

export default {
  name: "FeedbackExpansionFollowupTable",
  components: {
    DataTable,
    Column,
    InputText,
    OverlayPanel,
    Button,
  },
  props: ["expandedData", "customDialData"],
  data: () => ({
    rowData: {},
    filters: null,
    paginationParams: {
      offset: 1,
      limit: 10,
      orderBy: ["createdAt", "ASC"],
    },
  }),
  methods: {
    ...mapActions({
      deleteFeedbackFollowup: "CrmFeedback/deleteFollowupData",
      showFeedbackExpansionDialog: "CrmFeedback/showFollowupDialogAndData",
      fetchFeedbackData: "CrmFeedback/loadFeedbackDataList",
    }),
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY");
        return formattedDate;
      }
    },
    timeFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("hh:mm");
        return formattedDate;
      }
    },
    toggle(event, props) {
      this.$refs.op.toggle(event);
      this.rowData = props.data || {};
    },
    initilaizeFilters() {
      this.filters = {
        call_received_by: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        call_type: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        date_and_time: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.BETWEEN }],
        },
        remarks: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        "user.display_name": {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        createdAt: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.BETWEEN }],
        },
      };
    },
    menuClicked(choice) {
      //TO EDIT THE TABLE ROW
      if (choice == "Edit") {
        this.initialComponent = "FollowupMainDialog";
        const dialogData = {
          displayDialog: true,
          formData: this.rowData,
        };
        this.$emit("showFollowUpFeedback", dialogData);
        this.$refs.op.hide();
      }

      //TO DELETE THE TABLE ROW
      if (choice == "Delete") {
        this.$confirm.require({
          message: "Are you sure you want to Delete?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            this.deleteFeedbackFollowupItem();
          },
        });
      }
    },

    //FOR DELETE FEEDBACK FOLLOWUP ITEM
    async deleteFeedbackFollowupItem() {
      try {
        let data = this.rowData;
        let response = await this.deleteFeedbackFollowup(data);
        if (response && response.status === 200) {
          let info = "Feedback followup deleted successfully";
          this.commonToast("success", "Success", info);
          this.initializeData();
          this.fetchFeedbackData(this.paginationParams);
        } else {
          let info =
            response.data.message || "Failed to delete the feedback followup";
          this.commonToast("error", "Error", info);
        }
        this.$refs.op.hide();
      } catch (err) {
        let toastMsg = await errhandler(err, "error");
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },

    commonToast(severity, summary, message) {
      this.$store.state.CrmSettings.tableLoad = false;
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },
  },
  created() {
    this.initilaizeFilters();
  },
  computed: {
    ...mapGetters({
      followupColumns: "CrmFeedback/getFollowupColumns",
      followupData: "CrmFeedback/getFollowUpTableData",
    }),
  },
};
</script>

<style lang="scss" scoped>
.title-text,
.title-info {
  color: #4e5868;
}
.border-right {
  border-right: 1px solid black;
}
.secondary-info {
  color: #7e84a7;
}
.hover-blue:hover {
  color: #357dea;
}
.updateButton {
  background: none !important;
  border: white !important;
}
.updateButton:hover {
  background: white !important;
}

::v-deep .pi-ellipsis-v {
  color: black !important;
}
::v-deep .p-overlaypanel-flipped:after {
  bottom: 0px !important;
  top: 0px !important;
}
</style>
