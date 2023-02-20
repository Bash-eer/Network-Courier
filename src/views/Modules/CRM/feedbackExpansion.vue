<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <div class="flex tabPills mr-6">
        <!-- tabs -->
        <ul
          class="nav nav-pills tab-padding px-1 operations-zones-tab-nav"
          id="pills-tab"
          role="tablist"
        >
          <li
            class="nav-item"
            role="presentation"
            v-for="(tabs, index) of tabMenuData"
            :key="tabs.label"
          >
            <button
              @click="tabChange(tabs, index)"
              :class="index == defaultTabIndex ? 'nav-link active' : 'nav-link'"
              :id="'pills-' + tabs.label + '-tab'"
              data-bs-toggle="pill"
              :data-bs-target="'#pills-' + tabs.label"
              type="button"
              role="tab"
              :aria-controls="'pills-' + tabs.label"
              :aria-selected="index == 0 ? true : false"
            >
              {{ tabs.label }}
            </button>
          </li>
        </ul>
      </div>
      <div>
        <!--Create Add new button-->
        <Buttons
          button_class="p-button-sm mr-4 add-btn custom-add-btn"
          label="Add New Follow up"
          v-on:childToParent="openDialog()"
        />
      </div>
    </div>
    <div class="grid" v-if="defaultTabIndex === 0">
      <div class="col-10">
        <div class="grid">
          <div class="col-4">
            <div class="title-text bold-400 font-size-12 mb-3">
              Assign to:
              <span class="title-info bold-600 font-size-12">{{
                getAssignedTo()
              }}</span>
            </div>
            <div class="title-text bold-400 font-size-12 mb-3">
              Subject:
              <span class="title-info bold-600 font-size-12">{{
                expandedData?.subject
              }}</span>
            </div>
          </div>
          <div class="col-4">
            <div class="title-text bold-400 font-size-12 mb-3">
              Zone:
              <span class="title-info bold-600 font-size-12"
                >Vasuntha Devi - Admin, John Smith - IT</span
              >
            </div>
            <div class="title-text bold-400 font-size-12 mb-3">
              Reference:
              <span class="title-info bold-600 font-size-12">{{
                expandedData?.reference
              }}</span>
            </div>
          </div>
          <div class="col-4 border-right">
            <div class="title-text bold-400 font-size-12 mb-3">
              Status:
              <span class="title-info bold-600 font-size-12">{{
                expandedData?.status
              }}</span>
            </div>
            <div class="title-text bold-400 font-size-12 mb-3">
              Type:
              <span class="title-info bold-600 font-size-12">{{
                expandedData?.feedback_type
              }}</span>
            </div>
          </div>
          <div class="col-12 flex border-right">
            <div class="title-text bold-400 font-size-12 mb-3">
              <img
                src="/images/comment.png"
                width="30"
                height="30"
                alt="comment"
                class="mt-1"
              />
            </div>
            <div class="title-text bold-400 font-size-12 ml-3">
              Feedback

              <div class="title-info bold-600 font-size-12 mt-2">
                {{ expandedData?.feedback || "-" }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2">
        <span>Attachments</span>
        <div class="flex justify-content-between mt-3">
          <span
            class="mr-3 flex justify-content-center align-items-center"
            v-for="(item, index) of expandedData.attachments"
            :key="index"
            ><img
              src="/images/preview.png"
              alt=""
              width="38"
              height="38"
              class="ml-4"
          /></span>
        </div>
      </div>
    </div>

    <div class="grid" v-if="defaultTabIndex === 1">
      <feedbackExpansionFollowupTableVue
        :expandedData="expandedData"
        :customDialData="customDialData"
        @showFollowUpFeedback="editFollowUpData"
      />
    </div>
  </div>

  <component
    :dialogComponent="dialogComponent"
    v-bind:is="initialComponent"
    :expandedData="expandedData"
    >></component
  >
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import feedbackExpansionFollowupTableVue from "./feedbackExpansionFollowupTable.vue";
import FollowupMainDialog from "../../../components/CRM/followupMainDialog.vue";

export default {
  name: "FeedbackExpansion",
  components: {
    feedbackExpansionFollowupTableVue,
    FollowupMainDialog,
  },
  props: ["expandedData"],
  data: () => ({
    tabMenuData: [
      {
        label: "Feedback Info",
        tab: "FeedbackInfo",
      },
      {
        label: "Follow Up",
        tab: "FollowUp",
      },
    ],
    defaultTabIndex: 0,
    dialogComponent: "FollowUpFeedback",
    initialComponent: "",
  }),
  methods: {
    ...mapActions({
      showFeedbackExpansionDialog: "CrmFeedback/showFollowupDialog",
      showFeedbackFollowUpnDialogData: "CrmFeedback/showFollowupDialogAndData",
    }),
    tabChange(data, index) {
      this.defaultTabIndex = index;
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY");
        return formattedDate;
      }
    },
    getAssignedTo() {
      let assignedValue = this.expandedData?.assign_to || [];
      return assignedValue?.map(function (item) {
          let stringData =
            " " + (item?.name + " - " + (item.type || " ")).toString() + " ";
          return stringData;
        })
        .toString();
    },
    openDialog() {
      this.initialComponent = "FollowupMainDialog";
      this.showFeedbackExpansionDialog(true);
    },
    editFollowUpData(dialogData) {
      this.initialComponent = "FollowupMainDialog";
      this.showFeedbackFollowUpnDialogData(dialogData);
    },
  },
  computed: {
    ...mapGetters({
      customDialData: "CrmFeedback/getExpansionOverlay",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.title-text,
.title-info {
  color: #4e5868;
}
.border-right {
  border-right: 1px solid black;
}
</style>
