<template>
  <el-table :data="tdsummary" style="width: 100%;padding-top: 15px;">
    <el-table-column label="laybel" min-width="200">
      <template slot-scope="scope">{{ scope.row.label }}</template>
    </el-table-column>
    <el-table-column label="value" width="195" align="center">
      <template slot-scope="scope">{{ scope.row.value }}</template>
    </el-table-column>
    <!-- <el-table-column label="Status" width="100" align="center">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | statusFilter"> {{scope.row.status}}</el-tag>
      </template>
    </el-table-column>-->
  </el-table>
</template>

<script>
// import { fetchList } from "@/api/transaction";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    tdsummary: {
      type: Array
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      datatdsummary().then(response => {
        this.list = response.tdsummary
      })
    }
  }
}
</script>
