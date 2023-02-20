const initialState = () => ({
    saveKey: 10,
    currentTab: 'Emergency Surcharges',
    inValidTab: {},
    emergencySurcharges: {
        normal: [{}],
        multiplier: [{}]
    },
    restrictedCountry: {
        normal: [{}],
        multiplier: [{}],
        base_rate_multiplier: [{}]
    },
    overWeightCharges: {},
    remoteAreaCharges: {
        normal: [{ destinations: [{}] }],
        multiplier: [{ destinations: [{}] }]
    },
    validations: {
        remoteAreaCharges: {
            multiplier: [{ id: 0, valid: true }],
            normal: [{ id: 0, valid: true }],
        },
        overWeightCharges: {
            base: [{ id: 0, valid: true }]
        },
        restrictedCountry: {
            base_rate_multiplier: [{ id: 0, valid: true }],
            multiplier: [{ id: 0, valid: true }],
            normal: [{ id: 0, valid: true }],
        },
        emergencySurcharges: {
            multiplier: [{ id: 0, valid: true }],
            normal: [{ id: 0, valid: true }],
        },
    }
})

const Surcharges = {
    namespaced: true,
    state: initialState,
    getters: {
        emergencySurcharges: ({ emergencySurcharges }) => emergencySurcharges,
        restrictedCountry: ({ restrictedCountry }) => restrictedCountry,
        overWeightCharges: ({ overWeightCharges }) => overWeightCharges,
        remoteAreaCharges: ({ remoteAreaCharges }) => remoteAreaCharges,
        validations: ({ validations }) => validations,
        inValidTab: ({ inValidTab }) => inValidTab,
        saveKey: ({ saveKey }) => saveKey,
        currentTab: ({ currentTab }) => currentTab,
    },
    mutations: {
        setCurrentTab(state, payload) {
            state.currentTab = payload
        },
        setEmergencySurcharges(state, { type, idx, data }) {
            state.emergencySurcharges[type][idx] = data
        },
        addEmergencySurcharges(state, payload) {
            state.emergencySurcharges[payload].push({})
        },
        removeEmergencySurcharges(state, { type, idx }) {
            state.emergencySurcharges[type].splice(idx, 1)
        },
        setRestrictedCountry(state, { type, idx, data }) {
            state.restrictedCountry[type][idx] = data
        },
        addRestrictedCountry(state, payload) {
            state.restrictedCountry[payload].push({})
        },
        removeRestrictedCountry(state, { type, idx }) {
            state.restrictedCountry[type].splice(idx, 1)
        },
        setOverWeightCharges(state, payload) {
            state.overWeightCharges = payload
        },
        addRemoteAreaDestination(state, { type, idx }) {
            state.remoteAreaCharges[type][idx].destinations.push({})
        },
        removeRemoteAreaDestination(state, { type, typeIdx, destIdx }) {
            state.remoteAreaCharges[type][typeIdx].destinations.splice(destIdx, 1)
        },
        addRemoteAreaCharges(state, payload) {
            state.remoteAreaCharges[payload].push({ destinations: [{}] })
        },
        removeRemoteAreaCharges(state, { type, idx }) {
            state.remoteAreaCharges[type].splice(idx, 1)
        },
        setRemoteAreDestination(state, { type, typeIdx, destIdx, data }) {
            state.remoteAreaCharges[type][typeIdx].destinations[destIdx] = data
        },
        setRemoteAreaCharges(state, { type, idx, data }) {
            state.remoteAreaCharges[type][idx] = data
        },
        setValidations(state, { tab, type, data }) {
            state.validations[tab][type] = data
        },
        setInValidTab(state, payload) {
            state.inValidTab = payload
        },
        setSaveKey(state) {
            state.saveKey++
        },
        resetData(state) {
            const initial = initialState()
            Object.keys(initial).forEach(key => { state[key] = initial[key] })
        }
    },
    actions: {
        setCurrentTab({ commit }, payload) {
            commit('setCurrentTab'), payload
        },
        setEmergencySurcharges({ commit }, payload) {
            commit('setEmergencySurcharges', payload)
        },
        addEmergencySurcharges({ commit }, payload) {
            commit('addEmergencySurcharges', payload)
        },
        removeEmergencySurcharges({ commit }, payload) {
            commit('removeEmergencySurcharges', payload)
        },
        setRestrictedCountry({ commit }, payload) {
            commit('setRestrictedCountry', payload)
        },
        addRestrictedCountry({ commit }, payload) {
            commit('addRestrictedCountry', payload)
        },
        removeRestrictedCountry({ commit }, payload) {
            commit('removeRestrictedCountry', payload)
        },
        setOverWeightCharges({ commit }, payload) {
            commit('setOverWeightCharges', payload)
        },
        addRemoteAreaDestination({ commit }, payload) {
            commit('addRemoteAreaDestination', payload)
        },
        removeRemoteAreaDestination({ commit }, payload) {
            commit('removeRemoteAreaDestination', payload)
        },
        addRemoteAreaCharges({ commit }, payload) {
            commit('addRemoteAreaCharges', payload)
        },
        removeRemoteAreaCharges({ commit }, payload) {
            commit('removeRemoteAreaCharges', payload)
        },
        setRemoteAreaCharges({ commit }, payload) {
            commit('setRemoteAreaCharges', payload)
        },
        setValidations({ commit }, payload) {
            commit('setValidations', payload)
        },
        setInvalidTab({ commit }, payload) {
            commit('setInValidTab', payload)
        },
        setSaveKey({ commit }) {
            commit('setSaveKey')
        },
        resetData({ commit }) {
            commit('resetData')
        }
    }
};
export default Surcharges;
