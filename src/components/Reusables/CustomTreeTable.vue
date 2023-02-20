<template>
  <DataTable
    :scrollable="true"
    scrollHeight="75vh"
    :class="tableClass"
    :rowClass="rowClass"
    :showGridlines="true"
    :value="tableData"
    responsiveLayout="scroll"
    v-model:filters="filters"
    filterDisplay="menu"
    :globalFilterFields="['type']"
  >
    <template #header>
      <div class="flex justify-content-between m-3">
        <div class="flex align-self-center">
          <div class="flex flex-row">
            <div class="flex align-self-center ml-1 mr-4">
              <span @click="recentTab()">
                <router-link to="/settings/roles/">
                  <i class="pi pi-arrow-left ml-2" />
                </router-link>
              </span>
            </div>
            <div class="flex align-self-center role_type">
              {{ $store.state.users.rolesRoute }}
            </div>
          </div>
        </div>
        <div class="flex align-self-center">
          <div class="flex flex-row">
            <div class="flex align-self-center mr-2">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search by Keyword"
                />
              </span>
            </div>
            <div class="flex align-self-center">
              <Buttons
                button_class="p-button-sm mr-3"
                label="Save"
                v-on:childToParent="saveAccess()"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <Column
      :class="
        col.header == 'Add' ||
        col.header == 'Edit' ||
        col.header == 'Delete' ||
        col.header == 'View'
          ? 'access_columns'
          : 'module_columns'
      "
      :sortable="false"
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      filterField="type"
      :showFilterMenu="col.field == 'Modules' ? true : false"
    >
      <template #body="slotProps">
        <!-- EXPANDABLE ROWS TEMPLATE -->
        <span v-if="col.header == 'Modules'" class="w-full">
          <div class="flex justify-content-between">
            <div class="flex">
              <div class="flex flex-row">
                <div
                  v-bind:class="
                    slotProps.data[col.field] == 'Dashboards' ||
                    slotProps.data[col.field] == 'Sales' ||
                    slotProps.data[col.field] == 'Operation' ||
                    slotProps.data[col.field] == 'Settings' ||
                    slotProps.data[col.field] == 'Users' ||
                    slotProps.data[col.field] == 'user' ||
                    slotProps.data[col.field] == 'roles' ||
                    slotProps.data[col.field] == 'Billing Management' ||
                    slotProps.data[col.field] == 'Purchase Request' ||
                    slotProps.data[col.field] == 'Asset Management' ||
                    slotProps.data[col.field] == 'Fleet Management' ||
                    slotProps.data[col.field] == 'Warehouse Management' ||
                    slotProps.data[col.field] == 'Contact Management' ||
                    slotProps.data[col.field] == 'Hrms' ||
                    slotProps.data[col.field] == 'Features'
                      ? 'flex'
                      : 'flex ml-5'
                  "
                >
                  <CheckBox
                    v-if="slotProps.data[slotProps.data.Modules].checks"
                    v-bind:checker="[
                      {
                        name: slotProps.data.type,
                        key: 'f',
                        module: slotProps.data.Modules,
                        subs: slotProps.data.subs,
                        rights: 'SelectAll',
                        parent: slotProps.data.parent,
                      },
                    ]"
                    v-bind:categories="[
                      {
                        name: slotProps.data.type,
                        key: 'f',
                        module: slotProps.data.Modules,
                        subs: slotProps.data.subs,
                        rights: 'SelectAll',
                        parent: slotProps.data.parent,
                      },
                    ]"
                    v-on:childToParent="checkBoxChange"
                  />

                  <CheckBox
                    v-if="!slotProps.data[slotProps.data.Modules].checks"
                    v-bind:checker="[]"
                    v-bind:categories="[
                      {
                        name: slotProps.data.type,
                        key: 'a',
                        module: slotProps.data.Modules,
                        subs: slotProps.data.subs,
                        rights: 'SelectAll',
                        parent: slotProps.data.parent,
                      },
                    ]"
                    v-on:childToParent="checkBoxChange"
                  />
                </div>
              </div>
              <div class="flex align-self-center">
                <b
                  v-if="
                    slotProps.data[col.field] == 'Dashboards' ||
                    slotProps.data[col.field] == 'Sales' ||
                    slotProps.data[col.field] == 'Operation' ||
                    slotProps.data[col.field] == 'Settings' ||
                    slotProps.data[col.field] == 'Users' ||
                    slotProps.data[col.field] == 'user' ||
                    slotProps.data[col.field] == 'roles' ||
                    slotProps.data[col.field] == 'Billing Management' ||
                    slotProps.data[col.field] == 'Purchase Request' ||
                    slotProps.data[col.field] == 'Asset Management' ||
                    slotProps.data[col.field] == 'Fleet Management' ||
                    slotProps.data[col.field] == 'Warehouse Management' ||
                    slotProps.data[col.field] == 'Contact Management' ||
                    slotProps.data[col.field] == 'Hrms' ||
                    slotProps.data[col.field] == 'Features'
                  "
                  ><span v-if="slotProps.data[col.field] == 'user'">Users</span
                  ><span v-if="slotProps.data[col.field] == 'roles'"
                    >Roles</span
                  ></b
                >
                <span
                  class="ml-1"
                  v-if="
                    slotProps.data[col.field] != 'Dashboards' &&
                    slotProps.data[col.field] != 'Sales' &&
                    slotProps.data[col.field] != 'Operation' &&
                    slotProps.data[col.field] != 'Settings' &&
                    slotProps.data[col.field] != 'Users' &&
                    slotProps.data[col.field] != 'user' &&
                    slotProps.data[col.field] != 'roles' &&
                    slotProps.data[col.field] != 'Billing Management' &&
                    slotProps.data[col.field] != 'Purchase Request' &&
                    slotProps.data[col.field] != 'Asset Management' &&
                    slotProps.data[col.field] != 'Fleet Management' &&
                    slotProps.data[col.field] != 'Warehouse Management' &&
                    slotProps.data[col.field] != 'Contact Management' &&
                    slotProps.data[col.field] != 'Hrms' &&
                    slotProps.data[col.field] != 'Features'
                  "
                >
                  <span>{{ getSubModuleName(slotProps.data[col.field]) }}</span>
                  <!-- <span v-if="slotProps.data[col.field].split("")[0] == 'onlineUser'"
                    >Online Users</span
                  >
                  <span
                    v-if="slotProps.data[col.field] == 'networkCourierUser'"
                  >
                    Network Courier</span
                  > -->
                </span>
              </div>
            </div>
            <div
              class="flex"
              v-if="
                slotProps.data[col.field] == 'Dashboards' ||
                slotProps.data[col.field] == 'Sales' ||
                slotProps.data[col.field] == 'Operation' ||
                slotProps.data[col.field] == 'Settings' ||
                slotProps.data[col.field] == 'Users' ||
                slotProps.data[col.field] == 'user' ||
                slotProps.data[col.field] == 'roles' ||
                slotProps.data[col.field] == 'Billing Management' ||
                slotProps.data[col.field] == 'Purchase Request' ||
                slotProps.data[col.field] == 'Asset Management' ||
                slotProps.data[col.field] == 'Fleet Management' ||
                slotProps.data[col.field] == 'Warehouse Management' ||
                slotProps.data[col.field] == 'Contact Management' ||
                slotProps.data[col.field] == 'Hrms' ||
                slotProps.data[col.field] == 'Features'
              "
            >
              <div class="flex flex-row">
                <div class="flex mr-2">
                  <NormalBadge
                    :value="slotProps.data.subs"
                    classes="tableSubs"
                  />
                </div>
                <div class="flex">
                  <Buttons
                    v-if="!slotProps.data.expand"
                    button_class="p-button-sm p-button-outlined mr-2"
                    icon="pi pi-angle-down"
                    v-on:childToParent="
                      showTree(slotProps.data, slotProps.data.subs)
                    "
                  />
                  <Buttons
                    v-if="slotProps.data.expand"
                    button_class="p-button-sm p-button-outlined mr-2"
                    icon="pi pi-angle-up"
                    v-on:childToParent="
                      closeTree(slotProps.data, slotProps.data.subs)
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </span>

        <!-- ROLE ACCESS TEMPLATE -->
        <span
          v-if="
            col.header == 'Add' ||
            col.header == 'Edit' ||
            col.header == 'Delete' ||
            col.header == 'View'
          "
          class="mr-2"
        >
          <CheckBox
            v-if="slotProps.data[col.header].checks"
            v-bind:checker="[
              {
                name: slotProps.data.type,
                key: 'a',
                module: slotProps.data.Modules,
                subs: slotProps.data.subs,
                rights: col.header,
                parent: slotProps.data.parent,
              },
            ]"
            v-bind:categories="[
              {
                name: slotProps.data.type,
                key: 'a',
                module: slotProps.data.Modules,
                subs: slotProps.data.subs,
                rights: col.header,
                parent: slotProps.data.parent,
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />

          <CheckBox
            v-if="!slotProps.data[col.header].checks"
            v-bind:checker="[]"
            v-bind:categories="[
              {
                name: slotProps.data.type,
                key: 'a',
                module: slotProps.data.Modules,
                subs: slotProps.data.subs,
                rights: col.header,
                parent: slotProps.data.parent,
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
        </span>

        <span
          v-if="
            col.header != 'Modules' &&
            col.header != 'Add' &&
            col.header != 'Edit' &&
            col.header != 'Delete' &&
            col.header != 'View'
          "
          :class="col.field"
          >{{ slotProps.data[col.field] }}</span
        >
      </template>
      <template #filter="{ filterModel }"
        ><InputText
          type="text"
          v-model="filterModel.value"
          class="p-column-filter"
          placeholder="Search by Module"
      /></template>
    </Column>
  </DataTable>
</template>

<script>
import { mapGetters } from "vuex";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";

export default {
  name: "CustomTreeTable",
  props: [
    "tableName",
    "tableClass",
    "tableData",
    "tableDataName",
    "tableColumns",
    "globalSearchString",
  ],
  data() {
    return {
      checks: [],
      rowSelect: null,
      filters: null,
      searchString: "",
      networkModule: false,
    };
  },
  methods: {
    getSubModuleName(actualSubModuleName) {
      var splitted_string = actualSubModuleName.split("_")[0];
      if (splitted_string == "onlineUser") {
        return "Online User";
      }
      if (splitted_string == "networkCourierUser") {
        return "Network Courier";
      }
    },
    recentTab() {
      this.$store.state.users.treeTableTraverse = true;
    },
    saveAccess() {
      for (var br in this.$store.state.users.rolesAccessBackendData) {
        var br_obj = this.$store.state.users.rolesAccessBackendData[br];
        for (var lr in this.$store.state.users[this.tableDataName]) {
          var lr_obj = this.$store.state.users[this.tableDataName][lr];
          if (
            br_obj.role_access.module_name +
              "_" +
              br_obj.role_access.features ==
            lr_obj.Modules
          ) {
            var editAccessObj = {
              roleId: br_obj.roles.role_id,
              accessId: br_obj.role_access.access_Id,
            };
            for (var lr_rights in lr_obj) {
              if (
                lr_rights == "Add" ||
                lr_rights == "Edit" ||
                lr_rights == "Delete" ||
                lr_rights == "View"
              ) {
                var lowerCaseRights =
                  this.convertToLowerCase(lr_rights) + "_access";
                editAccessObj[lowerCaseRights] = lr_obj[lr_rights].checks;
              }
            }
            this.$store.dispatch("users/RolesEditAccessApi", {
              data: editAccessObj,
            });
          }
        }
      }

      var accessToastData = {
        role_name: this.$store.state.users.rolesRoute + "'s",
      };

      this.$store.commit("users/showToast", [
        "info",
        accessToastData,
        "access rights were updated successfully",
        "role",
      ]);
    },
    convertToLowerCase(word) {
      var lowerCaseString = word.toLowerCase();
      return lowerCaseString;
    },
    //-------------------------------------EXPANDABLE ROWS & CHECK-BOX LOGIC FUNCTIONS---------------------------------------------------//
    rowClass(data, subs, tag) {
      if (tag == undefined) {
        if (
          data.Modules == "Dashboards" ||
          data.Modules == "Operation" ||
          data.Modules == "Purchase Request" ||
          data.Modules == "Fleet Management" ||
          data.Modules == "Contact Management" ||
          data.Modules == "Users" ||
          data.Modules == "user" ||
          data.Modules == "roles" ||
          data.Modules == "Features"
        ) {
          return "striped_rows";
        }
        if (
          data.Modules == "Dashboard sub one" ||
          data.Modules == "Dashboard sub two"
        ) {
          return "dashboard subs";
        }
        if (
          data.Modules == "Booking" ||
          data.Modules == "Status" ||
          data.Modules == "Address Book" ||
          data.Modules == "User"
        ) {
          return "feature subs";
        }
        if (data.Modules == "Operation sub one") {
          return "operation subs";
        }

        if (data.parent == "user") {
          if (
            data.Modules.split("_")[0] == "onlineUser" ||
            data.Modules.split("_")[0] == "networkCourierUser"
          ) {
            return "users subs";
          }
        }
        if (data.parent == "roles") {
          if (
            data.Modules.split("_")[0] == "onlineUser" ||
            data.Modules.split("_")[0] == "networkCourierUser"
          ) {
            return "roless subs";
          }
        }
      }

      //expand tree
      if (tag == "Expand" && data.type != "") {
        for (var s = 0; s < subs; s++) {
          document.getElementsByClassName(data.type)[0].className =
            data.type + "show";
        }
      }

      //close tree
      if (tag == "Close" && data.type != "") {
        for (var t = 0; t < subs; t++) {
          document.getElementsByClassName(data.type + "show")[0].className =
            data.type;
        }
      }
    },
    showTree(module, subs) {
      for (var ch in this.$store.state.users[this.tableDataName]) {
        for (var cj in module) {
          if (cj == "type") {
            if (
              this.$store.state.users[this.tableDataName][ch][cj] == module[cj]
            ) {
              this.$store.state.users[this.tableDataName][ch]["expand"] = true;
            }
          }
        }
      }

      this.rowClass(module, subs, "Expand");
      this.networkModule = true;
    },
    closeTree(module, subs) {
      for (var ch in this.$store.state.users[this.tableDataName]) {
        for (var cj in module) {
          if (cj == "type") {
            if (
              this.$store.state.users[this.tableDataName][ch][cj] == module[cj]
            ) {
              this.$store.state.users[this.tableDataName][ch]["expand"] = false;
            }
          }
        }
      }
      this.rowClass(module, subs, "Close");
    },
    checkBoxChange(value, ref) {
      if (ref[0].rights == "SelectAll") {
        this.checkBoxRowSelection(value, ref, ref[0].module);
        this.overallCheckBoxSelectionCheck(value, ref);
      }
      if (
        (ref[0].module == "Dashboards" ||
          ref[0].module == "Operation" ||
          ref[0].module == "Sales" ||
          ref[0].module == "Users" ||
          ref[0].module == "user" ||
          ref[0].module == "roles" ||
          ref[0].module == "Settings" ||
          ref[0].module == "Billing Management" ||
          ref[0].module == "Purchase Request" ||
          ref[0].module == "Asset Management" ||
          ref[0].module == "Fleet Management" ||
          ref[0].module == "Warehouse Management" ||
          ref[0].module == "Contact Management" ||
          ref[0].module == "Hrms" ||
          ref[0].module == "Features") &&
        ref[0].rights != "SelectAll"
      ) {
        this.checkBoxParentControl(value, ref, ref[0].name);
      }
      if (
        ref[0].module != "Dashboards" &&
        ref[0].module != "Operation" &&
        ref[0].module != "Sales" &&
        ref[0].module != "Users" &&
        ref[0].module != "user" &&
        ref[0].module != "roles" &&
        ref[0].module != "Settings" &&
        ref[0].module != "Billing Management" &&
        ref[0].module != "Purchase Request" &&
        ref[0].module != "Asset Management" &&
        ref[0].module != "Fleet Management" &&
        ref[0].module != "Warehouse Management" &&
        ref[0].module != "Contact Management" &&
        ref[0].module != "Hrms" &&
        ref[0].module != "Features" &&
        ref[0].rights != "SelectAll"
      ) {
        this.checkBoxChildControl(value, ref);
      }
    },
    overallCheckBoxSelectionCheck(selection, reference) {
      var subCheck = 0;
      for (var oc in this.$store.state.users[this.tableDataName]) {
        var oc_obj = this.$store.state.users[this.tableDataName][oc];
        for (var ocobj in oc_obj) {
          if (ocobj == "type") {
            if (oc_obj[ocobj] == reference[0].name) {
              if (oc_obj.Modules != reference[0].parent) {
                subCheck++;
                //CASE ONE : if one of the sub rows are not checked, parent row should not be checked
                // if (oc_obj[oc_obj.Modules].checks == false) {
                //   this.checkParentCheckBox(
                //     oc_obj.parent,
                //     oc_obj[oc_obj.Modules].checks
                //   );
                // }
              }
            }
          }
        }
      }

      //CASE TWO : if all of the sub rows are  checked, parent row should be checked
      this.checkSubRow(reference[0].parent, subCheck, reference);
    },

    checkSubRow(parent, subCheck, reference) {
      var subCount = 0;
      var parentRightsCount = 0;
      var parentTrueRightsCount = 0;

      var childCheckRights = {
        Add: [],
        Edit: [],
        Delete: [],
        View: [],
      };

      for (var pc in this.$store.state.users[this.tableDataName]) {
        var pc_obj = this.$store.state.users[this.tableDataName][pc];
        for (var pcobj in pc_obj) {
          if (pcobj == "type") {
            if (pc_obj[pcobj] == reference[0].name) {
              if (pc_obj.Modules == reference[0].parent) {
                for (var pc_iter in pc_obj) {
                  if (
                    pc_iter == "Add" ||
                    pc_iter == "Edit" ||
                    pc_iter == "Delete" ||
                    pc_iter == "View"
                  ) {
                    parentRightsCount++;
                    if (pc_obj[pc_iter].checks == true) {
                      parentTrueRightsCount++;
                    }
                  }
                }
              }
              if (pc_obj.Modules != reference[0].parent) {
                for (var pc_iter_two in pc_obj) {
                  if (
                    pc_iter_two == "Add" ||
                    pc_iter_two == "Edit" ||
                    pc_iter_two == "Delete" ||
                    pc_iter_two == "View"
                  ) {
                    childCheckRights[pc_iter_two].push(
                      pc_obj[pc_iter_two].checks
                    );
                  }
                }
                if (pc_obj[pc_obj.Modules].checks == true) {
                  subCount++;
                }
              }
            }
          }
        }
      }

      if (subCount == subCheck) {
        this.checkParentCheckBox(parent, true);
      }
      if (subCount != subCheck && parentRightsCount == parentTrueRightsCount) {
        this.checkParentCheckBox(parent, false);
      }
      if (subCount == 0) {
        this.checkParentCheckBox(parent, false);
      }

      this.checkParentSubCheckBoxes(
        parent,
        subCheck,
        reference,
        childCheckRights
      );
    },

    checkParentSubCheckBoxes(parent, subCheck, reference, childCheckRights) {
      for (var pc in this.$store.state.users[this.tableDataName]) {
        var pc_obj = this.$store.state.users[this.tableDataName][pc];
        for (var pcobj in pc_obj) {
          if (pcobj == "type") {
            if (pc_obj[pcobj] == reference[0].name) {
              if (pc_obj.Modules == reference[0].parent) {
                for (var pc_iter in pc_obj) {
                  if (
                    pc_iter == "Add" ||
                    pc_iter == "Edit" ||
                    pc_iter == "Delete" ||
                    pc_iter == "View"
                  ) {
                    for (var cc in childCheckRights) {
                      var cc_array = childCheckRights[cc];
                      if (cc == pc_iter) {
                        var cc_count = 0;
                        for (var cc_i in cc_array) {
                          if (cc_array[cc_i] == true) {
                            cc_count++;
                          }
                        }
                        if (cc_count == subCheck) {
                          this.$store.state.users[this.tableDataName][pc][
                            pc_iter
                          ].checks = true;
                        } else {
                          this.$store.state.users[this.tableDataName][pc][
                            pc_iter
                          ].checks = false;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },

    checkParentCheckBox(parent, booleanValue) {
      for (var cb in this.$store.state.users[this.tableDataName]) {
        var cb_obj = this.$store.state.users[this.tableDataName][cb];

        for (var cbobj in cb_obj) {
          if (cbobj == "Modules") {
            if (cb_obj[cbobj] == parent) {
              this.$store.state.users[this.tableDataName][cb][parent].checks =
                booleanValue;
              for (var par_set in cb_obj) {
                if (
                  par_set == "Add" ||
                  par_set == "Edit" ||
                  par_set == "Delete" ||
                  par_set == "View"
                ) {
                  this.$store.state.users[this.tableDataName][cb][
                    par_set
                  ].checks = booleanValue;
                }
              }
            }
          }
        }
      }
    },
    checkBoxRowSelection(selection, reference, string) {
      for (var ar in this.$store.state.users[this.tableDataName]) {
        var all_obj = this.$store.state.users[this.tableDataName][ar];
        for (var a in all_obj) {
          if (a == "Modules") {
            if (all_obj[a] == string) {
              this.$store.state.users[this.tableDataName][ar][
                reference[0].module
              ].checks = selection.length == 0 ? false : true;
              for (var set in all_obj) {
                if (
                  set == "Add" ||
                  set == "Edit" ||
                  set == "Delete" ||
                  set == "View"
                ) {
                  this.$store.state.users[this.tableDataName][ar][set].checks =
                    selection.length == 0 ? false : true;
                }
              }
            }
          }
        }
      }
      this.getAllSubsSelected(selection, reference);
    },
    getAllSubsSelected(selection, reference) {
      if (
        reference[0].module == "Dashboards" ||
        reference[0].module == "Operation" ||
        reference[0].module == "Sales" ||
        reference[0].module == "Users" ||
        reference[0].module == "user" ||
        reference[0].module == "roles" ||
        reference[0].module == "Settings" ||
        reference[0].module == "Billing Management" ||
        reference[0].module == "Purchase Request" ||
        reference[0].module == "Asset Management" ||
        reference[0].module == "Fleet Management" ||
        reference[0].module == "Warehouse Management" ||
        reference[0].module == "Contact Management" ||
        reference[0].module == "Hrms" ||
        reference[0].module == "Features"
      ) {
        for (var as in this.$store.state.users[this.tableDataName]) {
          var as_obj = this.$store.state.users[this.tableDataName][as];
          for (var asobj in as_obj) {
            if (asobj == "type") {
              if (
                as_obj[asobj] == reference[0].name &&
                as_obj.Modules != reference[0].module
              ) {
                for (var sub_obj in as_obj) {
                  if (
                    sub_obj == "Add" ||
                    sub_obj == "Edit" ||
                    sub_obj == "Delete" ||
                    sub_obj == "View"
                  ) {
                    this.$store.state.users[this.tableDataName][as][
                      sub_obj
                    ].checks = selection.length == 0 ? false : true;
                  }
                  if (
                    sub_obj != "Add" &&
                    sub_obj != "Edit" &&
                    sub_obj != "Delete" &&
                    sub_obj != "View" &&
                    sub_obj != "subs" &&
                    sub_obj != "type" &&
                    sub_obj != "expand" &&
                    sub_obj != "parent" &&
                    sub_obj != "Modules"
                  ) {
                    this.$store.state.users[this.tableDataName][as][
                      sub_obj
                    ].checks = selection.length == 0 ? false : true;
                  }
                }
              }
            }
          }
        }
      }
    },
    checkBoxParentControl(selection, reference, string) {
      for (var m in this.$store.state.users[this.tableDataName]) {
        var obj = this.$store.state.users[this.tableDataName][m];

        for (var ob in obj) {
          if (ob == reference[0].rights) {
            if (
              this.$store.state.users[this.tableDataName][m].Modules ==
              reference[0].module
            ) {
              this.$store.state.users[this.tableDataName][m][
                reference[0].rights
              ].checks = selection.length == 0 ? false : true;
            }
            if (
              this.$store.state.users[this.tableDataName][m].Modules !=
                reference[0].module &&
              this.$store.state.users[this.tableDataName][m].type == string
            ) {
              this.$store.state.users[this.tableDataName][m][
                reference[0].rights
              ].checks = selection.length == 0 ? false : true;
            }
          }
        }
      }

      this.checkBoxRowSelectionChecker(selection, reference);
    },
    checkBoxChildControl(selection, reference) {
      for (var c in this.$store.state.users[this.tableDataName]) {
        var child_obj = this.$store.state.users[this.tableDataName][c];

        for (var c_ob in child_obj) {
          if (c_ob == "Modules") {
            if (
              this.$store.state.users[this.tableDataName][c][c_ob] ==
              reference[0].module
            ) {
              this.$store.state.users[this.tableDataName][c][
                reference[0].rights
              ].checks = selection.length == 0 ? false : true;
            }
          }
        }
      }

      this.checkBoxChecker(selection, reference);
    },
    checkBoxChecker(selection, reference) {
      var count = 0;
      var subs = 0;
      var rights_count = 0;
      var glob_rights_count = 0;

      for (var ch in this.$store.state.users[this.tableDataName]) {
        if (
          this.$store.state.users[this.tableDataName][ch].type ==
          reference[0].name
        ) {
          if (
            this.$store.state.users[this.tableDataName][ch].Modules !=
            reference[0].parent
          ) {
            var bool =
              this.$store.state.users[this.tableDataName][ch][
                reference[0].rights
              ].checks;
            subs++;
            if (bool == true) {
              count++;
            }
          }
        }
      }

      var bools = count == subs ? true : false;

      for (var f in this.$store.state.users[this.tableDataName]) {
        var s_obj = this.$store.state.users[this.tableDataName][f];
        var subRowCount = 0;
        if (
          this.$store.state.users[this.tableDataName][f].Modules ==
          reference[0].parent
        ) {
          this.$store.state.users[this.tableDataName][f][
            reference[0].rights
          ].checks = bools;
        }
        if (
          this.$store.state.users[this.tableDataName][f].type ==
            reference[0].name &&
          this.$store.state.users[this.tableDataName][f].Modules !=
            reference[0].parent
        ) {
          for (var gr in s_obj) {
            if (gr == "Add" || gr == "Edit" || gr == "Delete" || gr == "View") {
              if (s_obj[gr].checks == true) {
                glob_rights_count++;
              }
            }
          }
        }
        if (
          this.$store.state.users[this.tableDataName][f].Modules ==
          reference[0].module
        ) {
          for (var s_set in s_obj) {
            if (
              s_set == "Add" ||
              s_set == "Edit" ||
              s_set == "Delete" ||
              s_set == "View"
            ) {
              rights_count++;
              if (s_obj[s_set].checks == true) {
                subRowCount++;
              }
            }
          }
          this.$store.state.users[this.tableDataName][f][
            reference[0].module
          ].checks = subRowCount == rights_count ? true : false;

          if (
            this.$store.state.users[this.tableDataName][f][reference[0].module]
              .checks == false
          ) {
            this.checkParentCheckBoxFromChild(false, reference);
          }
        }
      }

      if (bools == true && glob_rights_count == subs * 4) {
        this.checkParentCheckBoxFromChild(true, reference);
      }
    },
    checkParentCheckBoxFromChild(booler, reference) {
      for (var pc in this.$store.state.users[this.tableDataName]) {
        var pc_obj = this.$store.state.users[this.tableDataName][pc];
        for (var pcobj in pc_obj) {
          if (pcobj == reference[0].parent) {
            this.$store.state.users[this.tableDataName][pc][pcobj].checks =
              booler;
          }
        }
      }
    },
    checkBoxRowSelectionChecker(selection, reference) {
      var rowCount = 0;
      var rights_count = 0;
      for (var rc in this.$store.state.users[this.tableDataName]) {
        var rc_obj = this.$store.state.users[this.tableDataName][rc];
        for (var rcobj in rc_obj) {
          if (rcobj == "Modules") {
            if (reference[0].module == rc_obj[rcobj]) {
              for (var r_set in rc_obj) {
                if (
                  r_set == "Add" ||
                  r_set == "Edit" ||
                  r_set == "Delete" ||
                  r_set == "View"
                ) {
                  rights_count++;
                  if (rc_obj[r_set].checks == true) {
                    rowCount++;
                  }
                }
              }
            }
          }
        }
      }
      for (var rd in this.$store.state.users[this.tableDataName]) {
        var rd_obj = this.$store.state.users[this.tableDataName][rd];
        for (var rdobj in rd_obj) {
          if (rdobj == "Modules") {
            if (reference[0].module == rd_obj[rdobj]) {
              var rowBools;
              if (rowCount == rights_count) {
                rowBools = true;
              }
              if (rowCount != rights_count) {
                rowBools = false;
              }

              this.$store.state.users[this.tableDataName][rd][
                reference[0].module
              ].checks = rowBools;
            }
          }
          if (rdobj == "type") {
            if (reference[0].name == rd_obj[rdobj]) {
              if (rd_obj.Modules != reference[0].module) {
                var object_bool = this.rightsChecker(rd_obj, rc);
                this.$store.state.users[this.tableDataName][rd][
                  rd_obj.Modules
                ].checks = object_bool;
              }
            }
          }
        }
      }
    },
    rightsChecker(object) {
      var object_bool = 0;
      var rights_count = 0;
      for (var ob in object) {
        if (ob == "Add" || ob == "Delete" || ob == "Edit" || ob == "View") {
          rights_count++;
          if (object[ob].checks == true) {
            object_bool++;
          }
        }
      }
      if (object_bool == rights_count) {
        return true;
      }
      if (object_bool != rights_count) {
        return false;
      }
      // return object_bool;
    },
    //-------------------------------------EXPANDABLE ROWS  & CHECK-BOX LOGIC FUNCTIONS---------------------------------------------------//
    initilaizeFilters() {
      this.filters = {
        global: {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        type: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
      };
    },
  },
  components: {
    DataTable,
    Column,
    InputText,
  },
  created() {
    this.initilaizeFilters();
  },
  computed: {
    ...mapGetters({ searchString: "getGlobalSearchString" }),
  },
  watch: {
    "$store.state.users.globalSearch": function () {
      this.filters.global.value = this.$store.state.users.globalSearch;
    },
  },
};
</script>

<style scoped>
::v-deep .role_type {
  color: #4e5968 !important;
  font-weight: 700;
  /* font-size: 12px; */
}
::v-deep .striped_rows {
  background: #f8f8f8 !important;
}
::v-deep .p-checkbox .p-checkbox-box.p-highlight {
  border: 3px solid #2196f3 !important;
  background: white !important;
}
::v-deep .p-checkbox .p-checkbox-box .p-checkbox-icon {
  font-weight: bold !important;
  color: #2196f3 !important;
}
::v-deep .access_columns {
  min-width: 100px !important;
}
::v-deep .module_columns {
  min-width: 400px !important;
}
::v-deep .p-column-title {
  color: #7e84a7 !important;
}
::v-deep .pi-angle-down {
  color: black !important;
}
::v-deep .pi-angle-up {
  color: black !important;
}
::v-deep .p-button.p-button-outlined {
  border: none !important;
}
::v-deep .Dashboards {
  background: red !important;
}
::v-deep .feature {
  display: none !important;
}
::v-deep .dashboard {
  display: none !important;
}
::v-deep .operation {
  display: none !important;
}
::v-deep .settings {
  display: none !important;
}
::v-deep .users {
  display: none !important;
}
::v-deep .roless {
  display: none !important;
}
.p-datatable .p-datatable-thead > tr > th {
  background: white !important;
}
.activeClass {
  color: #17c079;
  font-weight: bold;
}
.inactiveClass {
  color: red;
  font-weight: bold;
  font-size: 11px;
}
.editAccess {
  color: #357dea;
  cursor: pointer;
  font-weight: bold;
  font-size: 11px;
}
::v-deep .pi-pencil {
  cursor: pointer;
  color: #357dea;
}
a {
  color: #4e5868;
  text-decoration: none;
}
</style>
