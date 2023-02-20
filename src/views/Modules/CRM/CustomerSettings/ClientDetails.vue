<template>
  <div class="m-4">
    <div class="card flex-column">
      <div class="flex flex-row flex-wrap w-50">
        <div class="flex p-4 h-4rem font-bold border-round m-2">
          Client Details
        </div>
      </div>
      <div class="flex flex-row align-items-center mb-3 mx-5">
        <div
          v-for="i of base_data"
          :key="i.key"
          class="p-field-radiobutton flex mr-3"
        >
          <RadioButton
            name="category"
            :value="i.name"
            v-model="select_type"
            @change="setTYpe($event, i.name)"
          />
          <label
            :class="`p-accordion-header-text mt-1 ml-2 ${
              select_type == i.name ? 'primary-color' : ''
            }`"
            :for="i.key"
            >{{ i.name }}</label
          >
        </div>
      </div>
      <div class="flex row align-items-center mb-3">
        <span class="ml-4 col-9">
          <div class="p-inputgroup input-grp-he">
            <InputText
              :placeholder="`Search by ${
                select_type == 'By All' ? 'company' : 'customer'
              }`"
              type="text"
              v-model="searcher"
              @input="globalSearcher"
            />
            <span class="p-inputgroup-addon cursor-pointer search-bg"
              ><i
                @click="SearchTable"
                class="color-wi fa fa-search font-size-14"
              ></i
            ></span>
          </div>
        </span>

        <Buttons
          label="Import"
          button_class="buttonClass-customer-launch col-1"
        />
        <Buttons
          label="Export"
          button_class="buttonClass-customer-launch col-1 ml-2"
        />
      </div>
    </div>
    <DataTable
      tableName="ClientDataTable"
      tableDataName="ClientDataTable"
      :tableData="table_data?.rows ?? []"
      :tableColumns="select_type == 'By All' ? table_column : table_column_cus"
      :expansionOption="false"
      :overlayData="select_type == 'By All' ? ovarlay_data : ovarlay_data_cus"
      tableClass="p-datatable-sm QuotationTabTable"
      @seletedMainRows="mainRows"
      :section="select_type"
      @seletedSubRows="subRows"
      @row-click="rowclick"
      :totalRecords="table_data.count ?? 0"
    />
  </div>
  <CommonDialog
    :dialogComponent="$store.state['commonStore'].dialogComponent"
  />
</template>

<script>
import RadioButton from "primevue/radiobutton";
import { crmClState, crm_Client } from "../../../../store/modules/CRM/helper";
import { genaralAct } from "../../../../store/helper";
import DataTable from "../../../../components/CRM/TableComponents/dataTables.vue";
import CommonDialog from "../../../../components/Reusables/Dialog/Dialog.vue";
import { mapMutations } from "vuex";
import InputText from "primevue/inputtext";
export default {
  name: "ClientDetails",
  components: { DataTable, RadioButton, CommonDialog, InputText },

  data() {
    return {
      renderKey: 1,
      searcher: "",
      main_table_rows: [],
      sub_table_rows: [],
      select_type: "By All",
      base_data: [
        { name: "By All", key: "By All" },
        { name: "By Customer", key: "By Customer" },
      ],
    };
  },

  validations() {},

  methods: {
    ...mapMutations({
      updateBreadCrumbAndTitle: "users/updateBreadCrumbAndTitle",
    }),
    ...genaralAct,
    ...crm_Client,
    addClient() {
      this.setReset({ customer_data: null });
      this.genaralOpenD({
        dialogDetails: {
          dialogName: "CRMClientDialog",
          dialogHeader: "Add Client",
        },
      });
    },
    globalSearcher() {
      if (this.searcher == "") {
        this.apiCall(this.select_type);
      }
    },
    async setTYpe(e, i) {
      this.setReset({ table_data: [], action_type: i });
      this.apiCall(i);
      this.renderKey++;
    },
    async SearchTable() {
      this.apiCall(this.select_type);
    },
    async apiCall(i) {
      if (i == "By All") {
        await this.getAllClient({
          pageNo: 1,
          PageSize: 10,
          toast: this.$toast,
          search: this.searcher,
        });
      } else {
        await this.getCustomerClient({
          pageNo: 1,
          PageSize: 10,
          toast: this.$toast,
          search: this.searcher,
        });
      }
    },
    subRows(e) {
      this.sub_table_rows = e;
    },
    mainRows(e) {
      this.main_table_rows = e;
    },
    rowclick(event) {
      const b_data = event.data;
      if (this.select_type == this.base_data[1]["name"]) {
        this.$router.push({
          name: "ClientContact",
          params: {
            id: b_data.id,
            customerName: b_data.profile_name,
            cusId: b_data.customer_id,
            address: b_data.address_list,
          },
        });
      }
    },
  },
  watch: {
    "$route.path": function () {
      if (this.$route.path.includes("ClientDetails")) {
        this.select_type = this.action_type;
      } else {
        this.setReset({ action_type: "By All" });
      }
    },
  },
  async created() {
    this.select_type = this.action_type;
    this.setReset({ pageNo: 1 });
    this.apiCall(this.select_type);
    this.updateBreadCrumbAndTitle({
      title: "Client Details",
      breadcrumbInfo: "CRM > Customer Activity > Client Details",
    });
  },
  computed: {
    ...crmClState,
  },
  mounted() {},
};
</script>
<style scoped>
.searchicon {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.21);
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #b9b9b9;
  background: white;
  border-radius: 3px;
}
i {
  color: #b9b9b9;
}

.text {
  font-size: 12px;
  font-weight: 600;
}
::v-deep .p-accordion-header-text {
  font-weight: 700;
  font-size: 14px;
  color: #8f8383 !important;
}
.primary-color {
  color: #357dea !important;
}
.search-bg {
  background: #357dea;
}
.color-wi {
  color: #fff !important;
}
</style>
