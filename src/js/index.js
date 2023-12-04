function addVideoStream(stream) {
    const video = document.getElementById("video");
    video.srcObject = stream;
}

navigator.mediaDevices.enumerateDevices()
    .then(devices => {
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        if (videoDevices.length > 0) {
            const idVideoDevice = JSON.parse(localStorage.getItem("deviceDefault"));;
            const selectedDeviceId = idVideoDevice ? idVideoDevice.id_device: videoDevices[0].deviceId;
            document.getElementById("userName").textContent=idVideoDevice ? idVideoDevice.user_name: "";
            return navigator.mediaDevices.getUserMedia({
                video: { deviceId: selectedDeviceId }
            });
        } else {
            alert('Nenhum dispositivo de vídeo encontrado.')
            console.log('Nenhum dispositivo de vídeo encontrado.');
        }
    })
    .then(addVideoStream)
    .catch(error => console.log('Erro ao obter acesso à câmera:', error));

  
