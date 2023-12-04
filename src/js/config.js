const selecteDevice = document.getElementById("deviceSelect");
const userName = document.getElementById("userName");
const btnSaveConfig = document.getElementById("btnSaveConfig");

function addVideoStream(stream) {
    const video = document.getElementById("video");
    video.srcObject = stream;
}

navigator.mediaDevices.enumerateDevices()
    .then(devices => {

        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        if (videoDevices.length > 0) {
            const idVideoDevice = JSON.parse(localStorage.getItem("deviceDefault"));;
            userName.value=idVideoDevice ? idVideoDevice.user_name: "";

            videoDevices.map(item=>{
               const option =document.createElement('option');
                    option.value = item.deviceId;
                    option.textContent = item.label;
                    idVideoDevice==item.deviceId ? option.selected=true:false;
                    selecteDevice.appendChild(option);
           });

           const selectedDeviceId = idVideoDevice ? idVideoDevice.id_device: videoDevices[1].deviceId;
          
            streamHandler(selectedDeviceId)
        } 
        else {
            alert('Nenhum dispositivo de vídeo encontrado.')
            console.log('Nenhum dispositivo de vídeo encontrado.');
         }
    })


selecteDevice.addEventListener('change', function(e) {
        const device = e.target.value;
        streamHandler(device)
});


function streamHandler(selectedDeviceId){
        return navigator.mediaDevices.getUserMedia({
            video: { deviceId: selectedDeviceId }
        }).then(addVideoStream)
        .catch(error => console.log('Erro ao obter acesso à câmera:', error));    
}


btnSaveConfig.addEventListener('click', function(e) {

     localStorage.removeItem('deviceDefault');  
     const configData = {
        "id_device":selecteDevice.value,
        "user_name":userName.value
     }
    
     localStorage.setItem('deviceDefault',JSON.stringify(configData))
     alert("Configuração efectuada com sucesso!");

     setTimeout(function(){
        window.location.href="index.html";
     },3000)
});
