import { auth, db, storage } from "../utils/firebase";
import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, updatePassword } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export class User{

    constructor(){


    }

    getEmail (){ return this._email; }
    setEmail (value){ return this._email = value; }

    getProfileImage (){ return this._profileImage; }
    setProfileImage (value){ return this._profileImage = value; }

    getUsername (){ return this._username; }
    settUsername (value){ return this._username = value; }

    getAboutMe (){ return this._aboutMe; }
    setAboutMe (value){ return this._aboutMe = value; }

    saveUser(){

        return new Promise((resolve, reject)=>{

            setDoc(doc(db, "users", this._email), {

                email: this._email,
                profileImage: this._profileImage,
                username: this._username,
                aboutMe: this._aboutMe

              }).then(result=>{
    
                resolve(result);
              }).catch(err=>{

                reject(err);
              });
        });

        
    }

    static updateUser = (email, imageUrl = "", username = "", aboutMe = "", route) =>{

      return new Promise((resolve, reject)=>{

        if(route == "Image"){

          updateDoc(doc(db, "users", email), {

            profileImage: imageUrl
          }).then(result=>{
  
            resolve(result);
          }).catch(err=>{
  
            reject(err);
          });
        }else if(route == "Username"){

          updateDoc(doc(db, "users", email), {

            username: username
          }).then(result=>{
  
            resolve(result);
          }).catch(err=>{
  
            reject(err);
          });
        }else if(route == "AboutMe"){

          updateDoc(doc(db, "users", email), {

            aboutMe: aboutMe
          }).then(result=>{
  
            resolve(result);
          }).catch(err=>{
  
            reject(err);
          });
        }

        
      });
    }

    static changePassword = (newPassword) =>{

      return new Promise((resolve, reject)=>{

        onAuthStateChanged(auth, (user)=>{

          if(user){

            updatePassword(user, newPassword).then(result=>{

              resolve(result);
            }).catch(err=>{

              let error = err.toString();

              if(err.toString().includes("auth/requires-recent-login")){

                resolve(err)
              }else{

                reject(err)
              }

            });
          }
        })
      });
    }

    static addContact(contactEmail, meEmail){


      return new Promise((resolve, reject)=>{

        const contactRef = doc(db, "users", contactEmail);
        getDoc(contactRef).then(contactData=>{

          if(contactData.exists()){

            setDoc(doc(db, "users", meEmail, "contacts", contactEmail), {

              email: contactEmail
              
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

    static getContacts(meEmail){

      return new Promise((resolve, reject)=>{

        const contactsRef = query(collection(db, "users", meEmail, "contacts"));
        onSnapshot(contactsRef, (contacts)=>{

          if(!contacts.empty){

            resolve(contacts);
          }else{

            reject("Nenhum contato!")
          }
        });
      });
    }

    static uploadPhoto = (email, blob) => {

      return new Promise((resolve, reject)=>{

        let path = 'images/users/' + email + '/profile/' + email + '.jpg';

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
}

