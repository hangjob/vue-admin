<template>
	<div>
        index
        <img src="@/assets/logo.png">
        <PMheader></PMheader>
        <el-button type="primary">主要按钮1</el-button>
    </div>
</template>
<script>
export default {
	mounted(){
        console.log('111111')
    }
};
</script>
<style lang="less" scoped>
div {
	color: @pm-base-color;
}
</style>