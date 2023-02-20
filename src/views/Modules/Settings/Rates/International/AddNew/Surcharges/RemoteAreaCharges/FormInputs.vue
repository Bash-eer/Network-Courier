  <template>
  <div>
    <div class="input-wrapper col-3">
      <div class="label mb-2 flex">Country</div>
      <div :key="formData.country_id" class="flex align-items-center">
        <DropDownField
          :key="formData.country_id"
          label="country_id"
          id="fromZone"
          :state="formData.country_id"
          :data="countryOpts"
          v-model="formData.country_id"
          :value="formData.country_id"
          :filter="true"
          v-on:childToParent="getUserInput"
          code="country_id"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
        <div
          v-if="count !== 1"
          @click="$emit('removeRow', rowId)"
          class="pi pi-times pointer ml-4"
        ></div>
      </div>
    </div>
    <div v-for="(data, idx) of rowData" :key="data">
      <DestinationForm
        :rowId="idx"
        :count="rowData.length"
        @isRowValid="isRowValid"
        @removeRow="removeRow"
        @setDestinations="setDestinations"
        :destinations="formData.destinations[idx]"
        :country_id="formData.country_id"
        :type="type"
      />
    </div>
    <div @click="addRow" class="add-text pointer ml-2 mt-3">
      + Add Destinations
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import useVuelidate from "@vuelidate/core";
import DestinationForm from "./DestinationInput.vue";

export default {
  components: { DestinationForm },
  props: ["count", "rowId", "type"],
  data() {
    return {
      countryOpts: [],
      isValid: true,
      rowData: [],
      formData: {
        country_id: "",
        destinations: [],
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        // country_id: { required },
      },
    };
  },
  computed: {
    ...mapGetters({
      remoteAreaCharges: "AddNewInternational/Surcharges/remoteAreaCharges",
    }),
  },
  methods: {
    ...mapActions({
      addRemoteAreaDestination:
        "AddNewInternational/Surcharges/addRemoteAreaDestination",
      removeRemoteAreaDestination:
        "AddNewInternational/Surcharges/removeRemoteAreaDestination",
      setRemoteAreaCharges:
        "AddNewInternational/Surcharges/setRemoteAreaCharges",
      getCountryList: "Outbound/getCountryList",
    }),
    setDestinations({ idx, data }) {
      this.formData.destinations[idx] = data;
    },
    getUserInput() {
      this.setRemoteAreaCharges({
        type: this.type,
        idx: this.rowId,
        data: this.formData,
      });
    },
    removeRow(id) {
      if (this.rowData.length > 1) {
        this.rowData.splice(id, 1);

        this.removeRemoteAreaDestination({
          type: this.$props.type,
          typeIdx: this.$props.rowId,
          destIdx: id,
        });
      }
    },
    isRowValid({ isValid, id }) {
      this.rowData.map((list, idx) => {
        if (idx === id) {
          list.valid = isValid;
          return;
        }
      });

      let invalidRow = this.rowData.find((list) => list.isValid === false);

      if (this.v$.$invalid && !invalidRow) {
        this.isValid = false;
        this.$emit("isRowValid", { isValid: false, id: this.rowId });
      } else {
        this.isValid = true;
        this.$emit("isRowValid", { isValid: true, id: this.rowId });
      }

      this.setRemoteAreaCharges({
        type: this.type,
        idx: this.rowId,
        data: this.formData,
      });
    },
    addRow() {
      let count = this.rowData.length + 1;

      let exist = this.rowData.find((list) => {
        if (list.id === count) {
          return list;
        }
      });

      if (exist) {
        this.rowData.push({
          id: this.rowData.length + exist.id,
          valid: false,
        });
      } else {
        this.rowData.push({ id: this.rowData.length + 1, valid: false });
      }

      this.addRemoteAreaDestination({
        type: this.$props.type,
        idx: this.$props.rowId,
      });
    },
    prefillData() {
      this.formData = this.remoteAreaCharges[this.type][this.rowId];
    },
    async getCountries() {
      this.countryOpts = [];
      let res = await this.getCountryList();

      res.data.results.map((list) => {
        this.countryOpts.push({
          name: list.country_name,
          code: list.country_iso_code,
          country_id: list.id,
        });
      });
    },
  },
  async created() {
    await this.getCountries();
    this.prefillData();
    console.log(this.remoteAreaCharges);
    this.remoteAreaCharges[this.type][this.rowId].destinations.map((_, idx) => {
      this.rowData.push({ id: idx, valid: true });
    });
  },
};
</script>

<style scoped>
.add-text {
  display: flex;
  align-items: flex-start;
  color: #357dea;
}
</style>