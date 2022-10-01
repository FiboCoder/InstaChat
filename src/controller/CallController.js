import { useEffect, useRef } from "react";
import { MediaStream, RTCPeerConnection } from "react-native-webrtc";
import CallsUtils from "../utils/CallsUtils";
import { addDoc, collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const CallController = async () =>{

    const configuration = {'iceServers':[{'url':'stun:stun.l.google.com:19302'}]};

    
    const [gettingCall, setGettingCall] = useState(false);
    const pc = useRef(RTCPeerConnection);
    const connecting = useRef(false);

    useEffect(()=>{

        const cRef = doc(db, "meet", "chatId");

        const subscribe = onSnapshot(cRef, (data)=>{

            const snapData = data.data();

            if(pc.current && !pc.current.remoteDescription && snapData && snapData.answer){

                pc.current.setRemoteDescription(new RTCSessionDescription(snapData.answer));
            }

            if(snapData && snapData.offer && !connecting.current){

                setGettingCall(true);
            }
        });

        const calleeRef = collection(db, "meet", "callId", "callee");
        const subscribeDelete =  onSnapshot(calleeRef, (snapshot)=>{

            snapshot.docChanges().forEach(change=>{

                if(change.type == 'removed'){

                    hangup();
                }
            });
        });
        return () =>{

            subscribe();
            subscribeDelete();
        }
    }, []);

    const setupWebrtc = async () => {

        pc.current = new RTCPeerConnection();
    };

    const stream = await CallsUtils.getStream();
    if (stream){

        setLocalStream(stream);
        pc.current.addStream(stream);
    }

    pc.addEventListener( 'addstream', event => {
        // Grab the remote stream from the connected participant.
        setRemoteStream(event.stream);
    } );

    const create = async () => {

        connecting.current = true;

        await setupWebrtc();

        const cRef = doc(db, "meet", "callId");

        collectICECandidates(cRef, "caller", "calleE");

        if(pc.current){

            const offer = await pc.current.createOffer();
            pc.current.setLocalDescription(offer);

            const cWithOffer = {

                offer: {

                    type: offer.type,
                    sdp: offer.sdp,
                },
            };

            addDoc(cRef, cWithOffer);
        }

    };

    const streamCleanUp = async () => {

        if(localStream){

            localStream.getTracks().forEach((t)=> t.stop());
            localStream.release();
        }

        setLocalStream(null);
        setRemoteStream(null);
    };

    const firestoreCleanUp = async () => {

        const cRef = doc(db, "meet", "callId");

        if(cRef){

            calleesRef = getDocs(db, "meet", "callId", "callee").then(result=>{

                results.forEach(result=>{

                    result.ref().delete();
                })
            });

            callersRef = getDocs(db, "meet", "callId", "caller").then(result=>{

                results.forEach(result=>{

                    result.ref().delete();
                })
            });
        }
    }

    const collectICECandidates = async (cRef, localName, remoteName)=>{

        const candidateCollection = cRef.collection(localName);

        if(pc.current){

            pc.current.onicecandidate = (event) => {

                if(event.candidate){

                    candidateCollection.add(event.candidate);
                }
            };
        }

        const remoteNameRef = addDoc(cRef, remoteName);
        remoteNameRef;
        onSnapshot(remoteNameRef, (snapshot)=>{

            snapshot.docChanges().forEach(change=>{

                if(change.type == 'added'){

                    const candidate = new RTCIceCandidate(snapshot.data());
                    pc.current.addIceCandidate(candidate);
                }
            })
        })

    }
    const join = async () => {

        connecting.current = true;
        setGettingCall(false);

        const cRef = doc(db, "meet", "chatId");

        getDoc(cRef).then(result=>{

            const offer = null;
            if(result){

                offer = result.data();
            }

            if(offer){

                setupWebrtc();

                collectICECandidates(cRef, "callee", "caller");

                if(pc.current){

                    pc.current.setRemoteDescription(new RTCSessionDescription(offer));

                    const answer = pc.current.createAnswer();
                    pc.current.setLocalDescription(answer);
                    const cWithAnswer = {

                        answer: {

                            type: answer.type,
                            sdp: answer.sdp
                        },
                    };

                    updateDoc(cRef, cWithAnswer);
                }
            }
        });
    };
    const hangup = async () => {

        setGettingCall(false)

        connecting.current = false;
        streammCleanUp();
        firestoreCleanUp();
        if(pc.current){

            pc.current.close();
        }
    };

}

export default CallController;