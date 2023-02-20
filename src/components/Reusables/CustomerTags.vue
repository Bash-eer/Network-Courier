<template>
  <div :class="tagDivClasses()">
    <div class="flex justify-content-between">
      <div class="flex no-wrap">
        <span :class="labelClass">{{ label }}</span>
      </div>
      <div v-if="path != null" class="flex">
      <!-- :src="'/images/' + path + 'Badge' + '.png'" -->
        <img
          :src="'/images/' + path +'.png'"
          
          alt=""
          :class="tagClasses()"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerTags",
  props: ["label", "path", "tagClass", "marginClass", "labelClass"],
  methods: {
    getLabelClass() {
      const classes = [];
      classes.push(this.labelClass);
      return classes;
    },
    tagDivClasses() {
      const classes = [this.marginClass];
      classes.push(this.tagClass + "Div");
      return classes;
    },
    tagClasses() {
      const classes = ["nothing"];
      classes.push(this.tagClass);
      return classes;
    },
  },
};
</script>

<style scoped>
.international_title {
  font-size: 12px;
}
.agent-title {
  color: white;
  font-size: 15px;
}
.customerTags {
  padding: 5%;
  color: white;
  height: 30px;
  border-radius: 7px;
  width: 105px;
}
.userTags {
  padding: 3%;
  width: 115px;
  height: 35px;
  border-radius: 7px;
  background-color: pink !important;
}
.Express {
  position: absolute;
  right: 5px;
}
.ExpressDiv {
  color: #ebbd46;
  border-radius: 7px;
  position: relative;
}
.expressdev {
  position: absolute;
  right: 2px;
  top: 10px;
}
.expressdevDiv {
  background: #ebbd46;
  border-radius: 7px;
  position: relative;
}
.internationaldev {
  position: absolute;
  right: 0;
  top: 5px;
}
.internationaldevDiv {
  background: #7469f2;
  border-radius: 7px;
  position: relative;
}
.International {
  position: absolute;
  right: 0px;
  top: 5px;
}
.InternationalDiv {
  color: #7469f2;
  border-radius: 7px;
  position: relative;
}
.Rapidodev {
  position: absolute;
  right: 10px;
  top: 4px;
}
.RapidodevDiv {
  background: #55ba6b;
  border-radius: 7px;
  position: relative;
}
.Rapido {
  position: absolute;
  right: 10px;
  top: 4px;
}
.RapidoDiv {
  color: #55ba6b;
  border-radius: 7px;
  position: relative;
}
.NormalDiv {
  background: #eeefff;
  color: #1b25c6;
  border-radius: 31px;
  padding: 10px;
  padding-left: 15px;
}
.SuperDiv {
  background: #ffeeee;
  color: #c61b1b;
  border-radius: 31px;
  padding: 10px;
  padding-left: 15px;
}
</style>
