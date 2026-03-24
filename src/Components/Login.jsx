import React, { useState } from 'react'
import './Login.css'
import logo from "../Assets/C (1).png";
import { auth } from '../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [signState, setSignState] = useState("Sign In");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const userAuth = async (event) => {
        event.preventDefault();
        try{
            if (signState === "Sign In") {
                await signInWithEmailAndPassword(auth, email, password);
                console.log("Logged In Successfully");
            }
            else {
                await createUserWithEmailAndPassword(auth, email, password);
                console.log("Account Created");
            }
            navigate("/");
        } catch (error) {
            console.error(error.code);
            alert(error.message);
        }
    }

    return (
        <div className="login">
            <img src={logo}  className='login-logo' alt="Cinephile" />
            <div className='login-form'>
                <h1>{signState}</h1>
                <form onSubmit={userAuth}>
                    {signState ==="Sign Up" && (
                        <input 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text" 
                        placeholder='Your Name' 
                         />
                    )}
                    <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" 
                    placeholder='Email'
                    required 
                    />
                    <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" 
                    placeholder='Password'
                    required />
                    <button type="submit">{signState}</button>
                    </form>

                    <div className="form-switch">
                        {signState === "Sign In" ? (
                            <p>New to Cinephile? <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
                            </p>
                        ):(
                            <p>Already have account? <span onClick={() => setSignState("Sign In")} >Sign In Now</span> </p>
                        )

                        }
                    </div>
                </div>

        </div>
    )
}

export default Login