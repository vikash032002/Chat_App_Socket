const socket=io();

// socket.on('from_server',()=>{
//     const div=document.createElement('div');
//     div.innerText='New event';
//     document.body.appendChild(div);
// })

let inputMsg=document.getElementById('inputMsg');
let btn=document.getElementById('btn');
let msgList=document.getElementById('msgList');

btn.onclick = ()=>{
    socket.emit('msg_send',{
        msg:inputMsg.value
    });
};

socket.on('msg_rcv',(data)=>{
    let listMsg=document.createElement('li')
    listMsg.innerText=data.msg;
    msgList.appendChild(listMsg);
})