<!-- 跟进人 -->
<template>
  <div class="operate-container">
    <el-form
      :model="fromValiData"
      label-width="80"
      inline
      class="list-form"
      ref="fromValiData"
    >
    </el-form>
    <tableItem
      :obj="this"
      :tableData="tableData"
      :tableHeader="tableHeader"
      :loading="loading"
      customHeight="100%"
      :isPage="false"
    ></tableItem>
  </div>
</template>
<script>
import {
  getCustQueryOpers,
  getCustAddOrModifyOpers
} from '@/api/contract/customer.js'
import { getCustQueryContacts } from '@/api/client/info.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  components: {},
  data() {
    return {
      loading: false,
      fromValiData: {},
      tableData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '跟进人姓名',
          width: 250
        },
        {
          prop: 'mobile',
          label: '手机号',
          width: 250
        }
      ],
      multipleSelection: [],
      steps: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      this.fromValiData.custId = this.params.id
      getCustQueryContacts({ custId: this.params.id }).then(res => {
        this.fromValiData.contactsId = res.result[0].id
        getCustQueryOpers(this.fromValiData)
          .then(res => {
            this.tableData = res.result
            this.loading = false
          })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      })
    },

    getSteps(params) {
      let ids = []
      params.forEach(xdd => {
        ids.push({
          id: xdd.userId,
          name: xdd.name,
          mobile: xdd.mobile,
          custId: this.params.id
        })
      })
      getCustAddOrModifyOpers(ids).then(res => {
        this.getListData()
      })
    }
  },
  mounted() {
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
