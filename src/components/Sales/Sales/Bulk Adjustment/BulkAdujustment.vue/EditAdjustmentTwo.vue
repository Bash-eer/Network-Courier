
 <template>
  <div v-if="express_contract_type == 'normal'">
    <div class="formgrid grid mr-3" :key="renderKeyNormalEdit">
      <div class="field col-12 md:col-3">
        <h5 class="required color-7a7a7a font-size-14 text-left">Min. Unit</h5>
        <NumberField
          :disabled="true"
          :showButtons="true"
          mode="decimal"
          v-model="normalData.job_count"
          :classes="{
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-3">
        <h5 class="required color-7a7a7a font-size-14 text-left">job $</h5>
        <NumberField
          :disabled="true"
          :showButtons="true"
          mode="decimal"
          v-model="normalData.rate_per_job"
          :classes="{
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-3">
        <h5 class="required color-7a7a7a font-size-14 text-left">Amount</h5>
        <NumberField
          :disabled="true"
          :showButtons="true"
          mode="decimal"
          v-model="normalData.amount"
          :classes="{
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-3">
        <h5 class="required color-7a7a7a font-size-14 text-left">
          Increment Amount
        </h5>
        <InputNumber
          :showButtons="true"
          mode="decimal"
          v-model="normalData.increment_value"
          @blur="incrementValueNormal($event, index)"
          :classes="{
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-3">
        <h5 class="required color-7a7a7a font-size-14 text-left">
          Increment Percentage
        </h5>
        <InputNumber
          :showButtons="true"
          mode="decimal"
          class="mr-5"
          v-model="normalData.percentage"
          @blur="incrementPercentageNormal($event, index)"
          :classes="{
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-3">
        <h5 class="required color-7a7a7a font-size-14 text-left">New Cost</h5>
        <NumberField
          :disabled="true"
          :showButtons="true"
          mode="decimal"
          class="mr-5"
          v-model="normalData.new_cost"
          :classes="{
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="required color-7a7a7a text-sm">Effective From Date</h5>
        <Calendar
          label="profile_name"
          type="text"
          showIcon="true"
          v-model="details.effective_date"
          :classes="{
            //'p-invalid': v$.details.effective_date.$invalid && submitted,
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
    </div>
  </div>

  <div v-if="express_contract_type == 'e_commerce'">
    <div
      v-for="(data, index) of expansionData"
      :key="data?.delivery_type_id"
      class="field col-12"
    >
      <div>
        <div>{{ data?.delivery_type }}</div>
        <br />
        <div class="formgrid grid mr-3" :key="renderKeyEdit">
          <div class="field col-12 md:col-3">
            <h5 class="required color-7a7a7a font-size-14 text-left">
              Min. Unit
            </h5>
            <NumberField
              :disabled="true"
              :showButtons="true"
              mode="decimal"
              v-model="data.job_count"
              :classes="{
                'inputfield w-full color-212121 font-bold py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-3">
            <h5 class="required color-7a7a7a font-size-14 text-left">job $</h5>
            <NumberField
              :disabled="true"
              :showButtons="true"
              mode="decimal"
              v-model="data.rate_per_job"
              :classes="{
                'inputfield w-full color-212121 font-bold py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-3">
            <h5 class="required color-7a7a7a font-size-14 text-left">Amount</h5>
            <NumberField
              :disabled="true"
              :showButtons="true"
              mode="decimal"
              v-model="data.amount"
              :classes="{
                'inputfield w-full color-212121 font-bold py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-3" :key="renderKeyEdit">
            <h5 class="required color-7a7a7a font-size-14 text-left">
              Increment Amount
            </h5>
            <InputNumber
              :showButtons="true"
              mode="decimal"
              v-model="data.increment_value"
              @blur="incrementValue($event, index)"
              :classes="{
                'inputfield w-full color-212121 font-bold py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-3" :key="renderKeyEdit">
            <h5 class="required color-7a7a7a font-size-14 text-left">
              Increment Percentage
            </h5>
            <InputNumber
              :showButtons="true"
              mode="decimal"
              class="mr-5"
              v-model="data.percentage"
              @blur="incrementPercentage($event, index)"
              :classes="{
                'inputfield w-full color-212121 font-bold py-2': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-3" :key="renderKeyEdit">
            <h5 class="required color-7a7a7a font-size-14 text-left">
              New Cost
            </h5>
            <NumberField
              :disabled="true"
              :showButtons="true"
              mode="decimal"
              class="mr-5"
              v-model="data.new_cost"
            />
          </div>
          <div
            v-if="index == expansionData.length - 1"
            class="field col-12 md:col-6"
          >
            <h5 class="required color-7a7a7a text-sm">Effective From Date</h5>
            <Calendar
              label="profile_name"
              type="text"
              showIcon="true"
              v-model="details.effective_date"
              :classes="{
                //'p-invalid': v$.details.effective_date.$invalid && submitted,
                'inputfield w-full color-212121 font-bold py-2': true,
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="field col-12 md:col-12">
    <h5 class="required color-7a7a7a font-size-14 text-left">Remarks</h5>
    <TextAreaField
      class="color-212121 font-size-14 font-bold mr-3"
      v-model="details.remarks"
      :classes="{
        //'p-invalid': v$.details.remarks.$invalid && submitted,
        'inputfield w-full color-212121 font-bold': true,
      }"
    />
  </div>
  <div class="flex">
    <div class="flex flex-row">
      <div class="flex">
        <SingleCheckBox
          label="Acknowledgement"
          v-model="Acknowledgement"
          :value="Acknowledgement"
        />
      </div>
    </div>
  </div>
  <span :key="renderKey">
    <DragAndDropUpload
      :state="BulkAdjustmentExpandAttachmentsState"
      type="BulkAdjustmentExpandAttachments"
      storePath="bulkAdjustment"
    />
  </span>
  <div
    class="
      flex
      justify-content-between
      w-full
      align-content-center
      py-3
      flex-wrap
    "
  >
    <div class="align-self-center flex"></div>
    <div class="flex align-self-center justify-content-end">
      <CancelButton
        storePath="salesSales"
        label="Cancel"
        class="color-357dea"
      />
      <Buttons
        label="Save"
        button_class="dialog-button-text bg-357dea "
        v-on:childToParent="submitData"
      />
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import InputNumber from "primevue/inputnumber";
//import DuoSelect from "./Duoselect.vue";
import useVuelidate from "@vuelidate/core";
import moment from "moment";
import { required } from "@vuelidate/validators";
export default {
  name: "EditAdjustmentTwo",
  components: { InputNumber },
  data() {
    return {
      v$: useVuelidate(),
      submitted: false,
      normalData: {},
      expansionData: [],
      renderKey: 10,
      renderKeyEdit: 10,
      renderKeyNormalEdit: 10,
      Acknowledgement: false,
      defaultTransportType: "Ecommerce",
      BulkAdjustmentExpandAttachmentsState: " ",
      express_contract_type: "",
      // effective_date: "",
      details: {
        effective_date: "",
        remarks: "",
        attachment_types: {
          attach_type: "follow up",
          attachments: [],
        },
      },
    };
  },
  validations() {
    return {
      details: {
        effective_date: { required },
        remarks: { required },
      },
    };
  },
  computed: {
    ...mapGetters({
      BulkAjustmentRowAddNewData: "bulkAdjustment/BulkAjustmentRowAddNewData",
      ProfileExpansionData: "bulkAdjustment/ProfileExpansionData",
      BulkAdjustmentEditAttachmentStateData:
        "bulkAdjustment/BulkAdjustmentEditAttachmentStateData",
    }),
  },
  methods: {
    incrementValue(event, index) {
      let newValue = Number(event.target.ariaValueNow);
      this.expansionData[index].percentage = Number(
        (newValue / this.expansionData[index].rate_per_job) * 100
      ).toFixed(3);
      this.expansionData[index].new_cost =
        newValue + this.expansionData[index].rate_per_job;
      this.renderKeyEdit++;
    },
    incrementPercentage(event, index) {
      let newValue = Number(event.target.ariaValueNow);
      this.expansionData[index].increment_value = Number(
        (newValue / 100) * this.expansionData[index].rate_per_job
      );
      this.expansionData[index].new_cost =
        this.expansionData[index].increment_value +
        this.expansionData[index].rate_per_job;
      this.renderKeyEdit++;
    },
    incrementValueNormal(event, index) {
      let newValue = Number(event.target.ariaValueNow);
      this.normalData.percentage = Number(
        (newValue / this.normalData.rate_per_job) * 100
      ).toFixed(3);
      this.normalData.new_cost = newValue + this.normalData.rate_per_job;
      this.renderKeyNormalEdit++;
    },
    incrementPercentageNormal(event, index) {
      let newValue = Number(event.target.ariaValueNow);
      this.normalData.increment_value = Number(
        (newValue / 100) * this.normalData.rate_per_job
      );
      this.normalData.new_cost =
        this.normalData.increment_value + this.normalData.rate_per_job;
      this.renderKeyNormalEdit++;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.BulkAjustmentRowAddNewData = {};
        this.BulkAjustmentRowAddNewData["customer_type"] = "Express";
        this.BulkAjustmentRowAddNewData["business_type"] =
          this.ProfileExpansionData.business_type;
        this.BulkAjustmentRowAddNewData["effective_date"] = moment(
          this.details.effective_date
        ).format("YYYY-MM-DD");
        this.BulkAjustmentRowAddNewData["contract_id"] =
          this.ProfileExpansionData.contract_id;
        this.BulkAjustmentRowAddNewData["profile_name"] =
          this.ProfileExpansionData.profile_name;
        this.BulkAjustmentRowAddNewData["acknowledged"] = this.Acknowledgement;
        this.BulkAjustmentRowAddNewData["sales_person_name"] =
          this.ProfileExpansionData.sales_person_name || "";
        this.BulkAjustmentRowAddNewData["sales_person_contact"] =
          this.ProfileExpansionData.sales_person_contact || "";
        this.BulkAjustmentRowAddNewData["address"] =
          this.ProfileExpansionData.address;
        this.BulkAjustmentRowAddNewData["contract_profile_id"] =
          this.ProfileExpansionData.contract_profile_id;
        this.BulkAjustmentRowAddNewData["express_contract_type"] =
          this.ProfileExpansionData.express_contract_type;
        this.BulkAjustmentRowAddNewData["remarks"] = this.details.remarks;
        //attachment
        this.BulkAjustmentRowAddNewData["attachment_type"] = {};
        this.BulkAjustmentRowAddNewData.attachment_type["attach_type"] =
          "contract";
        this.BulkAjustmentRowAddNewData.attachment_type["attachments"] = [];
        this.$store.state.bulkAdjustment.BulkAdjustmentEditAttachmentFiles.map(
          (list) => {
            this.BulkAjustmentRowAddNewData.attachment_type.attachments.push({
              file_name: list.file_name,
              url: list.url,
              size: list.size,
              sent: false,
              mime_type: list.mime_type,
            });
          }
        );

        if (this.express_contract_type == "e_commerce") {
          this.BulkAjustmentRowAddNewData["e_commerce_type"] = [];
          for (let i in this.expansionData) {
            this.BulkAjustmentRowAddNewData.e_commerce_type[i] = {};
            this.BulkAjustmentRowAddNewData.e_commerce_type[i] =
              this.expansionData[i];
            // this.BulkAjustmentRowAddNewData[i] = this.expansionData[i];
          }
        } else if (this.express_contract_type == "normal") {
          this.BulkAjustmentRowAddNewData["normal_type"] = {};
          for (let i in this.normalData) {
            if (i != "profile_id") {
              this.BulkAjustmentRowAddNewData.normal_type[i] =
                this.normalData[i];
            }
          }
        }
        this.apiPatchCallHandler();
      }
    },
    apiPatchCallHandler() {
      this.$store.dispatch("bulkAdjustment/PATCHCRUDOPERATION", {
        path:
          "/sales/contract/bulk-adjustment/batch/contract/" +
          this.$store.state.bulkAdjustment.ProfileExpansionData.id,

        data: this.BulkAjustmentRowAddNewData,
        method: "PUT",
        loadData: "bulkAdjustment/loadBulkAdjustmentSecondPageData",
        // toastMutationData: "salesSales/toastMutationFunc",
        loadDataPath:
          "/sales/contract/bulk-adjustment/batch/" + this.$route.params.id,
        closeDialogue: "salesSales/closeDialog",
        loadDiffStore: true,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Profile is updated successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Profile already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the profile, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
  },
  watch: {
    "$store.state.bulkAdjustment.ProfileExpansionData": function () {
      this.express_contract_type =
        this.ProfileExpansionData?.express_contract_type;
      this.details.effective_date = moment(
        this.ProfileExpansionData.effective_date
      ).format("d MMMM yy");
      this.Acknowledgement = this.ProfileExpansionData.acknowledged;
      this.details.remarks = this.ProfileExpansionData.remarks;
      if (this.express_contract_type == "normal") {
        this.normalData = this.ProfileExpansionData.normal_rates;
      } else if (this.express_contract_type == "e_commerce") {
        this.ProfileExpansionData.e_commerce_rates.map((list) => {
          this.expansionData.push({
            additional_job_rate: list.additional_job_rate,
            amount: list.amount,
            delivery_type: list.delivery_type,
            delivery_type_initial: list.delivery_type_initial,
            express_service_type: list.express_service_type,
            increment_value: list.increment_value,
            job_count: list.job_count,
            new_cost: list.new_cost,
            percentage: list.percentage,
            rate_per_job: list.rate_per_job,
            remarks: list.remarks,
          });
        });
      }
      //attach
      if (this.ProfileExpansionData?.attachment_type) {
        let respectiveData = this.ProfileExpansionData.attachment_type.find(
          (itm) => itm.attach_type == "contract"
        );
        if (respectiveData) {
          this.BulkAdjustmentExpandAttachmentsState =
            respectiveData["attachments"];
          this.$store.state.bulkAdjustment.BulkAdjustmentEditAttachmentFiles =
            respectiveData["attachments"];
          this.renderKey++;
        }
      }
    },
  },
  async created() {
    this.$store.dispatch("bulkAdjustment/loadProfileExpansionData", {
      id: this.$store.state.bulkAdjustment.FollowUpStateData.id,
    });

    this.$store.state.commonStore.attachmentsTag =
      "BulkAdjustmentEditAttachments";
    if (Object.keys(this.BulkAdjustmentEditAttachmentStateData).length != 0) {
      this.BulkAdjustmentExpandAttachmentsState =
        this.BulkAdjustmentEditAttachmentStateData.attachments;
      this.$store.state.bulkAdjustment.BulkAdjustmentEditAttachmentFiles =
        this.BulkAdjustmentEditAttachmentStateData.attachments;
    }
  },
  unmounted() {
    this.$store.state.bulkAdjustment.BulkAdjustmentEditAttachmentFiles = [];
    this.$store.state.bulkAdjustment.BulkAdjustmentEditAttachmentStateData = [];
    this.$store.state.commonStore.attachmentsTag = null;
  },
};
</script>

<style>
</style>