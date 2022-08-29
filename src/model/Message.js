import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
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
    static find(contactEmail, meEmail){

        return new Promise((resolve, reject)=>{

            getDocs(collection(db, "chats")).then(chats=>{

                resolve(chats);
                
        }).catch(err=>{

            reject(err);
        });
    })};

    //Function to get messages list with a specific contact
    static getMessages(contactEmail, meEmail){

        return new Promise((resolve, reject)=>{

            Message.find(contactEmail, meEmail).then(chat=>{

                const q = query(collection(db, "chats", chat.id, "messages"));
                onSnapshot(q, (messages)=>{

                    console.log(messages.empty)

                    messages.forEach(message=>{

                        console.log(message.data())
                    })
        
                    resolve(messages);
                });  
                
            });
        });
    }


    //Function to send a message to a specific contact
    sendMessage = (contactEmail, meEmail) =>{

        return new Promise((resolve, reject)=>{

            Message.find(contactEmail, meEmail).then(chats=>{

                if(!chats.empty){

                    chats.forEach(chat=>{

                        if(chat.data().users.contactEmail == contactEmail && chat.data().users.meEmail == meEmail){

                            addDoc(collection(db, "chats", chat.id, "messages"),{

                                content: this._message,
                                status: this._status,
                                time: Date.now(),
                                from: this._from,
                                type: this._type
        
                            }).then(result=>{
        
                                resolve(result);
                            }).catch(err=>{
        
                                reject(err);
                            });
                        }else{

                            addDoc(collection(db, "chats"), {

                                users:{contactEmail, meEmail}
                            }).then(result=>{
            
                                addDoc(collection(db, "chats", result.id, "messages"),{
            
                                    content: this._message,
                                    status: this._status,
                                    time: Date.now(),
                                    from: this._from,
                                    type: this._type
            
                                }).then(result=>{
            
                                    resolve(result);
                                }).catch(err=>{
            
                                    reject(err);
                                });
                            }).catch(err=>{
            
                                reject(err);
                            });
                        }
                    })
                }else{

                    addDoc(collection(db, "chats"), {

                        users:{contactEmail, meEmail}
                    }).then(result=>{
    
                        addDoc(collection(db, "chats", result.id, "messages"),{
    
                            content: this._message,
                            status: this._status,
                            time: Date.now(),
                            from: this._from,
                            type: this._type
    
                        }).then(result=>{
    
                            resolve(result);
                        }).catch(err=>{
    
                            reject(err);
                        });
                    }).catch(err=>{
    
                        reject(err);
                    });
                }
            });
        });
    }
}