import { _get, _post, _put, _patch, _delete } from "../../apiService";
import { API } from "../../../views/Modules/Operations/checkOut/const";
import { xorBy } from "lodash";

const checkOut = {
  namespaced: true,
  state: {
    remarksDropdownData: [],
    movementChartId: "",
    jobId: "",
    jobIdForSelection: "",
    jobsData: [],
    selectedJobsData: [],
    totalJobsSelected: 0,
    jobSelection: false,
    totalJobsData: 0,
    isPrintPreviewDialog: false,
    printPreviewDialogData: {},
  },
  getters: {
    getDocumentPreviewData: (state) => state.printPreviewDialogData,
  },
  mutations: {
    updateRemarksDropdown(state, payload) {
      const data = payload.map((item) => {
        return {
          name: item,
          code: item,
        };
      });
      state.remarksDropdownData = data;
    },

    updateJobId(state, data) {
      state.jobId = data;
    },

    updateJobIdForSelection(state, data) {
      state.jobIdForSelection = data;
    },

    setJobsData(state, payload) {
      const data = payload.map((item) => {
        return {
          ...item,
          company_details: item.company_details
            ? item.company_details[0]
            : null,
          info: item.info ? item.info[0] : null,
        };
      });
      if (state.jobsData == null) {
        state.jobsData = data;
        state.totalJobsData = data.length;
      } else {
        const newArr = xorBy(state.jobsData, data, "id");
        if (newArr.length) {
          newArr.forEach((ele) => state.jobsData.push(ele));
        }
        state.totalJobsData = state.jobsData.length;
      }
    },

    setJobsDataForSelection(state, payload) {
      const data = payload.map((item) => {
        return {
          ...item,
          company_details: item.company_details
            ? item.company_details[0]
            : null,
          info: item.info ? item.info[0] : null,
        };
      });
      if (state.selectedJobsData == null) {
        state.selectedJobsData = data;
        state.totalJobsSelected = data.length;
      } else {
        const newArr = xorBy(state.selectedJobsData, data, "id");
        if (newArr.length) {
          newArr.forEach((ele) => state.selectedJobsData.push(ele));
        }
        state.totalJobsSelected = state.selectedJobsData.length;
      }
    },

    updateSelectionMode(state, data) {
      state.selectedJobsData = data.length ? data : null;
      state.totalJobsSelected = state.selectedJobsData
        ? state.selectedJobsData.length
        : 0;
    },

    displayPrintPreviewDialog(state, data) {
      state.isPrintPreviewDialog = data.displayDialog || false;
      state.printPreviewDialogData = data.formData || {};
    },

    clearJobsData(state) {
      state.jobsData = null;
      state.jobId = null;
      state.totalJobsData = 0;
    },

    clearSelectionJobsData(state) {
      state.selectedJobsData = null;
      state.totalJobsSelected = 0;
      state.jobIdForSelection = null;
    },
  },
  actions: {
    async getRemarksData({ commit }) {
      try {
        const { data } = await _get(API.REMARKS_DROPDOWN);
        if (data && data.status === 200) {
          commit("updateRemarksDropdown", data?.results);
        }
      } catch (err) {
        return err;
      }
    },

    async getJobId({ commit, dispatch, state }, payload) {
      try {
        const { movementChartId, jobId, logsitic_mode, jobSelection } = payload;
        state.jobSelection = jobSelection;
        const { data } = await _get(
          `${API.SCAN}/?movementChartId=${movementChartId}&JobId=${jobId}&logisticMode=${logsitic_mode}`
        );
        if (data && data.status == 200) {
          jobSelection == false
            ? commit("updateJobId", data?.results)
            : commit("updateJobIdForSelection", data?.results);
          dispatch("loadJobsForCheckout");
        }
        return data;
      } catch (error) {
        return error;
      }
    },

    async loadJobsForCheckout({ commit, state }) {
      try {
        const { jobId, jobIdForSelection, jobSelection } = state;
        const body = {
          jobId: jobSelection == true ? jobIdForSelection : jobId,
        };
        const { data } = await _post(API.LIST, body);
        if (data && data.status == 200) {
          jobSelection == true
            ? commit("setJobsDataForSelection", data?.results)
            : commit("setJobsData", data?.results);
        }
      } catch (error) {
        return error;
      }
    },

    async updateJobsForCheckout(_, payload) {
      try {
        const body = { jobUpdates: payload };
        const { data } = await _post(API.UPDATE, body);
        return data;
      } catch (error) {
        return error;
      }
    },

    async loadPrintMchart({ commit }, id) {
      try {
        const {data} = await _post(`${API.PRINT_MCHART}/${id}`);
        return data;
      } catch (error) {
          return error
      }
    },

    //Get Print Label
    loadPrintLabel({ state, commit }, data) {
      return _post(`${API.ACTIONS.PRINT_SLIP}/${data.id}`, data)
        .then(async (response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get Print Label preview
    loadPrintPreview({ state, commit }, data) {
      return _post(`${API.ACTIONS.PRINT_SLIP_PREVIEW}/${data.id}`, data, {
        responseType: "blob",
      })
        .then(async (response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get Instruction Slip Label
    loadInstructionSlipLabel({ state, commit }, data) {
      return _post(`${API.ACTIONS.INSTRUCTION_SLIP}/${data.id}`, data)
        .then(async (response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get Instruction Slip preview
    loadInstructionSlipPreview({ state, commit }, data) {
      return _post(`${API.ACTIONS.INSTRUCTION_SLIP_PREVIEW}/${data.id}`, data, {
        responseType: "blob",
      })
        .then(async (response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get Attempt Print Label
    attemptSlipPrint({ state, commit }, data) {
      return _post(`${API.ACTIONS.ATTEMPT_SLIP}/${data.id}`, data)
        .then(async (response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get Attempt Print preview
    attemptSlipPreview({ state, commit }, data) {
      return _post(`${API.ACTIONS.ATTEMPT_SLIP_PREVIEW}/${data.id}`, data, {
        responseType: "blob",
      })
        .then(async (response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get Checklist Print Label
    checklistSlipPrint({ state, commit }, data) {
      return _post(`${API.ACTIONS.CHECKLIST}/${data.id}`, data)
        .then(async (response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    //Get Checklist preview
    checklistSlipPreview({ state, commit }, data) {
      return _post(`${API.ACTIONS.CHECKLIST_PREVIEW}/${data.id}`, data, {
        responseType: "blob",
      })
        .then(async (response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    },

    showPrintPreviewDialog({ state, commit }, data) {
      commit("displayPrintPreviewDialog", data);
    },
  },
};

export default checkOut;
