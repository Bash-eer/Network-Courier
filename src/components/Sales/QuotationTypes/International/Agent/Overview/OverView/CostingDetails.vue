<template>
  <div class="flex justify-content-between">
    <div
      class="
        international-agent-costingdetails-costing-details
        align-items-center
        flex
        express-international-font
      "
    >
      <span>Costing Details </span>
    </div>
    <div class="flex">
      <span
        class="
          international-agent-costingdetails-start-date
          flex
          express-international-table
          mr-6
        "
        >Estimated Start Date: {{ effectiveData() }}</span
      >
      <i class="pi pi-ellipsis-v"></i>
    </div>
  </div>
  <hr />
  <div class="flex justify-content-between">
    <div class="flex">
      <div>
        <!-- <SelectButton
                class="my-4"
                v-model="selectType"
                :options="document"
                @update:modelValue="onChange($event)"
              /> -->
        <DuoSelection
          v-model="selectType"
          :options="document"
          :default="selectType"
          v-on:change="onChange"
        />
      </div>

      <div
        v-if="
          $store.state.salesInternationalAgent.InternationalAgentOverviewData
            ?.international_agent_specifics?.costings
            ?.same_document_charges_for_parcel
        "
        class="
          international-agent-document-parcel
          align-items-center
          flex
          justify-content-between
          express-international-table
          ml-2
        "
      >
        Document and Parcel charges are same
      </div>
    </div>
    <div>
      <div
        class="
          international-agent-costingdetails-currency
          flex
          express-international-table
        "
      >
        Currency
      </div>
      <div class="international-agent-singapore express-international-table">
        {{
          this.$store.state.salesInternationalAgent
            .InternationalAgentOverviewData?.international_agent_specifics
            ?.costings?.currency ?? ""
        }}
        <!-- SGD Singapore Dollars -->
      </div>
    </div>
  </div>
  <div
    v-for="(item, index) of this.$store.state.salesInternationalAgent
      .InternationalAgentOverviewData?.international_agent_specifics?.costings
      ?.costing_types"
    :key="index"
  >
    <div v-if="selectType == item.item_type">
      <!-- v-for="(i, index1) of item.delivery_charge" :key="index1" -->
      <Accordion
        class="my-3 accordion"
        expandIcon="pi-angle-down"
        collapseIcon="pi-angle-right"
      >
        <AccordionTab :key="renderKey" header="Same Day" class="my-3">
          <DuoSelection
            :options="delivery_charges"
            :default="defaultDeliveryType0"
            v-model="defaultDeliveryType0"
            v-on:change="onChange"
          />
          <!-- <SelectButton
                class="my-4"
                v-model="defaultDeliveryType0"
                :options="delivery_charges"
                @update:modelValue="onChange($event)"
              /> -->

          <DeliveryCharges
            v-if="defaultDeliveryType0 === 'Delivery Charges'"
            :key="renderKey"
            :data="item.delivery_charge[0]"
            type="0"
          />
          <DeliveryCharges
            v-if="defaultDeliveryType0 === 'Resident Delivery Charges'"
            :key="renderKey"
            :data="item.delivery_charge[0]"
            type="1"
          />
          <DeliveryCharges
            v-if="defaultDeliveryType0 === 'Delivery Attempt Charges'"
            :key="renderKey"
            :data="item.delivery_charge[0]"
            type="2"
          />
        </AccordionTab>
        <AccordionTab header="Next Day" class="my-3">
          <DuoSelection
            :options="delivery_charges"
            :default="defaultDeliveryType1"
            v-model="defaultDeliveryType1"
            v-on:change="onChange"
          />
          <!-- <SelectButton
                class="my-4"
                v-model="defaultDeliveryType1"
                :options="delivery_charges"
                @update:modelValue="onChange($event)"
              /> -->

          <DeliveryCharges
            :key="renderKey"
            :data="item.delivery_charge[1]"
            :type="0"
            v-if="defaultDeliveryType1 == 'Delivery Charges'"
          />
          <DeliveryCharges
            :key="renderKey"
            :data="item.delivery_charge[1]"
            :type="1"
            v-if="defaultDeliveryType1 == 'Resident Delivery Charges'"
          />
          <DeliveryCharges
            :key="renderKey"
            :data="item.delivery_charge[1]"
            :type="2"
            v-if="defaultDeliveryType1 == 'Delivery Attempt Charges'"
          />
        </AccordionTab>
        <AccordionTab header="Regular" class="my-3">
          <!-- <SelectButton
                class="my-4"
                v-model="delivery_charges"
                :options="defaultDeliveryType2"
                @update:modelValue="onChange($event)"
              /> -->
          <DuoSelection
            :options="delivery_charges"
            :default="defaultDeliveryType2"
            v-model="defaultDeliveryType2"
            v-on:change="onChange"
          />

          <DeliveryCharges
            :key="renderKey"
            :data="item.delivery_charge[2]"
            :type="0"
            v-if="defaultDeliveryType2 == 'Delivery Charges'"
          />
          <DeliveryCharges
            :key="renderKey"
            :data="item.delivery_charge[2]"
            :type="1"
            v-if="defaultDeliveryType2 == 'Resident Delivery Charges'"
          />
          <DeliveryCharges
            :key="renderKey"
            :data="item.delivery_charge[2]"
            :type="2"
            v-if="defaultDeliveryType2 == 'Delivery Attempt Charges'"
          />
        </AccordionTab>
        <!-- <AccordionTab header="Next Day" class="my-3"> Content 2</AccordionTab>
      <AccordionTab header="Regular" class="my-3"> Content 3</AccordionTab> -->
      </Accordion>
    </div>
    <!-- <DuoSelection
      :options="delivery_charges"
      :default="defaultDeliveryType"
      type="setDeliveryChargesType"
    /> -->
  </div>

  <div
    class="
      international-agent-costingdetails-surcharge
      align-items-center
      flex
      express-international-table
      mt-6
    "
  >
    Surcharge
  </div>
  <div
    v-for="(item, index) of this.$store.state.salesInternationalAgent
      .InternationalAgentOverviewData?.international_agent_specifics?.costings
      ?.costing_types"
    :key="index"
  >
    <div
      class="flex flex-row ml-1 mt-4 mb-4 row"
      v-if="selectType == item.item_type"
    >
      <div
        class="flex col-2"
        v-for="(i, index1) of item.surcharges"
        :key="index1"
      >
        <div class="flex flex-column">
          <div
            class="
              flex
              international-agent-costingdetails-detailsText
              express-international-table
            "
          >
            {{ i?.delivery_name ?? "" }}
          </div>
          <div
            :class="
              item != 'High'
                ? 'flex international-agent-costingdetails-detailsText express-international-table international-agent-costingdetails-valuesText'
                : 'flex international-agent-costingdetails-detailsText express-international-table international-agent-costingdetails-valuesText'
            "
          >
            {{ i?.charge + " $" }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="flex flex-row ml-1 mt-4 mb-4">
    <div class="flex mr-7" v-for="(item, index) of thirdRowData" :key="index">
      <div class="flex flex-column">
        <div
          class="
            flex
            international-agent-costingdetails-detailsText
            express-international-table
          "
        >
          {{ getSubHeader(index) }}
        </div>
        <div
          :class="
            item != 'High'
              ? 'flex international-agent-costingdetails-detailsText express-international-table international-agent-costingdetails-valuesText'
              : 'flex international-agent-costingdetails-detailsText   express-international-table  international-agent-costingdetails-valuesText'
          "
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div> -->

  <div
    class="
      international-agent-costingdetails-surcharge
      align-items-center
      flex
      express-international-table
      mt-6
    "
  >
    Clearance Charges
  </div>
  <div
    v-for="(item, index) of this.$store.state.salesInternationalAgent
      .InternationalAgentOverviewData?.international_agent_specifics?.costings
      ?.costing_types"
    :key="index"
  >
    <div class="mt-3" v-if="selectType == item.item_type">
      <DuoSelection
        :options="clearance"
        :default="defaultClearanceType"
        v-model="defaultClearanceType"
        v-on:change="onChange"
      />
      <!-- <SelectButton
                class="my-4"
                v-model="clearance"
                :options="defaultClearanceType"
                @update:modelValue="onChange($event)"
              /> -->
      <!-- </div> -->
      <div v-for="(k, index2) of item.clearance" :key="index2">
        <Clearance
          v-if="
            defaultClearanceType.toLowerCase() == k.clearance_type.toLowerCase()
          "
          :key="k"
          :data="k"
          :val="0"
        />
      </div>
    </div>
  </div>

  <div
    class="
      international-agent-costingdetails-surcharge
      align-items-center
      flex
      express-international-table
      mt-6
    "
  >
    COD Charges
  </div>
  <div
    class="mt-3"
    v-for="(item, index) of this.$store.state.salesInternationalAgent
      .InternationalAgentOverviewData?.international_agent_specifics?.costings
      ?.costing_types"
    :key="index"
  >
    <!-- <DuoSelection
     v-if="selectType==item.item_type"
      :options="freedom"
      :default="defaultCODType"
      type="setCODType"
    /> -->

    <COD
      v-if="selectType == item.item_type"
      :key="item.cod_charge"
      :data="item.cod_charge"
    />
  </div>

  <div
    class="
      international-agent-costingdetails-surcharge
      align-items-center
      flex
      express-international-table
      mt-6
    "
  >
    Permit Charges
  </div>
  <div class="mt-3">
    <!-- <SelectButton
                class="my-4"
                v-model="defaultCODType"
                :options="gst_type"
                @update:modelValue="onChange($event)"
              /> -->
    <DuoSelection
      :options="gst_type"
      :default="defaultCODType"
      v-model="defaultCODType"
      v-on:change="onChange"
    />
    <div class="flex flex-row ml-1 mt-4 mb-4">
      <div
        class="flex"
        v-for="(item, index) of this.$store.state.salesInternationalAgent
          .InternationalAgentOverviewData?.international_agent_specifics
          ?.permit_settings?.gst_details"
        :key="index"
      >
        <div
          class="flex flex-column mr-7"
          v-if="item.gst_type === 'GST Type: ' + defaultCODType"
        >
          <div
            class="
              flex
              international-agent-costingdetails-detailsText
              express-international-table
            "
          >
            {{ item?.permit_type }}
          </div>
          <div
            :class="
              item != 'High'
                ? 'flex international-agent-costingdetails-detailsText express-international-table international-agent-costingdetails-valuesText'
                : 'flex international-agent-costingdetails-detailsText express-international-table international-agent-costingdetails-valuesText'
            "
          >
            {{
              "Document $: " +
              item.document_charges +
              " | Handling $: " +
              item.handling_charges
            }}
            <!-- {{ item }} -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <hr />
  <div
    class="
      international-agent-costingdetails-storage-weight
      align-items-center
      flex
    "
  >
    Storage Weight
  </div>

  <div
    class="flex ml-1 mt-4 mb-4"
    v-for="(e, index) of $store.state.salesInternationalAgent
      .InternationalAgentOverviewData?.international_agent_specifics
      ?.permit_settings?.storage_charges"
    :key="index"
  >
    <div
      v-for="(i, index) of e"
      :key="index"
      :class="`flex  flex-row ${
        getHeaderOne(index) != '' ? '' : 'store-display'
      }`"
    >
      <div :class="`flex flex-column mr-7`">
        <div
          class="
            flex
            international-agent-costingdetails-detailsText
            express-international-table
          "
        >
          {{ getHeaderOne(index) }}
        </div>
        <div
          :class="
            item != 'High'
              ? 'flex international-agent-costingdetails-detailsText express-international-table international-agent-costingdetails-valuesText'
              : 'flex international-agent-costingdetails-detailsText express-international-table international-agent-costingdetails-valuesText'
          "
        >
          {{
            index === "storage_min_weight"
              ? e.storage_min_weight + " - " + e.storage_max_weight + " kg"
              : i
          }}{{ index.includes("charge") ? " $" : "" }}
        </div>
      </div>
    </div>
  </div>

  <hr />

  <div
    class="
      international-agent-costingdetails-storage-weight
      align-items-center
      flex
    "
  >
    Miscellaneous
  </div>

  <div class="flex flex-row ml-1 mt-4 mb-4">
    <div class="flex mr-7" v-for="(item, index) of miscellaneous" :key="index">
      <div class="flex flex-column">
        <div
          class="
            flex
            international-agent-costingdetails-detailsText
            express-international-table
          "
        >
          {{ item.name }}
        </div>
        <div
          :class="
            item != 'High'
              ? 'flex international-agent-costingdetails-detailsText express-international-table international-agent-costingdetails-valuesText'
              : 'flex international-agent-costingdetails-detailsText express-international-table international-agent-costingdetails-valuesText'
          "
        >
          {{
            item.field == ""
              ? getCharge(item.name)
              : this.$store.state.salesInternationalAgent
                  .InternationalAgentOverviewData?.international_agent_specifics
                  ?.permit_settings[item.field] +
                (item.name.includes("Amount") ? " $" : "")
          }}
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-row mt-4 mb-4 row">
    <div
      class="flex flex-row col-2"
      v-for="(item, index) of $store.state.salesInternationalAgent
        .InternationalAgentOverviewData?.international_agent_specifics
        ?.permit_settings?.miscellaneous"
      :key="index"
    >
      <div class="flex mr-2">
        <div class="flex flex-column">
          <div
            class="
              flex
              international-agent-costingdetails-detailsText
              express-international-table
            "
          >
            {{ item.miscellaneous_charge_name }}
          </div>
          <div
            :class="'flex international-agent-costingdetails-detailsText express-international-table international-agent-costingdetails-valuesText'"
          >
            Percent :{{ item.miscellaneous_charge_percent }} | Charge $:
            {{ item.miscellaneous_min_charge }}
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="flex flex-row mt-4 mb-4 row">
    <div
      class="flex flex-row col-4 row"
      v-for="(item, index) of $store.state.salesInternationalAgent
        .InternationalAgentOverviewData?.international_agent_specifics
        ?.permit_settings?.permit_additional"
      :key="index"
    >
      <div class="flex mr-3 col-5">
        <div class="flex flex-column">
          <div
            class="
              flex
              international-agent-costingdetails-detailsText
              express-international-table
            "
          >
            Minimum {{ item.charge_name }} (FOC)
          </div>
          <div
            :class="'flex international-agent-costingdetails-detailsText express-international-table international-agent-costingdetails-valuesText'"
          >
            {{ item.min_foc }}
          </div>
        </div>
      </div>
      <div class="flex mr-3 col-5">
        <div class="flex flex-column">
          <div
            class="
              flex
              international-agent-costingdetails-detailsText
              express-international-table
            "
          >
            Additional Amount per {{ item.charge_name }}
          </div>
          <div
            :class="'flex international-agent-costingdetails-detailsText express-international-table international-agent-costingdetails-valuesText'"
          >
            {{ item.additional_charge }} $
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="flex flex-row ml-1 mt-4 mb-4">
    <div
      class="flex mr-7"
      v-for="(item, index) of eleventhRowData"
      :key="index"
    >
      <div class="flex flex-column">
        <div
          class="
            flex
            international-agent-costingdetails-detailsText
            express-international-table
          "
        >
          {{ getSubHeaderSeven(index) }}
        </div>
        <div
          :class="
            item != 'High'
              ? 'flex international-agent-costingdetails-detailsText express-international-table international-agent-costingdetails-valuesText'
              : 'flex international-agent-costingdetails-detailsText express-international-table international-agent-costingdetails-valuesText'
          "
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div> -->

  <div
    class="
      international-agent-costingdetails-surcharge
      align-items-center
      flex
      express-international-table
      mt-6
    "
  >
    Onforwarding
  </div>

  <div class="flex flex-row ml-1 mt-4 mb-4">
    <div
      class="flex mr-7"
      v-for="(item, index) of this.$store.state.salesInternationalAgent
        .InternationalAgentOverviewData?.international_agent_specifics
        ?.onfarwards"
      :key="index"
    >
      <img
        :src="'/images/' + 'drag-drop-pdf' + '.png'"
        alt="pdf"
        width="30"
        height="27"
        class="mt-2"
      />
      <div class="flex flex-column">
        <div
          class="
            flex
            international-agent-costingdetails-detailsText
            express-international-table
          "
        >
          {{ item.agent_name }}
        </div>

        <div
          :class="
            item != 'High'
              ? 'flex international-agent-costingdetails-detailsText express-international-table international-agent-costingdetails-valuesText'
              : 'flex international-agent-costingdetails-detailsText express-international-table international-agent-costingdetails-valuesText'
          "
        >
          {{
            item.import == "None" || item.import == ""
              ? item.export == "None" || item.export == ""
                ? item.local
                : item.export
              : item.import
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DuoSelection from "../DuoSelect.vue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Clearance from "./Clearance.vue";
import COD from "./cod.vue";
import DeliveryCharges from "./DeliveryCharges.vue";
import { mapState, mapActions } from "vuex";
import moment from "moment";
// import SelectButton from "primevue/selectbutton";
export default {
  components: {
    DuoSelection,
    Accordion,
    AccordionTab,
    Clearance,
    COD,
    DeliveryCharges,
  },
  watch: {
    "$store.state.salesInternationalAgent.addClearanceChargesType":
      function () {
        this.defaultClearanceType =
          this.$store.state.salesInternationalAgent.addClearanceChargesType;
      },
    "$store.state.salesInternationalAgent.addCODChargesType": function () {
      this.defaultCODType =
        this.$store.state.salesInternationalAgent.addCODChargesType;
    },
    "$store.state.salesInternationalAgent.addDeliveryChargesType": function () {
      this.defaultDeliveryType =
        this.$store.state.salesInternationalAgent.addDeliveryChargesType;
    },
  },

  data() {
    return {
      details: {},
      documentCharge: "",
      handCharge: "",
      renderKey: 1,
      start_date: null,
      overview:
        this.$store.state.salesInternationalAgent
          .InternationalAgentOverviewData,
      selectType: "Document",
      defaultClearanceType: "Airfreight",
      defaultCODType: "",
      defaultDeliveryType0: "Delivery Charges",
      defaultDeliveryType1: "Delivery Charges",
      defaultDeliveryType2: "Delivery Charges",

      document: ["Document", "Parcel"],
      delivery_charges: [
        "Delivery Charges",
        "Resident Delivery Charges",
        "Delivery Attempt Charges",
      ],
      airfreight: ["Airfreight", "DNATA", "OBC"],
      clearance: [],
      gst_type: [],
      freedom: [
        "FREEDOM",
        "DDU",
        "FREEDOM REQUEST",
        "FREEDOM TRANSFER",
        "MES SCHEME",
      ],
      storage: [
        {
          name: "Weight Range",
          field: "",
        },
        {
          name: "Minimum Charges",
          field: "storage_min_charge",
        },
        {
          name: "Per Kg Charges",
          field: "storage_charge_per_kg",
        },
      ],
      miscellaneous: [
        {
          name: "Document Amount",
          field: "",
        },
        {
          name: "Handling Amount",
          field: "",
        },
        {
          name: "Mes Count",
          field: "mes_gst_count",
        },
        {
          name: "Mes Amount",
          field: "mes_gst_charges",
        },
        // {
        //   name: "Minimum Permit (FOC)",
        //   field: "miscellaneous_min_permit_foc",
        // },
        // {
        //   name: "Additional Amount per Permit",
        //   field: "miscellaneous_amount_per_permit",
        // },
        // {
        //   name: "Minimum Item (FOC)",
        //   field: "miscellaneous_min_item",
        // },
        // {
        //   name: "Additional Amount per Item",
        //   field: "miscellaneous_amount_per_item",
        // },
      ],
      secondRowData: {
        priority: "80.00 $ ",
        previously_served_by: "40.00 $ ",
        referral_person_name: "100.00 $ ",
        sales_comission: "100.00 $ ",
        festival_name: "100.00 $ ",
      },
      thirdRowData: {
        public: "100.00 $ ",
        remote: "100.00 $ ",
        remote_area: "40.00 $",
      },
      thirdRowDataOne: {
        public: "100.00 $ ",
      },
      fourthRowData: {
        airFreight_clearance_charges: "0kg - 1kg | Charges : 10.00 $  ",
        weight_charges: " 1kg | Charges : 10.00 $  ",
      },
      fifthRowData: {
        public: "100.00 $ ",
        remote: "100.00 $ ",
        remote_area: "40.00 $",
      },
      sixthRowData: {
        public: "100.00 $ ",
        remote: "100.00 $ ",
        remote_area_one: "100.00 $ ",
        remote_area: "100.00 $ ",
      },
      seventhRowData: {
        public: "5% | Min Charges : 10.00 $ ",
      },
      eigthRowData: {
        public: "Document $: 50  | Handling $: 50",
        remote: "Document $: 50  | Handling $: 50",
        remote_area_one: "Document $: 50  | Handling $: 50",
        remote_area: "Document $: 50  | Handling $: 50",
      },
      ninethRowData: {
        public: "0 - 1 kg",
        remote: "$ 50",
        remote_area: "$ 50",
      },
      tenthRowData: {
        public: "$ 50",
        remote: "$ 50",
        remote_area: "20",
        remote_area_one: "$ 50",
        remote_area_two: "10",
        remote_area_three: "$ 50",
      },
      eleventhRowData: {
        public: "20",
        remote: "$ 50",
      },
      twelveRowData: {
        public: "Rate Card 1",
        remote: "Rate Card 1",
      },
      thirteenRowData: {
        public: "0kg - 1kg | Charges : 10.00 $ ",
        remote: "1kg | Charges : 10.00 $ ",
      },
      deliveryTypeOne: {
        public: "0kg - 1kg | Charges : 10.00 $ ",
        remote: "1kg | Charges : 10.00 $ ",
      },
      deliveryTypeTWO: {
        public: "0kg - 1kg | Charges : 10.00 $ ",
        remote: "1kg | Charges : 10.00 $ ",
      },
    };
  },
  updated() {},
  computed: {
    ...mapState({
      overviewData: (state) =>
        state.salesInternationalAgent.InternationalAgentOverviewData,
    }),
  },
  async created() {
    this.getClearance();
  },
  methods: {
    ...mapActions({
      getClearanceMode: "salesInternationalAgent/getClearanceMode",
      getPermitSettings: "salesInternationalAgent/getPermitSettings",
    }),
    onChange() {
      this.renderKey++;
    },
    getCharge(type) {
      let data =
        this.$store.state.salesInternationalAgent
          .InternationalAgentOverviewData;
      if (data && !Array.isArray(data)) {
        let permit =
          data?.international_agent_specifics?.permit_settings?.gst_details.find(
            (i) => i.gst_type.includes("MES SCHEME")
          );
        if (type.includes("Document")) {
          return permit.document_charges + " $" ?? "";
        }
        return permit.handling_charges + " $" ?? "";
      }
      return "-";
    },
    effectiveData() {
      let date = "";
      if (
        this.$store.state.salesInternationalAgent.InternationalAgentOverviewData
          ?.settings?.effective_start_date
      ) {
        date = moment(
          this.$store.state.salesInternationalAgent
            .InternationalAgentOverviewData?.settings.effective_start_date
        ).format("D MMM YYYY");
      }
      return date;
    },
    async getClearance() {
      let res = await this.getClearanceMode();

      this.clearance = [];
      //  this.details.clearance= res.data.results;
      res.data.results.map((list) => {
        this.clearance.push(list.clearance_mode_name);
      });
      this.defaultClearanceType = this.clearance[0];
    },
    async getPermitList() {
      let res = await this.getPermitSettings();

      //  this.details.clearance= res.data.results;
      if (res) {
        res.data.results.map((e) => {
          this.gst_type.push(e.gst_type);
        });
        this.defaultCODType = this.gst_type[0];
        let permit =
          this.$store.state.salesInternationalAgent.InternationalAgentOverviewData?.international_agent_specifics?.permit_settings?.gst_details.find(
            (i) => i.gst_type.includes("MES SCHEME")
          );
        this.miscellaneous[0].field = permit.permitSettings[0].handling_charges;
        this.miscellaneous[1].field = permit.permitSettings[0].handling_charges;
      }
    },
    getHeaderOne(index) {
      let header = "";
      switch (index) {
        case "storage_min_weight":
          header = "Weight Range";
          break;
        case "storage_min_charge":
          header = "Minimum Charges";
          break;
        case "storage_charge_per_kg":
          header = "Per Kg Charges";
          break;
        case "storage_grace_period":
          header = "Grace Period";
          break;
      }
      return header;
    },
    getHeader(index) {
      let header;
      switch (index) {
        case "priority":
          header = "Island Surcharge";
          break;
        case "previously_served_by":
          header = "Lost Shipment Charges";
          break;
        case "referral_person_name":
          header = "Saturday Delivery Charges";
          break;
        case "sales_comission":
          header = "Sunday Delivery Charges";
          break;
        case "festival_name":
          header = "After Office Hr. Delivery Charges";
          break;
      }
      return header;
    },

    getSubHeader(index) {
      let header;
      switch (index) {
        case "public":
          header = "Public Holiday Delivery Charges";
          break;
        case "remote":
          header = "Remote Delivery per KG";
          break;
        case "remote_area":
          header = "Remote Area Charges";
          break;
      }
      return header;
    },

    getSubHeaderFour(index) {
      let header;
      switch (index) {
        case "public":
          header = "Controlled Item";
          break;
        case "remote":
          header = "Controlled Item Extempted";
          break;
        case "remote_area_one":
          header = "Controlled Item W/O License";
          break;
        case "remote_area":
          header = "Controlled Item + High Value Item";
          break;
        case "remote_area_two":
          header = "High Value Item";
          break;
      }
      return header;
    },
    getSubHeaderFive(index) {
      let header;
      switch (index) {
        case "public":
          header = "Weight Range";
          break;
        case "remote":
          header = "Minimum Charges";
          break;
        case "remote_area":
          header = "Per Kg Charges";
          break;
      }
      return header;
    },
    getSubHeaderSix(index) {
      let header;
      switch (index) {
        case "public":
          header = "Document Amount";
          break;
        case "remote":
          header = "Handling Amount";
          break;
        case "remote_area":
          header = "Mes Count";
          break;
        case "remote_area_one":
          header = "Mes Amount";
          break;
        case "remote_area_two":
          header = "Minimum Permit (FOC)";
          break;
        case "remote_area_three":
          header = "Additional Amount per Permit";
          break;
      }
      return header;
    },
    getSubHeaderSeven(index) {
      let header;
      switch (index) {
        case "public":
          header = "Minimum Item (FOC)";
          break;
        case "remote":
          header = "Additional Amount per Item";
          break;
      }
      return header;
    },
    getSubHeaderEight(index) {
      let header;
      switch (index) {
        case "public":
          header = "FEDEX ";
          break;
        case "remote":
          header = "DHL";
          break;
      }
      return header;
    },
  },
  mounted() {
    this.getClearance();
    this.getPermitList();
  },
};
</script>
<style scoped>
.international-agent-costingdetails-start-date {
  color: #7e84a7;
  font-style: normal;
  line-height: 15px;
  align-items: center;
}
.international-agent-costingdetails-currency {
  color: #7e84a7;
  font-style: normal;
  line-height: 15px;
  justify-content: end;
}

::v-deep.p-buttonset .p-button {
  font-size: 12px !important;
}

.international-agent-document-parcel {
  background-color: #c4ffaf;
  color: #277a00;
  border-radius: 25px;
  line-height: 15px;
  padding-inline: 10px;
}
.international-agent-singapore {
  font-style: normal;
  line-height: 20px;
  color: #66c11e;
}

.international-agent-costingdetails-surcharge {
  line-height: 20px;
  color: #4e5868;
  width: 100%;
  height: 35px;
  background-color: #eef4ff;
  padding-left: 8px;
}
.international-agent-costingdetails-detailsText {
  color: #7e84a7;
}
.international-agent-costingdetails-valuesText {
  color: #66c11e;
}
.international-agent-costingdetails-storage-weight {
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.03em;
  color: #7e84a7;
}
.international-agent-costingdetails-costing-details {
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.03em;
  color: #343434;
}
.p-buttonset {
  border-radius: 9px !important;
  height: 40px !important;
}
::v-deep.p-accordion
  .p-accordion-tab:first-child
  .p-accordion-header
  .p-accordion-header-link {
  position: relative;
}

::v-deep.p-accordion .p-accordion-tab {
  margin-block: 20px !important;
}
::v-deep.p-accordion .p-accordion-header .p-accordion-header-link {
  border-top: none !important;
  border: none !important;
}
::v-deep.p-accordion
  .p-accordion-header
  .p-accordion-header-link
  .p-accordion-toggle-icon {
  position: absolute;
  right: 10px;
}
.accordion {
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: #4e5868 !important;
}

::v-deep.p-accordion .p-accordion-header .p-accordion-header-link {
  background-color: #eef4ff;
  border-radius: 5px !important;
}
::v-deep.pi-chevron-right:before {
  position: absolute;
  right: 18px;
  top: 16px;
}

::v-deep.pi:before {
  position: unset;
  right: 18px;
  bottom: auto;
  top: 16px;
}
.store-display {
  display: none !important;
}
</style>