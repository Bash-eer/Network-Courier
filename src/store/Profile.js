const profile = {
  namespaced: true,
  state: {
    verifiedEmail: "pending",
    isImgUpdated : "No",
    profileImg: null,
    //profile screen
    profile_details: {
      // name: "something will come",
      name: localStorage.getItem("userName"),
      email: "Janemarry@gmail.com",
      country: "Singapore",
      account_created: "February 20, 2020, 9:30:35 PM",
    },
    profile: [
      {
        field_1: "Name",
        field_2: localStorage.getItem("userName"),
        id: 1,
        dark: true,
      },
      {
        field_1: "Email",
        field_2: "keerthana@amanaasia.com",
        id: 2,
        dark: false,
      },
      {
        field_1: "Email Verification",
        field_2: "Pending",
        field_3: "Verify Now?",
        id: 3,
        dark: true,
      },
      { field_1: "Role", field_2: "Accounts Clerk", id: 4, dark: false },
      { field_1: "Contact", field_2: "654321 76543", id: 5, dark: true },
      {
        field_1: "Mobile Verification",
        field_2: "Verified",
        field_3: "Change Number?",
        id: 6,
        dark: false,
      },
      { field_1: "Status", field_2: "Active", id: 7, dark: true },
      {
        field_1: "Address",
        field_2: "641001, Manzil Building, 3rd Floor,2 unit.",
        id: 8,
        dark: false,
      },
      {
        field_1: "Password",
        field_2: 12345,
        field_3: "Reset Password?",
        id: 9,
        dark: true,
      },
    ],
  },
  mutations: {},
  actions: {},
  getters: {},
};

export default profile;
