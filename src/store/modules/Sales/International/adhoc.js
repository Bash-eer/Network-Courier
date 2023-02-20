import axios from "axios";
const { URL } = require("../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
const salesInternationalAdhoc = {
  namespaced: true,
  state: {
    internationalAdhocTimeLineCurrentTab: "Overview",
    TimeLineCurrentTab: "Overview",
    globalSearch: "",
    displayDialog: false,
    dialogComponent: null,
    FormTableData: null,
    dialogHeader: null,
    InternationalAdhocOverviewData: {},
    InternationalAdhocEditData: [],
    CountryDropDownData: [],
    CountryDestinationDropDownData: [],
    ServiceProvider: [],
    CityDropDown: [],
    DestinationCity: [],
    SalesPersonData: [],
    InternationalRowData: [],
    SalesPersonDataPatch: null,
    SalesPersonDataTimeLineHeader: {},
    SalesPersonDataDropdown: {},
    defaultInternationalAdhocTimeLine: [
      {
        index: 0,
        color: "#EBBD46",
      },
    ],
    quotationInternationalAdhocTableDataColumns: [
      { field: "service_provider", header: "Service Provider" },
      { field: "transit_days", header: "Transit Days" },
      { field: "delivery_charges", header: "Delivery Charges" },
      { field: "fuel_charges", header: "Fuel Charges" },
      { field: "over_weight_charges", header: "Over Weight Charges" },
      { field: "remote_area_charges", header: "Remote Area Charges" },
      {
        field: "restricted_country_charges",
        header: "Restricted Country Charges",
      },
      { field: "other_charges", header: "Others Charges" },
      { field: "emergency_charges", header: "Emergency Charges" },
      { field: "net_charges", header: "Net Charges" },
    ],
    InternationalAdhocTimeLine: [
      {
        index: 0,
        color: "#EBBD46",
      },
      {
        index: 1,
        color: "#ffff",
        markerComponent: "Profile",
      },
      {
        index: 2,
        color: "#ffff",
        markerComponent: "TripSchedules",
      },
      {
        index: 3,
        color: "#ffff",
        markerComponent: "BillSettings",
      },
      {
        index: 4,
        color: "#ffff",
      },
    ],
  },
  mutations: {
    fetchInternationalAdhocTimeLineData(state, data) {
      state.InternationalAdhocTimeLine.push(data);
    },
    fetchDefaultInternationalAdhocTimeLineData(state, data) {
      state.InternationalAdhocTimeLine = [];
      state.InternationalAdhocTimeLine = data;
    },
    dialogComponentMutation(state, dialogDetails) {
      state.dialogComponent = dialogDetails.dialogName;
      state.dialogHeader = dialogDetails.dialogHeader;
    },
    fetchDestinationCountryDropDown(state, data) {
      state.CountryDestinationDropDownData = data.map((item) => ({
        name: item.country_name,
        id: item.id,
      }));
    },
    fetchServiceProvider(state, data) {
      state.ServiceProvider = data.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },
    fetchCountryDropDown(state, data) {
      state.CountryDropDownData = data.map((item) => ({
        name: item.country_name,
        id: item.id,
      }));
    },
    fetchFormTableData(state, data) {
      state.FormTableData = data;
    },
    fetchCityDropDown(state, data) {
      state.CityDropDown = data.map((item) => ({
        name: item.destination_name,
        id: item.id,
      }));
    },
    fetchDestinationCityDropDown(state, data) {
      state.DestinationCity = data.map((item) => ({
        name: item.destination_name,
        id: item.id,
      }));
    },

    dialogDisplayMutation(state, bool) {
      state.displayDialog = bool;
    },
    fetchInternationalAdhocOverviewData(state, data) {
      state.InternationalAdhocOverviewData = data;
    },
    fetchRowData(state, data) {
      state.InternationalRowData = data;
    },
    fetchSalesPersonData(state, data) {
      state.SalesPersonData = data.map((i) => ({
        name: i.name,
        code: i.id,
        img: i.image_url,
      }));
    },

    fetchSalesPersonDataPatch(state, data) {
      state.SalesPersonDataPatch = data;
    },
    fetchSalesPersonDataTimeLineHeader(state, data) {
      state.SalesPersonDataTimeLineHeader = data;
    },
    fetchloadSalesPersonDataDropdown(state, data) {
      state.SalesPersonDataDropdown = data;
    },
  },
  actions: {
    resetInternationalAdhocTimeLineData({ commit }, { data }) {
      commit("fetchDefaultInternationalAdhocTimeLineData", data);
    },
    updateInternationalAdhocTimeLineData({ commit }, { data }) {
      commit("fetchInternationalAdhocTimeLineData", data);
    },
    openDialog({ commit }, { dialogDetails }) {
      commit("dialogComponentMutation", dialogDetails);
    },
    closeDialog({ commit }) {
      commit("dialogDisplayMutation", false);
    },

    async loadInternationalAdhocOverviewData({ commit }, { id }) {
      await axios.get("/sales/quotations/overview/" + id).then((res) => {
        if (res.data.results) {
          console.log(res.data.results, "intadhocoverv");
          commit("fetchInternationalAdhocOverviewData", res.data.results);
        }
      });
    },

    loadCountryDropDownData({ commit }) {
      axios
        .get("settings/sales/rates/international/outbound/dropdowns/countries")
        .then((res) => {
          if (res?.data?.results) {
            commit("fetchCountryDropDown", res?.data?.results);
          }
        });
    },
    loadFormTableData({ commit }, { path, payload }) {
      axios.post(path, payload).then((res) => {
        if (res?.data?.results) {
          for (let i = 0; i < res.data?.results?.length; i++) {
            let r_obj = res?.data?.results[i];

            // r_obj["service_provider_id"] = i + 1;
            r_obj["service_provider_name"] =
              res.data.results[i].service_provider;
          }
          console.log(res.data.results);
          commit("fetchFormTableData", res?.data?.results);
        }
      });
    },
    loadDestinationCountryDropDownData({ commit }) {
      axios
        .get("settings/sales/rates/international/outbound/dropdowns/countries")
        .then((res) => {
          if (res?.data?.results) {
            commit("fetchDestinationCountryDropDown", res?.data?.results);
          }
        });
    },
    loadCityDropDownData({ commit }, { path }) {
      axios.get(path).then((res) => {
        if (res?.data?.results) {
          commit("fetchCityDropDown", res?.data?.results);
        }
      });
    },
    loadRowData({ commit, dispatch }, { path }) {
      axios.get(path).then((res) => {
        if (res?.data?.results) {
          dispatch(
            "salesSales/openDialog",
            {
              dialogDetails: {
                dialogName: "InternationalAdhocDialogOne",
                dialogHeader: "Edit International Adhoc",
              },
            },
            {
              root: true,
            }
          );
          commit("fetchRowData", res?.data?.results);
        }
      });
    },
    loadServiceProvider({ commit }) {
      axios
        .get(
          "/settings/sales/rates/international/outbound/dropdowns/service-providers"
        )
        .then((res) => {
          if (res.data.results) {
            commit("fetchServiceProvider", res.data.results);
          }
        });
    },
    loadDestinationCityDropDownData({ commit }, { path }) {
      axios.get(path).then((res) => {
        if (res?.data?.results) {
          commit("fetchDestinationCityDropDown", res?.data?.results);
        }
      });
    },

    loadSalesPersonDataTimeLineHeader({ commit }, { path, id }) {
      axios.get(path + id).then((res) => {
        if (res?.data?.results) {
          console.log(res?.data?.results);
          commit("fetchSalesPersonDataTimeLineHeader", res?.data?.results);
        }
      });
    },

    loadSalesPersonDataDropdown({ commit }, { path, id, payload }) {
      axios.patch(path + id, payload).then((res) => {
        if (res?.data?.results) {
          console.log(res?.data?.results);
          commit("fetchloadSalesPersonDataDropdown", res?.data?.results);
        }
      });
    },
    //post , patch(edit,update)
    POSTPATCHCRUDOPERATION(
      { dispatch, commit },
      { path, method, data, loadData, toastData }
    ) {
      axios({
        url: path,
        method: method,
        data: data,
      })
        .then(() => {
          dispatch("closeDialog");
          // dispatch(loadData);
          console.log("loaddata", loadData);
          commit("toastMutation", toastData.toastSuccessData);
        })
        .catch((err) => {
          if (err.response) {
            toastData.toastCommonErrorData.toastMsg = err.response.data.message;

            commit("toastMutation", toastData.toastCommonErrorData);
          }
        });
    },

    loadSalesPersonData({ commit }, { path }) {
      axios.get(path).then((res) => {
        if (res.data) {
          commit("fetchSalesPersonData", res.data.results);
        }
      });
    },

    loadSalesPersonDataPatch({ commit }, { path, id, payload }) {
      axios.patch(path + id, payload).then((res) => {
        commit("fetchSalesPersonDataPatch", res.data);
      });
    },
  },
  getters: {
    getGlobalSearchString(state) {
      return state.globalSearch;
    },
    controlActivityDialog(state) {
      state.displayDialog = true;
    },

    InternationalAdhocOverviewData: ({ InternationalAdhocOverviewData }) =>
      InternationalAdhocOverviewData,
  },
};

export default salesInternationalAdhoc;
