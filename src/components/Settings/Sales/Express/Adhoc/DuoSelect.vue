<template>
  <SelectButton
    v-model="value"
    :options="data"
    optionLabel="name"
    optionDisabled="disabled"
    :class="tab_control_class"
  />
</template>

<script>
import SelectButton from "primevue/selectbutton";
export default {
  name: "DuoSelect",
  props: ["options", "default", "type", "index", "optionDisabled"],
  data: () => ({
    value: null,
    data: [],
    tab_control_class: "tab_control_class_disable",

    tab_selection_count: 0,
  }),
  methods: {
    getValidationType(name) {
      let type;
      switch (name) {
        case "Normal":
          type = "normal";
          break;
        case "E-Commerce":
          type = "e_commerce";
          break;
        case "Surcharges":
          type = "surcharges";
          break;
        case "Additional Surcharges":
          type = "additional_surcharges";
          break;
      }
      return type;
    },
    tabControl(tab, bool) {
      if (bool == true) {
        this.tab_control_class = "tab_control_class_disable";
      }
      if (bool == false) {
        this.tab_control_class = "tab_control_class_enable";
      }

      for (let d in this.data) {
        if (this.data[d]["name"] != tab) {
          this.data[d]["disabled"] = bool;
        }
      }
    },
  },
  watch: {
    //watching changes in tab field validations
    "$store.state.expressAdhoc.addZonalRatesValidation": function () {
      if (
        this.$store.state.expressAdhoc.addZonalRatesValidation["details"][
          "rates"
        ][this.index]
      ) {
        if (
          this.$store.state.expressAdhoc.addZonalRatesValidation["details"][
            "rates"
          ][this.index]["charge_type"][
            this.getValidationType(this.value["name"])
          ]
        ) {
          if (
            this.$store.state.expressAdhoc.addZonalRatesValidation["details"][
              "rates"
            ][this.index]["charge_type"][
              this.getValidationType(this.value["name"])
            ].$invalid
          ) {
            this.tabControl(this.value["name"], true);
          }
          if (
            !this.$store.state.expressAdhoc.addZonalRatesValidation["details"][
              "rates"
            ][this.index]["charge_type"][
              this.getValidationType(this.value["name"])
            ].$invalid
          ) {
            this.tabControl(this.value["name"], false);
          }
        }
      }
    },

    //watching tab selection
    value: function () {
      this.tab_selection_count++;

      //normal rates transport type validation check
      if (this.type != "setZonalRates") {
        this.$store.dispatch("expressAdhoc/" + this.type, {
          type: [this.value["name"], this.index],
        });
      }

      //zonal rates selection validation check
      if (this.type == "setZonalRates") {
        //check if the current tab has validation enabled
        if (
          this.$store.state.expressAdhoc.addZonalRatesValidation["details"][
            "rates"
          ][this.index]["charge_type"][
            this.getValidationType(this.value["name"])
          ]
        ) {
          //If all required fields are not filled in
          if (
            this.$store.state.expressAdhoc.addZonalRatesValidation["details"][
              "rates"
            ][this.index]["charge_type"][
              this.getValidationType(this.value["name"])
            ].$invalid
          ) {
            this.tabControl(this.value["name"], true);
            // this.$store.dispatch("expressAdhoc/setAddZonalRatesSubmission", {
            //   bool: true,
            // });
          }

          //check if all required fields are filled in
          if (
            !this.$store.state.expressAdhoc.addZonalRatesValidation["details"][
              "rates"
            ][this.index]["charge_type"][
              this.getValidationType(this.value["name"])
            ].$invalid
          ) {
            this.tabControl(this.value["name"], false);
          }

          this.$store.dispatch("expressAdhoc/" + this.type, {
            type: [this.value["name"], this.index],
          });
        }

        //proceed clicking of other tabs if the current tab does not have validation enabled
        else {
          this.$store.dispatch("expressAdhoc/" + this.type, {
            type: [this.value["name"], this.index],
          });
        }
      }
    },
  },
  components: {
    SelectButton,
  },
  created() {
    this.data = this.options;
    for (let o in this.options) {
      if (this.options[o]["name"] == this.default) {
        this.value = this.options[o];
      }
    }
  },
};
</script>

<style>
.tab_control_class_disable .p-disabled {
  opacity: 0.5 !important;
}
.tab_control_class_enable .p-disabled {
  opacity: 1 !important;
}
</style>
