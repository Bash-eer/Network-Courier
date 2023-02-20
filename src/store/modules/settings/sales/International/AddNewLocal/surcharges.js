const initialState = () => ({
    surcharges: {},
    additional_surcharges: [{}],
    validations: {
        additional_surcharges: [{ id: 0, valid: false }]
    }
})

const Surcharges = {
    namespaced: true,
    state: initialState,
    getters: {
        surcharges: ({ surcharges }) => surcharges,
        additional_surcharges: ({ additional_surcharges }) => additional_surcharges,
        validations: ({ validations }) => validations,
    },
    mutations: {
        setSurcharges(state, payload) {
            state.surcharges = payload
        },
        addAdditionalSurcharges(state) {
            state.additional_surcharges.push({})
        },
        removeAdditionalSurcharges(state, payload) {
            state.additional_surcharges.splice(payload, 1)
        },
        setAdditionalSurchargesData(state, { idx, data }) {
            state.additional_surcharges[idx] = data
        },
        setValidations(state, { type, data }) {
            state.validations[type] = data
        },
        resetData(state) {
            const initial = initialState()
            Object.keys(initial).forEach(key => { state[key] = initial[key] })
        }
    },
    actions: {
        setSurcharges({ commit }, payload) {
            commit('setSurcharges', payload)
        },
        addAdditionalSurcharges({ commit }, payload) {
            commit('addAdditionalSurcharges', payload)
        },
        removeAdditionalSurcharges({ commit }, payload) {
            commit('removeAdditionalSurcharges', payload)
        },
        setAdditionalSurchargesData({ commit }, payload) {
            commit('setAdditionalSurchargesData', payload)
        },
        setValidations({ commit }, payload) {
            commit('setValidations', payload)
        },
        resetData({ commit }) {
            commit('resetData')
        }
    },

};
export default Surcharges;
