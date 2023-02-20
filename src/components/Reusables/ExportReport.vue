<template>
  <Buttons
    button_class="p-button-sm p-button-outlined  add-btn custom-add-btn mr-1 color-357dea "
    label="Export All"
    @click="toggle"
    aria-haspopup="true"
    aria-controls="overlay_panel"
  />

  <OverlayPanel
    ref="op"
    appendTo="body"
    :showCloseIcon="false"
    id="overlay_panel"
    style="width: 220px"
    :breakpoints="{ '960px': '75vw' }"
  >
    <p class="text-center">Would you like to export as ?</p>
    <div class="flex flex-row justify-content-center">
      <div class="mx-2 pointer-cursor" @click="ExportHandler('pdf')">
        <img src="/images/drag-drop-pdf.png" height="30" width="30" alt="" />
        <span class="export-report-title">&nbsp;Pdf &nbsp;</span>
      </div>
      <div class="mx-2 pointer-cursor" @click="ExportHandler('excel')">
        <img src="/images/drag-drop-excel.png" height="30" width="30" alt="" />
        <span class="export-report-title">&nbsp;Excel &nbsp;</span>
      </div>
    </div>
  </OverlayPanel>
</template>

<script>
import axios from "axios";
const { URL } = require("../../../config/const");
import OverlayPanel from "primevue/overlaypanel";

export default {
  components: {
    OverlayPanel,
  },
  props: ["title", "type"],
  data() {
    return {};
  },
  methods: {
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    getExportData(type) {
      // let path;
      // let title ;
      let data;
      if (type == "ContactContacts") {
        data = {
          path: "contactManagement/contacts",
          title: "Contact List",
        };
      } else if (type == "ContactAppointments") {
        data = {
          path: "contactManagement/appointment",
          title: "Appointments List",
        };
      } else if (type == "ContactDonations") {
        data = {
          path: "contactManagement/donations",
          title: "Donations List",
        };
      } else if (type == "FollowUp") {
        data = {
          path: "contactManagement/event/invitees/followUp",
          title: "FollowUp List",
          id: this.$store.state.contacts.inviteesEventId,
        };
      } else if (type == "Attendance") {
        data = {
          path: "contactManagement/event/invitees/attendance/attendees",
          title: "Attendance List",
          id: this.$store.state.contacts.inviteesEventId,
        };
      } else if (type == "InviteesStatus") {
        data = {
          path: "contactManagement/event/invitees/status",
          title: "Invitees Status List",
          id: this.$store.state.contacts.inviteesEventId,
        };
      } else if (type == "Vehicle Details") {
        data = {
          path: "fleetManagement/vehicles/vehicles/",
          title: "",
        };
      } else if (type == "") {
        data = {
          path: "",
          title: "",
        };
      }

      return data;
    },
    // getExportTitle(type) {
    //   let title;
    //   switch (type) {
    //     case "ContactContacts":
    //       title = "Contact List";
    //       break;
    //     case "ContactAppointments":
    //       title = "Apponitments List";
    //       break;
    //     case "ContactDonations":
    //       title = "Donations List";
    //       break;
    //     case "FollowUp":
    //       title = "FollowUp List";
    //       break;
    //   }
    //   return title;
    // },
    ExportHandler(type) {
      let callType;
      let saveExtention;
      let finalApiCallUrl;
      let id;
      if (type == "pdf") {
        callType = "exportAsPdf";
        saveExtention = ".pdf";
      }
      if (type == "excel") {
        callType = "exportAsExcel";
        saveExtention = ".xls";
      }
      let processedData = this.getExportData(this.type);
      //  id = this.$store.state.contacts.inviteesEventId;
      id = processedData.id;
      if (id) {
        finalApiCallUrl = processedData.path + "/" + callType + "/" + id;
      } else {
        finalApiCallUrl = processedData.path + "/" + callType;
      }

      axios({
        // url: "contactManagement/contacts/export",
        url: finalApiCallUrl,
        method: "GET",
        // data: printLabelDetails,
        responseType: "blob",
      }).then((response) => {
        id = null;
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute("download", processedData.title + saveExtention);
        document.body.appendChild(fileLink);
        fileLink.click();
      });
    },
    // pdfExportHandler() {
    //   console.log("type", this.type);
    //   let processedData = this.getExportData(this.type);
    //   let id = this.$store.state.contacts.inviteesEventId;

    //   axios({
    //     // url: "contactManagement/contacts/export",
    //     url: processedData.path + "exportAsPdf/" + id,
    //     method: "GET",
    //     // data: printLabelDetails,
    //     responseType: "blob",
    //   }).then((response) => {
    //     var fileURL = window.URL.createObjectURL(new Blob([response.data]));
    //     var fileLink = document.createElement("a");
    //     fileLink.href = fileURL;
    //     fileLink.setAttribute("download", processedData.title + ".pdf");
    //     document.body.appendChild(fileLink);
    //     fileLink.click();
    //   });
    // },
    // excelExportHandler() {
    //   console.log("excelExportHandler");
    //   console.log("type", this.type);
    //   // let processedUrl = this.getExportUrl(this.type);
    //   // let processedTitle = this.getExportTitle(this.type);
    //   let processedData = this.getExportData(this.type);
    //   axios({
    //     // url: "contactManagement/contacts/export",
    //     url: processedData.path + "exportAsExcel",
    //     method: "GET",
    //     // data: printLabelDetails,
    //     responseType: "blob",
    //   }).then((response) => {
    //     var fileURL = window.URL.createObjectURL(new Blob([response.data]));
    //     var fileLink = document.createElement("a");
    //     fileLink.href = fileURL;
    //     fileLink.setAttribute("download", processedData.title + ".xls");
    //     document.body.appendChild(fileLink);
    //     fileLink.click();
    //   });
    // },
  },
  created() {
    axios.defaults.baseURL = URL.BACKEND_BASEURL;
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

.export-report-title:hover {
  color: #2196f3;
}
</style>
