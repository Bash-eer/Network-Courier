<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- left contents -->
      <div class="flex ml-4 align-self-center">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <!-- tabs -->
            <span class="table-title">Special Rider Allotment</span>
          </div>
        </div>
      </div>

      <!-- right contents -->
      <div class="flex align-self-center toolPills">
        <!-- global table search Field --->
        <div class="mr-3">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              type="text"
              v-model="searchValue"
              class="global-search"
              @input="search($event.target.value)"
              placeholder="Search"
            />
          </span>
        </div>

        <!--Create Export button -->
        <Buttons
          label="Export"
          class="p-button-outlined mr-3 ml-2 dialog-button-text"
        />

        <!--Create Add new button-->
        <Buttons
          button_class="p-button-sm mr-4 add-btn custom-add-btn"
          label="Add New"
          v-on:childToParent="openDialog()"
        />
      </div>
    </div>
    <!-- tab-content -->
    <SpecialRiderTables
      tableName="SpecialRiderAllotment"
      :tableData="getSpecialRiderAllotmentList"
      :tableColumns="tabMenuData"
      @emittedUpdateData="emitUpdateData"
    />
    <Dialog
      v-model:visible="display"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      :style="{ width: '55vw' }"
    >
      <template #header>
        <h5 v-if="!updateBtn" class="bold-700 font-size-16">
          Add Special Rider/Driver Allotment
        </h5>
        <h5 v-if="updateBtn" class="bold-700 font-size-16">
          Edit Special Rider/Driver Allotment
        </h5>
      </template>
      <div v-for="(data, index) in data1" :key="index">
        <div class="formgrid grid">
          <div
            class="field flex"
            v-bind:class="{
              'col-12 md:col-6': data1.length - 1 == index,
              'col-12 md:col-5': data1.length - 1 != index,
            }"
          >
            <div>
              <h5 class="required dialog-label-text">Employee</h5>
              <Dropdown
                v-model="data.selectedEmployee"
                :options="getEmployeeDropDownList"
                :rowData="data.selectedEmployee"
                optionLabel="employee_name"
                :filter="true"
                placeholder="Select Employee"
                class="inputfield dialog-field-text"
              >
                <template #value="slotProps">
                  <div
                    class="supervisor-item supervisor-item-value flex"
                    v-if="slotProps.value"
                  >
                    <img
                      height="25"
                      width="25"
                      :src="
                        slotProps.value.image_url != 'null'
                          ? slotProps.value.image_url
                          : '/images/noavatar.png'
                      "
                    />
                    <div>{{ slotProps.value.employee_name }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="supervisor-item flex">
                    <img
                      height="30"
                      width="30"
                      :src="
                        slotProps.option.image_url != 'null'
                          ? slotProps.option.image_url
                          : '/images/noavatar.png'
                      "
                    />
                    <div>{{ slotProps.option.employee_name }}</div>
                  </div>
                </template>
              </Dropdown>
            </div>

            <div class="flex flex-row pt-6 pl-2">
              <div class="flex w-7rem h-1rem font-bold border-round">
                <Checkbox
                  v-model="data.specialRider"
                  :binary="true"
                  :aria-disabled="true"
                />
                <h6 class="pl-2 font-size-12 bold-600 color-1e90ff">
                  Special Rider
                </h6>
              </div>
              <div class="flex w-7rem h-1rem font-bold border-round">
                <Checkbox
                  v-model="data.specialDriver"
                  :binary="true"
                  :aria-disabled="true"
                />
                <h6 class="pl-2 font-size-12 bold-600 color-1e90ff">
                  Special Driver
                </h6>
              </div>
              <div class="flex w-7rem h-1rem font-bold border-round">
                <Checkbox
                  v-model="data.rapidoDriver"
                  :binary="true"
                  :aria-disabled="true"
                />
                <h6 class="pl-2 font-size-12 bold-600 color-1e90ff">
                  Rapido Driver
                </h6>
              </div>
              <div class="flex w-7rem h-1rem font-bold border-round">
                <Checkbox
                  v-model="data.supervisor"
                  :binary="true"
                  :aria-disabled="true"
                />
                <h6 class="pl-2 font-size-12 bold-600 color-1e90ff">
                  Supervisor
                </h6>
              </div>
            </div>
            <div
              class="field flex align-items-end pt-6"
              v-if="data1.length - 0 != index"
            >
              <span
                class="remove-item cursor-pointer"
                @click="removeItem(index)"
                ><i class="pi pi-times"></i
              ></span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!updateBtn">
        <span class="add-item pl-2" @click="addItem()">
          <i class="pi pi-plus"></i> Add New</span
        >
      </div>

      <template #footer>
        <Buttons
          v-if="!updateBtn"
          label="Cancel"
          button_class="buttonClass-customer-launch "
          @click="closeDialog"
        />
        <Buttons
          v-if="updateBtn"
          label="Update"
          button_class="dialog-button-text"
          @click="updateValue"
        />
        <Buttons
          v-else
          label="Save"
          button_class="dialog-button-text"
          @click="saveValue"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import InputText from "primevue/inputtext";
import SpecialRiderTables from "./specialRiderTables.vue";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";
const _ = require("lodash");

export default {
  name: "SpecialRiderTab",
  components: {
    InputText,
    SpecialRiderTables,
    Dropdown,
    Checkbox,
    Dialog,
  },

  data: () => ({
    searchValue: "",
    display: false,
    update: true,
    updateBtn: false,
    data1: [
      {
        selectedEmployee: null,
        specialRider: false,
        specialDriver: false,
        rapidoDriver: false,
        supervisor: false,
        emittedId: null,
      },
    ],
  }),
  methods: {
    ...mapActions({
      specialRiderAllotmentEmployeeList:
        "specialRiderAllotment/specialRiderAllotmentEmployeeList",
      createEmployeeRole: "specialRiderAllotment/createEmployeeRole",
      updateEmployeeDropDown: "specialRiderAllotment/updateEmployeeDropDown",
      updateBreadCrumb: "users/updateBreadCrumbAndTitle",
      specialRiderTableSearchData:
        "specialRiderAllotment/specialRiderTableSearchData",
    }),

    search: _.debounce(function (e) {
      let data = {
        searchValue: this.searchValue,
      };
      this.specialRiderTableSearchData(data);
    }, 600),

    closeDialog() {
      this.display = false;
    },
    async saveValue() {
      let payload = this.data1.map((person) => {
        return {
          hrm_employeeDetail_Id: person.selectedEmployee.id,
          specialrider: person.specialRider,
          specialdriver: person.specialDriver,
          rapidodriver: person.rapidoDriver,
          supervisor: person.supervisor,
        };
      });
      const updatedPayload = {
        newEmployeeRoles: payload,
      };
      await this.createEmployeeRole(updatedPayload).then(async (c) => {
        if (c == 200) {
          await this.specialRiderAllotmentEmployeeList();
        }
        this.addData();
      });
      if (this.updateBtn === false) {
        this.data1.length = 1;
      }
      this.display = false;
    },

    updateValue() {
      let value = {
        id: this.data1.emittedId,
        specialrider: this.data1[0].specialRider,
        specialdriver: this.data1[0].specialDriver,
        rapidodriver: this.data1[0].rapidoDriver,
        supervisor: this.data1[0].supervisor,
        hrm_employeeDetail_Id: this.data1[0].selectedEmployee.id,
      };
      this.updateEmployeeDropDown(value).then(async (c) => {
        if (c == 200) {
          await this.specialRiderAllotmentEmployeeList();
        }
        this.updateData();
      });
      this.display = false;
    },

    async openDialog() {
      this.data1[0].selectedEmployee = this.getEmployeeDropDownList
        ? this.getEmployeeDropDownList[0]
        : null;
      if (this.updateBtn === false) {
        this.data1.length = 1;
      }
      this.display = true;
    },

    addItem() {
      let data = {};
      this.data1.push(data);
    },
    removeItem(index) {
      this.data1.splice(index, 1);
    },

    async addData() {
      try {
        let response = await this.specialRiderAllotmentEmployeeList();
        if (response === 200) {
          let info = "Special Rider Allotment Created successfully";
          this.commonToast("success", "Success", info);
        } else {
          let info = "Failed to create";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let info = "Failed to create";
        this.commonToast("error", "Error", info);
      }
    },

    async updateData() {
      try {
        let response = await this.specialRiderAllotmentEmployeeList();
        if (response === 200) {
          let info = "Special Rider Allotment Updated successfully";
          this.commonToast("success", "Success", info);
        } else {
          let info = "Failed to Update";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let info = "Failed to Update";
        this.commonToast("error", "Error", info);
      }
    },

    commonToast(severity, summary, message) {
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },

    emitUpdateData(data) {
      this.data1.emittedId = data.id;
      this.data1[0].rapidoDriver = data.rapidodriver;
      this.data1[0].specialDriver = data.specialdriver;
      this.data1[0].specialRider = data.specialrider;
      this.data1[0].supervisor = data.supervisor;
      this.data1[0].selectedEmployee = data.employeeRoles;
      this.updateBtn = true;
      this.display = true;
    },
  },
  watch: {
    display(value) {
      if (this.display === false) {
        this.data1[0].selectedEmployee = null;
        this.data1[0].rapidoDriver = false;
        this.data1[0].specialDriver = false;
        this.data1[0].specialRider = false;
        this.data1[0].supervisor = false;
        this.updateBtn = false;
        this.display = false;
      }
    },
  },
  mounted() {
    this.specialRiderAllotmentEmployeeList();
    let breadCrumbData = {
      title: "Special Rider Allotment",
      breadcrumbInfo: "Operations > Special Rider Allotment",
    };
    this.updateBreadCrumb(breadCrumbData);
  },
  computed: {
    ...mapGetters({
      tabMenuData: "specialRiderAllotment/getTabMenuData",
      getSpecialRiderAllotmentList:
        "specialRiderAllotment/getSpecialRiderAllotmentList",
      getEmployeeDropDownList: "specialRiderAllotment/getEmployeeDropDownList",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.required {
  color: $color-7a7a7a !important;
}
.required:after {
  content: "*";
  color: red;
  margin-left: 10px;
}

.pi-chevron-down {
  position: absolute !important;
  right: 10px !important;
}

::v-deep .p-inputtext {
  color: $color-212121;
  font-size: 14px;
  font-weight: 700;
}
::v-deep .p-button.p-button-outlined,
::v-deep .p-button.dialog-button-text {
  border: 2px solid !important;
  font-weight: 600 !important;
}
.add-item,
.add-item > i {
  color: #1e90ff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
.add-item > i {
  font-size: 10px !important;
}
.custom-modal-height {
  height: 30vh;
}
.custom-footer {
  position: absolute;
  bottom: 0;
  height: 60px;
  margin: 0;
  padding: 0;
  margin-right: 23px;
  right: 0;
}
.scollable-body {
  height: 23vh;
  overflow: auto;
}
::v-deep i.pi.pi-times {
  color: red;
  font-weight: 600;
  font-size: 16px;
  align-items: center;
}
</style>
