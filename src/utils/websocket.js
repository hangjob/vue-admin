const WSS_URL = `ws://123.207.136.134:9010/ajaxchattest`
let setIntervalWesocketPush = null

export default class websocket {

    constructor(){
        this.Socket = null;
        this.createSocket();
    }

    createSocket() {
        if (!this.Socket) {
            console.log('建立websocket连接')
            this.Socket = new WebSocket(WSS_URL)
            this.onopenWS();
            this.onmessageWS();
            this.onerrorWS();
            this.oncloseWS();
        } else {
            console.log('websocket已连接')
        }
    }

    /**打开WS之后发送心跳 */
    onopenWS() {
        this.Socket.onopen = ()=>{
            console.log('发送心跳')
            this.sendPing() //发送心跳
        }
    }

    /**连接失败重连 */
    onerrorWS() {
        this.Socket.onerror = ()=>{
            console.log('连接失败发送重连')
            clearInterval(setIntervalWesocketPush);
            this.Socket.close()
            this.createSocket() //重连
        }
    }

    /**WS数据接收统一处理 */
    onmessageWS(callback) {
        this.Socket.onmessage = (res)=>{
            if(res.data){
                callback && callback(res.data)
            }else{
                console.log('服务端返回的错误状态码')
            }
        }
    }

    /**
     * 发送数据
     * readyState = 3  连接已经关闭或者根本没有建立
     * readyState = 2  连接正在进行关闭握手，即将关闭
     * readyState = 1  连接成功建立，可以进行通信
     * readyState = 0  正在建立连接，连接还没有完成
     * @param {*发送内容} content 
     */
    sendWSPush(content) {
        if (this.Socket !== null && this.Socket.readyState === 3) {
            this.Socket.close()
            this.createSocket() //重连
        } else if (this.Socket.readyState === 1) {
            this.Socket.send(content)
        } else if (this.Socket.readyState === 0) {
            setTimeout(() => {
                this.Socket.send(content)
            }, 5000)
        }
    }


    /**关闭WS */
    oncloseWS() {
        this.Socket.onclose = ()=>{
            clearInterval(setIntervalWesocketPush)
            console.log('websocket已断开')
        }
    }


    /**发送心跳 */
    sendPing() {
        this.Socket.send('ping')
        setIntervalWesocketPush = setInterval(() => {
            this.Socket.send('ping')
        }, 1000*30)
    }
}
