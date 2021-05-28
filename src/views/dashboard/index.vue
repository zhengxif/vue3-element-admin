<template>
    <div>
        <h1>Dashboard page</h1>
        缓存测试<input type="text" />
        <el-button type="primary">size改变</el-button>
    </div>
</template>

<script lang="ts">
import { getCurrentInstance, defineComponent } from 'vue'

export default defineComponent({
    name: 'Dashboard',
    setup() {
    // 无法使用ctx 使用proxy来代替
    // https://blog.csdn.net/qq_39115469/article/details/113817592
        const { proxy } = getCurrentInstance()!
        const sayHi = () => {
          proxy?.$message.success('恭喜你，这是一条成功消息')
        }
        return {
            sayHi,
        }
    },
})
</script>

<style lang="scss">
.custom-class {
    // 自定义样式404
    font-size: 200px;
    color: green;
}
</style>