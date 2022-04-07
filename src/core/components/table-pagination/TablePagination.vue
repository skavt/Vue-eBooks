<template>
  <div class="d-flex justify-content-between table-pagination">
    <b-form-select
        class="per-page-select mr-2" v-model="perPage" :options="perPageOptions" @change="onPaginationChange">
    </b-form-select>
    <div v-if="totalRows > 0">
      Displaying <b>{{ from }}</b> - <b>{{ Math.min(to, totalRows) }}</b> out of <b>{{ totalRows }}</b>
    </div>
    <b-pagination
        class="mb-0" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" @input="onPaginationChange">
    </b-pagination>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "TablePagination",
    props: {
      totalRows: {
        type: Number,
        require: true,
      },
    },
    data() {
      return {
        currentPage: 1,
        perPageOptions: [5, 10, 20, 50, 100],
      }
    },
    computed: {
      ...mapState(['perPage']),
      from() {
        return (this.currentPage - 1) * this.perPage + 1;
      },
      to() {
        return this.currentPage * this.perPage;
      },
    },
    methods: {
      ...mapActions(['changePerPage']),
      onPaginationChange() {
        this.changePerPage(this.perPage);
        this.$emit('on-pagination-change', this.currentPage)
      },
    },
  }
</script>

<style lang="scss" scoped>

  .table-pagination {
    padding: 20px;
    align-items: baseline;
  }

  .per-page-select {
    width: 100px;
  }

</style>