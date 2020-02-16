<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#fff"
            text-color="#666666"
            active-text-color="#6b5af4"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.children">
                    <el-submenu :index="item.path" :key="item.path" v-if="item.meta.shows">
                        <template slot="title" v-if="item.meta.shows">
                            <i :class="item.meta.icon"></i>
                            <span slot="title">{{ item.meta.title }}</span>
                        </template>
                        <template v-for="subItem in item.children">
                            <el-submenu
                                v-if="subItem.children"
                                :index="subItem.path"
                                :key="subItem.path"
                            >
                                <template slot="title" v-if="subItem.meta.shows">
                                    <i :class="subItem.meta.icon"></i>
                                    <span slot="title">{{ subItem.meta.title }}</span>
                                </template>
                                <template v-for="(threeItem,i) in subItem.children">
                                    <el-menu-item
                                        :key="i"
                                        :index="threeItem.path"
                                        v-if="threeItem.meta.shows"
                                    >
                                        <i :class="threeItem.meta.icon"></i>
                                        <span slot="title">{{ threeItem.meta.title }}</span>
                                    </el-menu-item>
                                </template>
                            </el-submenu>
                            <template v-else>
                                <el-menu-item
                                    v-if="subItem.meta.shows"
                                    :index="subItem.path"
                                    :key="subItem.path"
                                >
                                    <i :class="subItem.meta.icon"></i>
                                    <span slot="title">{{ subItem.meta.title }}</span>
                                </el-menu-item>
                            </template>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.path" :key="item.path" v-if="item.meta.shows">
                        <i :class="item.meta.icon"></i>
                        <span slot="title">{{ item.meta.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            collapse: false,
            items: [
                
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace();
        }
    },
    created() {
       this.items = this.$router.options.routes[1].children;
       console.log(this.items)
    }
};
</script>

<style lang="less" scoped>
.sidebar {
    & > ul {
        height: 100%;
    }
    li{
        i{
            padding-left:20px;
        }
        span{
            font-size:16px;
            padding-left:20px;
        }
    }
}
</style>