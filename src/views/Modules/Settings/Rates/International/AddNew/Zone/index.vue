<template>
  <div>
    <div class="color-7a7a7a font-size-14 bold-600 flex justify-content-start">Add Zones</div>
    <div v-for="(zone, idx) of zoneCount" :key="zone">
      <AddZoneInputs
        @isFormValid="isFormValid"
        :zoneId="idx"
        @removeZone="removeZone"
        :count="zoneCount.length"
      />
    </div>
    <div @click="addZone" class="add-text pointer mt-3">+ Add Zone</div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import AddZoneInputs from "./AddZoneInputs.vue";

export default {
  components: { AddZoneInputs },
  data() {
    return {
      zoneCount: [],
    };
  },

  computed: {
    ...mapGetters({
      zoneData: "AddNewInternational/zoneData",
      footerBtnKey: "AddNewInternational/footerBtnKey",
    }),
  },
  methods: {
    ...mapActions({
      setIsNextValid: "AddNewInternational/setIsNextValid",
      addZoneCount: "AddNewInternational/addZone",
      removeZoneCount: "AddNewInternational/removeZone",
    }),
    ...mapMutations({
      updateBreadCrumbAndTitle: "users/updateBreadCrumbAndTitle",
    }),
    addZone() {
      let count = this.zoneCount.length + 1;

      let exist = this.zoneCount.find((list) => {
        if (list.id === count) {
          return list;
        }
      });

      if (exist) {
        this.zoneCount.push({
          id: this.zoneCount.length + exist.id,
          valid: false,
        });
      } else {
        this.zoneCount.push({ id: this.zoneCount.length + 1, valid: false });
      }

      this.setIsNextValid(false);
      this.addZoneCount();
    },
    removeZone(id) {
      if (this.zoneCount.length > 1) {
        this.zoneCount.splice(id, 1);
        this.removeZoneCount(id);
      }
    },
    isFormValid({ isValid, id }) {
      this.zoneCount.map((list, idx) => {
        if (idx === id) {
          list.valid = isValid;
          return;
        }
      });

      let invalidForm = this.zoneCount.find((list) => {
        if (list.valid === false) return list;
      });

      if (invalidForm) {
        this.setIsNextValid(false);
      } else {
        this.setIsNextValid(true);
      }
    },
  },
  created() {
    this.updateBreadCrumbAndTitle({
      title: "Rates",
      breadcrumbInfo: "Settings > Sales Settings > Rates > International > Add New",
    });
    this.zoneData.map((_, idx) => {
      this.zoneCount.push({ id: idx, valid: true });
    });
  },
};
</script>

<style scoped>
.add-text {
  display: flex;
  align-items: flex-start;
  color: #357dea;
}
</style>