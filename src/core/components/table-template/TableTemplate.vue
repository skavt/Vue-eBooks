<template>
  <b-card no-body class="table-responsive mb-0">
    <no-content :show="!hasItems"/>
    <b-table v-if="hasItems" class="mb-0 pb-0" responsive="sm" :fields="localFields" :items="localItems">

    </b-table>
    <table-pagination
        ref="pagination" v-if="hasItems" :total-rows="items.length" @on-pagination-change="onPaginationChange">
    </table-pagination>
  </b-card>
</template>

<script>
  import NoContent from "../../../core/components/no-content/NoContent";
  import TablePagination from "../../../core/components/table-pagination/TablePagination";
  import {mapState} from 'vuex'

  export default {
    name: "TableTemplate",
    components: {TablePagination, NoContent},
    props: {
      fields: {
        type: Array,
        require: true,
      },
      items: {
        type: Array,
        require: true,
      },
    },
    data() {
      return {
        localItems: []
      }
    },
    computed: {
      ...mapState(['perPage']),
      hasItems() {
        return this.localItems.length > 0
      },
      localFields() {
        return [...this.fields, {key: 'actions', label: 'Actions'}]
      },
    },
    watch: {
      items() {
        this.localItems = _.cloneDeep(this.items);
        this.onPaginationChange(1);
        this.$refs.pagination.currentPage = 1;
      },
    },
    methods: {
      onPaginationChange(currentPage) {
        this.localItems = this.items.filter((item, index) => {
          return index >= (currentPage - 1) * this.perPage && index <= currentPage * this.perPage - 1;
        })
      },
    },
    mounted() {
      this.localItems = _.cloneDeep(this.items);
      this.onPaginationChange(1);
    },
  }
</script>

<style lang="scss" scoped>

  ::v-deep.table-responsive {
    height: 100%;
  }

  ::v-deep.table-responsive-sm {
    height: 100%;
    overflow: auto;

    > table {
      > thead {
        > tr {
          > th {
            //position: sticky;
            //z-index: 10;
            //top: 0;
            //padding: 6px;
            white-space: nowrap;

            &:focus {
              outline: none;
            }
          }
        }
      }

      > tbody {
        > tr {
          > td {
            //padding: 8px;
            max-width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }

</style>