
//getters 除了能做代理之外，还能做简单的计算属性

const getters={
    
    orange: state => state.orange,

    mango: state => state.mango,

    cherry: state => state.cherry,

    adminCurrentPath: state=>state.admin.currentPath
};

export default getters;