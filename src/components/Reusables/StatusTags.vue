<template>
  <span
    class="commonTagStyle mr-4"
    :class="type"
    :style="usage == 'table' ? 'padding:8px' : 'padding:0.6em'"
    >{{ label }}</span
  >
</template>

<script>
export default {
  name: "StatusTags",
  props: ["label", "type", "usage"],
};
</script>

<style>
.commonTagStyle {
  border-radius: 7px;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
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
.Approved {
  background: #cfffeb;
  color: #32dd4d;
}
.Accepted {
  background: #cfffeb;
  color: #32dd4d;
}
.approved {
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
.Conclude {
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
}
.Deleted {
  background: #ffecec;
  color: #eb4646;
}
.Declined {
  background: #ffecec;
  color: #eb4646;
}
.Rejected {
  background: #ffecec;
  color: #eb4646;
}
.Moved {
  background: #f3d58b;
  color: #382b09;
}
.Hold {
  background: #f3d58b;
  color: #382b09;
}
.InContract {
  background: #f4ecff;
  color: #8f46eb;
}
.Contract {
  background: #f4ecff;
  color: #8f46eb;
}
.Terminated {
  background: #ffecec;
  color: #eb4646;
}
</style>
