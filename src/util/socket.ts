import { Socket } from "socket.io-client";
import io  from "socket.io-client";
import { config } from "../config/config";
import { token } from "../atoms/context";

class SocketUtil {
  private static instance:SocketUtil
  public io:Socket | null = null
  
  constructor() {
    this.connect()
  }

  public connect (_params?:any) {
    if(this.io && !_params.force ) return this.io

    if(token.get()){
      this.io = io(config.socket, {
        rememberUpgrade:true,
        transports: ['websocket'],
        query: {
          token: token.get(),
        }
      })
    }
  }
  
  public static getInstance() {
    try {
      if (!SocketUtil.instance) {
        SocketUtil.instance = new SocketUtil()
      }
      return SocketUtil.instance
    } catch (error) {
      console.log('error', error)
    }
  }
}

export default new SocketUtil()