import Login from "../../screens/auth/Login";

const LoginController = () =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const login = ()=>{

        if(email.toString() !== ''){

            if(password.toString() !== ''){

                setLoginError('');
    
                signInWithEmailAndPassword(auth, email, password).then((userCredeantial)=>{
    
                    const user = userCredeantial.user;

                    setEmail('');
                    setPassword('');
                    props.signIn({email});

                }).catch(err=>{
        
                    console.log(err)
                    setLoginError("Erro ao fazer login, tente novamente.");
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
            login={login
            }
        ></Login>
    );
}

export default LoginController;