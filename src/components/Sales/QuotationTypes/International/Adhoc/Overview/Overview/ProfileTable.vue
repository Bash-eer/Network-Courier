<template>
  <div>
    <DataTable :value="[city]" responsiveLayout="scroll" :class="tableClass">
      <div class="datatabel">
        <Column field="origin_country" header="Origin Country" class="column"
          ><template #body="slotProps">
            {{
              slotProps.data.origin_country
                ? slotProps.data.origin_country
                : "_"
            }}
          </template></Column
        >
        <Column field="origin_city" header="Origin City" class="column"
          ><template #body="slotProps">
            {{ slotProps.data.origin_city ? slotProps.data.origin_city : "_" }}
          </template></Column
        >
        <Column
          field="origin_country_postal_code"
          header="Origin Country Postal Code"
          class="column"
          ><template #body="slotProps">
            {{
              slotProps.data.origin_country_postal_code
                ? slotProps.data.origin_country_postal_code
                : "_"
            }}
          </template></Column
        >
        <Column>
          <template #header>
            <div class="iternational-adhoc-profile-table-vertical-line"></div>
          </template>
        </Column>
        <Column
          field="destination_country"
          header="Destination Country"
          class="column"
          ><template #body="slotProps">
            {{
              slotProps.data.destination_country
                ? slotProps.data.destination_country
                : "_"
            }}
          </template></Column
        >
        <Column
          field="destination_city"
          header="Destination City"
          class="column"
          ><template #body="slotProps">
            {{
              slotProps.data.destination_city
                ? slotProps.data.destination_city
                : "_"
            }}
          </template></Column
        >
        <Column
          field="destination_country_postal_code"
          header="Destination Postal Code"
          class="column"
        >
          <template #body="slotProps">
            {{
              slotProps.data.destination_country_postal_code
                ? slotProps.data.destination_country_postal_code
                : "_"
            }}
          </template>
        </Column>
      </div>
    </DataTable>
    <div class="flex col-12">
      <div
        v-for="(item, index) of this.$store.state.salesInternationalAdhoc
          .InternationalAdhocOverviewData.international_adhoc_specifics
          ?.weight_dimension_details"
        :key="index"
        class="flex col-6"
      >
        <div style="width: 100%">
          <DataTable
            class="iternational-adhoc-profile-table-datateble-second"
            :value="[getWeight(item)]"
            responsiveLayout="scroll"
          >
            <div class="datatabel flex appe">
              <Column field="total_weight" header="Total Weight" class="column"
                ><template #body="slotProps">
                  <div class="color-66c11e">
                    {{
                      slotProps.data.total_weight
                        ? slotProps.data.total_weight
                        : "_"
                    }}
                  </div>
                </template></Column
              >
              <Column
                field="volumetric_weight"
                header="Volumetric Weight"
                class="column"
              >
                <template #body="slotProps">
                  <div class="color-66c11e">
                    {{
                      slotProps.data.volumetric_weight
                        ? slotProps.data.volumetric_weight
                        : "_"
                    }}
                  </div>
                </template>
              </Column>
              <Column field="LWH" header="L/W/H (cm)" class="column">
                <template #body="slotProps">
                  <div class="color-66c11e">
                    {{ slotProps.data.LWH ? slotProps.data.LWH : "_" }}
                  </div>
                </template>
              </Column>
              <Column field="total_weight_last" class="column col"
                ><template #header>
                  Total Weight:
                  {{
                    this.$store.state.salesInternationalAdhoc
                      .InternationalAdhocOverviewData
                      .international_adhoc_specifics
                      ?.weight_dimension_details[0].weight
                  }}
                  kg</template
                >
                <template #body="slotProps">
                  <span class="color-7e84a7 font-size-10 margin-left-negative-1"
                    >Vol. Weight:
                    {{
                      (this.$store.state.salesInternationalAdhoc
                        .InternationalAdhocOverviewData
                        .international_adhoc_specifics
                        ?.weight_dimension_details[0].length *
                        this.$store.state.salesInternationalAdhoc
                          .InternationalAdhocOverviewData
                          .international_adhoc_specifics
                          ?.weight_dimension_details[0].width *
                        this.$store.state.salesInternationalAdhoc
                          .InternationalAdhocOverviewData
                          .international_adhoc_specifics
                          ?.weight_dimension_details[0].height) /
                      5000
                    }}
                    kg
                  </span>
                  <div
                    field="chargeable_weight"
                    header="Chargeable Weight"
                    class="color-66c11e font-size-10"
                  >
                    Chargeable Weight:
                    {{
                      Math.max(
                        (this.$store.state.salesInternationalAdhoc
                          .InternationalAdhocOverviewData
                          .international_adhoc_specifics
                          ?.weight_dimension_details[0].length *
                          this.$store.state.salesInternationalAdhoc
                            .InternationalAdhocOverviewData
                            .international_adhoc_specifics
                            ?.weight_dimension_details[0].width *
                          this.$store.state.salesInternationalAdhoc
                            .InternationalAdhocOverviewData
                            .international_adhoc_specifics
                            ?.weight_dimension_details[0].height) /
                          5000,
                        slotProps.data.total_weight
                      )
                    }}
                    kg
                  </div>
                </template>
              </Column>
            </div>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
