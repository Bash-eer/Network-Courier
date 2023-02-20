<template>
  <Dropdown
    @change="$emit('update:modelValue', $event.value)"
    :value="modelValue"
    v-model="selectedContact"
    :options="data"
    optionLabel="name"
    optionValue="code"
    optionGroupLabel="name"
    optionGroupChildren="items"
    :filter="true"
    :showClear="false"
    :class="classes"
    class="flex text-left inputfield w-full p-inputtext-lg"
    ref="op"
    @hide="close"
    @click.self="isOpen = true"
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
          <div class="col-8 md:col-8">
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
              v-if="type == 'companyData'"
              label="Add"
              button_class="p-button-sm addFieldButton"
              @click="addNewCompanyClick"
            />
            <Buttons
              v-else-if="type == 'companyDataContact'"
              label="Add"
              button_class="p-button-sm addFieldButton"
              @click="addNewCompanyContactClick"
            />
            <Buttons
              v-else-if="type == 'jobType'"
              label="Add"
              button_class="p-button-sm addFieldButton"
              @click="addNewJobTypeClick"
            />
            <Buttons
              v-else
              label="Add"
              button_class="p-button-sm addFieldButton"
              @click="addNewFieldClick"
            />
          </div>
          <div class="flex delete col-2 md:col-2 mt-2" @click="closeAddNew">
            <i class="fas fa-times pl-4"></i>
          </div>
        </div>
      </div>
    </template>
    <!--DROPDOWN OPTION VALUES TEMPLATE-->
    <template #option="slotProps">
      <div
        class="flex flex-row align-items-center justify-content-between"
        @click="
          type == 'companyData'
            ? selectedCompanyDetails(slotProps.option.id)
            : selectedContactPerson(slotProps.option.id)
        "
      >
        <div class="flex fieldNames" v-if="type == 'companyData'">
          {{ slotProps.option.name }}
        </div>

        <div class="flex fieldNames" v-else-if="type == 'companyDataContact'">
          {{ slotProps.option.name }}
        </div>

        <div class="flex fieldNames" v-else>{{ slotProps.option.name }}</div>
        <div
          v-if="type == 'companyData'"
          class="flex delete col-1 md:col-1 mt-2"
          @click="deleteValueCompany(slotProps.option.id)"
        >
          <i class="fas fa-times"></i>
        </div>
        <div
          v-else-if="type == 'companyDataContact'"
          class="flex delete col-1 md:col-1 mt-2"
          @click="deleteValueCompanyContact(slotProps.option.id)"
        >
          <i class="fas fa-times"></i>
        </div>
        <div
          v-else
          class="flex delete col-1 md:col-1 mt-2"
          @click="deleteValue(slotProps.option.id)"
        >
          <i class="fas fa-times"></i>
        </div>
      </div>
    </template>
  </Dropdown>
</template>

