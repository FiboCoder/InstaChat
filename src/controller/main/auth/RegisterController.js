import Register from "../../../screens/auth/Register";
import { User } from "../../../model/User";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { auth } from "../../../utils/firebase";

const RegisterController = () =>{

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerError, setRegisterError] = useState('');

    const register = ()=>{

        if(email.toString() !== ''){

            if(password.toString() !== ''){

                if(confirmPassword.toString() !== ''){

                    if(password.toString() === confirmPassword.toString()){

                        setRegisterError("");
            
                        createUserWithEmailAndPassword(auth, email, password).then((userCredeantial)=>{
            
                            const userData = userCredeantial.user;

                            let user = new User();

                            user.settId(email);
                            user.setEmail(email);
                            user.settUsername('Nome de usuário');
                            user.setProfileImage('');

                            user.saveUser().then(result=>{

                                setEmail('');
                                setPassword('');
                                setConfirmPassword('');
                            });

                            navigation.navigate('LoginScreen')

                        }).catch(err=>{
                
                            setRegisterError("Erro ao cadastrar usuário, tente novamente.");
                        });
            
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

            email={email}
            password={password}
            confirmPassword={confirmPassword}
            registerError={registerError}

            register={register}
        
        ></Register>
    );
}

export default RegisterController;