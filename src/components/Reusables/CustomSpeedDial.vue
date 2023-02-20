<template>
  <div>
    <Button
      icon="pi pi-ellipsis-v"
      type="button"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      :class="
        dataName != 'internationalRatesTable' && dataName != 'eventsGroupData'
          ? 'p-button-rounded ml-2 mr-2 mt-2 updateButton'
          : 'p-button-rounded ml-2 mr-2 mt-1 updateButton'
      "
    />
    <OverlayPanel
      ref="op"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      :style="
        tableName == 'eventsGroupComponent' ? 'width:100px' : 'width:190px'
      "
    >
      <div class="flex flex-column flex-wrap">
        <div
          v-for="(items, index) of customDialData"
          :class="
            index != customDialData.length - 1
              ? 'flex mb-3 menuDivs'
              : 'flex menuDivs'
          "
          :key="items.label"
        >
          <div
            class="flex flex-row menuItems"
            @click="menuClicked(items.label)"
          >
            <div class="flex align-items-center justify-content-center mr-2">
              <i :class="items.icon"></i>
            </div>
            <div
              class="flex align-items-center justify-content-center hover-blue"
            >
              {{ items.label }}
            </div>
            <div
              v-if="items.label == 'Disable'"
              class="
                flex
                align-items-center
                justify-content-center
                ml-5
                hover-blue
              "
            >
              <div
                v-for="toggle of $store.state[storePath].toggleData"
                :key="toggle.type"
              >
                <Toggle
                  v-if="
                    storePath == 'users' ||
                    storePath == 'masters' ||
                    storePath == 'fleets' ||
                    storePath == 'operationZones'
                  "
                  v-on:childToParent="disableRow"
                  :check="rowData.status == 'Inactive' ? true : false"
                />
                <Toggle
                  v-if="storePath == 'sales'"
                  v-on:childToParent="disableRow"
                  :check="rowData.company_status == 'disable' ? true : false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </OverlayPanel>
    <!-- <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" /> -->
  </div>
</template>

<script>
import Button from "primevue/button";
// import Menu from "primevue/menu";
import OverlayPanel from "primevue/overlaypanel";
import { mapActions } from "vuex";

