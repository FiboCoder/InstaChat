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

    static getUser(){

      onAuthStateChanged(auth, (user)=>{

        if(user){

          return user;
        }
      })
    }

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

    addContact(contactEmail, meEmail){


      return new Promise((resolve, reject)=>{

        const docRef = doc(db, "users", contactEmail);
        getDoc(docRef).then(data=>{

          if(data.exists()){

            setDoc(doc(db, "users", meEmail, "contacts", contactEmail), {

              email: data.data().email,
              username: data.data().username,
              profileImage: data.data().profileImage
              
            }).then(result=>{
  
              resolve(result);
            }).catch(err=>{

              reject(err);
            });
          }
        });
    });
    }
}

