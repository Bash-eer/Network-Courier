<template>
  <div class="grid h-screen">
    <div class="md:col-3 lg:col-1 xl:col-2 side-drawer">
      <!-- <SideDrawer class="h-full" /> -->
    </div>
    <div class="m-0 lg:col-11 xl:col-10 md:col-9 p-0 m-0">
      <div class="grid p-0">
        <div class="col-12 w-full m-0 p-0">
          <ToolBar />
        </div>
      </div>
      <div class="grid container-wrap">
        <div class="col-12">
          <div class="m-3 mx-5">
            <div v-if="$route.params.id == 'dashboard'">
              <Dashboard />
            </div>
            <div v-if="$route.params.id == 'users'">
              <UsersHome />
            </div>
            <div v-if="$route.params.id == 'roles'">
              <UsersRoles />
            </div>
            <div v-if="$route.params.id == 'NC20200'">
              <UsersTypesRolesModuleRights />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dashboard from "../views/Dashboard.vue";
import UsersHome from "../views/Modules/Settings/Users/UsersHome.vue";
import UsersRoles from "../views/Modules/Settings/Users/UsersRoles.vue";
import UsersTypesRolesModuleRights from "../views/Modules/Settings/Users/UsersTypesRolesModuleRights.vue";
export default {
  components: { Dashboard, UsersHome, UsersRoles, UsersTypesRolesModuleRights },
  methods: {},
};
</script>

<style></style>
