<template>
    <div class="login">
        <div class="login-admin">
            <div class="flex">
                <div class="title">
                    <h3>管理系统</h3>
                    <p>vipbic分享你我快乐</p>
                </div>
                <div class="user">
                    <div class="icon"><i class="fa fa-user-o"></i></div>
                    <div><input value="admin" placeholder="请输入用户名"/></div>
                </div>
                <div class="user">
                    <div class="icon"><i class="fa fa-unlock-alt"></i></div>
                    <div><input value="123456" placeholder="请输入登录密码" type="password"/></div>
                </div>
                <div class="submit" @click="submit">
                    <div>登录</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    mounted(){

    },
    methods:{
        submit(){
            localStorage.setItem('token','getToken')
            this.$router.push('/home');
        }
    }
}
</script>
<style lang="less" scoped>
    div,input,p,h3{
       font-family: Hind Siliguri,sans-serif;
    }
    .login{
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url("../../img/bg.png");
        background-repeat: no-repeat;
        background-size:cover;
        .login-admin{
            padding: 60px 50px 50px 50px;
            display: inline-block;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            font-size: 10px;
            overflow: hidden;
            position: absolute;
            left: 15%;
            top: 23%;
            // transform: translate(-50%, -50%);
            >div {
                display: flex;
                flex-direction: column;
            }
            .title{
                margin-bottom: 20px;
                h3{
                    font-size: 16px;
                    color: #333333;
                }
                p{
                    font-size: 10px;
                    color: #3d3d3d;
                }
            }
            .user{
                display: flex;
                border-bottom: 1px solid #b9b9b9;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
                padding: 5px 1px;
                .icon{
                    margin-right: 6px;
                }
            }
            .submit{
                // http://www.colorzilla.com/gradient-editor/ 在线渐变色
                width: 100%;
                text-align: center;
                padding: 7px 0;
                background: #f1cf75; /* Old browsers */
                background: -moz-linear-gradient(left, #f1cf75 0%, #cd8f90 100%); /* FF3.6-15 */
                background: -webkit-linear-gradient(left, #f1cf75 0%,#cd8f90 100%); /* Chrome10-25,Safari5.1-6 */
                background: linear-gradient(to right, #f1cf75 0%,#cd8f90 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f1cf75', endColorstr='#cd8f90',GradientType=1 );
                color: #ffffff;
                border-radius: 30px;
                cursor: pointer;
            }
            .loading{
                position: absolute;
                bottom: 0;
            } 
        }
        button, input, select, textarea {
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
            outline: none;
            -webkit-appearance: none;
            border-radius: 0;
            background: none;
            border: 0px;
        }
    }
</style>
