import Normal from './normal.js'
import Ecommerce from './ecommerce.js';
import Surcharges from './surcharges.js';
import axios from "axios";
axios.defaults.baseURL = URL.BACKEND_BASEURL;

const initialState = () => ({
    nextBtnKey: 10,
    backBtnKey: 10,
    stepperKey: 10,
    stepBackKey: 10,
    inValidTab: null,
    tabs: [
        {
            id: 1,
            tab: "Normal",
            component: "Normal",
            disable: false,
            routeName: 'AddNewInternationalLocalNormal'
        },
        {
            id: 2,
            tab: "E-Commerce",
            component: "RestrictedCountryCharges",
            disable: true,
            routeName: 'AddNewInternationalLocalEcommerce'
        },
        {
            id: 3,
            tab: "Surcharges",
            component: "OverWeightCharges",
            disable: true,
            routeName: 'AddNewInternationalLocalSurcharges'
        },
        {
            id: 4,
            tab: "Additional Surcharges",
            component: "RemoteAreaChanges",
            disable: true,
            routeName: 'AddNewInternationalLocalAddSurcharges'
        },
    ],
    currentTab: {
        id: 1,
        tab: "Normal",
        disable: false,
        component: "Normal",
        routeName: 'AddNewInternationalLocalNormal'
    },
    headerFields: {},
    checkFields: {
        gst: false,
        default: false,
    }
})

const AddNewInternationalLocal = {
    namespaced: true,
    state: initialState,
    getters: {
        tabs: ({ tabs }) => tabs,
        currentTab: ({ currentTab }) => currentTab,
        nextBtnKey: ({ nextBtnKey }) => nextBtnKey,
        backBtnKey: ({ backBtnKey }) => backBtnKey,
        stepperKey: ({ stepperKey }) => stepperKey,
        stepBackKey: ({ stepBackKey }) => stepBackKey,
        headerFields: ({ headerFields }) => headerFields,
        checkFields: ({ checkFields }) => checkFields,
        inValidTab: ({ inValidTab }) => inValidTab,
    },
    mutations: {
        setCurrentTab(state, payload) {
            state.currentTab = payload
        },
        setTabDisable(state) {

            for (let i = state.currentTab.id; i < state.tabs.length; i++) {
                state.tabs[i].disable = true
            }

        },
        setTabActive(state) {
            state.tabs[state.currentTab.id].disable = false
        },
        setNextBtnKey(state) {
            state.nextBtnKey++
        },
        setBackBtnKey(state) {
            state.backBtnKey++
        },
        setStepperKey(state) {
            state.stepperKey++
        },
        setStepBackKey(state) {
            state.stepBackKey++
        },
        setHeaderFields(state, payload) {
            state.headerFields = payload
        },
        setCheckFields(state, payload) {
            state.checkFields = payload
        },
        setInvalidTab(state, payload) {
            state.inValidTab = payload
        },
        resetData(state) {
            const initial = initialState()
            Object.keys(initial).forEach(key => { state[key] = initial[key] })
        }
    },
    actions: {
        setCurrentTab({ commit }, payload) {
            commit('setCurrentTab', payload)
        },
        setNextBtnKey({ commit }) {
            commit('setNextBtnKey')
        },
        setBackBtnKey({ commit }) {
            commit('setBackBtnKey')
        },
        setStepperKey({ commit }) {
            commit('setStepperKey')
        },
        setStepBackKey({ commit }) {
            commit('setStepBackKey')
        },
        setTabDisable({ commit }) {
            commit('setTabDisable')
        },
        setTabActive({ commit }) {
            commit('setTabActive')
        },
        setHeaderFields({ commit }, payload) {
            commit('setHeaderFields', payload)
        },
        setCheckFields({ commit }, payload) {
            commit('setCheckFields', payload)
        },
        setInvalidTab({ commit }, payload) {
            commit('setInvalidTab', payload)
        },
        resetData({ commit }) {
            commit('resetData')
        },
        async postRateCardData(_, payload) {
            await axios.post('settings/sales/rates/international/outbound/ratecard', payload)
        },
        async getRegionTrips(_, payload) {
            return await axios.get('settings/sales/rates/international/outbound/dropdowns/regions/trips/' + payload)
        }
    },
    modules: {
        Normal,
        Ecommerce,
        Surcharges
    }
};
export default AddNewInternationalLocal;
