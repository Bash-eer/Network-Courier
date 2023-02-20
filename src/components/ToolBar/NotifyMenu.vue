<template>
  <div
    class="flex flex-row cursor"
    @click="toggle"
    aria-haspopup="true"
    aria-controls="overlay_panel"
  >
    <!--insider-->
    <!-- v-badge="2" -->
    <!--v-if="items.length > 0"
     v-badge="items.length"
    -->
    <div v-if="items.length > 0">
      <i
        class="pi pi-bell p-mr-4 p-text-secondary mr-5 mt-2"
        style="font-size: 1.4rem"
        v-badge="isRead"
      ></i>
    </div>
    <div v-else>
      <i
        class="pi pi-bell p-mr-4 p-text-secondary mr-5 mt-2"
        style="font-size: 1.4rem"
      ></i>
    </div>

    <!--insider-->
  </div>

  <OverlayPanel
    ref="op"
    appendTo="body"
    :showCloseIcon="false"
    id="overlay_panel"
    style="width: 420px; height: 380px; overflow-y: scroll; overflow-x: hidden"
    :breakpoints="{ '960px': '75vw' }"
    class="overlay"
  >
    <div
      v-if="items.length != 0"
      class="flex flex-row justify-content-between w-full"
    >
      <div class="m-2">Notification</div>
      <div @click="markAllAsReadHandler" class="blue m-2 cursor-pointer">
        Mark as Read All
      </div>
    </div>

    <p v-if="items.length != 0" class="m-2">Today</p>
    <!--notifications-->
    <div v-if="items.length == 0">
      <p>No notifications!</p>
    </div>
    <div v-if="items.length != 0">
      <!-- <img src="https://network-courier.sgp1.digitaloceanspaces.com/development/images/notify-red.png" alt="logo"> -->

      <div v-for="item in items" :key="item.id" class="grid col-12 notify">
        <div class="col-2 notify-image-wrapper">
          <span v-if="item.read == false" class="custom-dot-unread"></span>
          <!-- <span  v-else class="custom-dot-read"></span> -->
          <!-- <img
          v-if="item.type == 'justNotify'"
          src="/images/notify-blue.png"
          alt="img"
        /> -->
          <!--   v-if="item.subject == 'Request Cancellation'" <img src="/images/notify-red.png" alt="img" /> -->
          <img :src="item.logo" alt="img" />
        </div>
        <!--v-if="item.type == 'justNotify'"-->
        <!-- <div v-if="item.type == 'justNotify'" class="col-9">
          <div class="flex flex-column align-items-start notify-body">
            <div class="title mb-1">{{ item.title }}</div>
            <div class="mb-1">
              <span class="by">For</span>
              <span class="blue company">{{ item.company }}</span>
            </div>
            <div class="by mb-1">{{ item.by }}</div>
            <div class="time mb-1">{{ item.time }}</div>
          </div>
        </div> -->
        <!--v-if="item.type == 'actionNeeded'"-->
        <!-- <div v-if="item.subject == 'Request Cancellation'" class="col-9"> -->
        <div class="col-9">
          <div class="flex flex-column align-items-start flex-wrap notify-body">
            <!-- <p>{{item.id}}</p> -->
            <div class="title mb-1">{{ item.title }}</div>

            <div class="by mb-1">{{ item.body }}</div>
            <div v-if="item.buttons == true" class="flex flex-row">
              <div v-for="btn in item.style.buttons" :key="btn">
                <button
                  type="button"
                  :style="styleObject(btn)"
                  :disabled="false"
                  class="btn-class mr-2 my-2"
                  @click="buttonClickHandler(item, btn)"
                >
                  {{ btn.value }}
                </button>
              </div>

              <!-- <button :disabled="false" class="btn-decline my-2">{{item.style.buttons[1].value}}</button> -->
            </div>
            <div class="time">{{ item.time }}</div>
          </div>
        </div>

        <!-- <div class="col-1"><i class="pi pi-ellipsis-v"></i></div> -->
        <div class="col-1">
          <div class="custom-customspeeddial-class">
            <CustomSpeedDial
              v-if="item.read == false"
              storePath="common"
              :rowData="item"
              :customDialData="OverlayFalseData"
            />
            <CustomSpeedDial
              v-else
              storePath="common"
              :rowData="item"
              :customDialData="OverlayTrueData"
            />
          </div>

          <!-- <CustomSpeedDial :customDialData="OverlayData" /> -->
          <!-- <Button
      icon="pi pi-ellipsis-v"
      type="button"
      @click="toggleIcon"
      aria-haspopup="true"
      aria-controls="overlay_menu"
   
    /> -->
          <!-- <div
            v-if="item.read == false"
            @click="toggleIcon"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            class="cursor-pointer m-1"
          >
            <i class="pi pi-ellipsis-v"></i>
              <p>{{item.id}}</p>
           </div> -->

          <!-- <OverlayPanel
            ref="opRef"
            :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
             
              style="width: 140px"
            id="overlay_menu"
          >
            <p>{{item.id}}</p>
            <i class="fas fa-check"></i> 
           
  <i class="pi pi-ellipsis-v"></i> 
           
            <div class="flex flex-row">
              <div>
                 <i class="pi pi-thumbs-up"></i>
              </div>
 <div @click="markAsReadHandler(item)" class="cursor-pointer m-1 hover-blue">
              Mark as read
               <p>{{item.id}}</p>
            </div>
            </div>
          </OverlayPanel>
          -->
        </div>
      </div>
    </div>
    <!--notifications-->
  </OverlayPanel>

  <!-- </div> -->
