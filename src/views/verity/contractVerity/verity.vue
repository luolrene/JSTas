<template>
  <div class="operate-container">
    <el-row type="flex" class="row-bg" justify="space-between" :gutter="30" style="height: 100%;">
      <el-col :span="10" style="height: 100%;">
        <fromItem ref="myFromItem" :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules" type="preview" :labelWidth="100">
          <fileList :fileList="fileList" type="preview"></fileList>
        </fromItem>
      </el-col>
      <el-col :span="7" v-if="checkLogList.length > 0">
        <el-scrollbar class="page-component__scroll" :native="false" style="height: 100%;">
          <div class="block" style="padding-right: 40px;">
            <el-timeline style="padding-left: 20px;">
              <el-timeline-item :timestamp="item.operTime" placement="top" v-for="(item,index) in checkLogList" :key="index" :color="item.optinColor">
                <el-card>
                  <h4 class="content_a">
                    <span style="margin-right: 15px;">步骤{{item.step}}</span>
                    <span :style="{color:item.optinColor}">{{item.option}}</span>
                  </h4>
                  <div class="content_a">
                    <span>{{item.oper}}</span>
                    <span>{{item.operMobile}}</span>
                  </div>
                  <div v-if="item.exp !== null && item.exp !==''" class="content_b">
                    审核备注：{{item.exp}}
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-scrollbar>
      </el-col>
      <el-col :span="7" v-else style="text-align: center;">
        暂无审核日志
      </el-col>
      <el-col :span="7">
        <h3 style="text-align: center;">合同审核</h3>

        <fromItem id="father" ref="mySecondFromItem" :obj="this" :layerid="layerid" :fromItemList="secondFromItemList" :fromValiData="secondForm" :rules="secondRules" :labelWidth="100" scrollbarHeight="400px">

          <div style="margin-left:20px">
            <span style="font-size: 14px; color: #606266;">颜色标注：</span>
            <el-select id="select" v-model="secondForm.color" placeholder="请选择颜色标注:" @change='getColor'>
              <el-option v-for="item in colorData" :key="item.value" :label="item.label" :value="item.value" :style="item.style"></el-option>
            </el-select>
            <span style="font-size: 10px; color: red;margin-left: 120px">* 选择颜色标注</span>
          </div>
        </fromItem>
        <template v-if="params.istosub">
          <div style="width: 100%;height: 1px;border-bottom: 1px dashed black;margin: 45px 0;"></div>
          <h3 style="text-align: center;">分包合同</h3>
          <span>分包信息：</span>
          <el-button type="primary" size="mini" @click="handleSpc">添加/修改</el-button>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import fileList from '../../common/fileList.vue'
