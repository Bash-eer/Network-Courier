<template>
  <div class="top-card-grid">
    <div v-for="item in DashboardData" :key="item.id">
      <div class="card border-0 top-card-container">
        <div class="card-body ml-3">
          <div class="flex flex-row justify-content-between card-container">
            <div class="flex flex-column">
              <div>
                <p class="top-card-title">{{ item.title }}</p>
              </div>
              <div class="top-card-number mr-3">{{ item.number }}</div>
            </div>

            <div class="flex flex-column mt-2">
              <div>
                <img class="top-card-img" src="../../assets/graph.png" alt="" />
              </div>
              <div class="top-card-percentage mt-3">
                +{{ item.percentage }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      DashboardData: [
        { id: "01", title: "Total Sales", number: "351", percentage: 5 },
        { id: "02", title: "Jobs Received", number: "10,554", percentage: 5 },
        { id: "03", title: "Jobs Delivered", number: "8,156", percentage: 5 },
        { id: "04", title: "New Leads", number: 51, percentage: 5 },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.card {
  border-radius: 8px !important;
}
.top-card-title {
  font-family: $font-family-primary;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
  color: #204b8c;
}
.top-card-number {
  font-family: $font-family-primary;
  font-size: 37px;
  font-style: normal;
  // font-weight: bold !important;
  font-weight: 700;
  line-height: 52px;
  letter-spacing: 0px;
  text-align: left;
  color: #204b8c;
}
.top-card-percentage {
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
  color: #68c959;
}
.top-card-img {
  background-color: rgba(104, 201, 89, 0.2);

  border-radius: 50%;
  padding: 7px;
  height: 30px;
  width: 30px;
}
.top-card-container {
  border: 0.5px solid #b5dfb7 !important;
  box-sizing: border-box !important;
  box-shadow: 0px 4px 28px rgba(53, 125, 234, 0.05) !important;
  border-radius: 8px !important;
}
.top-card-grid {
  display: grid;
  grid-gap: 2rem;
}

@media only screen and (min-width: 426px) {
  .top-card-grid {
    grid-template-columns: repeat(4, auto);
  }
}

@media only screen and (max-width: 768px) {
  .top-card-grid {
    grid-gap: 1rem;
  }
}

@media only screen and (max-width: 425px) {
  .top-card-grid {
    grid-template-columns: repeat(1, auto);
  }
}
</style>
