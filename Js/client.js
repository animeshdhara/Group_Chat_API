const socket=io('http://localhost:8000',{transports:['websocket']});
const audio=new Audio('ting.mp3');



const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector('.container');
const timeObj=document.getElementById('time');
function showTime(){
    const time=new Date;
    const clock=time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
    timeObj.innerHTML=clock;
}

setInterval(showTime,1000);
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();//New page is not loaded.
    const message=messageInput.value;
    const time=new Date;
    append(`You: ${message}\n${time.getHours()}:${time.getMinutes()} - ${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}`,'right')
    socket.emit('send',message);
    messageInput.value=null;
})

const name= prompt("Enter your name to join");
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    const time=new Date;
    append(`${name} joined the chat\n${time.getHours()}: ${time.getMinutes()} - ${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}`,'left');
})
socket.on('receive',data=>{
    const time=new Date;
    append(`${data.name}: ${data.message}\n${time.getHours()}:${time.getMinutes()} - ${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}`,'left');
})

socket.on('left',name=>{
    const time=new Date;
    append(`${name} left the chat\n${time.getHours()}:${time.getMinutes()} - ${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}`,'left');
})