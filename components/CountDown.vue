<template></template>
<script>
  export default {
    name: 'CountDown',
    data() {
      let nowDateText = this.splicingTime(new Date().getTime())
      let {lossDay, surplusDay} = this.excessiveTime(new Date().getTime())
      let fractionalExpression = this.getFractionalExpression(lossDay/surplusDay, 0.001)
      return {
        nowDate: new Date().getTime(),
        nowDateText: nowDateText,
        lossDay,
        surplusDay,
        fractionalExpression: fractionalExpression
      }
    },
    watch: {
      nowDate(newVal, oldVal) {
        this.nowDateText = this.splicingTime(newVal)
      }
    },
    methods: {
      timer(callback, duration) {
        setTimeout(() => {
          callback()
          this.timer(callback, duration)
        }, duration)
      },
      countDown() {
        this.nowDate = new Date().getTime()
      },
      // 计算时间
      splicingTime(dataTime) {
        let date = new Date(dataTime)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hour = date.getHours()
        let minute = date.getMinutes()
        let second = date.getSeconds()
        return `${year}-${this.patchPosition(month)}-${this.patchPosition(day)} ${this.patchPosition(hour)}:${this.patchPosition(minute)}:${this.patchPosition(second)}`
      },
      // 补位
      patchPosition(num) {
        let numStr = num.toString()
        return numStr.length == 1 ? '0' + numStr : numStr
      },
      excessiveTime(dataTime) {
        let date = new Date(dataTime)
        let year = date.getFullYear()
        let hour = date.getHours()
        // 今年时间
        let thisYear = new Date(`${year}/01/01`).getTime()
        let nextYear = new Date(`${year + 1}/01/01`).getTime()
        let lossDay = parseInt((dataTime - thisYear) / 1000 / 60 / 60 / 24)
        let surplusDay = parseInt((nextYear - dataTime) / 1000 / 60 / 60 / 24)
        // 当天时间大于12点
        if (hour >= 12) {
          lossDay = lossDay + 1
        } else {
          surplusDay = surplusDay +1
        }
        return {
          lossDay,
          surplusDay
        }
      },
      // 简化分子分母
      getFractionalExpression(value, threshold) {
        let i=1
        let j=1;
        while(Math.abs(i/j - value) > threshold) {
          if (i/j > value) {
            j++;
          } else if(i/j < value) {
            i++;
          }
        }
        return i + '/' + j;
      }
    },
    created() {
//      this.timer(this.countDown, 1000)
    },
    components: {},
    computed: {},
    mounted() {
      console.log(`https://www.webascii.cn 温馨提示`)
      console.log(`本年度已经过去：${this.lossDay}天`)
      console.log(`本年度剩余：${this.surplusDay}天`)
    }
  }
</script>
