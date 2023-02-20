<template>
  <div class="right-content flex align-items-center">
    <span style="padding-left: 1180px; padding-bottom: 10px">
      <Button label="Add New" @click="handleClick($event)" />
    </span>
  </div>
  <RegionRatesTable
    :tableDataName="'AdditionalSurchargesTableData'"
    :tableName="'AdditionalSurchargesTable'"
    :tableData="tableData"
    :tableColumns="
      getTableInput(
        'columns',
        '',
        'additional_surcharges',
        'additional_surcharges'
      )
    "
    :type="'additional_surcharges'"
  />
  <Dialog
    header="Add Additional Surcharges"
    :style="{
      width: '60vw',
    }"
    v-model:visible="display"
  >
    <AdditionalSurchargesEdit
      :key="key"
      :chargesId="charges_id"
      :submit-form="createAddlSurCharge"
      @cancel="onCancel"
    />
  </Dialog>
</template>

<script>
//table
import RegionRatesTable from "../../Tables/RegionRatesTable.vue";
import AdditionalSurchargesEdit from "../../Dialogs/CRUDDialogues/AdditionalSurchargesEdit.vue";
//function imports
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { getTableInput } from "../../functions/functions.js";
import { errhandler } from "@/services/httpClient";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    RegionRatesTable,
    Button,
    Dialog,
    AdditionalSurchargesEdit,
  },
  data: () => ({
    tableData: [],
    display: false,
    charges_id: null,
    addlSurIndex: 0,
    key: 1,
  }),
  computed: {
    ...mapState({
      regionRatesByIdData: (state) => state.express.regionRatesById,
    }),
  },
  mounted() {
    this.initialised();
    this.getData();
  },
  methods: {
    //fetch table input
    ...mapActions("express", ["getRegionRatesById"]),
    ...mapActions("express", ["addAddlSurcharge"]),
    initialised() {
      this.getRegionRatesById(
        this.$store.state.express.rateCardId ?? this.$route.params.id
      ).then(() => {
        for (var i = 0; i < this.regionRatesByIdData.charge_types.length; i++) {
          if (
            this.regionRatesByIdData.charge_types[i].charge_type ==
            "additional_surcharges"
          ) {
            this.charges_id = this.regionRatesByIdData.charge_types[i].id;
          }
          this.$store.state.express.deleteAddlSurCgs = false;
        }
        this.getData();
      });
    },
    getData() {
      this.getRegionRatesById(
        this.$store.state.express.rateCardId ?? this.$route.params.id
      ).then(() => {
        let data = [];
        this.regionRatesByIdData.charge_types.map((list) => {
          if (list.charge_type == "additional_surcharges") {
            list.additional_surcharges.map((item, idx) => {
              data.push({
                s_no: idx + 1,
                charges_id: item.charges_id,
                createdAt: new Date(item.createdAt),
                deletedAt: item.deletedAt,
                created_by: item.created_by,
                geo_fencing_id: item.geo_fencing_id,
                id: item.id,
                rates: item.rates,
                surcharge_name: item.surcharge_name,
                updatedAt: item.updatedAt,
                user: item.user,
              });
            });
          }
        });
        this.tableData = data;
      });
    },
    async createAddlSurCharge(formData) {
      try {
        await this.addAddlSurcharge(formData);
        this.initialised();
        this.display = false;
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "Additional surcharges added successfully",
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
    onCancel() {
      this.display = false;
    },
    handleClick(args) {
      this.key++;
      this.display = true;
    },
    getTableInput(format, transport, type, label) {
      return getTableInput(
        this.$store.state.expressContract.regionRatesTableData,
        format,
        transport,
        type,
        label
      );
    },
  },
  watch: {
    "$store.state.express.deleteAddlSurCgs": function () {
      if (this.$store.state.express.deleteAddlSurCgs) {
        this.initialised();
      }
    },
  },
};
</script>

<style></style>
