import { auth, db } from "../utils/firebase";
import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export class User{

    constructor(){


    }

    getId (){ return this._id; }
    settId (value){ return this._id = value; }

    getEmail (){ return this._email; }
    setEmail (value){ return this._email = value; }

    getUsername (){ return this._username; }
    settUsername (value){ return this._username = value; }

    getProfileImage (){ return this._profileImage; }
    setProfileImage (value){ return this._profileImage = value; }

    saveUser(){

        return new Promise((resolve, reject)=>{

            setDoc(doc(db, "users", this._email), {

                email: this._email,
                username: this._username,
                profileImage: this._profileImage
                
              }).then(result=>{
    
                resolve(result);
              }).catch(err=>{

                reject(err);
              });
        });

        
    }

    static addContact(contactEmail, meEmail){


      return new Promise((resolve, reject)=>{

        const contactRef = doc(db, "users", contactEmail);
        getDoc(contactRef).then(contactData=>{

          if(contactData.exists()){

            setDoc(doc(db, "users", meEmail, "contacts", contactEmail), {

              email: contactData.data().email,
              username: contactData.data().username,
              profileImage: contactData.data().profileImage
              
            }).then(result=>{
  
              resolve(result);
            }).catch(err=>{

              reject(err);
            });
          }else{

            reject(err);
          }
        });
    });
    }
}

