import Register from "../../../screens/auth/Register";
import { User } from "../../../model/User";
import * as ImagePicker from 'expo-image-picker';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { auth } from "../../../utils/firebase";

const RegisterController = () =>{

    const navigation = useNavigation();

    const [isVisible, setIsVisible] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState('');
    const [username, setUsername] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [registerError, setRegisterError] = useState('');

    const [loading, setLoading] = useState(false);

    const [step, setStep] = useState("first");

    const getImageFromCamera = async () =>{

        setLoading(true);

        let image = await ImagePicker.launchCameraAsync({

            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            base64: true,
            esif: true
        });

        if(!image.cancelled){

            setLoading(false);
            setIsVisible(false);
            setImage(image.uri);
        }
    }

    const getImageFromGallery = async () =>{

        setLoading(true);

        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            base64: true,
            esif: true
          });
      
          console.log(image);
      
          if (!image.cancelled) {

            setLoading(false);
            setIsVisible(false);
            setImage(image.uri);
          }
    }

    const previous = () =>{

        setStep("first");
    }

    const next = () =>{

        if(email.toString() !== ''){

            if(password.toString() !== ''){

                if(confirmPassword.toString() !== ''){

                    if(password.toString() === confirmPassword.toString()){

                        if(password.length >= 6 && confirmPassword.length >= 6){

                            setRegisterError("");
                            setStep("second");
                        }else{

                            setRegisterError("A senha deve conter no mínimo 6 caractéres!")
                        }

                    }else{

                        setRegisterError("As senhas digitas não conferem!");

                    }

                }else{
        
                    setRegisterError("Antes de avançar preencha todos os campos!");
                }
            }else{
    
                setRegisterError("Antes de avançar preencha todos os campos!");
            }
        }else{

            setRegisterError("Antes de avançar preencha todos os campos!");
        }
    }

    const register = async ()=>{

        if(email.toString() !== ''){

            if(password.toString() !== ''){

                if(confirmPassword.toString() !== ''){

                    if(password.toString() === confirmPassword.toString()){

                        if(password.length >= 6 && confirmPassword >= 6){

                            if(username.toString() !== ''){

                                if(aboutMe.toString() !== ''){
    
                                    setRegisterError("");
    
                                    if(image != ''){
    
                                        setLoading(true);
    
                                        let response = await fetch(image);
                                        const blob = await response.blob();
            
                                        User.uploadPhoto(email, blob).then(imageRef=>{
            
                                            createUserWithEmailAndPassword(auth, email, password).then((userCredeantial)=>{
                        
                                                const userData = userCredeantial.user;
                    
                                                let user = new User();
                    
                                                user.setEmail(email);
                                                user.setProfileImage(imageRef);
                                                user.settUsername(username);
                                                user.setAboutMe(aboutMe);
                    
                                                user.saveUser().then(result=>{
                    
                                                    setEmail('');
                                                    setPassword('');
                                                    setConfirmPassword('');
                                                    setImage('');
                                                    setUsername('');
                                                    setAboutMe('');
    
                                                    setLoading(false);
    
                                                    navigation.navigate('LoginScreen');
    
                                                });
                    
                    
                                            }).catch(err=>{
                                    
                                                setLoading(false);
                                                setRegisterError("Erro ao cadastrar usuário, tente novamente.");
                                            });
                                        });
                                    }else{
    
                                        setLoading(true);
            
                                        createUserWithEmailAndPassword(auth, email, password).then((userCredeantial)=>{
                        
                                            const userData = userCredeantial.user;
                
                                            let user = new User();
                
                                            user.setEmail(email);
                                            user.setProfileImage('');
                                            user.settUsername(username);
                                            user.setAboutMe(aboutMe);
                
                                            user.saveUser().then(result=>{
                
                                                setEmail('');
                                                setPassword('');
                                                setConfirmPassword('');
                                                setUsername('');
                                                setAboutMe('');
    
                                                setLoading(false);
    
                                                navigation.navigate('LoginScreen');
    
                                            });
                
                
                                        }).catch(err=>{
                                
                                            console.log(err)
                                            setLoading(false);
                                            setRegisterError("Erro ao cadastrar usuário, tente novamente.");
                                        });
                                    }
                                }else{
    
                                    setRegisterError("Preencha o campo Sobre mim.");
    
                                }
                            }else{
    
                                setRegisterError("Preencha o campo Nome de Usuário.");
    
                            }
                        }else{

                            setRegisterError("A senha deve conter no mínimo 6 caractéres!")
                        }

                        
                    }else{
            
                        setRegisterError("As senhas digitadas não conferem!");
                    }
                }else{
        
                    setRegisterError("Preencha o campo Confirmar Senha.");
                    
                }
            }else{
    
                setRegisterError("Preencha o campo Senha.");
                
            }
        }else{

            setRegisterError("Preencha o campo E-mail.");
        }
    }

    return(

        <Register
        
            setEmail={setEmail}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            setUsername={setUsername}
            setAboutMe={setAboutMe}

            email={email}
            password={password}
            image={image}
            username={username}
            aboutMe={aboutMe}
            confirmPassword={confirmPassword}
            registerError={registerError}

            loading={loading}

            step={step}

            previous={previous}
            next={next}

            register={register}

            isVisible={isVisible}
            setIsVisible={setIsVisible}

            getImageFromCamera={getImageFromCamera}
            getImageFromGallery={getImageFromGallery}


        
        ></Register>
    );
}

export default RegisterController;