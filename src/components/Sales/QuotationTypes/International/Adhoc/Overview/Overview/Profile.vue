<template>
  <div
    class="
      mb-2
      font-size-12
      line-height-15
      letter-spacing-003
      color-343434
      express-international-font
    "
  >
    Profile
  </div>

  <DataTable :value="products" class="p-datatable-sm" responsiveLayout="scroll">
    <template #header>
      <div class="flex justify-content-between">
        <div class="flex md:mr-2 mr-6">
          <p
            class="
              col
              text-sm
              line-height-20
              color-4e5868
              express-international-font
            "
          >
            Quotations
          </p>
        </div>
        <div class="flex justify-content-center align-items-center">
          <p
            class="
              col
              font-size-10
              line-height-12
              color-4e5868
              text-nowrap
              express-international-font
            "
          >
            Total Weight:
            {{
              this.$store.state.salesInternationalAdhoc
                .InternationalAdhocOverviewData.international_adhoc_specifics
                ?.total_weight
            }}
            kg
          </p>
          <p
            class="
              col
              font-size-10
              line-height-12
              color-4e5868
              text-nowrap
              express-international-font
            "
          >
            Vol. Weight:
            {{
              this.$store.state.salesInternationalAdhoc
                .InternationalAdhocOverviewData.international_adhoc_specifics
                ?.volume_weight
            }}
            kg
          </p>
          <p
            class="
              col
              font-size-10
              line-height-12
              color-66c11e
              text-nowrap
              express-international-font
            "
          >
            Chargeable Weight:
            {{
              InternationalAdhocOverviewData.international_adhoc_specifics
                ?.chargeable_weight
            }}
            kg
          </p>
          <p
            class="
              col
              font-size-12
              line-height-12
              color-7e84a7
              text-nowrap
              express-international-font
            "
          >

            Expected Date of Shipment:
            <span
              class="
                font-size-12
                line-height-20
                color-343434
                express-international-font
              "
              >{{
                dateFormater(
                  InternationalAdhocOverviewData.international_adhoc_specifics
                    ?.expected_shipment_date
                )
              }}</span
            >
          </p>
          <p
            class="
              col
              bg-ead9ff
              color-8F46EB
              font-size-12
              line-height-20
              border-radius-7
              express-international-font
            "
          >
            Import
          </p>
          <div
            v-if="$route.params.mode != 'history'"
            class="col international-adhoc-profile-action"
          >
            <div class="flex">
              <CustomSpeedDial
                storePath="salesSales"
                :dataName="tableDataName"
                :customDialData="InternationalAdhocOverlay"
                :apiKey="apiKey"
                tableName="ClearanceModeTabOverlay"
              />
            </div>
          </div>
        </div>
      </div>

      <Tabel />

      <DataTable
        :value="products"
        class="p-datatable-sm"
        responsiveLayout="scroll"
      >
        <template class="flex">
          <Column
            class="
              font-size-10
              line-height-12
              text-nowrap
              express-international-font
            "
            field="service_provider"
            header="Service Provider"
            ><template #body="slotProps">
              {{
                slotProps.data.service_provider
                  ? slotProps.data.service_provider
                  : "_"
              }}
            </template>
          </Column>
          <Column field="Transit_Days" header="Transit Days">
            <template #body="slotProps">
              {{
                slotProps.data.Transit_Days ? slotProps.data.Transit_Days : "_"
              }}
            </template></Column
          >
          <Column field="Delivery_Charges" header="Delivery Charges">
            <template #body="slotProps">
              <div class="color-66c11e">
                $
                {{
                  slotProps.data.Delivery_Charges
                    ? slotProps.data.Delivery_Charges
                    : "_"
                }}
              </div>
            </template></Column
          >
          <Column field="Fuel_Charges" header="Fuel Charges">
            <template #body="slotProps">
              $
              {{
                slotProps.data.Fuel_Charges ? slotProps.data.Fuel_Charges : "_"
              }}
            </template></Column
          >

          <Column field="Over_weight_Charges" header="Over weight Charges">
            <template #body="slotProps">
              $
              {{
                slotProps.data.Over_weight_Charges
                  ? slotProps.data.Over_weight_Charges
                  : "_"
              }}
            </template></Column
          >
          <Column field="Remote_Area_Charges" header="Remote Area Charges">
            <template #body="slotProps">
              $
              {{
                slotProps.data.Remote_Area_Charges
                  ? slotProps.data.Remote_Area_Charges
                  : "_"
              }}
            </template></Column
          >
          <Column field="Others_Charges" header="Others Charges">
            <template #body="slotProps">
              $
              {{
                slotProps.data.Others_Charges
                  ? slotProps.data.Others_Charges
                  : "_"
              }}
            </template></Column
          >
          <Column field="Emergency_Charges" header="Emergency Charges">
            <template #body="slotProps">
              $
              {{
                slotProps.data.Emergency_Charges
                  ? slotProps.data.Emergency_Charges
                  : "_"
              }}
            </template></Column
          >

          <Column field="Net_Charges" header="Net Charges">
            <template #body="slotProps">
              <div class="color-66c11e">
                $
                {{
                  slotProps.data.Net_Charges ? slotProps.data.Net_Charges : "_"
                }}
              </div>
            </template></Column
          >
        </template>
      </DataTable>
    </template>
  </DataTable>

  <div class="field mt-5">
    <h5
      class="
        font-size-12
        line-height-15
        flex
        align-items-center
        letter-spacing-003
        color-7e84a7
        express-international-font
      "
    >
      Remarks
    </h5>
    <div
      class="
        international-adhoc-Profile-remarks-para
        color-4e5968
        border-radius-8
        bg-f3f7ff
        express-international-table
      "
    >
      {{
        this.$store.state.salesInternationalAdhoc.InternationalAdhocOverviewData
          ?.remarks
      }}
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import moment from "moment";
import Column from "primevue/column";
import Tabel from "../Overview/ProfileTable.vue";
import CustomSpeedDial from "../../CustomSpeedDial";
import { mapGetters } from "vuex";
export default {
  components: {
    DataTable,
    Column,
    CustomSpeedDial,
    Tabel,
  },
  computed: {
    ...mapGetters({
      InternationalAdhocOverviewData:
        "salesInternationalAdhoc/InternationalAdhocOverviewData",
    }),
  },
  data() {
    return {
      InternationalAdhocOverlay: [{ label: "Edit", icon: "fas fa-pen" }],

      data: this.$store.state.salesInternationalAdhoc
        .InternationalAdhocOverviewData.international_adhoc_specifics
        ?.createdAt,
      products: [],
    };
  },
  methods: {
    dateFormater(data) {
      console.log(this.products, "products");
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD/MM/YYYY ");
        return formattedDate;
      }
    },
  },
  watch: {
    "$store.state.salesInternationalAdhoc.InternationalAdhocOverviewData.international_adhoc_specifics.service_providers":
      function () {
        this.products = [];
        this.$store.state.salesInternationalAdhoc.InternationalAdhocOverviewData.international_adhoc_specifics?.service_providers?.map(
          (item) => {
            this.products.push({
              service_provider:
                item.service_provider_details.service_provider_name,
              Transit_Days: item.service_provider_details.transit_days,
              Delivery_Charges: item.service_provider_details.delivery_charges,
              Fuel_Charges: item.service_provider_details.fuel_charges,
              Over_weight_Charges:
                item.service_provider_details.over_weight_charges,
              Remote_Area_Charges:
                item.service_provider_details.remote_area_charges,
              Others_Charges: item.service_provider_details.other_charges,
              Emergency_Charges:
                item.service_provider_details.emergency_charges,
              Net_Charges: item.service_provider_details.net_charges,
            });
          }
        );
      },
  },
};
</script>

<style lang="scss" scoped>
::v-deep.p-datatable.p-datatable-sm .p-datatable-header {
  background-color: #f3f7ff !important;
  border: 1px dashed #acb5c1 !important;
  border-style: dashed !important;
  border-radius: 6px !important;
}
.p-datatable {
  background-color: #f3f7ff;
}

.p-datatable[data-v-02e7ee63] {
  padding: 20px;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  background-color: #ffff;
  padding: 15px;
  color: green;
}

::v-deep.p-datatable .p-column-header-content {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  color: #7e84a7;
  opacity: 0.9;
}
::v-deep.field {
  margin-bottom: 0;
}
.international-adhoc-profile-action {
  padding-top: 0 !important;
}
.international-adhoc-Profile-remarks-para {
  border: 1px solid rgba(126, 132, 167, 0.3);
  width: 100%;
  height: 61px;
  padding-top: 10px;
  padding-inline: 5px;
}
</style>
