export default class CallsUtils{

    static async getStream(){

        let isFront = true;
        const sourceInfos = await mediaDevices.enumeratedDevices();

        let videoSourceId;
        for (let i = 0; i < sourceInfos.length; i++){

            const sourceInfo = sourceInfos[i];
            if(sourceInfo.kind == 'videoinput' && sourceInfo.facing == (isFront ? 'front' : 'environment')){

                videoSourceId = sourceInfo.deviceId;
            }
        }

        const stream = await mediaDevices.getUserMedia({

            audio: true,
            video: {

                width: 640,
                height: 480,
                frameRate: 30,
                facingMode: isFront ? 'user' : 'environmenmt',
                deviceId: videoSourceId,
            },

        });

        if(typeof stream != 'boolean') return stream;
        return null;
    }
}