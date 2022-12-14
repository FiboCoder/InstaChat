import Login from "../../../screens/auth/Login";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../utils/firebase";

const LoginController = (props) =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);

    const login = ()=>{

        

        console.log(email)

        if(email.toString() !== ''){

            if(password.toString() !== ''){

                setLoading(true);

                setLoginError('');
    
                signInWithEmailAndPassword(auth, email, password).then((userCredeantial)=>{
    
                    const user = userCredeantial.user;

                    setEmail('');
                    setPassword('');
                    props.signIn({user});
                    setLoading(false);

                }).catch(err=>{
        
                    console.log(err)
                    setLoginError("Erro ao fazer login, tente novamente.");
                    setLoading(false);

                });
        
            }else{
    
                setLoginError("Preencha o campo Senha.");

            }
        }else{

            setLoginError("Preencha o campo E-mail.");
        }
    }

    return(

        <Login

            setEmail={setEmail}
            setPassword={setPassword}

            email={email}
            password={password}
            loginError={loginError}

            loading={loading}
            
            login={login}
        ></Login>
    );
}

export default LoginController;