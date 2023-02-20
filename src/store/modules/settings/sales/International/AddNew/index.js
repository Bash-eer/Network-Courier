import WeightAndRates from "./WeightAndRates";
import Surcharges from './surcharges'
import AddSurcharges from './addSurcharges'
import axios from "axios";
axios.defaults.baseURL = URL.BACKEND_BASEURL;

const initialState = () => ({
  goToPrev: false,
  currentStep: 1,
  isNextValid: false,
  cancelled: false,
  gst: false,
  setAsDefault: false,
  footerBtnKey: 10,
  nxtRoute: '',
  prevRoute: '',
  zoneData: [{}],
  headerFields: {},
  stepperData: [
    {
      label: 1,
      name: "Zone",
      routeName: "AddNewZone",
    },
    {
      label: 2,
      name: "Weight and Rate",
      routeName: "AddNewWeightRates",
    },
    {
      label: 3,
      name: "Surcharges",
      routeName: 'AddNewSurcharges'
    },
    {
      label: 4,
      name: "Additional Surcharges",
      routeName: 'AddNewAdditionalSurcharges'
    },
  ],
})

const AddNewInternational = {
  namespaced: true,
  state: initialState,
  getters: {
    currentStep: ({ currentStep }) => currentStep,
    isNextValid: ({ isNextValid }) => isNextValid,
    footerBtnKey: ({ footerBtnKey }) => footerBtnKey,
    stepperData: ({ stepperData }) => stepperData,
    zoneData: ({ zoneData }) => zoneData,
    headerFields: ({ headerFields }) => headerFields,
    gst: ({ gst }) => gst,
    setAsDefault: ({ setAsDefault }) => setAsDefault,
    goToPrev: ({ goToPrev }) => goToPrev
  },
  mutations: {
    setGoToPrev(state, payload) {
      state.goToPrev = payload
    },
    changeCurrentStep(state, payload) {
      state.currentStep = payload
    },
    setIsNextValid(state, payload) {
      state.isNextValid = payload
    },
    setFooterBtnKey(state) {
      state.footerBtnKey++
    },
    setZoneData(state, { idx, data }) {
      state.zoneData[idx] = data
    },
    addZone(state) {
      state.zoneData.push({})
    },
    removeZone(state, idx) {
      state.zoneData.splice(idx, 1)
    },
    setIsCancelled(state, payload) {
      state.cancelled = payload
    },
    setHeaderFields(state, payload) {
      state.headerFields = payload
    },
    setCheckboxData(state, { field, value }) {
      state[field] = value
    },
    resetData(state) {
      const initial = initialState()
      Object.keys(initial).forEach(key => { state[key] = initial[key] })
    }
  },
  actions: {
    setGoToPrev({ commit }, payload) {
      commit('setGoToPrev', payload)
    },
    setCurrentStep({ commit }, payload) {
      commit('changeCurrentStep', payload)
    },
    setIsNextValid({ commit }, payload) {
      commit('setIsNextValid', payload)
    },
    setFooterBtnKey({ commit }) {
      commit('setFooterBtnKey')
    },
    setZoneData({ commit }, payload) {
      commit('setZoneData', payload)
    },
    addZoneData({ commit }) {
      commit('addZoneData')
    },
    removeZone({ commit }, payload) {
      commit('removeZone', payload)
    },
    addZone({ commit }) {
      commit('addZone')
    },
    setIsCancelled({ commit }, payload) {
      commit('setIsCancelled', payload)
    },
    setHeaderFields({ commit }, payload) {
      commit('setHeaderFields', payload)
    },
    setCheckboxData({ commit }, payload) {
      commit('setCheckboxData', payload)
    },
    resetData({ commit }) {
      commit('resetData')
    },
    async postRateCardData(_, payload) {
      await axios.post('settings/sales/rates/international/outbound/ratecard', payload)
    }
  },
  modules: {
    WeightAndRates,
    Surcharges,
    AddSurcharges
  }
};
export default AddNewInternational;

