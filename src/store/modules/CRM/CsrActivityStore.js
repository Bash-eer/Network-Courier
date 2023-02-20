import { _get, _post, _put, _patch, _delete } from "../../apiService";
import axios from "axios";

const CsrActivityStore = {
  namespaced: true,
  state: {
    // put variables and collections here
    displayDialog: false,
    csrListData: [],
    totalRecord: 0,
  },

  getters: {
    getCsrActivityList(state) {
      return state.csrListData;
    },
  },

  mutations: {
    getExtractedCrlListFeedback(state, data) {
      state.csrListData = data || [];
    },
    tableRecordCount(state, data) {
      state.totalRecord = data;
    },
  },

  actions: {
    // crm main page global search
    async getCrmListFeedbackData({ commit }, data) {
      await axios
        .post(
          `/crm/list-feedback?limit=10&offset=1&globalsearchkey=${data.searchValue}&customerType=${data.customer_type}`
        )
        .then((res) => {
          if (res.data.results) {
            let datas = res.data.results.rows ? [...res.data.results.rows] : [];
            let updatedData =
              datas.length > 0 &&
              datas.map((c, i) => {
                c["s_no"] = i + 1;
                c["cost_center_name"] = c.cost_center
                  ? c.cost_center.cost_center_name
                  : "";
                c["caller_name"] = c.caller_details
                  ? c.caller_details.name
                  : "";
                return c;
              });

            commit("getExtractedCrlListFeedback", updatedData);
            commit(
              "tableRecordCount",
              res.data.results.count ? res.data.results.count : 0
            );
          }
        });
    },
  },
};

export default CsrActivityStore;
