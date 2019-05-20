<template>
    <section>
        <Card title="柱形图">
            <div slot="center" class="center">
                <ve-histogram :data="chartData" :extend="chartExtend" :settings="chartSettings"></ve-histogram>
            </div>
        </Card>
        <Card title="饼图">
            <div slot="center" class="center">
                <ve-ring :data="chartDataVeRing" :extend="chartExtendVeRing" :settings="chartSettingsVeRing"></ve-ring>
            </div>
        </Card>
    </section>
</template>
<script>
import Card  from '../../components/base/card/card.vue';

// https://github.com/ElemeFE/v-charts/issues/593  渐变色
// https://v-charts.js.org/ 官网
export default {
    components:{
        Card
    },
    data(){
        this.chartExtend = {
            series:{
                type: 'bar',
                barWidth: 25
            },
            yAxis: {
                // y轴样式颜色
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#f8f8f8',
                        width: 0
                    },
                },
                // 刻度线样式
                axisTick: {
                    lineStyle: {
                        color: '#999999'
                    }
                },
                //网格样式
                splitLine: {
                    show: true,
                    lineStyle:{
                        color: ['#f8f8f8'],
                        width: 1,
                        type: 'solid'
                    }
                },
                // y轴字体
                axisLabel:{
                    textStyle:{
                        color: '#999999'
                    }
                }
            },
            xAxis: {
                // x轴样式颜色
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#f8f8f8',
                        width: 1
                    }          
                },
                 // x轴字体
                axisLabel:{
                    textStyle:{
                        color: '#999999'
                    }
                }
            },
            // 自定义提示框
            tooltip: {
                trigger: 'item',
                backgroundColor:'rgba(255,240,239,0.8)',//通过设置rgba调节背景颜色与透明度
                color:'black',
                borderWidth:'1',
                borderColor:'#ff847a',
                textStyle:{
                	color:'#ff7569',
                },
                position: 'top',// 提示框位置
                formatter: function (params) {
                    var htmlStr = `<div>${params.seriesName}:${params.value}次</div>`;
                    return htmlStr; 
                }
            }
        }
        this.chartExtendVeRing = {
            color: ['rgb(252,182,9)','rgb(253,114,112)','rgb(47,182,218)'],
            series:{
                type: 'pie',
                labelLine:{
                    show: false
                },
                tooltip:{
                    position:[30,30],
                    backgroundColor:'rgba(255,240,239,0.7)',
                    borderColor:'#ff847a',
                    textStyle:{
                        color:'#999999'
                    }
                }
            }
        }
        return {
            chartSettings:{
                silent: true,
                itemStyle:{
                    barBorderRadius: 15,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 1,
                        x2: 0,
                        y2: 0,
                        colorStops: [{
                            offset: 0, color: '#fd7270' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#feada2' // 100% 处的颜色
                        }],
                    }
                }
            },
            chartData: {
                columns: ['日期', '访问用户'],
                rows: [
                    { '日期': '02/19', '访问用户': 1393,},
                    { '日期': '02/19', '访问用户': 3530, },
                    { '日期': '02/19', '访问用户': 2923, },
                    { '日期': '02/19', '访问用户': 1723,},
                    { '日期': '02/19', '访问用户': 3792,},
                    { '日期': '02/19', '访问用户': 6493,},
                    { '日期': '02/19', '访问用户': 4593,},
                    { '日期': '02/19', '访问用户': 2193,},
                    { '日期': '02/19', '访问用户': 3593,},
                    { '日期': '02/19', '访问用户': 9593,}
                ]
            },
            chartSettingsVeRing:{
                radius: [70,120]
            },
            chartDataVeRing:{
                columns: ['日期', '访问用户'],
                rows: [
                    { '日期': '站点A', '访问用户': 1393 },
                    { '日期': '站点B', '访问用户': 3530 },
                    { '日期': '站点C', '访问用户': 2923 }
                ]
            }
        }
    },
    mounted(){
    }
}
</script>
<style lang="less" scoped>

</style>
