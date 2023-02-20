import axios from "axios";
const { URL } = require("../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
const commonStore = {
  namespaced: true,
  state: {
    //logged in user
    loggedInUser: null,
    userDetails: null,
    //calendar
    calendarStore: null,
    calendarTimeStore: null,
    startDate: "",
    endDate: "",
    //notification
    notificationChangeWatcher: null,
    //attachments
    attachmentsTag: null,
    // comman dialog component
    dialogComponent: null,
    dialogHeader: null,
    dialogHeaderId: null,
    dialogOption: "",

    // display the dialog
    displayDialog: false,
  },
  mutations: {
    notificationChangeWatcher(state, data) {
      state.notificationChangeWatcher = data;
    },
    // comman dialog component
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
      state.dialogOption = dialogDetails.dialogOption;
      state.dialogHeaderId = dialogDetails.dialogHeaderId;
    },
    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
  },
  actions: {
    //eslint-disable-next-line no-unused-vars
    MarkAsReadHandler({ commit }, { id }) {
      axios({
        url: `/user/notification/markAsRead/` + id,
        method: "PATCH",
      }).then((response) => {
        commit("notificationChangeWatcher", response);
      });
    },
    DeleteNotificationHandler({ commit }, { id }) {
      axios({
        url: `/user/notification/` + id,
        method: "DELETE",
      }).then((response) => {
        commit("notificationChangeWatcher", response);
        // this.getNotifications();
      });
    },

    // comman dialog component
    closeDialog({ commit }) {
      commit("dialogDisplayMutation", false);
    },
    openDialog({ commit, getters }, { dialogDetails }) {
      commit("dialogComponentMutation", dialogDetails);
      getters.controlActivityDialog;
    },
  },
  getters: {
    controlActivityDialog(state) {
      state.displayDialog = true;
    },
  },
};
export default commonStore;