<script>
import Dropdown from "primevue/dropdown";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "AddNewDropDown",
  components: {
    Dropdown,
  },
  props: [
    "data",
    "placeholder",
    "storePath",
    "state",
    "stateName",
    "classes",
    "modelValue",
    "companyDetails",
    "tableName",
    "type",
    "companyNameDetails",
    "paramData",
  ],
  data() {
    return {
      selectedContact: null,
      display: false,
      events: null,
      contactData: "",
      selectedId: null,
      details: {
        newField: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      CompanyNameAddNewData: "CustomerLaunchStore/CompanyNameAddNewData",
      CompanyContactAddNewData: "CustomerLaunchStore/CompanyContactAddNewData",
      gerCrmBookingData: "CustomerLaunchStore/gerCrmBookingData",
    }),
    ...mapState({
      overviewData: (state) =>
        state.CustomerLaunchStore.customerNameDropDownList,
    }),
  },
  methods: {
    ...mapActions({
      getCustomerNameDropDownList:
        "CustomerLaunchStore/getCustomerNameDropDownList",
      createCustomerName: "CustomerLaunchStore/createCustomerName",
      createCustomerCostCenter: "CustomerLaunchStore/createCustomerCostCenter",
      getCostCenterDropDownList:
        "CustomerLaunchStore/getCostCenterDropDownList",
      deleteCustomerCostCenter: "CustomerLaunchStore/deleteCustomerCostCenter",
      deleteCustomerName: "CustomerLaunchStore/deleteCustomerName",
      getCustomerCostCenterDropDownList:
        "CustomerLaunchStore/getCustomerCostCenterDropDownList",
      getCustomerContactDropDownList:
        "CustomerLaunchStore/getCustomerContactDropDownList",
      createCustomerContact: "CustomerLaunchStore/createCustomerContact",
      deleteCustomerContact: "CustomerLaunchStore/deleteCustomerContact",
      getCompanyNameDetailsId: "CustomerLaunchStore/getCompanyNameDetailsId",
      getCompanyContactDetailsId:
        "CustomerLaunchStore/getCompanyContactDetailsId",
      createNewJobType: "CrmSettings/createNewJobType",
    }),
    close() {
      this.display = false;
    },
    closeAddNew() {
      this.display = false;
      this.stopPropagation();
    },
    async deleteValue(id) {
      await this.deleteCustomerCostCenter(id).then(async (c) => {
        if (c == 200) {
          this.$emit("deleteFromNewDrop", true);
        }
      });
    },
    selectedCompanyDetails(id) {
      this.getCompanyNameDetailsId(id);
    },
    selectedContactPerson(id) {
      this.getCompanyContactDetailsId(id);
    },
    async deleteValueCompany(id) {
      await this.deleteCustomerName(id).then(async (c) => {
        if (c == 200) {
          let pay;
          if (this.$route.params.type == "Adhoc") {
            pay = {
              profile_id: this.gerCrmBookingData?.profile_id,
            };
          } else if (this.$route.params.type == "Contract") {
            pay = {
              contract_profile_id: this.gerCrmBookingData?.contract_id,
            };
          }

          await this.getCustomerNameDropDownList(pay);
        }
      });
    },
    async deleteValueCompanyContact(id) {
      await this.deleteCustomerContact(id).then(async (c) => {
        if (c == 200) {
          let val = this.$store.state.CustomerLaunchStore.contactNameId;
          if (this.$route.params.type != "Adhoc") {
            await this.getCustomerContactDropDownList(val);
          }
        }
      });
    },
    addNew(event) {
      this.display = true;
      this.events = event;
      this.stopPropagation();
    },
    async addNewFieldClick() {
      if (this.details.newField != "") {
        let companyId =
          this.$route.params.type == "Adhoc"
            ? this.companyDetails?.profile_id
            : this.companyDetails?.contract_id;
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
            await this.getCustomerCostCenterDropDownList({
              id: companyId,
              type: this.companyDetails?.customer_type,
            });
            this.$emit("deleteFromNewDrop", true);
          }
        });
        this.display = false;
      } else {
        this.display = false;
      }
      this.stopPropagation();
    },
    async addNewCompanyClick() {
      if (this.details.newField != "") {
        let Value = this.CompanyNameAddNewData.company_details;
        let companyId = "";
        let object = {
          company_name: this.details.newField,
        };
        if (this.$route.params.type == "Adhoc") {
          object["profile_id"] = this.companyDetails.adhoc_customer.id;
        } else {
          object["contract_profile_id"] =
            this.companyDetails.contract_customer.id;
        }

        await this.createCustomerName(object).then(async (c, i) => {
          if (c == 200) {
            let pay;
            if (this.$route.params.type == "Adhoc") {
              pay = {
                profile_id: this.gerCrmBookingData?.profile_id,
              };
            } else if (this.$route.params.type == "Contract") {
              pay = {
                contract_profile_id: this.gerCrmBookingData?.contract_id,
              };
            }
            await this.getCustomerNameDropDownList(pay);
          }
        });
        this.display = false;
      } else {
        this.display = false;
      }
      this.stopPropagation();
    },
    async addNewCompanyContactClick() {
      if (this.details.newField != "") {
        let object = {
          contact_name: this.details.newField,
          company_id: this.$store.state.CustomerLaunchStore.contactNameId,
        };
        await this.createCustomerContact(object).then(async (c, i) => {
          if (c == 200) {
            let val = this.$store.state.CustomerLaunchStore.contactNameId;
            if (this.$route.params.type != "Adhoc") {
              await this.getCustomerContactDropDownList(val);
            }
          }
        });
        this.display = false;
      } else {
        this.display = false;
      }
      this.stopPropagation();
    },
    stopPropagation() {
      if (!e) var e = window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();
    },
    prefillData(data) {
      let arr = this.data[0]?.items;
      for (let s in arr) {
        if (arr[s]["name"] == data) {
          this.selectedContact = arr[s]["code"];
          this.selectedId = arr[s]["id"];
        }
      }
    },
  },
  watch: {
    display: function () {
      if (this.display == true) {
        this.$refs.op.show();
      }
    },
    "modelValue.customer_cost_center_name": function () {
      if (this.modelValue?.customer_cost_center_name) {
        this.selectedContact = this.modelValue.customer_cost_center_name;
      }
    },
    "modelValue.company_name": function () {
      if (this.modelValue?.company_name) {
        this.selectedContact = this.modelValue.company_name;
      }
    },
    "modelValue.contact_name": function () {
      if (this.modelValue?.contact_name) {
        this.selectedContact = this.modelValue.contact_name;
      }
    },
    selectedContact: function (newVal, oldVal) {
      if (newVal != oldVal) {
        this.prefillData(this.selectedContact);
        if (this.type == "companyData") {
          this.selectedCompanyDetails(this.selectedId);
        } else {
          this.selectedContactPerson(this.selectedId);
        }
      }
    },
  },
  created() {
    if (this.state != "") {
      this.prefillData(this.state);
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
}
.dropDownPic {
  width: 34.14px;
  height: 34.14px;
  margin-right: 0.5rem;
}
</style>
