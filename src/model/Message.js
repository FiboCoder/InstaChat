import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc } from "firebase/firestore";
import { connectStorageEmulator, getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";
import { db, storage } from "../utils/firebase";

export class Message{

    constructor(){
    }

    getMessage(){ return this._message; }
    setMessage(value){ return this._message = value;}

    getTime(){ return this._time; }
    setTime(value){ return this._time = value;}

    getStatus(){ return this._status; }
    setStatus(value){ return this._status = value;}

    getType(){ return this._type; }
    setType(value){ return this._type = value;}

    getFrom(){ return this._from; }
    setFrom(value){ return this._from = value;}

    //Function to find chat with specific contact
    static findMeChat(meEmail){

        return new Promise((resolve, reject)=>{

            getDocs(collection(db, "users", meEmail, "chats")).then(chats=>{

                resolve(chats);
                
        }).catch(err=>{

            reject(err);
        });
    })};

    static saveToMe(contactEmail, meEmail, chatId, message){

        let resolveArray = [];

        return new Promise((resolve, reject)=>{

            addDoc(collection(db, "users", meEmail, "chats", chatId, "messages"),{

                content: message.content,
                status: message.status,
                time: message.time,
                from: message.from,
                type: message.type

            }).then(messageData=>{

                resolveArray.push(messageData);

                Message.saveToContact(contactEmail, meEmail, chatId, messageData.id, message).then(result=>{

                    resolveArray.push(result);
                });

                const messageRef = doc(db, "users", meEmail, "chats", chatId, "messages", messageData.id);
                updateDoc(messageRef, {

                    status: 'sent'
                }).then(result=>{

                    console.log("MESSAGE RESULT" + result)

                    updateDoc(doc(db, "users", meEmail, "chats", chatId),{

                        lastMessage: message
                    });
                    
                }).catch(err=>{

                    reject(err);
                });

            }).catch(err=>{

                reject(err);
            });

            resolve(resolveArray);
        });
    }

    static saveToContact(contactEmail, meEmail, chatId, messageId, message){

        return new Promise((resolve, reject)=>{

            setDoc(doc(db, "users", contactEmail, "chats", chatId), {

                users: [meEmail, contactEmail],
                type: "single",
                lastMessage: message
            }).then(result=>{

                setDoc(doc(db, "users", contactEmail, "chats", chatId, "messages", messageId), message).then(messageData=>{

                    resolve(messageData);
    
                    const messageRef = doc(db, "users", contactEmail, "chats", chatId, "messages", messageId);
                    updateDoc(messageRef, {
    
                        status: 'sent'
                    }).then(result=>{

                        updateDoc(doc(db, "users", contactEmail, "chats", chatId),{

                            lastMessage: message
                        });
    
                    }).catch(err=>{
    
                        reject(err);
                    });
    
                }).catch(err=>{
    
                    reject(err);
                });
            });

            
        });
    }


    //Function to send a message to a specific contact
    sendMessage = (contactEmail, meEmail, chatId = "", route) =>{

        return new Promise((resolve, reject)=>{

            Message.findMeChat(meEmail).then(chats=>{

                let message = {

                    content: this._message,
                    status: this._status,
                    time: Date.now(),
                    from: this._from,
                    type: this._type
                }

                if(route == "Contact_List"){

                    console.log(contactEmail, meEmail, chatId, route);

                    if(!chats.empty){

                        chats.forEach(chat=>{
    
                            
    
                            if(chat.data().users[0] == contactEmail && chat.data().users[1] == meEmail){
    
    
                                Message.saveToMe(contactEmail, meEmail, chat.id, message).then(result=>{
    
                                    resolve(result);
                                });
                            }else{
    
                                addDoc(collection(db, "users", meEmail, "chats"),{
    
                                    users: [contactEmail, meEmail],
                                    type: "single",
                                    lastMessage: message
                                }).then(chat=>{
    
                                    Message.saveToMe(contactEmail, meEmail, chat.id, message).then(result=>{
    
                                        resolve(result);
    
                                    });
                                });
                            }
                        });
                    }else{
    
                        addDoc(collection(db, "users", meEmail, "chats"),{
    
                            users: [contactEmail, meEmail],
                            type: "single",
                            lastMessage: message
    
                        }).then(chat=>{
    
                            Message.saveToMe(contactEmail, meEmail, chat.id, message).then(result=>{
    
                                resolve(result);
    
                            });
                        });
                    }
                }else if(route == "Chat_Single"){

                    chats.forEach(chat=>{

                        if(chat.id == chatId){


                            Message.saveToMe(contactEmail, meEmail, chat.id, message).then(result=>{

                                resolve(result);
                            });
                        }
                    });
                }
            });
        });
    }

    sendMessageToGroup = (meEmail, groupUsersList, chatId) => {

        return new Promise((resolve, reject)=>{

            let resolveArray = [];
            let rejectArray = [];

            let message = {

                content: this._message,
                status: this._status,
                time: Date.now(),
                from: this._from,
                type: this._type
            }

            addDoc(collection(db, "users", meEmail, "chats", chatId, "messages"), {

                content: message.content,
                status: message.status,
                time: message.time,
                from: message.from,
                type: message.type
            }).then(messageData=>{

                resolveArray.push(messageData);

                updateDoc(doc(db, "users", meEmail, "chats", chatId, "messages", messageData.id),{

                    status: 'sent'
                }).then(result=>{

                    resolveArray.push(result);

                });

                groupUsersList.forEach(email=>{

                    if(email != meEmail){

                        setDoc(doc(db, "users", email, "chats", chatId, "messages", messageData.id), {

                            content: message.content,
                            status: message.status,
                            time: message.time,
                            from: message.from,
                            type: message.type
                        }).then(result=>{

                            resolveArray.push(result);

                            updateDoc(doc(db, "users", email, "chats", chatId, "messages", messageData.id),{

                                status: 'sent'
                            }).then(result=>{

                                updateDoc(doc(db, "users", meEmail, "chats", chatId),{

                                    lastMessage: {

                                        content: message.content,
                                        status: message.status,
                                        time: message.time,
                                        from: message.from,
                                        type: message.type
                                    }
                                });

                                resolveArray.push(result);
                            });
                        });
                    }else{

                        
                    }

                    
                });
            });

            resolve(resolveArray);
        });
    }

    static uploadPhoto = (chatId, blob) =>{

        return new Promise((resolve, reject)=>{

            let imageId = (Math.floor(Math.random() * 1000000000000).toString() + Date.now().toString());

            let path = 'images/chats/' + chatId + '/' + imageId + '.jpg';

            let imageRef = ref(storage, path);
    
            uploadBytes(imageRef, blob).then(snapshot=>{
    
                getDownloadURL(imageRef).then(url=>{

                    resolve(url);
                });
            }).catch(err=>{

                reject(err);
            });
        });
    }

    static createGroup(meEmail, groupUsersList){

        return new Promise((resolve, reject)=>{

            addDoc(collection(db, "users", meEmail, "chats"), {

                users: groupUsersList,
                type: "group",
                groupName: "",
                groupProfileImage: "",
                lastMessage: []
            }).then(chat=>{

                groupUsersList.forEach(userEmail=>{

                    setDoc(doc(db, "users", userEmail, "chats", chat.id), {

                        users: groupUsersList,
                        type: "group",
                        groupName: "",
                        groupProfileImage: "",
                        lastMessage: []
                    }).then(result=>{

                        resolve(result)
                    });
                });
            });
        });
    }
}