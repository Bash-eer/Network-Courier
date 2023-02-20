import { _get, _post, _put, _patch, _delete } from "../../apiService";

const jobsheetPrinting = {
  namespaced: true,
  state: {
    // put variables and collections here
    printerDropDownListArray: [],
    tripDropDownListArray: [],
    jobsheetPrintingData: [],
    specialRiderTableColumnData: [
      { field: "customer_id", header: "Customer ID" },
      { field: "profile_name", header: "Company Name" },
      { field: "address", header: "Address" },
      { field: "from_date", header: "From" },
      { field: "to_date", header: "To" },
      { field: "created_by", header: "Created By" },
      { field: "createdAt", header: "Created On" },
      { field: "actions", header: "Actions" },
    ],
  },

  getters: {
    //put getters methods goes here
    getPrinterDropDownListArray(state) {
      return state.printerDropDownListArray;
    },
    getTripDropDownListArray(state) {
      return state.tripDropDownListArray;
    },
    getJobsheetprinting(state) {
      return state.jobsheetPrintingData;
    },
    specialRiderTableColumn(state) {
      return state.specialRiderTableColumnData;
    },
  },

  mutations: {
    //put update methods goes here
    printerDropDownList(state, data) {
      state.printerDropDownListArray = data || [];
    },
    tripDropDownList(state, data) {
      state.tripDropDownListArray = data || [];
    },
    jobsheetPrintingDataArray(state, data) {
      state.jobsheetPrintingData = data || [];
    },
  },

  actions: {
    //put methods to handle mutations and state

    getJobsheetPrintingData({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        _get(`/crm/job-sheet/jobs`)
          .then(async (response) => {
            if (response && response.status === 200) {
              let data = response.data.results.map((c) => {
                return c;
              });
              commit("jobsheetPrintingDataArray", data || []);
            }
            resolve(response.data.results);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    getTripDropDownList({ state, commit }) {
      state.tableLoad = true;
      return _get(`/crm/job-sheet/trips`)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            let updated =
              response.data &&
              response.data.results.map((c) => {
                c["name"] = c.profile_name;
                c["code"] = c.profile_name;
                return c;
              });

            commit("tripDropDownList", updated);
          }

          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },

    getPrinterDropDownList({ state, commit }) {
      state.tableLoad = true;
      return _get(`/crm/job-sheet/dropdown`)
        .then(async (response) => {
          state.tableLoad = false;
          if (response && response.status === 200) {
            let updated =
              response.data &&
              response.data.results.map((c) => {
                c["name"] = c.profile_name;
                c["code"] = c.profile_name;
                return c;
              });

            commit("printerDropDownList", updated);
          }

          return response;
        })
        .catch((err) => {
          state.tableLoad = false;
          return err;
        });
    },
  },
};

export default jobsheetPrinting;
