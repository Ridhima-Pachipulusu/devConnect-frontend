import io from "socket.io-client";
const connection=()=>{
    return io("http://localhost:7777");
}
export default connection;