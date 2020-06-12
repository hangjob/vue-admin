<template>
	<div>
		<div style="font-size:30px">px-rem</div>
		<img src="@/assets/logo.png" />
		<PMheader></PMheader>
		<el-button type="primary" v-has="true">主要按钮1</el-button>
	</div>
</template>
<script>
export default {
	mounted() {
		const obj = {
			foo: {
				bar: {
					baz: 42,
					fun: () => {
                        return 666;
                    }
				}
			}
        };
        let baz = obj?.foo?.bar?.baz;
        let fun = obj?.foo?.bar?.fun();
        console.log(baz);
        console.log(fun)
	}
};
</script>
<style lang="less" scoped>
div {
    color: @pm-base-color;
    font-size:100px
}
</style>