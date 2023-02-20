<template>
  <div class="pl-2 pr-2 pb-3 text-left">
    <!--CODE AND OUTPUT-->
    <div class="row">
      <!--embed code section-->
      <div class="col-6">
        <div class="card edmDiv mt-1 p-2">
          <div class="flex justify-content-between align-items-center mb-1">
            <div class="flex embedCodeHeading">Embed HTML Code</div>
            <div class="flex">
              <DropDown
                :state="details.theme"
                code="code"
                :data="themeData"
                label="themes"
                id="themes"
                v-model="details.theme"
                :class="'themesDropDown'"
              />
            </div>
          </div>
          <!--html code editor-->
          <Codemirror
            :key="details.theme"
            v-model:value="code"
            :options="cmOptions"
            border
            @change="getHTMLCode"
            class="codeMirror"
          />
        </div>
      </div>
      <!--preview section-->
      <div class="col-6">
        <div class="card edmDiv mt-1 p-2">
          <div class="flex justify-content-between align-items-center mb-1">
            <div class="flex embedCodeHeading">Preview</div>
          </div>
          <!--dynamic HTML code goes here , v-html renders html strings in the body-->
          <div v-html="code"></div>
        </div>
      </div>
    </div>
    <!--INVITEES-->
    <div class="row">
      <!--all contacts section-->
      <div class="col-4">
        <div class="card edmDiv mt-1 p-2">
          <div
            class="
              flex
              justify-content-between
              pl-2
              mt-2
              align-items-center
              justify-content-center
            "
          >
            <div class="flex embedCodeHeading">All Contacts</div>
            <div class="flex">
              <TextField
                v-model="searcher"
                label="contactsSearch"
                placeholder="Search Contacts"
                type="text"
                :classes="{
                  'inputfield w-full dialog-dropdown-text inviteesTableSearch': true,
                }"
                v-on:childToParent="globalSearcher"
              />
            </div>
          </div>
          <ContactTables
            :key="$store.state['contacts']['eventContactsTableData']"
            :tableClass="'contactEventsTableClass'"
            :tableDataName="'eventContactsTableData'"
            :tableName="'eventContactsTable'"
            :storePath="'contacts'"
            :tableData="$store.state['contacts']['eventContactsTableData']"
            :tableColumns="
              $store.state['contacts']['eventContactsTableColumnData']
            "
          />
        </div>
      </div>
      <!--selected contacts section-->
      <div class="col-8">
        <div class="card edmDiv pl-2 pr-2">
          <Invitees
            :data="$store.state.contacts.inviteesData"
            usage="cards"
            inviteesClass="edm_invitees_parent"
            noInviteesClass="edmNoInvitees"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-content-end">
      <Buttons
        label="Send as Mail"
        button_class="dialog-button-text"
        v-on:childToParent="submitData"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
