const wsUri = "wss://ws.ifelse.io/"

const resInput = document.querySelector('.inputText')
const btnSend = document.querySelector('.btnSend')

const btnGeoLocation = document.querySelector('.btnGeo')
const geoLocation = document.querySelector('.geoLocation')
const resMyMessage = document.querySelector('.myMessage')
const resServMessage = document.querySelector('.servMessage')

const websocket = new WebSocket(wsUri); 

var a = 0 // Счетчик сообщений
var b = 0 // необходимый для очистки истории сообщений 

function myLetter(message) {
  if (b !== 0) {  // Очистка истории сообщений
    const myPastMessage = document.querySelector('.myPastMessage')
    resMyMessage.removeChild(myPastMessage)
    b = 0
  }
  resMyMessage.style.display = 'block' // Отображение сообщений 
  let pre = document.createElement("p");
  pre.classList.add('myPastMessage')
  pre.innerHTML = message;
  resMyMessage.appendChild(pre);
  ++b

}
function servLetter(message) {
  if (a !== 0) {
    const servPastMessage = document.querySelector('.servPastMessage')
    resServMessage.removeChild(servPastMessage)
    a = 0
  }
  resServMessage.style.display = 'block'
  let pre = document.createElement("p");
  pre.classList.add('servPastMessage')
  pre.innerHTML = message;
  resServMessage.appendChild(pre)
  ++a
 
}


btnSend.addEventListener('click', () =>{
  const message = resInput.value;    
  myLetter("Вы: " + message);
    websocket.send(message);

    websocket.onmessage = function(evt) {
      servLetter(
        `Сервер: ${evt.data}`
      );
    };
})
const success = (position) => { 
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude

  let txt = document.createElement("p");
  txt.innerHTML = `Широта ${latitude}, Долгота ${longitude}`;
  geoLocation.appendChild(txt)
  geoLocation.style.display = 'block'
}
const error = () =>{
  let txt = document.createElement("p");
  txt.innerHTML = 'Geolocation не поддерживается вашим браузером';
  geoLocation.appendChild(txt)
  geoLocation.style.display = 'block'
}
btnGeoLocation.addEventListener('click', () => {
  if(!navigator.geolocation){
    error()
  } else{
    navigator.geolocation.getCurrentPosition(success, error);
  }
})