export default {
  name: "CustomSpeedDial",
  props: ["customDialData", "rowData", "dataName", "storePath", "tableName"],
  data() {
    return {
      items: [
        {
          label: "Edit",
          icon: "pi pi-fw pi-plus",
          command: () => this.$emit("editMethod"),
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-trash",
          command: () => this.$emit("deleteMethod"),
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      setCostCenterDialog: "salesRapidoContract/Contract/setCostCenterDialog",
      setCostCenterDataById:
        "salesRapidoContract/Contract/setCostCenterDataById",
    }),
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    getDialogName(val) {
      let dialogName = [];
      switch (val) {
        case "expenditureSummonsTableData":
          dialogName.push("SummonsDialog", "expenditureSummonsStateData");
          break;
        case "personalCardsTableData":
          dialogName.push("NewClaimDialog", "expenditureClaimsStateData");
          break;
        case "cashCardsTableData":
          dialogName.push("NewClaimDialog", "expenditureClaimsStateData");
          break;
        case "expenditureCoeTableData":
          dialogName.push("CoeDialog", "expenditureCoeStateData");
          break;
        case "expenditureRoadTaxTableData":
          dialogName.push("RoadTaxDialog", "expenditureRoadTaxStateData");
          break;
        case "expenditureAccidentsTableData":
          dialogName.push("AccidentsDialog", "expenditureAccidentsStateData");
          break;
        case "expenditureInsuranceTableData":
          dialogName.push("InsuranceDialog", "expenditureInsuranceStateData");
          break;
        case "FleetFuelData":
          dialogName.push("FleetFuelDialog", "fleetFuelStateData");
          break;
        case "FleetMaintenanceData":
          dialogName.push(
            "FleetMaintenanceDialog",
            "fleetMaintenanceStateData"
          );
          break;
        case "inspectionTableData":
          dialogName.push("FleetInspectionDialog", "fleetInspectionsStateData");
          break;
      }
      return dialogName;
    },
    getPath(val) {
      let path;
      switch (val) {
        case "expenditureSummonsTableData":
          path = "summons";
          break;
        case "expenditureRoadTaxTableData":
          path = "roadTax";
          break;
        case "expenditureCoeTableData":
          path = "coe";
          break;
        case "expenditureAccidentsTableData":
          path = "accident";
          break;
        case "expenditureInsuranceTableData":
          path = "insurance";
          break;
        case "FleetFuelData":
          path = "fuel";
          break;
        case "RoomsTableData":
          path = "rooms";
          break;
        case "FleetMaintenanceData":
          path = "maintenance";
          break;
        case "inspectionTableData":
          path = "inspection";
          break;
      }
      return path;
    },
    getMutation(val) {
      let mutation;
      switch (val) {
        case "expenditureSummonsTableData":
          mutation = "fetchExpenditureSummonsTableData";
          break;
        case "expenditureRoadTaxTableData":
          mutation = "fetchExpenditureRoadTaxTableData";
          break;
        case "expenditureCoeTableData":
          mutation = "fetchExpenditureCoeTableData";
          break;
        case "expenditureAccidentsTableData":
          mutation = "fetchExpenditureAccidentsTableData";
          break;
        case "expenditureInsuranceTableData":
          mutation = "fetchExpenditureInsuranceTableData";
          break;
        case "FleetFuelData":
          mutation = "fetchFuelTableData";
          break;

        case "FleetMaintenanceData":
          mutation = "fetchMaintenanceTableData";
          break;
        case "inspectionTableData":
          mutation = "fetchInspectionTableData";
          break;
      }
      return mutation;
    },
    getFleetMastersApiDetails(name) {
      this.loadApi = "loadFleetMastersCommons";
      if (name == "FleetMastersVehicleTableData") {
        this.URLType = "vehicleType";
        this.nameKey = "users_fleet_vehicle_types";
        this.mutation = "fetchFleetMastersVehicleTypes";
      }
      if (name == "FleetMastersClaimTableData") {
        this.URLType = "claimType";
        this.nameKey = "users_fleet_claim_types";
        this.mutation = "fetchFleetMastersClaimTypes";
      }
      if (name == "FleetMastersMaintenanceTableData") {
        this.URLType = "maintenanceType";
        this.nameKey = "users_fleet_maintenance_types";
        this.mutation = "fetchFleetMastersMaintenanceType";
      }
      if (name == "FleetMastersDeliveryPointTableData") {
        this.URLType = "deliveryPoint";
        this.nameKey = "users_fleet_delivery_points";
        this.mutation = "fetchFleetMastersDeliveryPoint";
      }
      if (name == "FleetMastersProductNameTableData") {
        this.URLType = "productName";
        this.nameKey = "users_fleet_product_names";
        this.mutation = "fetchFleetMastersProductName";
      }
      if (name == "FleetMastersFuelCardTableData") {
        this.URLType = "fuelCard";
        this.nameKey = "users_fleet_fuel_card";
        this.mutation = "fetchFleetMastersFuelCards";
      }
      if (name == "FleetMastersCashCardTableData") {
        this.URLType = "cashCard";
        this.nameKey = "users_fleet_cash_card";
        this.mutation = "fetchFleetMastersCashCards";
      }
      if (name == "FleetMastersInspectionChecksTableData") {
        this.URLType = "InspectionCheck";
        this.nameKey = "users_fleet_inspection_check";
        this.mutation = "fetchFleetMastersInspectionCheck";
      }
    },
    customDateFormatter(data) {
      let rawDate = new Date(data);
      let month = rawDate.getMonth() + 1;
      let year = rawDate.getFullYear();
      if (month.toString().length == 1) {
        month = "0" + month;
      }
      let newyear = year.toString().slice(2);
      let dateString = month + "/" + newyear;
      return dateString;
    },
    menuClicked(choice) {
      if (this.dataName == "timeLineRapidoCostCenterTableData") {
        this.setCostCenterDialog(true);
        this.setCostCenterDataById({
          type: this.$route.params.type,
          id: this.rowData.id,
        });
        return;
      }

      //EVENTS CLONE
      if (choice == "Clone") {
        this.$refs.op.hide();
        this.$store.dispatch("contacts/cloneEvents", {
          path: this.rowData.id,
        });
      }
      //REQUEST CANCEL
      if (choice == "Request Cancel") {
        this.$refs.op.hide();
        if (this.storePath == "contacts") {
          this.$store.dispatch("contacts/contactsRequestCancel", {
            path: "requestCancel/" + this.rowData.id,
          });
        }
      }
      //TO REVEAL THE ROLES ACCESS PAGE
      if (choice == "Role Access") {
        this.$store.state.users.rolesAccessTableData = null;
        this.$store.dispatch("users/LoadRolesAccessApi", {
          data: this.rowData,
        });
        this.$store.state[this.storePath].rolesRoute = this.rowData.role_name;
        //programmatic router navigation in vue-router
        this.$router.push({
          name: "UsersModuleRights",
          params: { id: this.rowData.role_name },
        });
      }
      //mark as read
      if (this.storePath == "common") {
        this.$refs.op.hide();
        if (choice == "Delete") {
          this.$store.dispatch("commonStore/DeleteNotificationHandler", {
            id: this.rowData.id,
          });
        }
      }
      if (choice == "Mark as read") {
        this.$refs.op.hide();

        this.$store.dispatch("commonStore/MarkAsReadHandler", {
          id: this.rowData.id,
        });
      }
      //TO REVEAL THE TABLE ROW
      if (choice == "Activity Log") {
        this.$refs.op.hide();
        this.$store.dispatch("users/loadUsersApi", {
          apiPath: "authActivityLog/" + this.rowData.id,
          tag: "Activity Log",
        });
        this.$store.state[this.storePath].activityLogDialogData = this.rowData;
        this.$store.state[this.storePath].tableLoad = false;
        this.$store.state[this.storePath].dialogComponent = "DataTables";
        this.$store.getters[this.storePath + "/controlActivityDialog"];
      }
      //TO RESET THE PASSWORD
      if (choice == "Reset Password") {
        this.$refs.op.hide();
        this.$store.state.users.ResetPasswordId = this.rowData.id;
        this.$store.state.users.ConfirmationDialogType = "Reset";
        this.$store.state[this.storePath].dialogComponent = "ResetConfirmation";
        this.$store.getters[this.storePath + "/controlActivityDialog"];
      }
      //TO EDIT THE TABLE ROW
      if (choice == "Edit") {
        // console.log("dataName", this.dataName);
        // console.log("storepath", this.storePath);
        // this.$store.state.users.radioButtonTypesValue =
        //   this.$store.state[this.storePath].previousTabsState;
        // this.$store.state[this.storePath].deliveryChoicesState =
        //   this.$store.state[this.storePath].deliveryTypestabs;

        //FOR USERS
        if (this.storePath == "users") {
          if (this.$store.state[this.storePath].previousTabsState != null) {
            this.$store.state.users.radioButtonTypesValue =
              this.$store.state[this.storePath].previousTabsState;
          }

          if (this.$store.state[this.storePath].deliveryTypestabs != null) {
            this.$store.state[this.storePath].deliveryChoicesState =
              this.$store.state[this.storePath].deliveryTypestabs;
          }
          this.$store.state[this.storePath].dialogUserTitle = "Edit User";
          this.$store.state[this.storePath].dialogRoleTitle = "Edit Role";
          this.$store.state[this.storePath].network_courier_details =
            this.rowData;
          this.$store.state[this.storePath].userActivityControl =
            this.rowData.Status;
          this.$refs.op.hide();
          if (this.dataName == "networkCourierTableData") {
            this.$store.state[this.storePath].dialogComponent =
              "UserSettingsDialog";
          }
          if (this.dataName == "organizationData") {
            this.$store.state[this.storePath].dialogComponent = "AgentDialog";
          }
          if (
            this.dataName == "rolesTableData" ||
            this.dataName == "adhocTableData" ||
            this.dataName == "agentsTableData" ||
            this.dataName == "contractTableData" ||
            this.dataName == "obcTableData"
          ) {
            if (
              this.$store.state[this.storePath].usersTabsValue ==
              "Network Courier"
            ) {
              if (document.getElementById("pills-NetworkCourierTabs-tab")) {
                document.getElementById("pills-NetworkCourierTabs-tab").click();
              }
            }
            this.$store.state[this.storePath].dialogComponent =
              "CreateRoleDialog";
          }

          this.$store.getters[this.storePath + "/controlActivityDialog"];
        }

        //FOR SALES
        if (this.storePath == "sales") {
          this.$store.state.sales.stepperEditMode = true;
          if (this.dataName == "QuotationTabData") {
            this.$store.state["users"].displayDialog = true;
            this.$store.state["users"].dialogComponent =
              "GeneralQuotationDialog";
            this.$store.getters.controlActivityDialog;
            this.$store.state["sales"].quotationCreationStateData =
              this.rowData;
          }
          if (this.dataName == "timeLineExpressCostCenterTableData") {
            this.$store.state.sales.costCentreId = this.rowData.id;
            this.$store.state["sales"].costingCentreCreationStateData =
              this.rowData;
            let apiPath = "?type=cost_centre&type_id=" + this.rowData.id;
            this.$store.dispatch("sales/loadContactsApi", {
              apiPath: apiPath,
            });
            this.$store.state["users"].displayDialog = true;
            this.$store.state["users"].dialogComponent = "CostCentresDialog";
            this.$store.getters.controlActivityDialog;
          }
          if (
            this.dataName != "QuotationTabData" &&
            this.dataName != "timeLineExpressCostCenterTableData"
          ) {
            this.$store.state["sales"].contactsStateData = [];
            this.$store.state["sales"].companyCreationStateData = this.rowData;
            let apiPath = "?type=sales_company&type_id=" + this.rowData.id;
            this.$store.dispatch("sales/loadContactsApi", {
              apiPath: apiPath,
            });
            this.$store.state["users"].displayDialog = true;
            this.$store.state["users"].dialogComponent =
              "companyCreationDialog";
            this.$store.getters.controlActivityDialog;
          }
        }

        //FOR FLEETS
        if (this.storePath == "fleets") {
          //for vehicle details edit operation
          if (this.dataName == "FleetVehicleTableData") {
            this.$store.state.fleets.attachmentsId = this.rowData.id;
            this.$store.state.fleets.vehiclesFormStateData = this.rowData;
            this.$store.state["users"].displayDialog = true;
            this.$store.state["users"].dialogComponent = "VehicleDetailsDialog";
            this.$store.getters.controlActivityDialog;
          }

          //vehicle commons
          //fuel, maintenance
          if (
            this.dataName == "FleetFuelData" ||
            this.dataName == "FleetMaintenanceData" ||
            this.dataName == "inspectionTableData"
          ) {
            this.$store.state.fleets.multiImagesRowId = this.rowData.id;
            let editDetails = this.getDialogName(this.dataName);
            this.$store.state.fleets.attachmentsId = this.rowData.id;
            this.$store.state.fleets[editDetails[1]] = this.rowData;
            this.$store.state["users"].displayDialog = true;
            this.$store.state["users"].dialogComponent = editDetails[0];
            this.$store.getters.controlActivityDialog;
          }

          //expenditure
          //summons, roadtax, accidents, insurance
          if (
            this.dataName == "expenditureSummonsTableData" ||
            this.dataName == "expenditureRoadTaxTableData" ||
            this.dataName == "expenditureCoeTableData" ||
            this.dataName == "expenditureAccidentsTableData" ||
            this.dataName == "expenditureInsuranceTableData" ||
            this.dataName == "personalCardsTableData" ||
            this.dataName == "cashCardsTableData"
          ) {
            let editDetails = this.getDialogName(this.dataName);
            this.$store.state.fleets.attachmentsId = this.rowData.id;
            this.$store.state.fleets[editDetails[1]] = this.rowData;
            this.$store.state["users"].displayDialog = true;
            this.$store.state["users"].dialogComponent = editDetails[0];
            this.$store.getters.controlActivityDialog;
          }
        }

        //FOR CONTACTS
        if (this.storePath == "contacts") {
          if (
            this.dataName != "eventsOverlayData" &&
            this.dataName != "roomBookings"
          ) {
            this.$store.state["users"].displayDialog = true;
          }
          //room bookings
          if (this.dataName == "roomBookings") {
            this.$store.state.contacts.inviteesData = [];
            this.$store.state.contacts.eventsOverviewFormInviteesData = [];
            this.$store.state.contacts.deletedEventGroupsInviteesIds = [];
            this.$store.state.contacts.meetingsRoomsFormStateData =
              this.rowData;
            this.$router.push("/contact-management/book-meeting-rooms");
          }

          if (this.dataName == "ContactManagamentContactTableData") {
            this.$store.state.contacts["contactsFormStateData"] = this.rowData;
            this.$store.state["users"].dialogComponent = "ContactsDialog";
          }
          if (this.dataName == "DonationsTableData") {
            this.$store.state.contacts["donationsFormStateData"] = this.rowData;
            this.$store.state["users"].dialogComponent = "DonationDialog";
          }
          if (this.dataName == "AppointmentsTableData") {
            this.$store.state.contacts.deletedContactIds = [];
            this.$store.state.contacts["appointmentsFormStateData"] =
              this.rowData;
            this.$store.state.contacts.contactsSelectionModeState = null;
            this.$store.state.contacts["contactGroupsFormStateData"] =
              this.rowData;
            this.$store.state["users"].dialogComponent = "AppointmentDialog";
          }
          if (this.dataName == "RoomsTableData") {
            // this.$store.state["users"].displayDialog = true;
            this.$store.state.masters["RoomsMasterFormStateData"] =
              this.rowData;
            this.$store.state["users"].dialogComponent = "RoomSettingsDialog";
          }
          if (this.dataName == "EventStatusTableData") {
            this.$store.state.masters["EventStatusMasterFormStateData"] =
              this.rowData;
            this.$store.state["users"].dialogComponent = "EventStatusDialog";
          }
          if (
            this.dataName == "ContactManagamentMainGroupTableData" ||
            this.dataName == "subGroupsTableData"
          ) {
            this.$store.state.contacts.mainGroupName = null;
            this.$store.state.contacts.deletedContactIds = [];
            this.$store.state.contacts.contactsSelectionModeState = null;
            this.$store.state.contacts["contactGroupsFormStateData"] =
              this.rowData;
            this.$store.state.contacts["contactGroupsFormStateData"]["type"] =
              this.dataName == "subGroupsTableData"
                ? "sub_group"
                : "main_group";
            this.$store.state["users"].dialogComponent = "ContactsGroupDialog";
          }
          //events
          if (this.dataName == "eventsGroupData") {
            this.$store.state.contacts.eventsMainGroupName = null;
            this.$store.state.contacts.eventGroupsStateData = this.rowData[2];
            this.$store.state.contacts.eventGroupsStateData["type"] =
              this.rowData[0];
            this.$store.state.contacts.eventGroupsStateData["group_name"] =
              this.rowData[1];
            this.$store.state["users"].dialogComponent =
              "CreateEventGroupsDialog";
          }
          if (this.dataName == "eventsOverlayData") {
            this.$store.state.contacts.deletedEventsMainGroups = [];
            this.$store.state.contacts.deletedEventsSubGroups = [];
            this.$store.state.contacts.inviteesData = [];
            this.$store.state.contacts.eventsOverviewFormInviteesData = [];
            this.$store.state.contacts.eventGroupsData = [];
            this.$store.state.contacts.eventsMainGroupsDropDownData = [];
            this.$store.state.contacts.deletedEventGroupsInviteesIds = [];
            this.$store.state.contacts.coverImageURL = "";
            this.$store.state.contacts.eventImageURL = "";
            this.$store.state.contacts.eventCardsStateData = this.rowData;
            this.$router.push("/contact-management/event/add-event");
          }
          //invitees
          if (this.dataName == "ContactManagamentInviteesTableData") {
            this.$store.state.contacts.inviteesStatusData = this.rowData;
            this.$store.state["users"].dialogComponent = "InviteesStatusDialog";
          }
          if (this.dataName == "ContactManagementFollowUpTableData") {
            this.$store.state.contacts.followUpFormStateData = this.rowData;
            this.$store.state["users"].dialogComponent =
              "ContactsFollowUpDialog";
          }
          if (this.dataName != "eventsOverlayData") {
            this.$store.getters.controlActivityDialog;
          }
        }

        //FOR MASTERS
        if (this.storePath == "masters") {
          this.$store.state.masters.expressRegionFormData = this.rowData;

          if (this.dataName == "expressAddNewRegionTableData") {
            this.$store.state["users"].displayDialog = true;
            this.$store.state["users"].dialogComponent = "AddNewRegion";
            this.$store.getters.controlActivityDialog;
          }
          if (
            this.dataName == "FleetMastersVehicleTableData" ||
            this.dataName == "FleetMastersClaimTableData" ||
            this.dataName == "FleetMastersMaintenanceTableData" ||
            this.dataName == "FleetMastersDeliveryPointTableData" ||
            this.dataName == "FleetMastersProductNameTableData" ||
            this.dataName == "FleetMastersFuelCardTableData" ||
            this.dataName == "FleetMastersCashCardTableData" ||
            this.dataName == "FleetMastersInspectionChecksTableData"
          ) {
            this.$store.state.masters.fleetsFormData = this.rowData;
            this.$store.state.masters.FleetCommonDialogName = this.tableName;
            this.$store.state["users"].displayDialog = true;
            if (this.dataName == "FleetMastersFuelCardTableData") {
              this.$store.state["users"].dialogComponent = "FuelCardDialog";
            } else if (this.dataName == "FleetMastersCashCardTableData") {
              this.$store.state["users"].dialogComponent = "CashCardDialog";
            } else {
              this.$store.state["users"].dialogComponent = "FleetCommonDialog";
            }
            this.$store.getters.controlActivityDialog;
            this.$refs.op.hide();
          }
        }
      }
      //FOR CONTACTS
      if (this.storePath == "contacts") {
        if (choice == "Messages") {
          this.$store.state["users"].displayDialog = true;
          this.$store.state["users"].dialogComponent = "EDMDialog";
          this.$store.getters.controlActivityDialog;
          this.$refs.op.hide();
        }
        if (choice == "EDM") {
          this.$store.state.contacts.inviteesData = [];
          this.$router.push("/contact-management/EDMTabs");
        }
      }
      //TO DELETE THE TABLE ROW
      if (choice == "Delete") {
        //FOR USERS
        if (this.storePath == "users") {
          if (
            this.dataName != "rolesTableData" &&
            this.dataName != "adhocTableData" &&
            this.dataName != "agentsTableData" &&
            this.dataName != "contractTableData" &&
            this.dataName != "obcTableData"
          ) {
            // this.rowControl("delete");
            this.$store.state.users.ConfirmationData = [
              "users/usersCRUD",
              "delete",
              this.rowData,
            ];
            this.$store.state.users.ConfirmationDialogType = "Delete";
            this.$store.state[this.storePath].dialogComponent =
              "ResetConfirmation";
            this.$store.getters[this.storePath + "/controlActivityDialog"];
            this.$refs.op.hide();
          }
          if (
            this.dataName == "rolesTableData" ||
            this.dataName == "adhocTableData" ||
            this.dataName == "agentsTableData" ||
            this.dataName == "contractTableData" ||
            this.dataName == "obcTableData"
          ) {
            // this.rolesRowControl("delete");
            this.$store.state.users.ConfirmationData = [
              "users/rolesCRUD",
              "delete",
              this.rowData,
            ];
            this.$store.state.users.ConfirmationDialogType = "Delete";
            this.$store.state[this.storePath].dialogComponent =
              "ResetConfirmation";
            this.$store.getters[this.storePath + "/controlActivityDialog"];
            this.$refs.op.hide();
          }
        }

        //FOR SALES
        if (this.storePath == "sales") {
          this.rowControlSales("delete/");
        }

        //FOR FLEETS
        if (this.storePath == "fleets") {
          //for vehicle details delete operation
          if (this.dataName == "FleetVehicleTableData") {
            this.$store.dispatch("fleets/vehicleDetailsCRUD", {
              tag: "delete",
              data: this.rowData,
            });
          }
          //vehicle commons
          //fuel, maintenance
          if (
            this.dataName == "FleetFuelData" ||
            this.dataName == "FleetMaintenanceData" ||
            this.dataName == "inspectionTableData"
          ) {
            let type;
            if (this.dataName == "FleetFuelData") {
              type = "Fuel";
            }
            // if (this.dataName == "RoomsData") {
            //   type = "Rooms";
            // }
            if (this.dataName == "FleetMaintenanceData") {
              type = "Maintenance";
            }
            if (this.dataName == "inspectionTableData") {
              type = "Inspection";
            }
            this.$store.dispatch("fleets/vehiclesCommonsCRUD", {
              path: this.getPath(this.dataName),
              loadApiName: "loadVehicleCommons",
              mutation: this.getMutation(this.dataName),
              tag: "delete",
              data: this.rowData,
              type: type,
            });
          }
          //expenditure
          //summons, road tax, accidents, insurance
          if (
            this.dataName == "expenditureSummonsTableData" ||
            this.dataName == "expenditureRoadTaxTableData" ||
            this.dataName == "expenditureCoeTableData" ||
            this.dataName == "expenditureAccidentsTableData" ||
            this.dataName == "expenditureInsuranceTableData"
          ) {
            this.$store.dispatch("fleets/expenditureCommonsCRUD", {
              path: this.getPath(this.dataName),
              loadApiName: "loadExpenditureCommons",
              mutation: this.getMutation(this.dataName),
              tag: "delete",
              data: this.rowData,
            });
          }
          this.$refs.op.hide();
        }

        //FOR CONTACTS
        if (this.storePath == "contacts") {
          //deleting main groups and sub groups
          if (this.dataName == "eventsGroupData") {
            let type = this.rowData[0];
            this.$store.dispatch("contacts/updateEventGroupsData", {
              type: type,
              data: this.rowData,
            });
            this.$refs.op.hide();
          }

          let contactsDeleteDetails = [];
          switch (this.dataName) {
            case "ContactManagamentContactTableData":
              contactsDeleteDetails.push(
                "contacts",
                "fetchContactMangementContactTableData",
                "users_contact_contacts"
              );
              break;
            case "DonationsTableData":
              contactsDeleteDetails.push(
                "donations",
                "fetchDonationsTableData",
                "users_contact_donations"
              );
              break;
            case "eventsOverlayData":
              contactsDeleteDetails.push("events", "", "");
              break;
            case "AppointmentsTableData":
              contactsDeleteDetails.push(
                "appointments",
                "fetchAppointmentsTableData",
                "users_contact_appointments"
              );
              break;
            case "ContactManagementFollowUpTableData":
              contactsDeleteDetails.push(
                "event/invitees/followUp/" + this.rowData.id,
                "fetchFollowUpTableData",
                "users_contact_events_follow_up"
              );
              break;
          }
          if (
            this.dataName == "ContactManagamentContactTableData" ||
            this.dataName == "DonationsTableData" ||
            this.dataName == "eventsOverlayData" ||
            this.dataName == "AppointmentsTableData" ||
            this.dataName == "RoomsTableData" ||
            this.dataName == "ContactManagementFollowUpTaleData"
          ) {
            this.$store.dispatch("contacts/contactMangementCRUD", {
              path: contactsDeleteDetails[0],
              mutation: contactsDeleteDetails[1],
              tag: "delete",
              data: this.rowData,
              nameKey: contactsDeleteDetails[2],
            });
            this.$refs.op.hide();
          }
          if (
            this.dataName == "ContactManagamentMainGroupTableData" ||
            this.dataName == "subGroupsTableData"
          ) {
            let path;
            path =
              this.dataName == "ContactManagamentMainGroupTableData"
                ? "mainGroups"
                : "subGroups";
            this.$store.dispatch("contacts/contactMangementCRUD", {
              path: path,
              mutation: "fetchContactManagementMainGroupTableData",
              tag: "delete",
              data: this.rowData,
              nameKey: "users_contact_main_group",
            });
          }
          if (this.dataName == "RoomsTableData" && choice == "Delete") {
            //making an delete/DEL api to delete a new region

            this.$store.dispatch("masters/ContactMastersCRUD", {
              tag: "delete",
              data: this.rowData,
              type: "rooms",
              loadApi: "loadRoomsData",
              mutation: "fetchRoomsData",
            });
            this.$refs.op.hide();
          }
          if (this.dataName == "EventStatusTableData" && choice == "Delete") {
            //making an delete/DEL api to delete a new region

            this.$store.dispatch("masters/ContactMastersCRUD", {
              tag: "delete",
              data: this.rowData,
              type: "EventInviteesStatus",
              loadApi: "loadEventStatusData",
              mutation: "fetchEventStatusData",
            });
            this.$refs.op.hide();
          }
        }

        //FOR MASTERS
        if (this.storePath == "masters") {
          //FLEETS
          if (
            this.dataName == "FleetMastersVehicleTableData" ||
            this.dataName == "FleetMastersClaimTableData" ||
            this.dataName == "FleetMastersMaintenanceTableData" ||
            this.dataName == "FleetMastersDeliveryPointTableData" ||
            this.dataName == "FleetMastersProductNameTableData" ||
            this.dataName == "FleetMastersFuelCardTableData" ||
            this.dataName == "FleetMastersCashCardTableData" ||
            this.dataName == "FleetMastersInspectionChecksTableData"
          ) {
            this.getFleetMastersApiDetails(this.dataName);
            this.$store.dispatch("masters/FleetMastersCRUD", {
              tag: "delete",
              data: this.rowData,
              type: this.URLType,
              loadApi: this.loadApi,
              nameKey: this.nameKey,
              mutation: this.mutation,
            });
            this.$refs.op.hide();
          }

          //EXPRESS
          if (this.dataName == "expressAddNewRegionTableData") {
            //making an delete/DEL api to delete a new region
            this.$store.dispatch("masters/expressRegionsCRUD", {
              tag: "delete",
              data: this.rowData,
            });
            this.$refs.op.hide();
          }
          if (this.dataName == "expressRateCards") {
            //making an delete/DEL api to delete a new region
            this.$store.dispatch("masters/expressRateCardsCRUD", {
              tag: "delete",
              data: this.rowData,
            });
            this.$refs.op.hide();
          }
        }
      }
      //TO RETRIEVE A DELETED TABLE ROW
      if (choice == "Retrieve User") {
        if (this.storePath == "users") {
          this.$store.state.users.ConfirmationData = [
            "users/usersCRUD",
            "retriveUser/",
            this.rowData,
          ];
          this.$store.state.users.ConfirmationDialogType = "Retrive";
          this.$store.state[this.storePath].dialogComponent =
            "ResetConfirmation";
          this.$store.getters[this.storePath + "/controlActivityDialog"];
          this.$refs.op.hide();
          // this.rowControl("retriveUser/");
        }
        if (this.storePath == "sales") {
          this.rowControlSales("retrive/");
        }
      }
      // if (choice == "Set as default") {
      //   alert("hi");
      // }
      //cashcard topup and history
      if (choice == "Topup") {
        let data = this.rowData;
        this.$store.state.masters.fleetsCardData = {
          vendor: data["vendor"],
          card_no: data["card_no"],
          card_type: data["card_type"],
          issue_date: this.customDateFormatter(data["issue_date"]),
          expiry_date: this.customDateFormatter(data["expiry_date"]),
          balance: data["balance"],
          top_up_cycle: data["top_up_cycle"],
          top_up_day: data["top_up_day"],
        };
        this.$store.state.masters.fleetsCashCardDialogId = this.rowData.id;
        this.$store.state["users"].displayDialog = true;
        this.$store.state["users"].dialogComponent = "CashTopUpDialog";
        this.$store.getters.controlActivityDialog;
        this.$refs.op.hide();
      }
      //TO RETRIEVE A DELETED TABLE ROW
      if (choice == "View History") {
        if (this.dataName == "FleetMastersFuelCardTableData") {
          this.$store.state["users"].displayDialog = true;
          this.$store.state["users"].dialogComponent = "FuelHistoryDialog";
          this.$store.getters.controlActivityDialog;
          this.$refs.op.hide();
        } else {
          this.$store.dispatch("masters/loadCashCardHistory", {
            id: this.rowData.id,
          });

          this.$store.state["users"].displayDialog = true;
          this.$store.state["users"].dialogComponent = "CashHistoryDialog";
          this.$store.getters.controlActivityDialog;
          this.$refs.op.hide();
        }
      }
    },
    // rolesRowControl(value) {
    //   this.$store.dispatch("users/rolesCRUD", {
    //     tag: value,
    //     data: this.rowData,
    //   });
    //   this.$refs.op.hide();
    // },
    rowControl(value) {
      this.$store.dispatch("users/usersCRUD", {
        tag: value,
        data: this.rowData,
      });
      this.$refs.op.hide();
    },
    rowControlFleets(value) {
      this.$store.dispatch("fleets/vehicleDetailsCRUD", {
        tag: value,
        data: this.rowData,
      });
      this.$refs.op.hide();
    },
    rowControlSales(value) {
      this.$store.dispatch("sales/salesCompaniesCRUD", {
        tag: value,
        data: this.rowData,
      });
      this.$refs.op.hide();
    },
    rowControlZonesList(value) {
      this.$store.dispatch("sales/salesCompaniesCRUD", {
        tag: value,
        data: this.rowData,
      });
      this.$refs.op.hide();
    },
    rowControlMasters(apiPath, value) {
      this.$store.dispatch(apiPath, {
        tag: value,
        data: this.rowData,
      });
      this.$refs.op.hide();
    },
    //TO ENABLE/DISABLE A TABLE ROW
    disableRow() {
      //FOR USERS
      if (this.storePath == "users") {
        this.rowControl("modifyStatus/");
      }
      //FOR FLEETS
      if (this.storePath == "fleets") {
        this.rowControlFleets("modifyStatus/");
      }
      //FOR SALES
      if (this.storePath == "sales") {
        this.rowControlSales("modifystatus/");
      }
      //FOR MASTERS
      if (this.storePath == "masters") {
        if (this.dataName == "expressAddNewRegionTableData") {
          this.rowControlMasters("masters/expressRegionsCRUD", "modifyStatus/");
        }
        if (this.dataName == "expressRateCards") {
          this.rowControlMasters(
            "masters/expressRateCardsCRUD",
            "modifyStatus/"
          );
        }
      }

      //FOR ROUTE PLANNING ZONES
      if (this.storePath == "operationZones") {
        this.rowControlZonesList("modifystatus/");
      }
    },
  },
  components: {
    Button,
    // Menu,
    OverlayPanel,
  },
};
</script>

<style scoped>
.updateButton {
  background: none !important;
  border: white !important;
}
.updateButton:hover {
  background: white !important;
}
.menuItems {
  cursor: pointer;
}
::v-deep .pi-ellipsis-v {
  color: black !important;
}
::v-deep .p-overlaypanel-flipped:after {
  bottom: 0px !important;
  top: 0px !important;
}
</style>
