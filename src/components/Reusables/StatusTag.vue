<template>
  <span class="status-tag ml-2" :class="tagClass" :style="getStyles()">{{
    label
  }}</span>
</template>

<script>
export default {
  name: "StatusTag",
  props: ["label", "tagClass", "color", "bgColor", "borderRadius"],
  methods: {
    getStyles() {
      return {
        "background-color": `${this.bgColor}`,
        color: `${this.color}`,
        "border-radius": `${this.borderRadius}`,
      };
    },
  },
};
</script>

<style scoped>
.status-tag {
  width: max-content;
  height: 30px;

  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  padding: 4px 5px;
}
/* .commonTagStyle {
  border-radius: 7px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.4em;
  padding-bottom: 0.25em;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}
.notSigned {
  background: #f4ecff;
  color: #8f46eb;
}
.new {
  background: #cfffeb;
  color: #32dd4d;
}
.New {
  background: #cfffeb;
  color: #32dd4d;
}
.New1 {
  background: #cfffeb;
  color: #32dd4d;
}
.Hold {
  background: #ffecec;
  color: #eb4646;
}
.Revision {
  background: #ffecec;
  color: #eb4646;
}
.Called {
  background: #fff5ec;
  color: #e1b929;
}
.Concluded {
  background: #ecf0ff;
  color: #297ee1;
}
.Quote {
  background: #f4ecff;
  color: #8f46eb;
}
.Pending {
  background: #f4ecff;
  color: #8f46eb;
}
.NotComing {
  background: #ffe9e9;
  color: #ff0000;
}
.Coming {
  background: #cfffeb;
  color: #32dd4d;
}
.Invited {
  background: #fcd4af;
  color: #ee5a24;
} */
</style>