export default {
  components: {
    DataTable,
    Column,
  },
  props: ["tableClass"],

  data() {
    return {
      city: {},
      // {
      //   thisYearProfit:
      //     this.$store.state.salesInternationalAdhoc
      //       .InternationalAdhocOverviewData.international_adhoc_specifics
      //       ?.origin_country,
      //   lastYearSale:
      //     this.$store.state.salesInternationalAdhoc
      //       .InternationalAdhocOverviewData.international_adhoc_specifics
      //       ?.origin_city,
      //   product:
      //     this.$store.state.salesInternationalAdhoc
      //       .InternationalAdhocOverviewData.international_adhoc_specifics
      //       ?.origin_country_postal_code,
      //   designation_country:
      //     this.$store.state.salesInternationalAdhoc
      //       .InternationalAdhocOverviewData.international_adhoc_specifics
      //       ?.destination_country,
      //   designation_city:
      //     this.$store.state.salesInternationalAdhoc
      //       .InternationalAdhocOverviewData.international_adhoc_specifics
      //       ?.destination_city,
      //   designation_postal_code:
      //     this.$store.state.salesInternationalAdhoc
      //       .InternationalAdhocOverviewData.international_adhoc_specifics
      //       ?.destination_country_postal_code,
      // },

      weight: {},
      // {
      //   LWH:
      //     this.$store.state.salesInternationalAdhoc
      //       .InternationalAdhocOverviewData.international_adhoc_specifics
      //       ?.weight_dimension_details[0].length +
      //     "/" +
      //     this.$store.state.salesInternationalAdhoc
      //       .InternationalAdhocOverviewData.international_adhoc_specifics
      //       ?.weight_dimension_details[0].width +
      //     "/" +
      //     this.$store.state.salesInternationalAdhoc
      //       .InternationalAdhocOverviewData.international_adhoc_specifics
      //       ?.weight_dimension_details[0].height,
      //   total_weight:
      //     this.$store.state.salesInternationalAdhoc
      //       .InternationalAdhocOverviewData.international_adhoc_specifics
      //       ?.total_weight,
      //   total_weight_last:
      //     this.$store.state.salesInternationalAdhoc
      //       .InternationalAdhocOverviewData.international_adhoc_specifics
      //       ?.total_weight,
      //   volumetric_weight:
      //     this.$store.state.salesInternationalAdhoc
      //       .InternationalAdhocOverviewData.international_adhoc_specifics
      //       ?.volume_weight,
      // },
    };
  },
  methods: {
    getWeight(item) {
      let weight = {};
      weight["volumetric_weight"] =
        (item.length * item.width * item.height) / 5000;
      weight["LWH"] = item.length + "/" + item.width + "/" + item.height;
      weight["total_weight"] = item.weight;
      console.log("weight", weight, "item", item);
      return weight;
    },
  },
  watch: {
    "$store.state.salesInternationalAdhoc.InternationalAdhocOverviewData":
      function () {
        const { international_adhoc_specifics } =
          this.$store.state.salesInternationalAdhoc
            .InternationalAdhocOverviewData;
        this.city["origin_country"] =
          international_adhoc_specifics?.origin_country;
        this.city["origin_city"] = international_adhoc_specifics?.origin_city;
        this.city["origin_country_postal_code"] =
          international_adhoc_specifics?.origin_country_postal_code;
        this.city["destination_country"] =
          international_adhoc_specifics?.destination_country;
        this.city["destination_city"] =
          international_adhoc_specifics?.destination_city;
        this.city["destination_country_postal_code"] =
          international_adhoc_specifics?.destination_country_postal_code;
        this.city["chargeable_weight"] =
          international_adhoc_specifics?.chargeable_weight;

        // this.weight["volume_weight"] =
        //   international_adhoc_specifics.weight_dimension_details.map((data) => {
        //     volume_weight: data.weight;
        //   });

        this.weight["total_weight_last"] =
          international_adhoc_specifics?.total_weight;
      },
  },
  async created() {
    const { international_adhoc_specifics } =
      this.$store.state.salesInternationalAdhoc.InternationalAdhocOverviewData;
    this.city["origin_country"] = international_adhoc_specifics?.origin_country;
    this.city["origin_city"] = international_adhoc_specifics?.origin_city;
    this.city["origin_country_postal_code"] =
      international_adhoc_specifics?.origin_country_postal_code;
    this.city["destination_country"] =
      international_adhoc_specifics?.destination_country;
    this.city["destination_city"] =
      international_adhoc_specifics?.destination_city;
    this.city["destination_country_postal_code"] =
      international_adhoc_specifics?.destination_country_postal_code;
    this.city["chargeable_weight"] =
      international_adhoc_specifics?.chargeable_weight;

    // this.weight["volume_weight"] =
    //   international_adhoc_specifics.weight_dimension_details.map((data) => {
    //     volume_weight: data.weight;
    //   });

    this.weight["total_weight_last"] =
      international_adhoc_specifics?.total_weight;
  },
};
</script>

