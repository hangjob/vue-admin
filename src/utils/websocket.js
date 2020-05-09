const WSS_URL = `wss://wss.xxxx.com/ws?appid=xxx`
let setIntervalWesocketPush = null

export default class websocket {
    createSocket() {
        if (!this.Socket) {
            console.log('建立websocket连接')
            this.Socket = new WebSocket(WSS_URL)
            this.Socket.onopen = this.onopenWS
            this.Socket.onmessage = this.onmessageWS
            this.Socket.onerror = this.onerrorWS
            this.Socket.onclose = this.oncloseWS
        } else {
            console.log('websocket已连接')
        }
    }

    /**打开WS之后发送心跳 */
    onopenWS() {
        this.sendPing() //发送心跳
    }

    /**连接失败重连 */
    onerrorWS() {
        clearInterval(setIntervalWesocketPush)
        this.Socket.close()
        createSocket() //重连
    }

    /**WS数据接收统一处理 */
    onmessageWS(res) {
        console.log(res)
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
        clearInterval(setIntervalWesocketPush)
        console.log('websocket已断开')
    }


    /**发送心跳 */
    sendPing() {
        this.Socket.send('ping')
        setIntervalWesocketPush = setInterval(() => {
            this.Socket.send('ping')
        }, 5000)
    }
}