const { URL } = require("../../../../config/const");
//import code mirror
import Codemirror from "codemirror-editor-vue3";
//code mirror language
import "codemirror/mode/xml/xml.js";
//code mirror add ons
import "codemirror/addon/edit/closetag.js";
import "codemirror/addon/edit/matchtags.js";
import "codemirror/addon/display/autorefresh.js";
// import "codemirror/addon/hint/show-hint.js";
//code mirror theme
import "codemirror/theme/dracula.css";
import "codemirror/theme/ambiance.css";
//code mirror styles
// import "codemirror/lib/codemirror.css";
// import "codemirror/mode/css/css.js";
// import "codemirror-editor-vue3/dist/style.css";
// import formatStringToHtml from "format-string-to-html";
import pretty from "pretty";
// import { ref } from "vue";
export default {
  name: "EmbedCodeTab",
  components: { Codemirror },
  data() {
    return {
      searcher: "",
      code: ``,
      cmOptions: {},
      details: {
        theme: "Dark",
      },
      theme: "dracula",
      themeData: [
        { name: "Dark", code: "dracula" },
        { name: "Ambiance", code: "ambiance" },
        { name: "Light", code: "default" },
      ],
      calendarIconSrc: "",
      timeIconSrc: "",
      profileIconSrc: "",
      mailIconSrc: "",
      mobileIconSrc: "",
      placeIconSrc: "",
      iconSrcArray: [
        {
          src: "https://network-courier.sgp1.digitaloceanspaces.com/application/images/Image_1642072358995_8217_Vector%20%282%29.png",
          array: "calendarIconSrc",
        },
        {
          src: "https://network-courier.sgp1.digitaloceanspaces.com/application/images/Image_1642072567116_2151_Vector%20%283%29.png",
          array: "timeIconSrc",
        },
        {
          src: "https://network-courier.sgp1.digitaloceanspaces.com/application/images/Image_1642072711550_8786_Group%20%284%29.png",
          array: "profileIconSrc",
        },
        {
          src: "https://network-courier.sgp1.digitaloceanspaces.com/application/images/Image_1642072759072_3816_Vector%20%285%29.png",
          array: "mailIconSrc",
        },
        {
          src: "https://network-courier.sgp1.digitaloceanspaces.com/application/images/Image_1642072787735_3266_Vector%20%286%29.png",
          array: "mobileIconSrc",
        },
        {
          src: "https://network-courier.sgp1.digitaloceanspaces.com/application/images/Image_1642072811715_6646_Vector%20%287%29.png",
          array: "placeIconSrc",
        },
      ],
    };
  },
  methods: {
    globalSearcher(label, searchString) {
      this.$store.state["contacts"].globalSearch = searchString;
    },
    //gets value of the code editor
    //eslint-disable-next-line no-unused-vars
    getHTMLCode(val, cm) {
      // console.log(val, cm);
    },
    //formats the code
    process(str) {
      var div = document.createElement("div");
      div.innerHTML = str.trim();
      return this.format(div, 0).innerHTML;
    },
    format(node, level) {
      var indentBefore = new Array(level++ + 1).join("  "),
        indentAfter = new Array(level - 1).join("  "),
        textNode;
      for (var i = 0; i < node.children.length; i++) {
        textNode = document.createTextNode("\n" + indentBefore);
        node.insertBefore(textNode, node.children[i]);
        this.format(node.children[i], level);
        if (node.lastElementChild == node.children[i]) {
          textNode = document.createTextNode("\n" + indentAfter);
          node.appendChild(textNode);
        }
      }
      return node;
    },
    submitData() {
      let memberIds = [];
      let invitees = this.$store.state.contacts.inviteesData;
      let inviteesTableData =
        this.$store.state.contacts.ContactManagamentInviteesTableData;
      for (let i in invitees) {
        for (let it in inviteesTableData) {
          if (inviteesTableData[it]["contactId"] == invitees[i]["contact_id"]) {
            memberIds.push(inviteesTableData[it]["memberId"]);
          }
        }
      }
      let embedCodeDetails = {};
      embedCodeDetails["id"] = memberIds;
      embedCodeDetails["embed_code"] = this.code;
      let path =
        "event/edm/invitees/embedCode/" +
        this.$store.state.contacts.inviteesEventId;
      //calling POST method to submit embed code details
      axios.post("contactManagement/" + path, embedCodeDetails).then((res) => {
        if (res.status == 200) {
          this.$store.commit("users/showToast", [
            "success",
            res.data.results,
            "was sent!",
            "edm",
          ]);
          this.$router.push("/contact-management");
        }
      });
    },
  },
  watch: {
    "details.theme": function () {
      this.cmOptions.theme = this.details.theme;
    },
  },
  mounted() {
    //code mirror editor configuration
    this.cmOptions = {
      autoRefresh: true, //brings focus to the editor on page load
      mode: "xml", //coding language mode of the editor
      htmlMode: true, //set html mode to true when the mode is of xml type
      matchTags: true, //highlights closing tags and ending tags when either of the tags are clicked
      matchClosing: true,
      autoCloseTags: true, //automatically closes a tag when < is typed
      theme: this.theme, //theme of the editor
      lineNumbers: true, //shows line numbers in the editor
      smartIndent: true, //sets indentation of code on each line - defaults to 1 indent
      styleActiveLine: true, //highlights the line which is coded currently
    };
    //data source
    let emailTemplateData = this.$store.state.contacts.eventsOverviewPageData;
    //icon source:
    //eslint-disable-next-line
    for (let is in this.iconSrcArray) {
      let isObj = this.iconSrcArray[is];
      this[isObj["array"]] = isObj["src"];
    }
    //default code to be displayed in the editor
    let defaultCodeString =
      `<!--event image-->
      <img style='width:100%; height:295px; border-radius:15px;' src="` +
      emailTemplateData["cover_image"] +
      `"/><div style='font-family:Montserrat; font-style:normal; color:#4e5868;'><!--event name--><div style="margin-top:2%;"><span style='font-weight:bold; font-size:16px; opacity:0.8;'>` +
      emailTemplateData["event_name"] +
      `</span></div>
      <!--event id--><div style='margin-top:0px;'><span style='font-size:14px; font-weight:normal; opacity:0.8;'>Event ID: ` +
      emailTemplateData["id"] +
      `</span></div><!--event description--><div style='margin-top:5px;'><span style='font-weight:normal; font-size:14px;'>` +
      emailTemplateData["subject"] +
      `</span></div><!--event details--><div style="display:flex; flex-direction:row; flex-wrap: wrap; margin-top:2%;"><div style="display:flex; margin-right:3%;"><!--event date--><div style="display:flex; flex-direction:row;"><div style="display:flex; margin-right:5px"><img style="width:12px; height:14px;" src="` +
      this.calendarIconSrc +
      `"/></div><div style="display:flex;"><span style="font-size:11px;">` +
      emailTemplateData["calendar"] +
      `</span></div></div></div><div style="display:flex; margin-right:3%;"><!--event time--><div style="display:flex; flex-direction:row;"><div style="display:flex; margin-right:5px"><img style="width:12px; height:14px;" src="` +
      this.timeIconSrc +
      `"/></div><div style="display:flex;"><span style="font-size:11px;">` +
      emailTemplateData["clock"] +
      `</span></div></div></div><div style="display:flex; margin-right:3%;"><!--name of contact--><div style="display:flex; flex-direction:row;"><div style="display:flex; margin-right:5px"><img style="width:12px; height:14px;" src="` +
      this.profileIconSrc +
      `"/></div><div style="display:flex;"><span style="font-size:11px;">` +
      emailTemplateData["contact_person"] +
      `</span></div></div></div><div style="display:flex; margin-right:3%;"><!--email of contact--><div style="display:flex; flex-direction:row;"><div style="display:flex; margin-right:5px"><img style="width:12px; height:14px;" src="` +
      this.mailIconSrc +
      `"/></div><div style="display:flex;"><span style="font-size:11px;">` +
      emailTemplateData["contact_email"] +
      `</span></div></div></div><div style="display:flex; margin-right:3%;"><!--mobile number of contact--><div style="display:flex; flex-direction:row;"><div style="display:flex; margin-right:5px"><img style="width:12px; height:14px;" src="` +
      this.mobileIconSrc +
      `"/></div><div style="display:flex;"><span style="font-size:11px;">` +
      emailTemplateData["contact_no"] +
      `</span></div></div></div><div style="display:flex; margin-right:3%;"><!--venue of event--><div style="display:flex; flex-direction:row;"><div style="display:flex; margin-right:5px"><img style="width:12px; height:14px;" src="` +
      this.placeIconSrc +
      `"/></div><div style="display:flex;"><span style="font-size:11px;">` +
      emailTemplateData["address"] +
      `</span></div></div></div></div>`;

    if (this.$store.state.contacts.embedCodeString != null) {
      this.code = this.$store.state.contacts.embedCodeString;
    } else {
      this.code = pretty(defaultCodeString);
    }
    // this.code = ref(this.process(defaultCodeString).trim());
  },
  created() {
    axios.defaults.baseURL = URL.BACKEND_BASEURL;
  },
};
</script>

<style scoped>
::v-deep .themesDropDown .p-inputtext {
  padding: 1px !important;
}
.submitCodeButton {
  height: 30px;
}
.themesDropDown {
  height: 30px;
}
.cm-s-dracula.CodeMirror,
.CodeMirror-gutters {
  height: 100%;
}
.card-footer {
  border: none;
  background: #ffffff;
  padding: 0;
}
.previewImage {
  width: 100%;
  height: 295px;
  border-radius: 15px;
}
.edmDiv {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  /* border: 1px solid #c8deff; */
  /* border-radius: 15px; */
  overflow: auto;
  height: 470px;
}
.bodyText {
  font-family: Montserrat;
}
.embedCodeHeading {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #4e5868;
}
.embedCodeSubHeading {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #4e5868;
  opacity: 0.8;
}
.blue-icon {
  color: #357dea;
}
.iconDiv {
  bottom: 0;
  display: table-cell;
  vertical-align: bottom;
}
</style>
