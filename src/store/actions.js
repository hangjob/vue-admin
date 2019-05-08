const actions = {
    asyncMango(context,num){//这里的context和我们使用的$store拥有相同的对象和方法
        setTimeout(()=>{
            context.commit("MANGO",num);
        },3000); 
    }
};
export default actions;