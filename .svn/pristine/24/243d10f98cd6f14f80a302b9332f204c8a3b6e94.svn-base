<template>
  <span class="hideSearch">
    <fragment v-if="mode === 'show'">
      <div style="height: 38px;margin-left: 30px;display: flex;font-size: 12px;color: #999999;" @click="handleClick">
        <span class="iconfont hideIconfont">&#xebef;</span>
        <span>条件搜索</span>
      </div>
    </fragment>
    <fragment v-else-if="mode === 'hide'">
      <div style="height: 38px;margin-left: 30px;display: flex;font-size: 12px;color: #999999;" @click="handleClick">
        <span class="iconfont hideIconfont">&#xebf0;</span>
        <span>收起搜索</span>
      </div>
    </fragment>
  </span>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object
    },
    mode: {
      type: String,
      default: 'hide'
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    handleClick() {
      this.obj.boxshow = !this.obj.boxshow
    }
  },
  mounted () {
  },
  created () {

  }
}
</script>

<style scoped lang="scss">
  .hideSearch{
    cursor: pointer;
    float: right;
  }
  .hideSearch:hover span:nth-child(2){
    color: #0195DB;
    text-decoration: underline;
  }
  .hideIconfont {
    width: 26px;
    font-size: 20px !important;
    color: #018cce;
  }
</style>
