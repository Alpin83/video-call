const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startCallButton = document.getElementById('startCall');
const endCallButton = document.getElementById('endCall');

let localStream;
let remoteStream;
let peerConnection;

const configuration = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
    ]
};

startCallButton.onclick = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;

    peerConnection = new RTCPeerConnection(configuration);
    peerConnection.addStream(localStream);

    peerConnection.onaddstream = (event) => {
        remoteVideo.srcObject = event.stream;
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // Simulasi pengiriman offer dan menerima answer
    // Di aplikasi nyata, Anda perlu menggunakan server signaling
    const answer = await simulateSignaling(offer);
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
};

endCallButton.onclick = () => {
    peerConnection.close();
    localStream.getTracks().forEach(track => track.stop());
};

async function simulateSignaling(offer) {
    // Simulasi pengiriman dan penerimaan offer/answer
    return new Promise((resolve) => {
        setTimeout(() => {
            const answer = {
                type: 'answer',
                sdp: offer.sdp // Simulasi, seharusnya Anda membuat SDP yang valid
            };
            resolve(answer);
        }, 1000);
    });
}