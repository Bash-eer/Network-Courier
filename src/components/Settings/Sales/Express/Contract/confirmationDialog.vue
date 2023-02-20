<template>
    <div>
      <ConfirmDialog group="templating">
        <template #message="slotProps">
          <div class="flex p-4">
            <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
            <p class="pl-2">{{ slotProps.message.message }}</p>
          </div>
        </template>
      </ConfirmDialog>
    </div>
  </template>
  
  <script>
  import confirmDialog from 'primevue/confirmdialog';
  export default {
    components: { confirmDialog },
    data() {
      return {};
    },
  };
  </script>
  
  <style></style>
  