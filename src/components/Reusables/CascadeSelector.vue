<template>
  <CascadeSelect
    v-model="selectedRole"
    :options="$store.state.users.cascadeRolesDropDownFiltered"
    optionLabel="role_name"
    optionGroupLabel="name"
    :optionGroupChildren="['userTypes', 'userRoles']"
    style="minwidth: 14rem"
  />
</template>

<script>
import CascadeSelect from "primevue/cascadeselect";
export default {
  name: "CascadeSelector",
  data() {
    return {
      selectedRole: null,
      roles: [
        {
          name: "Express",
          alias: "Express",
          code: "EX",
          userTypes: [
            {
              name: "Contract",
              alias: "Contract",
              userRoles: [
                { role_name: "Sydney", role_id: "A-SY" },
                { role_name: "Newcastle", role_id: "A-NE" },
                { role_name: "Wollongong", role_id: "A-WO" },
              ],
            },
            {
              name: "Adhoc",
              alias: "Adhoc",
              userRoles: [
                { role_name: "Brisbane", role_id: "A-BR" },
                { role_name: "Townsville", role_id: "A-TO" },
              ],
            },
          ],
        },
      ],
    };
  },
  components: {
    CascadeSelect,
  },
};
</script>

<style></style>
