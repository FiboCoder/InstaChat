import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

export class Message{

    constructor(){
    }

    getId(){ return this._id; }
    setId(value){ return this._id = value;}

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

        return new Promise((resolve, reject)=>{

            addDoc(collection(db, "users", meEmail, "chats", chatId, "messages"),{

                content: message.content,
                status: message.status,
                time: message.time,
                from: message.from,
                type: message.type

            }).then(messageData=>{

                Message.saveToContact(contactEmail, meEmail, chatId, messageData.id, message).then(result=>{

                });

                const messageRef = doc(db, "users", meEmail, "chats", chatId, "messages", messageData.id);
                updateDoc(messageRef, {

                    status: 'sent'
                }).then(result=>{

                    console.log(result)
                    
                }).catch(err=>{

                    reject(err);
                });

            }).catch(err=>{

                reject(err);
            });
        });
    }

    static saveToContact(contactEmail, meEmail, chatId, messageId, message){

        return new Promise((resolve, reject)=>{

            setDoc(doc(db, "users", contactEmail, "chats", chatId), {

                users: [meEmail, contactEmail]
            }).then(result=>{

                setDoc(doc(db, "users", contactEmail, "chats", chatId, "messages", messageId),message).then(messageData=>{

                    resolve(messageData);
    
                    const messageRef = doc(db, "users", contactEmail, "chats", chatId, "messages", messageId);
                    updateDoc(messageRef, {
    
                        status: 'sent'
                    }).then(result=>{
    
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
    sendMessage = (contactEmail, meEmail,) =>{

        return new Promise((resolve, reject)=>{

            Message.findMeChat(meEmail).then(chats=>{

                let message = {

                    content: this._message,
                    status: this._status,
                    time: Date.now(),
                    from: this._from,
                    type: this._type
                }

                console.log(chats.empty)

                if(!chats.empty){

                    chats.forEach(chat=>{

                        if(chat.data().users[0] == contactEmail && chat.data().users[1] == meEmail){


                            Message.saveToMe(contactEmail, meEmail, chat.id, message).then(result=>{


                            });
                        }else{

                            addDoc(collection(db, "users", meEmail, "chats"),{

                                users: [contactEmail, meEmail]
                            }).then(chat=>{

                                Message.saveToMe(contactEmail, meEmail, chat.id, message).then(result=>{


                                });
                            });
                        }
                    });
                }else{

                    addDoc(collection(db, "users", meEmail, "chats"),{

                        users: [contactEmail, meEmail]

                    }).then(chat=>{

                        Message.saveToMe(contactEmail, meEmail, chat.id, message).then(result=>{


                        });
                    });
                }
            });
        });
    }
}