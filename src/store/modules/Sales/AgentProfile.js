import axios from "axios";
import { errhandler } from "@/services/httpClient";
const { URL } = require("../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;

const AdhocProfile = {
  namespaced: true,
  state: {
    adhoc_pro_TableData: [],
    adhoc_pro_OverlayData: [
      { label: "Edit", icon: "fas fa-pen" },
      { label: "Delete", icon: "fas fa-trash" },
    ],
    adhoc_pro__TableColumnData: [
      { field: "actions", header: "Actions" },
      { field: "sno", header: "S. No" },
      { field: "profile_name", header: "Profile Name" },
      { field: "address", header: "Address" },
      { field: "createdAt", header: "Created On" },
      { field: "created_by", header: "Created By" },
      { field: "status", header: "Status" },
      { field: "company_contacts", header: "Members" },
    ],
    adhoc_pro_data: null,
  },
  mutations: {
    fetchTableData(state, data) {
      state.adhoc_pro_TableData = data;
    },
    fetchProfileData(state, data) {
      state.adhoc_pro_data = data;
    },
  },
  actions: {
    loadTableData({ commit }, { id }) {
      axios.get("/sales/profile/adhoc-profiles/" + id).then((res) => {
        if (res.data.results) {
          let resultRows = res.data.results;
          for (let c in resultRows) {
            resultRows[c]["created_by"] = resultRows[c]["user"]["display_name"];
            resultRows[c]["createdAt"] = new Date(resultRows[c]["createdAt"]);
          }
          for (let i = 0; i < resultRows.length; i++) {
            let r_obj = resultRows[i];
            r_obj["sno"] = i + 1;
          }
          commit("fetchTableData", res.data.results);
        }
      });
    },
    async getAdhocProfile({ commit }, { id }) {
    await axios.get("/sales/profiles/" + id).then((res) => {
        if (res.data.results) {
          commit("fetchProfileData", res.data.results);
        }
      });
    },
    clearAdhocProfile({ commit }) {
      commit("fetchProfileData", null);
    },
    async deleteAdhocProfile({ commit }, { id, getId, toast }) {
      axios
        .get("/sales/profiles/" + id)
        .then((res) => {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "Profile deleted successfully",
            life: 3000,
          });
          this.loadTableData({ id: getId });
        })
        .catch(async (ex) => {
          let toastMsg = await errhandler(ex);
          toast.add({
            severity: toastMsg.serverity,
            summary: toastMsg.summary,
            detail: toastMsg.msg,
            life: 3000,
          });
          return null;
        });
    },
  },

  getters: {
    adhoc_pro_TableData: ({ adhoc_pro_TableData }) => adhoc_pro_TableData,
    // adhoc_pro_data: ({ adhoc_pro_data }) => adhoc_pro_data,
  },
};

export default AdhocProfile;
