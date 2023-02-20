const { URL } = require("../../../../../../../config/const.js");
import axios from "axios";
axios.defaults.baseURL = URL.BACKEND_BASEURL;
import moment from "moment";

import Edit from './edit'

const outbound = {
  namespaced: true,
  state: {
    globalSearch: "",
    tableData: [],
    refreshKey: 10,
    displayCloneDialog: false,
    cloneData: null,
    currentTabIndex: 0,
    country: [],
  },
  getters: {
    tableData: ({ tableData }) => tableData,
    refreshKey: ({ refreshKey }) => refreshKey,
    displayCloneDialog: ({ displayCloneDialog }) => displayCloneDialog,
    cloneData: ({ cloneData }) => cloneData,
    currentTabIndex: ({ currentTabIndex }) => currentTabIndex,
    globalSearch: ({ globalSearch }) => globalSearch,
    countryList: ({ country }) => country,
  },
  mutations: {
    setStateValue(state, data) {
      Object.entries(data).map((i) => {
        state[i[0]] = i[1];
      });
    },
    setTableData(state, payload) {
      state.tableData = payload;
    },
    setDisplayCloneDialog(state, payload) {
      state.displayCloneDialog = payload;
    },
    setCloneData(state, payload) {
      state.cloneData = payload;
    },
    setRefreshKey(state) {
      state.refreshKey++;
    },
    setCurrentTabIndex(state, payload) {
      state.currentTabIndex = payload;
    },
  },
  actions: {
    setCurrentTabIndex({ commit }, payload) {
      commit("setCurrentTabIndex", payload);
    },
    setRefreshKey({ commit }) {
      commit("setRefreshKey");
    },
    setDisplayCloneDialog({ commit }, payload) {
      commit("setDisplayCloneDialog", payload);
    },
    setCloneData({ commit }, payload) {
      commit("setCloneData", payload);
    },
    async setTableData({ commit }) {
      const res = await axios.get(
        "/settings/sales/rates/international/outbound/ratecard/"
      );

      if (res) {
        res.data?.results.map((list, idx) => {
          list["rate_cards"] = list.rate_card.length;
          list["sl_no"] = idx + 1;
          list["createdAt"] = new Date(list.createdAt);

          list.rate_card.map((cards) => {
            cards["agent_name"] = list.agent_name;
            cards["agent_id"] = list.id;
          });
        });
        commit("setTableData", res.data.results);
      }
    },
    async getAgentName() {
      return await axios.get("/settings/salessettings/international/vendor");
    },
    async getCountryList({ commit }) {
      return await axios
        .get("/settings/sales/rates/international/outbound/dropdowns/countries")
        .then((res) => {
          commit("setStateValue", { country: res.data.results });
          return res;
        });
    },
    async getDestList(_, id) {
      return await axios.get(
        "settings/sales/rates/international/outbound/dropdowns/country/destination/" +
          id
      );
    },
    async getRegion() {
      return await axios.get(
        "/settings/sales/rates/international/outbound/dropdowns/region"
      );
    },
    async getTrips(_, id) {
      return await axios.get(
        "settings/sales/rates/international/outbound/dropdowns/regions/trips/" +
          id
      );
    },
    async getFestivalList() {
      return await axios.get(
        "/settings/salesSettinigs/others/festival/dropdown"
      );
    },
    async updateRateCardStatus(_, { id, data }) {
      await axios.patch(
        "/settings/sales/rates/international/outbound/ratecards/private/" + id,
        data
      );
    },
    async cloneRateCard(_, payload) {
      await axios.post(
        "/settings/sales/rates/international/outbound/ratecards/clone",
        payload
      );
    },
    async setRateCardDefault(_, { id, data }) {
      await axios.patch(
        "/settings/sales/rates/international/outbound/ratecards/default/" + id,
        data
      );
    },
    async deleteRateCard(_, payload) {
      await axios.delete(
        "settings/sales/rates/international/outbound/ratecard/" + payload
      );
    },
    async changeActiveStatus(_, { id, data }) {
      await axios.patch(
        "settings/sales/rates/international/outbound/agent/status/" + id,
        data
      );
    },
  },
  modules: {
    Edit,
  },
};
export default outbound;
