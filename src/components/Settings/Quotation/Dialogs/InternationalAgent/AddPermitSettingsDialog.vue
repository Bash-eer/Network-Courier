<template>
  <Accordion :activeIndex="0">
    <AccordionTab header="GST Type: FREE DOM">
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.free_dom[0].permit_type"
            type="text"
            :disabled="true"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom[0].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom[0].document_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom[0].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom[0].handling_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.free_dom[1].permit_type"
            type="text"
            :disabled="true"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom[1].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom[1].document_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom[1].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom[1].handling_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.free_dom[2].permit_type"
            type="text"
            :disabled="true"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom[2].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom[2].document_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom[2].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom[2].handling_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.free_dom[3].permit_type"
            type="text"
            :disabled="true"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom[3].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom[3].document_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom[3].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom[3].handling_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.free_dom[4].permit_type"
            type="text"
            :disabled="true"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom[4].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom[4].document_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom[4].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom[4].handling_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
    </AccordionTab>
    <AccordionTab header="GST Type: FREEDOM TRANSFER">
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.ddu[0].permit_type"
            type="text"
            :disabled="true"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.ddu[0].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.ddu[0].document_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.ddu[0].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.ddu[0].handling_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.ddu[1].permit_type"
            type="text"
            :disabled="true"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.ddu[1].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.ddu[1].document_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.ddu[1].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.ddu[1].handling_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.ddu[2].permit_type"
            type="text"
            :disabled="true"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.ddu[2].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.ddu[2].document_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.ddu[2].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.ddu[2].handling_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.ddu[3].permit_type"
            type="text"
            :disabled="true"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.ddu[3].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.ddu[3].document_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.ddu[3].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.ddu[3].handling_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.ddu[4].permit_type"
            type="text"
            :disabled="true"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.ddu[4].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.ddu[4].document_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.ddu[4].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.ddu[4].handling_charges.$invalid &&
                submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
    </AccordionTab>
    <AccordionTab header="GST Type: DDU">
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.free_dom_request[0].permit_type"
            type="text"
            :disabled="true"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom_request[0].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom_request[0].document_charges
                  .$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom_request[0].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom_request[0].handling_charges
                  .$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.free_dom_request[1].permit_type"
            :disabled="true"
            type="text"
            :classes="{
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom_request[1].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom_request[1].document_charges
                  .$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom_request[1].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom_request[1].handling_charges
                  .$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.free_dom_request[2].permit_type"
            :disabled="true"
            type="text"
            :classes="{
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom_request[2].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom_request[2].document_charges
                  .$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom_request[2].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom_request[2].handling_charges
                  .$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.free_dom_request[3].permit_type"
            :disabled="true"
            type="text"
            :classes="{
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom_request[3].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom_request[3].document_charges
                  .$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom_request[3].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom_request[3].handling_charges
                  .$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.free_dom_request[4].permit_type"
            :disabled="true"
            type="text"
            :classes="{
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom_request[4].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom_request[4].document_charges
                  .$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.free_dom_request[4].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.free_dom_request[4].handling_charges
                  .$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
    </AccordionTab>
    <AccordionTab header="GST Type: FREE DOM REQUEST">
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.freedom_transfer[0].permit_type"
            :disabled="true"
            type="text"
            :classes="{
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.freedom_transfer[0].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.freedom_transfer[0].document_charges
                  .$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.freedom_transfer[0].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.freedom_transfer[0].handling_charges
                  .$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.freedom_transfer[1].permit_type"
            type="text"
            :disabled="true"
            :classes="{
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.freedom_transfer[1].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.freedom_transfer[1].document_charges
                  .$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.freedom_transfer[1].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.freedom_transfer[1].handling_charges
                  .$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.freedom_transfer[2].permit_type"
            type="text"
            :disabled="true"
            :classes="{
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.freedom_transfer[2].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.freedom_transfer[2].document_charges
                  .$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.freedom_transfer[2].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.freedom_transfer[2].handling_charges
                  .$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.freedom_transfer[3].permit_type"
            type="text"
            :disabled="true"
            :classes="{
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.freedom_transfer[3].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.freedom_transfer[3].document_charges
                  .$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.freedom_transfer[3].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.freedom_transfer[3].handling_charges
                  .$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text mt-1 ml-1">Permit Type</h5>
          <TextField
            v-model="details.gst_types.freedom_transfer[4].permit_type"
            :disabled="true"
            type="text"
            :classes="{
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Document Charges</h5>
          <TextField
            v-model="details.gst_types.freedom_transfer[4].document_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.freedom_transfer[4].document_charges
                  .$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text required">Handling Charges</h5>
          <TextField
            v-model="details.gst_types.freedom_transfer[4].handling_charges"
            type="text"
            :classes="{
              'p-invalid':
                v$.details.gst_types.freedom_transfer[4].handling_charges
                  .$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
    </AccordionTab>
    <AccordionTab header="GST Type: MES SCHEME">
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text">Mes Count</h5>
          <TextField
            v-model="details.gst_types.mes_scheme[0].mes_count"
            type="text"
            :classes="{
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text">Mes Charges ($)</h5>
          <TextField
            v-model="details.gst_types.mes_scheme[0].mes_charges"
            type="number"
            :classes="{
              'inputfield w-full dialog-field-text': true,
            }"
          />
        </div>
      </div>
    </AccordionTab>
  </Accordion>
  <div class="field col-12 md:col-12">
    <p class="txt mt-4">Storage Charges</p>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-3">
      <h5 class="dialog-label-text">Weight Range</h5>
      <TextField
        label="weight_range"
        type="number"
        v-model="details.weight_range"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-3">
      <h5 class="required dialog-label-text">Minimum Charges</h5>
      <TextField
        label="minimum_charges"
        type="number"
        v-model="details.minimum_charges"
        :classes="{
          'p-invalid': v$.details.minimum_charges.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-3">
      <h5 class="required dialog-label-text">Per KG Charges</h5>
      <TextField
        label="per_kg"
        type="number"
        v-model="details.per_kg"
        :classes="{
          'p-invalid': v$.details.per_kg.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-3">
      <h5 class="required dialog-label-text">Grace Period</h5>
      <TextField
        label="grace_period"
        type="number"
        v-model="details.grace_period"
        :classes="{
          'p-invalid': v$.details.grace_period.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div class="field col-12 md:col-12">
    <p class="txt mt-4">Miscellaneous</p>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Minimum Permit (FOC)</h5>
      <TextField
        label="minimum_permit"
        type="number"
        v-model="details.minimum_permit"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Additional Amount Per Permit ($)</h5>
      <TextField
        label="additional_amount"
        type="number"
        v-model="details.additional_amount"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Minimum Item (FOC)</h5>
      <TextField
        label="minimum_item"
        type="number"
        v-model="details.minimum_item"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Additional Amount Per item ($)</h5>
      <TextField
        label="additional_item"
        type="number"
        v-model="details.additional_item"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid pl-2 pr-2">
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
      <Buttons
        label="Previous"
        v-on:childToParent="goBackHandler"
        class="p-button-outlined mr-1 dialog-button-text"
      />
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <Buttons
          label="Cancel"
          class="p-button-outlined mr-1 dialog-button-text"
        />
        <Buttons
          label="Next"
          button_class="dialog-button-text"
          v-on:childToParent="nextStepHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "AddPermitSettingsDialog",
  data: () => ({
    v$: useVuelidate(),
    details: {
      grace_period: "",
      per_kg: "",
      minimum_charges: "",
      weight_range: "",
      additional_amount: "",
      minimum_permit: "",
      minimum_item: "",
      additional_item: "",
      gst_types: {
        free_dom: [
          {
            permit_type: "Controlled Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item Exempted",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item W/O License",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item + High Value Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "High Value Item",
            document_charges: "",
            handling_charges: "",
          },
        ],
        ddu: [
          {
            permit_type: "Controlled Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item Exempted",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item W/O License",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item + High Value Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "High Value Item",
            document_charges: "",
            handling_charges: "",
          },
        ],
        free_dom_request: [
          {
            permit_type: "Controlled Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item Exempted",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item W/O License",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item + High Value Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "High Value Item",
            document_charges: "",
            handling_charges: "",
          },
        ],
        freedom_transfer: [
          {
            permit_type: "Controlled Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item Exempted",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item W/O License",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "Controlled Item + High Value Item",
            document_charges: "",
            handling_charges: "",
          },
          {
            permit_type: "High Value Item",
            document_charges: "",
            handling_charges: "",
          },
        ],
        mes_scheme: [
          {
            mes_count: "",
            mes_charges: "",
          },
        ],
      },
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        grace_period: { required },
        per_kg: { required },
        minimum_charges: { required },
        gst_types: {
          free_dom: [
            {
              document_charges: { required },
              handling_charges: { required },
            },
            {
              document_charges: { required },
              handling_charges: { required },
            },
            {
              document_charges: { required },
              handling_charges: { required },
            },
            {
              document_charges: { required },
              handling_charges: { required },
            },
            {
              document_charges: { required },
              handling_charges: { required },
            },
          ],
          ddu: [
            {
              document_charges: { required },
              handling_charges: { required },
            },
            {
              document_charges: { required },
              handling_charges: { required },
            },
            {
              document_charges: { required },
              handling_charges: { required },
            },
            {
              document_charges: { required },
              handling_charges: { required },
            },
            {
              document_charges: { required },
              handling_charges: { required },
            },
          ],
          free_dom_request: [
            {
              document_charges: { required },
              handling_charges: { required },
            },
            {
              document_charges: { required },
              handling_charges: { required },
            },
            {
              document_charges: { required },
              handling_charges: { required },
            },
            {
              document_charges: { required },
              handling_charges: { required },
            },
            {
              document_charges: { required },
              handling_charges: { required },
            },
          ],
          freedom_transfer: [
            {
              document_charges: { required },
              handling_charges: { required },
            },
            {
              document_charges: { required },
              handling_charges: { required },
            },
            {
              document_charges: { required },
              handling_charges: { required },
            },
            {
              document_charges: { required },
              handling_charges: { required },
            },
            {
              document_charges: { required },
              handling_charges: { required },
            },
          ],
        },
      },
    };
  },
  components: {
    Accordion,
    AccordionTab,
  },
  methods: {
    goBackHandler() {
      this.$store.dispatch("quotation/navigateStepper", {
        step: "AddCostingDialog",
      });
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.state.quotation.quotationDetails.push(this.details);
        this.$store.dispatch("quotation/navigateStepper", {
          step: "AddOnForwardingDialog",
        });
      }
    },
  },
};
</script>

<style scoped>
.category:checked ~ label {
  color: rgb(143, 143, 167);
}
::v-deep .pi-chevron-right {
  position: absolute !important;
  right: 0% !important;
  color: black;
}
::v-deep .p-accordion-tab {
  margin-bottom: 15px !important ;
}
::v-deep .pi-chevron-down {
  position: absolute !important;
  right: 0% !important;
  color: black;
}
::v-deep .p-accordion .p-accordion-header .p-accordion-header-link {
  background: #5cd0f3;
  border-radius: 8px 8px 0px 0px !important;
}

::v-deep .p-accordion-header-link {
  padding: 0.5rem !important;
  background: #f3f7ff !important;
  border-radius: 8px 8px 8px 8px !important;
}
.category {
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0.03em;
  text-align: left;
  /* color : pink; */
}
.accordion-text {
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #357dea;
}
::v-deep .p-accordion-content {
  background-color: rgb(234, 247, 255, 0.5) !important;
  border-radius: 8px 8px 0px 0px !important;
  /* border-color: #357DEA !important; */
  border: 1px solid #357dea !important;
}
</style>