</template>

<script>
import moment from "moment";
import OverlayPanel from "primevue/overlaypanel";
import axios from "axios";
const { URL } = require("../../../config/const");
export default {
  components: {
    OverlayPanel,
  },
  data() {
    return {
      isRead: 0,
      button: {
        colorBackd: "#1e2021",
        colorBackdHover: "#000000",
        text: "Results",
        color: "#d3e0ff",
        colorHover: "#ffffff",
        borderColor: "#d3e0ff",
        borderColorHover: "#ffffff",
      },
      OverlayFalseData: [
        {
          label: "Mark as read",
          icon: "fas fa-check",
        },
        {
          label: "Delete",
          icon: "fas fa-user-times",
        },
      ],
      OverlayTrueData: [
        {
          label: "Delete",
          icon: "fas fa-user-times",
        },
      ],
      rightNow: "",
      items: [
        // {
        //   title: "Meeting Hall: Request Cancellation",
        //   description:
        //     "Amet minim mollit non deserunt ullamco est sit aliqua dolor do",
        //   time: "2 mins ago",
        //   type: "actionNeeded",
        // },
        // {
        //   title: "Express (Van) Quotation Approved ",
        //   company: "2000 Recruitment Pte Ltd",
        //   by: "by the customer",
        //   time: "4 mins ago",
        //   type: "justNotify",
        // },
        // {
        //   title: "Quotation Approved",
        //   company: "200 Recruitment Pte Ltd",
        //   time: "8 hours ago",
        //   type: "justNotify",
        // },
        // {
        //   title: "Contract Terminated",
        //   company: "2000 Recruitment Pte Ltd",
        //   time: "10 hours ago",
        //   type: "justNotify",
        // },
      ],
    };
  },

  methods: {
    // markAsReadHandler(item) {
    //   console.log("id" , item.id)
    //   // axios({
    //   //     url:
    //   //       `/user/notification/markAsRead/` +
    //   //       item.id,
    //   //     method: "PATCH",
    //   //   }).then((response) => {
    //   //     console.log(response);
    //   //     this.getNotifications();
    //   //   });
    // },
    buttonClickHandler(item, btn) {
      // let method = btn.method
      //    `axios.${btn.method}(${btn.action})`.then((res) => {

      // console.log(res.data.results);
      //   this.getNotifications()
      //    });
      // console.log(btn);
      // console.log(item.id);
      // if (btn.value == "Approve") {
      axios({
        url: btn.action + item.id,
        method: "PATCH",
      }).then(() => {
        // console.log(response);
        this.getNotifications();
      });
      //}
      // if (btn.value == "Decline") {
      //   axios({
      //     url:
      //       `contactManagement/meetingRoom/cancellationAction/decline/` +
      //       item.id,
      //     method: "PATCH",
      //   }).then((response) => {
      //     console.log(response);
      //     this.getNotifications();
      //   });
      // }
    },
    markAllAsReadHandler() {
      axios.patch("user/notification/markAllAsRead").then(() => {
        // console.log(res.data.results);
        this.getNotifications();
      });
    },
    getNotificationEvery5Sec() {
      setInterval(() => {
        this.getNotifications();
      }, 5000);
    },
    getNotifications() {
      axios.get("user/notification/all").then((res) => {
        // console.log(res.data.results);
        // console.log("array" , res.data.results.users_notification)
        if (res.data.results.users_notification) {
          if (res.data.results.users_notification != null) {
            this.items = res.data.results.users_notification;
            // console.log("detailss", this.items);
            this.isRead = 0;
            for (
              let i = 0;
              i < res.data.results.users_notification.length;
              i++
            ) {
              let r_obj = res.data.results.users_notification[i];
              //for time
              let timeToProcess =
                res.data.results.users_notification[i].createdAt;
              r_obj["time"] = moment(timeToProcess).fromNow();
              //for read
              let howmanyisRead = res.data.results.users_notification[i].read;
              // console.log(howmanyisRead);

              if (howmanyisRead == false) {
                this.isRead = this.isRead + 1;
                // console.log(i)
                // console.log(this.isRead);
              }
              //for id
            }
          }
        }
      });
    },

    styleObject(btn) {
      // console.log(btn , "btn")
      return {
        "--button-color": btn.initial.color,
        "--button-background-color": btn.initial.background,
        "--button-border-color": btn.initial.border,
        "--button-color--hover": btn.hover.color,
        "--button-background-color--hover": btn.hover.background,
        "--button-border-color--hover": btn.hover.border,
      };
    },

    toggle(event) {
      this.$refs.op.toggle(event);
    },
    toggleIcon(event) {
      this.$refs.opRef.toggle(event);
    },
  },
  created() {
    axios.defaults.baseURL = URL.BACKEND_BASEURL;
    axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("AccessToken")}`,
    };
    this.getNotifications();
    // this.getNotificationEvery5Sec();
  },
  watch: {
    "$store.state.commonStore.notificationChangeWatcher": function () {
      //  console.log("something changed")
      this.getNotifications();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.notify-image-wrapper {
  position: relative;
}
.custom-dot-unread {
  content: "";
  width: 4px;
  height: 4px;
  background-color: blue;
  display: block;
  border-radius: 2px;
  position: absolute;
  top: 25%;
  left: 0;
}
// .custom-dot-read{
//   width: 5px;
//   height: 5px;
//   background-color: pink;

//   display: block;
// }
.custom-customspeeddial-class {
  margin-left: -10px;
}
/* animation duration and fill mode */
//  ::v-deep .p-badge {
//   animation-duration: 1s;
//   animation-fill-mode: both;
//   display: inline-block;
// }

/* coolVerticalShake animation declaration & iteration counting */
// ::v-deep .p-badge { animation-name: coolVerticalShake; animation-iteration-count: infinite }

/* coolVerticalShake animation keyframes */
// @keyframes coolVerticalShake {
//     // 3%, 21%, 39%, 57%, 74%, 92% { transform: translateY(5px) }
//     // 6%, 24%, 42%, 60%, 77%, 95% { transform: translateY(3px) }
//     // 9%, 27%, 45%, 63%, 80%, 98% { transform: translateY(-5px) }
//      93% { transform: translateY(5px) }
//     // 6%, 24%, 42%, 60%, 77%, 95% { transform: translateY(1px) }
//      //9%, 27%, 45%, 63%, 80%, 98% { transform: translateY(-5px) }
// }
//  .overlay{
//   height: 400px !important;
//   overflow:scroll !important;
//   background : pink !important;
// }
.pi {
  font-family: "primeicons" !important;
}
button:disabled,
button[disabled],
button:disabled:hover {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}

button {
  color: var(--button-color);
  background-color: var(--button-background-color);
  border-color: var(--button-border-color);
  padding: 5px 25px;
  // padding: 6px 16px 8px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  border-radius: 6px;
  border-width: 1px;
  border-style: solid;
}

button:hover {
  color: var(--button-color--hover);
  background-color: var(--button-background-color--hover);
  border-color: var(--button-border-color--hover);
  padding: 5px 25px;
  //  padding: 5px 16px 8px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
}

// .btn-approve {

//   color: #ffffff;
//   background: #37d894;
//   border-radius: 6px;
//   // border: none;
//   padding: 1px 25px;
//   font-weight: 600;
//   font-size: 14px;
//   line-height: 17px;
//   border: 1px solid #fff;
// }
// .btn-approve:hover {
//   color: #37d894;
//   background: #fff;
//   border: 1px solid #37d894;

// }
// .btn-decline {
//   font-weight: bold;
//   font-size: 14px;
//   line-height: 32px;
//   color: #ea3535;
//   background: #fff;
//   border-radius: 6px;
//   border: 1px solid #ea3535;
//   padding: 1px 25px;
// }
// .btn-decline:hover {

//   color: #fff;
//   background: #ea3535;

// }

.cursor {
  cursor: pointer;
}
::v-deep .p-badge {
  background: $primary-color-3 !important;
}
.notify {
  border-bottom: 1px solid #dfe4ed;
}
.notify:last-child {
  border: none;
}
.title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
}
.company {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
}
.by {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
}
.time {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
}
</style>
