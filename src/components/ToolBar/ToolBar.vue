<template>
  <Toolbar>
    <template #left>
      <div class="flex flex-column flex-wrap m-2 mt-3">
        <div class="flex flex-row">
          <div class="flex sidebar m-1 mr-3">
            <SidebarOverlay />
          </div>
          <div class="flex flex-column">
            <BreadCrumb />
          </div>
        </div>
      </div>
    </template>
    <template #right>
      <NotifyMenu />
      <AvatarMenu />
    </template>
  </Toolbar>
</template>

<script>
import Toolbar from "primevue/toolbar";
import SidebarOverlay from "../SideBar/SidebarOverlay.vue";
import BreadCrumb from "./BreadCrumb.vue";
import AvatarMenu from "./AvatarMenu.vue";
import NotifyMenu from "./NotifyMenu.vue";
export default {
  name: "ToolBar",
  components: {
    Toolbar,
    SidebarOverlay,
    BreadCrumb,
    AvatarMenu,
    NotifyMenu,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.cursor {
  cursor: pointer;
}
.p-toolbar {
  background-color: white !important;

  padding: 10px !important;
}

@media (min-width: 576px) {
  .hidden-sm-up {
    display: none !important;
  }
}
</style>
