<!--销售机会 -->
<template>
    <div class="operate-container">
        <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :isPage="false" :dataSum='fromValiData.dataSum' :loading="loading"></tableItem>
    </div>
</template>

<script>
import userList from './input_person.vue'
import { gettransmitUserIdsGet } from '@/api/client/trackRecord.js'
export default {
  props: {
    params: String,
    layerid: ''
  },
  data() {
    return {
      loading: false,
      fromValiData: {
        type: ''
      },
      tableData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'code',
          label: '手机号'
        }
      ],
      button: {
        buttonList: [
          {
            name: '更换',
            type: 'primary',
            click: 'handleEdit'
          }
        ]
      }
    }
  },

  methods: {
    getListData() {
      this.loading = true
      gettransmitUserIdsGet(this.fromValiData)
        .then(res => {
          this.tableData = res.result
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    handleEdit(params) {
      this.$layer.iframe({
        content: {
          content: userList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            layerid: ''
          } // props
        },
        area: this.$layer_Size.Max,
        title: '抄送人更换',
        maxmin: true,
        shadeClose: false
      })
    }
  },
  mounted() {
    this.fromValiData.type = this.params
    this.getListData()
  },
  created() {}
}
</script>

<style scoped>
</style>
