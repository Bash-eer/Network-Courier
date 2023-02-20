import { _get, _post, _put, _patch, _delete } from "../../apiService";
import axios from "axios";

const LiveMapStore = {
  namespaced: true,
  state: {
    filterHeaderDialog: false,
    // put variables and collections here
    listOfDatas: [
      {
        id: 1,
        image: null,
        uniqueId: 3243,
        name: "kristin watson",
        number: "TNT 300",
        jobs: 5,
        current: "MC234567893",
        deliveryLocation: "Jurong",
      },
      {
        id: 2,
        image: null,
        uniqueId: 7686,
        name: "sachin watson",
        number: "TNT 300",
        jobs: 5,
        current: "MC234567893",
        deliveryLocation: "Jurong",
      },
      {
        id: 3,
        image: null,
        uniqueId: 5654,
        name: "ms dhoni",
        number: "TNT 300",
        jobs: 5,
        current: "MC234567893",
        deliveryLocation: "Jurong",
      },
      {
        id: 4,
        image: null,
        uniqueId: 6767,
        name: "virat kholi",
        number: "TNT 300",
        jobs: 5,
        current: "MC234567893",
        deliveryLocation: "Jurong",
      },
      {
        id: 5,
        image: null,
        uniqueId: 2387,
        name: "ganesh",
        number: "TNT 300",
        jobs: 5,
        current: "MC234567893",
        deliveryLocation: "Jurong",
      },
      {
        id: 6,
        image: null,
        uniqueId: 7585,
        name: "king wild",
        number: "TNT 300",
        jobs: 5,
        current: "MC234567893",
        deliveryLocation: "Jurong",
      },
    ],
    jobStatusTableFields: [
      { field: "booking_id", header: "Order" },
      { field: "job_ref_no", header: "Movement Chart ID" },
      { field: "collection_slip_no", header: "Collection Slip No" },
      { field: "address", header: "Delivery Address" },
      { field: "status", header: "Status" },
      { field: "estimate_time", header: "Estimate Delivery" },
    ],
    jobStatusTableData: [
      {
        id: 1,
        order_no: 8,
        movement_chart_id: "MC23456789",
        collectionSlip_no: "MC98765434",
        address: "Lorem asd dbkj smdckjbdsc ",
        status: "In Progress",
        estimate_time: "09:00 PM",
      },
      {
        id: 2,
        order_no: 9,
        movement_chart_id: "MC23456789",
        collectionSlip_no: "MC98765434",
        address: "Lorem asd dbkj smdckjbdsc ",
        status: "Delivered",
        estimate_time: "09:00 PM",
      },
      {
        id: 3,
        order_no: 10,
        movement_chart_id: "MC23456789",
        collectionSlip_no: "MC98765434",
        address: "Lorem asd dbkj smdckjbdsc ",
        status: "Delivered",
        estimate_time: "09:00 PM",
      },
    ],
    riderDataList: [],
    riderJobStatusTableData: [],
    riderPositionList: [],
    riderJobTripCordinates: [],
    statusTabMenuData: [
      {
        label: "SupervisorCountTab",
        tab: "supervisorCountTable",
        select: false,
        tabName: "Rider",
      },
      {
        label: "HistoryTab",
        tab: "HistoryTable",
        select: true,
        tabName: "Job Trip",
      },
    ],
    optimizedRoute: {},
  },

  getters: {
    getStatusSettingsTabMenuData(state) {
      return state.statusTabMenuData;
    },

    getJobStatusFieldSet(state) {
      return state.jobStatusTableFields;
    },

    getListOfDataSet(state) {
      return state.riderDataList;
    },

    getJobStatusDataSet(state) {
      return state.riderJobStatusTableData;
    },
    getRiderPosition(state) {
      return state.riderPositionList;
    },

    getRiderJobCoordinates(state) {
      return state.riderJobTripCordinates;
    },

    getStoredOptimizeData(state) {
      return state.optimizedRoute;
    },
  },

  mutations: {
    //put update methods goes here
    getRiderDataList(state, data) {
      state.riderDataList = data;
    },

    getRiderPositionList(state, data) {
      state.riderPositionList = data;
    },
    getRiderJobTripDataList(state, data) {
      state.riderJobStatusTableData = data;
    },

    getRiderJobCordinates(state, data) {
      state.riderJobTripCordinates = data;
    },

    storeOptimizedRouteData(state, data) {
      state.optimizedRoute = data;
    },
  },

  actions: {
    loadRiderListData({ state, commit }, datas) {
      return _post(`crm/live-job/riders?offset=1&limit=100`)
        .then(async (response) => {
          if (response && response.status === 200) {
            const riderData = response?.data.results || [];
            let updatedPositions = riderData?.rows.map((res) => {
              let data = {
                position: {
                  lat: res.latitude ? Number(res.latitude) : null,
                  lng: res.longitude ? Number(res.longitude) : null,
                },
                icons: "/images/vanMapSmall.png",
              };
              return data;
            });
            commit("getRiderPositionList", updatedPositions || []);
            commit("getRiderDataList", riderData?.rows || []);
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    loadTripDataBasedOnRider({ state, commit }, data) {
      return _post(`crm/live-job/rider/jobs?offset=1&limit=100`, data)
        .then(async (response) => {
          if (response && response.status === 200) {
            const riderData = response?.data.results || [];

            let updatedData =
              riderData.count > 0
                ? riderData?.rows.map((c) => {
                    c["collection_slip_no"] = c.booking.collection_slip_no;
                    c["addressUnit"] = c.company_details[0].unit_no;
                    c["addressFloor"] = c.company_details[0].floor_no;
                    c["addressCompany"] = c.company_details[0].company_name;
                    c["addressbuilding"] = c.company_details[0].building_name;
                    c["address"] = c.company_details[0].unit_no;
                    c["addressPostal"] = c.company_details[0].postal_code;
                    return c;
                  })
                : [];

            let updatedCoordinates =
              updatedData.length > 0 &&
              updatedData.map((res) => {
                let dataObj = {
                  id: res.id,
                  coordinates: res.coordinates,
                  rider_id: res.rider_id,
                  booking_id: res.booking_id,
                  icons: "/images/deliveryBoxSmall.png",
                };

                return dataObj;
              });
            commit("getRiderJobTripDataList", updatedData || []);
            commit("getRiderJobCordinates", updatedCoordinates || []);
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    updateJobTripTableRows({ state, commit }, data) {
      commit("getRiderJobTripDataList", data || []);
    },

    liveJobRiderFilterApi({ state, commit }, datas) {
      return _post(`crm/live-job/riders?offset=1&limit=10`, datas)
        .then(async (response) => {
          if (response && response.status === 200) {
            const riderData = response?.data.results || [];
            const latRegex = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g;
            const lngRegex = /^-?(([-+]?)([\d]{1,3})((\.)(\d+))?)/g;
            let updatedArrays = riderData?.rows.filter((c) => {
              if (c.latitude.match(latRegex) && c.longitude.match(lngRegex)) {
                return c;
              }
            });
            let updatedPositions = updatedArrays.map((res) => {
              let data = {
                position: {
                  lat: Number(res.latitude),
                  lng: Number(res.longitude),
                },
                icons: "/images/vanMapSmall.png",
              };
              return data;
            });

            commit("getRiderPositionList", updatedPositions || []);
            commit("getRiderDataList", updatedArrays || []);
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    loadOptimizedCurrentRouteData({ state, commit }, datas) {
      return _post(`rider/current-optimized-route`, datas)
        .then(async (response) => {
          if (response && response.status === 200) {
            let resultValue = response.data.results;
            commit("storeOptimizedRouteData", resultValue);
          }
          return response;
        })
        .catch((err) => {
          return err;
        });
    },
  },
};

export default LiveMapStore;
