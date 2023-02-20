const initialState = () => ({
    trips: { bike: [], van: [] },
    bike_rates: [{}],
    van_rates: [{}],
    bike_customer_van_job: {},
    two_tire_rates: {
        charge_by_weight: {},
        charge_by_quantity: { box_count_charges: [{}] }
    },
    multi_tire: {
        charge_by_quantity: [{}],
        charge_by_job_count: [{}]
    },
    van_customer_bike_job: {},
    van_job_urgent_surcharges: {},
    validations: {
        rates: {
            van_customer_bike_job: { valid: false },
            charge_by_job_count: [{ id: 0, valid: false }],
            charge_by_quantity: [{ id: 0, valid: false }],
            box_count_charges: [{ id: 0, valid: false }],
            van_rates: [{ id: 0, valid: false }],
            bike_rates: [{ id: 0, valid: false }],
        },
        trips: {
            van: { valid: false },
            bike: { valid: false },
        },
    }
})

const Normal = {
    namespaced: true,
    state: initialState,
    getters: {
        trips: ({ trips }) => trips,
        bike_rates: ({ bike_rates }) => bike_rates,
        van_rates: ({ van_rates }) => van_rates,
        bike_customer_van_job: ({ bike_customer_van_job }) => bike_customer_van_job,
        two_tire_rates: ({ two_tire_rates }) => two_tire_rates,
        multi_tire: ({ multi_tire }) => multi_tire,
        van_customer_bike_job: ({ van_customer_bike_job }) => van_customer_bike_job,
        van_job_urgent_surcharges: ({ van_job_urgent_surcharges }) => van_job_urgent_surcharges,
        validations: ({ validations }) => validations,
        inValidTab: ({ inValidTab }) => inValidTab,

    },
    mutations: {
        setTrips(state, { type, data }) {
            state.trips[type] = data
        },
        addRates(state, payload) {
            state[payload].push({})
        },
        removeRates(state, { type, idx }) {
            state[type].splice(idx, 1)
        },
        setRatesData(state, { type, idx, data }) {
            state[type][idx] = data
        },
        setVanJobData(state, payload) {
            state.bike_customer_van_job = payload
        },
        setTwoTierData(state, { type, data, idx }) {
            if (type == 'charge_by_quantity' && idx >= 0) {
                state.two_tire_rates.charge_by_quantity.box_count_charges[idx] = data
                return
            } else if (type == 'charge_by_quantity') {
                for (const [key, value] of Object.entries(data)) {
                    state.two_tire_rates.charge_by_quantity[key] = value
                }
                return
            } else {
                state.two_tire_rates[type] = data
            }
        },
        addBoxCount(state) {
            state.two_tire_rates.charge_by_quantity.box_count_charges.push({})
        },
        removeBoxCount(state, payload) {
            state.two_tire_rates.charge_by_quantity.box_count_charges.splice(payload, 1)
        },
        addMultiTierWeight(state) {
            state.multi_tire.charge_by_quantity.push({})
        },
        removeMultiTierWeight(state, payload) {
            state.multi_tire.charge_by_quantity.splice(payload, 1)
        },
        addMultiTierJobCount(state) {
            state.multi_tire.charge_by_job_count.push({})
        },
        removeMultiTierJobCount(state, payload) {
            state.multi_tire.charge_by_job_count.splice(payload, 1)
        },
        setMultTierData(state, { type, idx, data }) {
            state.multi_tire[type][idx] = data
        },
        setVanCustomerBikejob(state, payload) {
            state.van_customer_bike_job = payload
        },
        setVanSurcharges(state, payload) {
            state.van_job_urgent_surcharges = payload
        },
        setValidations(state, { tab, type, data }) {
            state.validations[tab][type] = data
        },
        resetData(state) {
            const initial = initialState()
            Object.keys(initial).forEach(key => { state[key] = initial[key] })
        }
    },
    actions: {
        setTrips({ commit }, payload) {
            commit('setTrips', payload)
        },
        addRates({ commit }, payload) {
            commit('addRates', payload)
        },
        removeRates({ commit }, payload) {
            commit('removeRates', payload)
        },
        setRatesData({ commit }, payload) {
            commit('setRatesData', payload)
        },
        setVanJobData({ commit }, payload) {
            commit('setVanJobData', payload)
        },
        setTwoTierData({ commit }, payload) {
            commit('setTwoTierData', payload)
        },
        addBoxCount({ commit }, payload) {
            commit('addBoxCount', payload)
        },
        removeBoxCount({ commit }, payload) {
            commit('removeBoxCount', payload)
        },
        addMultiTierWeight({ commit }, payload) {
            commit('addMultiTierWeight', payload)
        },
        removeMultiTierWeight({ commit }, payload) {
            commit('removeMultiTierWeight', payload)
        },
        addMultiTierJobCount({ commit }, payload) {
            commit('addMultiTierJobCount', payload)
        },
        removeMultiTierJobCount({ commit }, payload) {
            commit('removeMultiTierJobCount', payload)
        },
        setMultTierData({ commit }, payload) {
            commit('setMultTierData', payload)
        },
        setVanCustomerBikejob({ commit }, payload) {
            commit('setVanCustomerBikejob', payload)
        },
        setVanSurcharges({ commit }, payload) {
            commit('setVanSurcharges', payload)
        },
        setValidations({ commit }, payload) {
            commit('setValidations', payload)
        },
        resetData({ commit }) {
            commit('resetData')
        }
    },
};
export default Normal;
