import { db } from "../utils/Firebase";
import { doc, setDoc } from "firebase/firestore";

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

    static saveUser(){

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

    static saveContact(){


    }
}

