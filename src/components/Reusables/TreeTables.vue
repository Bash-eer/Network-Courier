<template>
  <TreeTable :value="$store.state.rolesAccessTreeTableData">
    <Column
      v-for="col of columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      :expander="col.expander"
    >
      <template #body="slotProps">
        <span v-if="col.header == 'Module'">
          <div class="flex justify-content-between">
            <div class="flex">
              <div class="flex flex-row">
                <CheckBox
                  v-if="slotProps.node.data[col.field].checks"
                  v-bind:checker="[
                    {
                      name: slotProps.node.data.type,
                      key: 'f',
                      module: slotProps.node.data.Module,
                      subs: slotProps.node.data.subs,
                      rights: 'SelectAll',
                      parent: slotProps.node.data.parent,
                      key: slotProps.node.key,
                    },
                  ]"
                  v-bind:categories="[
                    {
                      name: slotProps.node.data.type,
                      key: 'f',
                      module: slotProps.node.data.Module,
                      subs: slotProps.node.data.subs,
                      rights: 'SelectAll',
                      parent: slotProps.node.data.parent,
                      key: slotProps.node.key,
                    },
                  ]"
                  v-on:childToParent="checkBoxChange"
                />

                <CheckBox
                  v-if="!slotProps.node.data[col.field].checks"
                  v-bind:checker="[]"
                  v-bind:categories="[
                    {
                      name: slotProps.node.data.type,
                      key: 'a',
                      module: slotProps.node.data.Module,
                      subs: slotProps.node.data.subs,
                      rights: 'SelectAll',
                      parent: slotProps.node.data.parent,
                      key: slotProps.node.key,
                    },
                  ]"
                  v-on:childToParent="checkBoxChange"
                />
              </div>
              <div class="flex flex-row align-self-center">
                {{ slotProps.node.data[col.field] }}
              </div>
            </div>
          </div>
        </span>
        <span
          v-if="
            col.header == 'Add' ||
            col.header == 'Edit' ||
            col.header == 'Delete'
          "
          class="mr-2"
        >
          <CheckBox
            v-if="slotProps.node.data[col.header].checks"
            v-bind:checker="[
              {
                name: slotProps.node.data.type,
                key: 'f',
                module: slotProps.node.data.Module,
                subs: slotProps.node.data.subs,
                rights: col.header,
                parent: slotProps.node.data.parent,
                key: slotProps.node.key,
              },
            ]"
            v-bind:categories="[
              {
                name: slotProps.node.data.type,
                key: 'f',
                module: slotProps.node.data.Module,
                subs: slotProps.node.data.subs,
                rights: col.header,
                parent: slotProps.node.data.parent,
                key: slotProps.node.key,
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />

          <CheckBox
            v-if="!slotProps.node.data[col.header].checks"
            v-bind:checker="[]"
            v-bind:categories="[
              {
                name: slotProps.node.data.type,
                key: 'a',
                module: slotProps.node.data.Module,
                subs: slotProps.node.data.subs,
                rights: col.header,
                parent: slotProps.node.data.parent,
                key: slotProps.node.key,
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
        </span>
        <span
          v-if="
            col.header != 'Add' &&
            col.header != 'Edit' &&
            col.header != 'Delete' &&
            col.header != 'Module'
          "
          :class="col.field"
          >{{ slotProps.node.data[col.field] }}</span
        >
      </template>
    </Column>
  </TreeTable>
</template>

<script>
import TreeTable from "primevue/treetable";
import Column from "primevue/column";
export default {
  name: "TreeTables",
  data: () => ({
    columns: [
      { field: "Module", header: "Module", expander: true },
      { field: "Add", header: "Add" },
      { field: "Edit", header: "Edit" },
      { field: "Delete", header: "Delete" },
    ],
  }),
  methods: {
    //----------------------------------------EXPANDABLE ROWS FUNCTIONS---------------------------------------------------//
    checkBoxChange(value, ref) {
      if (
        (ref[0].key == 0 || ref[0].key == 1) &&
        ref[0].rights == "SelectAll"
      ) {
        this.masterChecksControl(value, ref);
      }
    },
    masterChecksControl(selection, reference) {
      for (var all in this.$store.state.rolesAccessTreeTableData) {
        var all_child_obj = this.$store.state.rolesAccessTreeTableData[all];
        for (var a_c_o_iter in all_child_obj) {
          if (a_c_o_iter == "key") {
            if (all_child_obj[a_c_o_iter] == reference[0].key) {
              this.masterRightsChecksControl(
                selection,
                all_child_obj.data,
                all
              );
              this.childRightsChecksControl(
                selection,
                all_child_obj.children,
                all
              );
            }
          }
        }
      }
    },
    masterRightsChecksControl(selection, row, index) {
      for (var r in row) {
        if (r == "Add" || r == "Delete" || r == "Edit") {
          this.$store.state.rolesAccessTreeTableData[index].data[r].checks =
            selection.length == 0 ? false : true;
        }
      }
    },
    childRightsChecksControl(selection, row, index) {
      for (var r in row) {
        this.masterRightsChecksControl(selection, row[r].data, index);
      }
    },
  },

  components: {
    TreeTable,
    Column,
  },
};
</script>

<style></style>
