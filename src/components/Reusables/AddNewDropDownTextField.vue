<template>
  <Dropdown
    :key="renderkey"
    @change="$emit('update:modelValue', $event.value)"
    :value="modelValue"
    v-model="selectedContact"
    :options="data"
    optionLabel="name"
    optionGroupLabel="name"
    optionGroupChildren="items"
    :filter="true"
    :showClear="false"
    :class="classes"
    class="flex text-left inputfield w-full p-inputtext-sm"
    ref="op"
    @hide="close"
    :placeholder="placeholder"
    @click.self="isOpen = true"
    :code="code"
  >
    <!--DROPDOWN OPTION HEADER TEMPLATE-->
    <template #optiongroup>
      <!--ADD NEW DROPDOWN ITEM TEMPLATE-->
      <div
        v-if="display == false"
        class="flex flex-row align-items-center addNewFieldsDiv"
        @click="addNew"
      >
        <div class="flex fieldNames">
          <span class="addNewFieldtText ml-0">+ Add New</span>
        </div>
      </div>
      <!--ADD NEW DROPDOWN (TEXT BOX AND BUTTON) ITEM TEMPLATE-->
      <div v-if="display == true">
        <div class="flex justify-content-between ml-2">
          <div class="flex"></div>
        </div>
        <div class="row">
          <div class="col-9 md:col-9">
            <TextField
              label="newField"
              type="text"
              v-model="details.newField"
              :classes="{
                'inputfield w-full  dialog-field-text': true,
              }"
            />
          </div>
          <div class="col-2 md:col-2">
            <Buttons
              label="Add"
              button_class="p-button-sm addFieldButton"
              v-on:childToParent="addNewField"
            />
          </div>
          <div class="flex delete col-1 md:col-1 mt-2" @click="closeAddNew">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>
    </template>
    <!--DROPDOWN OPTION VALUES TEMPLATE-->
    <template #option="slotProps"
      ><div class="flex flex-row align-items-center justify-content-between">
        <div class="flex fieldNames">{{ slotProps.option.name }}</div>
        <div
          v-if="optionClose && slotProps.option.id"
          class="flex delete col-1 md:col-1 mt-2"
          @click="removeOption(slotProps.option.code, slotProps.option.id)"
        >
          <i class="fas fa-times"></i>
        </div>
      </div>
    </template>
  </Dropdown>
</template>

<script>
import Dropdown from "primevue/dropdown";
import { exc_master } from "../../store/helper";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "AddNewDropDownTextField",
  components: {
    Dropdown,
  },
  props: [
    'data',
    'placeholder',
    'storePath',
    'state',
    'stateName',
    'classes',
    'modelValue',
    'type',
    'optionClose',
    'code',
  ],
  data() {
    return {
      renderkey: 1,
      selectedContact: null,
      display: false,
      events: null,
      details: {
        newField: '',
      },
    };
  },
  methods: {
    ...exc_master,
    ...mapActions({
      createCustomerCostCenter: "Masscollection/createCustomerCostCenter",
      deleteCustomerCostCenter: "Masscollection/deleteCustomerCostCenter",
      loadCustomerCostCenterDropdownData:
        "Masscollection/loadCustomerCostCenterDropdownData",
    }),
    close() {
      this.display = false;
    },
    closeAddNew() {
      this.display = false;
      this.stopPropagation();
    },
    async removeOption(e, id) {
      if (this.type == "mass_collection") {
        await this.deleteCustomerCostCenter(id).then(async (c) => {
          if (c == 200) {
            let companyId =
              this.$route.params.type == "Contract"
                ? this.companyDetails?.contract_id
                : this.companyDetails?.profile_id;
            if (this.$route.params.type == "Contract") {
              let pay = `contractId=${companyId}`;
              this.loadCustomerCostCenterDropdownData(pay);
            } else {
              let pay = `profile_id=${companyId}`;
              this.loadCustomerCostCenterDropdownData(pay);
            }
          }
        });
      } else {
        this.removeSurchargeName({ id: e, toast: this.$toast });
      }
    },
    addNew(event) {
      this.display = true;
      this.events = event;
      this.stopPropagation();
    },
    async addNewField() {
      if (this.display == true && this.details.newField != "") {
        let count = 0;
        if (this.type != 'Other') {
          if (this.type == 'Surcharge') {
            this.addSurchargeName({
              payload: { surcharge_name: this.details.newField },
              toast: this.$toast,
            });
          } else if (this.type == "mass_collection") {
            if (this.details.newField != "") {
              let companyId =
                this.$route.params.type == "Contract"
                  ? this.companyDetails?.contract_id
                  : this.companyDetails?.profile_id;
              let object;
              if (this.$route.params.type == "Contract") {
                object = {
                  customer_cost_center_name: this.details.newField,
                  contract_id: companyId,
                };
              } else {
                object = {
                  customer_cost_center_name: this.details.newField,
                  profile_id: companyId,
                };
              }
              await this.createCustomerCostCenter(object).then(async (c, i) => {
                if (c == 200) {
                  if (this.$route.params.type == "Contract") {
                    let pay = `contractId=${companyId}`;
                    this.loadCustomerCostCenterDropdownData(pay);
                  } else {
                    let pay = `profile_id=${companyId}`;
                    this.loadCustomerCostCenterDropdownData(pay);
                  }
                }
              });
              this.display = false;
            }
          } else {
            for (let c in this.$store.state[this.storePath][this.stateName][0]
              .items) {
              let code = Number(
                this.$store.state[this.storePath][this.stateName][0].items[c][
                  'code'
                ]
              );
              count = code;
            }
            this.$store.state[this.storePath][this.stateName][0].items.push({
              name: this.details.newField,
              code:
                this.type == 'Surcharge'
                  ? this.details.newField
                  : Number(count) + 1,
              picture: '/images/defaultProfile.jpg',
            });
          }
        }
        this.display = false;
        this.$emit('addNewValue', this.details.newField);
      }
      this.details.newField = '';
      this.stopPropagation();
    },
    stopPropagation() {
      if (!e) var e = window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();
    },
  },
  watch: {
    display: function () {
      if (this.display == true) {
        this.$refs.op.show();
      }
    },
    data: function () {
      if (this.state != '') {
        let arr = this.data[0].items;
        for (let s in arr) {
          if (arr[s] == this.state) {
            this.selectedContact = arr[s];
          }
        }
        this.renderkey++;
      }
    },
  },
  created() {
    if (this.state != '') {
      let arr = this.data[0].items;
      for (let s in arr) {
        if (arr[s].name == this.state?.name) {
          this.selectedContact = arr[s];
        }
      }
      this.renderkey++;
    }
  },
};
</script>

<style scoped>
.fieldNames {
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  color: #1d1d1d;
}
.addNewFieldsDiv {
  cursor: pointer;
}
.addNewFieldtText {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #357dea;
}
.addFieldButton {
  background: #357dea;
  color: #ffffff;
  border: none;
  font-weight: bold;
  position: relative;
  left: -10px;
}
.dropDownPic {
  width: 34.14px;
  height: 34.14px;
  margin-right: 0.5rem;
}
</style>
