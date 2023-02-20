<template>
  <div v-for="(question, index) of addQuestions" :key="index">
    <!-- <div v-if="index > 0" class="flex justify-content-between">
      <div class="flex"></div>
    </div> -->
    <!--fields row one-->
    <div class="formgrid grid">
      <div class="field col-12 md:col-11">
        <h5 class="dialog-label-text required">Question</h5>
        <TextAreaField
          v-model="details['questions'][index].question"
          type="text"
          row="2"
          :classes="{
            'p-invalid':
              v$.details['questions'][index].question.$invalid && submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>

      <div v-if="index > 0">
        <div class="flex delete" @click="deleteQuestion(index)">
          <i class="pi parent pi-times cross-button"></i>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="
      Object.keys(
        this.$store.state.internationalInbound.questionnaireFormStateData
      ).length == 0
    "
    class="flex justify-content-between add_rate"
  >
    <div class="flex">
      <span class="new-field" @click="addQuestion"><b>+ Add Questions</b></span>
    </div>
  </div>

  <div class="mt-5">
    <div
      class="
        flex
        justify-content-between
        w-full
        align-content-start
        py-3
        flex-wrap
      "
    >
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="internationalInbound" />
        <Buttons
          label="Save"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  data: () => ({
    name: "AddNewQuestionnaire",
    v$: useVuelidate(),
    submitted: false,
    addQuestionClicked: 0,
    addQuestions: ["new_question"],
    questionsValidation: [
      {
        question: { required },
      },
    ],

    //DATA COLLECTION
    details: {
      questions: [{ question: "" }],
    },
    //DATA COLLECTION
  }),

  validations() {
    if (this.addQuestionClicked > -1) {
      return {
        details: {
          questions: this.questionsValidation,
        },
      };
    }
  },
  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let StateData =
          this.$store.state.internationalInbound.questionnaireFormStateData;
        if (StateData.id) {
          this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
            path:
              "/settings/sales/rates/international/inbound/questionnaires/" +
              StateData.id,
            data: this.details.questions[0],
            method: "PATCH",
            loadData: {
              loadApi: "loadInboundTableData",
              loadPath:
                "/settings/sales/rates/international/inbound/questionnaires",
              loadMutation: "fetchInboundTableData",
              type: "addQuestionnaireData",
            },
            toastData: {
              toastSuccessData: {
                toastMsg: `The questionnaire is updated!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in updating the questionnaire, try again!",
                toastSeverity: "error",
              },
            },
          });
        } else {
          this.$store.dispatch("internationalInbound/POSTPATCHCRUDOPERATION", {
            path: "/settings/sales/rates/international/inbound/questionnaires",
            data: this.details,
            method: "POST",
            loadData: {
              loadApi: "loadInboundTableData",
              loadPath:
                "/settings/sales/rates/international/inbound/questionnaires",
              loadMutation: "fetchInboundTableData",
              type: "addQuestionnaireData",
            },

            toastData: {
              toastSuccessData: {
                toastMsg: `The questionnaire is added!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in adding the questionnaire, try again!",
                toastSeverity: "error",
              },
            },
          });
        }
      }
    },
    addQuestion() {
      this.details.questions.push({
        question: "",
      });
      this.questionsValidation.push({
        question: { required },
      });
      this.addQuestionClicked++;
      this.addQuestions.push("new_question");
    },
    loadState() {
      if (
        Object.keys(
          this.$store.state.internationalInbound.questionnaireFormStateData
        ).length != 0
      ) {
        this.addQuestions = [];
        this.details.questions = [];
        this.questionsValidation = [];
        this.addQuestions.push("new_question");
        this.details.questions.push({
          question: "",
        });
        this.questionsValidation.push({
          question: { required },
        });
        for (let d in this.details.questions[0]) {
          this.details.questions[0][d] =
            this.$store.state.internationalInbound.questionnaireFormStateData[
              d
            ];
        }
        this.addQuestionClicked++;
      }
    },
    deleteQuestion(index) {
      this.details.questions.splice(index, 1);
      this.questionsValidation.splice(index, 1);
      this.addQuestions.splice(index, 1);
      this.addQuestionClicked++;
    },
  },

  created() {
    this.loadState();
  },
  unmounted() {
    this.$store.state.internationalInbound.questionnaireFormStateData = {};
  },
};
</script>

<style scoped>
.cross-button {
  color: red;
  margin-top: 85px;
  margin-left: 22px;
}
</style>
