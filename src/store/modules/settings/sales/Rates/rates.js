const rates = {
  namespaced: true,
  state: {
    zoneOrRegion: null,
    ratesCurrentTab: null,
    expressCurrentTabs: null,
    internationalCurrentTabs: null,
    rapidoCurrentTabs: null,
    ratesTabMenuData: [
      {
        label: "International",
        tab: "InternationalTabs",
        select: false,
        tabName: "International",
        heading: "International",
      },
      {
        label: "Express",
        tab: "ExpressTabs",
        select: true,
        tabName: "Express",
        heading: "Express",
      },
      {
        label: "Rapido",
        tab: "RapidoTabs",
        select: true,
        tabName: "Rapido",
        heading: "Rapido",
      },
    ],
    ExpressPageTabMenuData: [
      {
        label: "Contract",
        tab: "ContractHome",
      },
      {
        label: "Adhoc",
        tab: "AdhocHome",
      },
    ],
  },
  mutations: {
    //express zones/region tab change
    zoneOrRegionMutation(state, tabType) {
      state.zoneOrRegion = tabType;
    },
  },
  actions: {
    setZoneOrRegion({ commit }, { tabType }) {
      commit("zoneOrRegionMutation", tabType);
    },
  },
  getters: {},
};
export default rates;
