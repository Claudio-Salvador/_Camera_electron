function addVideoStream(stream) {
    const video = document.getElementById("video");
    video.srcObject = stream;
}

// Obtém informações sobre os dispositivos de vídeo disponíveis
navigator.mediaDevices.enumerateDevices()
    .then(devices => {
        // Filtra apenas os dispositivos de vídeo
        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        // Se houver pelo menos um dispositivo de vídeo
        if (videoDevices.length > 0) {
            // Pode escolher o primeiro dispositivo de vídeo disponível
            const selectedDeviceId = videoDevices[0].deviceId;

            // Solicita permissão para acessar a câmera escolhida
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