<style scoped>
::v-deep.p-datatable.p-datatable-sm .p-datatable-header {
  background-color: #f3f7ff !important;
  border: none !important;
}
.p-datatable {
  padding: 10px;
  background-color: #f3f7ff;
}
/* ::v-deep.p-datatable.p-datatable-sm .p-datatable-thead > tr > th {

} */
::v-deep.p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  background-color: #ffff !important;
  padding: 10px !important;
  border-radius: 5px;
}
::v-deep.p-datatable .p-datatable-thead > tr > th {
  border: 0px solid #e9ecef !important;
  border-width: 0 0 0 0 !important;
  padding-top: 5px;
  padding-bottom: 0 !important;
  padding-inline: 5px;
}
.sample.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
  padding: 10px !important;
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
::v-deep.total_weight {
  color: #1630c7;
}
::v-deep.field {
  margin-bottom: 0;
}
::v-deep.p-datatable .p-datatable-tbody > tr > td {
  border: none !important;
  padding-top: 0 !important;
  padding-bottom: 5px !important;
  padding-left: 18px !important ;
  /* min-width: 150px !important;             */
}
.iternational-adhoc-profile-table-vertical-line {
  margin-top: 30px;
  width: 189px;
  height: 2px;
  background-color: #66c11e;
}

::v-deep.p-datatable-responsive-scroll > .p-datatable-wrapper {
  border-radius: 8px;
}
/* ::v-deep.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
  min-width: 180px !important;
} */
</style>