import edit from './edit.vue'
import { getFileQueryFileList } from '../../../api/file.js'
import {
  getCheckTaskQueryLogs,
  getCheckTaskAddCheckLog
} from '../../../api/verity/contractVerity.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  components: {
    fileList
  },
  data() {
    return {
      radio: '1',
      optinColor: '#01AB91',
      colorData: [
        {
          value: 'color_1',
          label: '红',
          style: 'color:red; background-color:red'
        },
        {
          value: 'color_2',
          label: '橙',
          style: 'color:#ff6600; background-color:#ff6600'
        },
        {
          value: 'color_3',
          label: '黄',
          style: 'color:#ffff00; background-color:#ffff00'
        },
        {
          value: 'color_4',
          label: '绿',
          style: 'color:#008000; background-color:#008000'
        },
        {
          value: 'color_5',
          label: '青',
          style: 'color:#008080; background-color:#008080'
        },
        {
          value: 'color_6',
          label: '蓝',
          style: 'color:#00ffff; background-color:#00ffff'
        },
        {
          value: 'color_7',
          label: '紫',
          style: 'color:#800080; background-color:#800080'
        },
        {
          value: 'color_8',
          label: '无',
          style: 'color:#fff; background-color:#fff'
        },
        {
          value: 'color_9',
          label: '灰',
          style: 'color:#c0c0c0; background-color:#c0c0c0'
        }
      ],
      fromValiData: {
        custName: '',
        seller: '',
        officeName: '',
        office: '',
        reportNum: '2'
      },
      rules: {},
      fromItemList: [
        {
          label: '项目名称',
          prop: 'project',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '客户名称',
          prop: 'custName',
          value: '',
          type: 'input',
          click: 'getCustId',
          disabled: true
        },
        {
          label: '联系人姓名',
          prop: 'contacts',
          value: 'contactsMobile',
          type: 'select',
          disabled: true
        },
        {
          label: '联系人手机',
          prop: 'contactsMobile',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '经办人姓名',
          prop: 'sellerName',
          value: '',
          type: 'input',
          click: 'getSeller',
          disabled: true
        },
        {
          label: '经办人手机',
          prop: 'seller',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '内勤姓名',
          prop: 'officeName',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '内勤手机',
          prop: 'office',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '客户区域',
          prop: 'area',
          value: '',
          type: 'select',
          disabled: true
        },
        {
          label: '项目板块',
          prop: 'plateName',
          value: 'plate',
          type: 'select',
          disabled: true
        },
        {
          label: '项目类型',
          prop: 'projectTypeName',
          value: 'projectType',
          type: 'select',
          disabled: true
        },
        {
          label: '付款方式',
          prop: 'payTypeName',
          value: 'payType',
          type: 'select',
          disabled: true
        },
        {
          label: '寄送方式',
          prop: 'mailTypeName',
          value: 'mailType',
          type: 'select',
          disabled: true
        },
        {
          label: '审核流程',
          prop: 'checkPathName',
          value: '',
          type: 'select',
          disabled: true
        },

        {
          label: '是否周期合同',
          prop: 'iscycle',
          value: '',
          type: 'switch',
          disabled: true
        },
        {
          label: '是否分包',
          prop: 'istosub',
          value: '',
          type: 'switch',
          disabled: true
        },
        {
          label: '是否评价',
          prop: 'ispj',
          value: '',
          type: 'switch',
          disabled: true
        },
        {
          label: '是否需要寄出发票',
          prop: 'needInvoice',
          value: '',
          type: 'switch',
          labelWidth: '130',
          disabled: true
        },

        {
          label: '采样期限时间',
          prop: 'cyTerm',
          value: '',
          type: 'date',
          labelWidth: '110',
          disabled: true
        },
        {
          label: '项目期限',
          prop: 'proTerm',
          value: '',
          type: 'date',
          disabled: true
        },

        {
          label: '业务类别',
          prop: 'busiTypeName',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '合同金额',
          prop: 'price',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '折扣',
          prop: 'discount',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '报告份数',
          prop: 'reportNum',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '检测地点',
          prop: 'checkAddress',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '备注1',
          prop: 'expOne',
          value: '',
          type: 'textarea',
          disabled: true
        },
        {
          label: '备注2',
          prop: 'expTwo',
          value: '',
          type: 'textarea',
          disabled: true
        }
      ],
      secondForm: {
        color: 'color_8'
      },
      secondRules: {
        option: [{ required: true, message: '请填写审核意见', trigger: 'blur' }]
      },
      secondFromItemList: [
        {
          label: '审核意见',
          prop: 'option',
          value: '',
          type: 'radio',
          isRqd: true,
          data: [{ label: '1', name: '同意' }, { label: '2', name: '拒绝' }]
        },
        {
          label: '审核备注',
          prop: 'exp',
          value: '',
          type: 'textarea',
          isRqd: false
        }
      ],
      fileList: [],
      checkLogList: [] // 审核日志列表
    }
  },
  methods: {
    onSubmit(type) {
      this.secondForm.father = this.params.checkTask
      this.btnLoading = true
      getCheckTaskAddCheckLog(this.secondForm)
        .then(res => {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.btnLoading = false
        })
        .catch(() => {
          this.btnLoading = false
        })
    },
    getColor(data) {
      switch (data) {
        case 'color_1':
          select.style = 'background-color:red;color:red'
          break
        case 'color_2':
          select.style = 'background-color:#ff6600;color:#ff6600'
          break
        case 'color_3':
          select.style = 'background-color:#ffff00;color:#ffff00'
          break
        case 'color_4':
          select.style = 'background-color:#008000;color:#008000'
          break
        case 'color_5':
          select.style = 'background-color:#008080;color:#008080'
          break
        case 'color_6':
          select.style = 'background-color:#00ffff;color:#00ffff'
          break
        case 'color_7':
          select.style = 'background-color:#800080;color:#800080'
          break
        case 'color_8':
          select.style = 'background-color:#fff;color:#fff'
          break
        case 'color_9':
          select.style = 'background-color:#c0c0c0;color:#c0c0c0'
          break
      }
    },
    handleSpc() {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: this.params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '添加/修改分包信息',
        maxmin: true,
        shadeClose: false
      })
    }
  },
  mounted() {
    if (this.params) {
      console.log(this.params)

      this.params.iscycle = this.params.iscycle === '1'
      this.params.istosub = this.params.istosub === '1'
      this.params.ispj = this.params.ispj === '1'
      this.params.needInvoice = this.params.needInvoice === '1'
      switch (this.params.busiType) {
        case '1':
          this.params.busiTypeName = '纯检测'
          break
        case '2':
          this.params.busiTypeName = '纯咨询'
          break
        case '3':
          this.params.busiTypeName = '检测和咨询'
          break
      }
      this.fromValiData = this.params
      this.secondForm.color = this.params.color
      getFileQueryFileList({ id: this.params.id, type: '1' }).then(res => {
        this.fileList = res.result
      })
      getCheckTaskQueryLogs({ taskId: this.params.checkTask }).then(res => {
        res.result.logList.forEach(xdd => {
          if (xdd.option === '1') {
            xdd.option = '同意'
            xdd.optinColor = '#01AB91'
          } else {
            xdd.option = '拒绝'
            xdd.optinColor = '#FF798D'
          }
        })
        this.checkLogList = res.result.logList
      })
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
.content_a {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.content_b {
  word-wrap: break-word;
  width: 100%;
  line-height: 20px;
}
</style>
