import {useState, useEffect} from 'react';
import LogoImg from "../../assets/images/logo.svg";
import {Link, useNavigate} from "react-router-dom";
import styles from "./index.module.scss"
import {useLoginUserMutation, useRegisterUserMutation} from "../../redux/http/auth.api";
import {toast, ToastContent} from "react-toastify";
import {useTypedDispatch} from "../../helpers/hooks/useTypedRedux";
import {setUser} from "../../redux/slices/authSlice";

const initialState = {
    name:"",
    last_name:"",
    username:"",
    email:"",
    password:"",
}
const Index = () => {
    const [formValue, setFormValue] = useState(initialState);

    const {name, last_name, username, email, password} = formValue;

    const [showForm, setShowForm] = useState(false);

    const dispatch = useTypedDispatch()

    const navigate = useNavigate()
    const [loginUser, {
        data:loginData,
        isSuccess:isLoginSuccess,
        isError:isLoginError,
        error:loginError}
    ] = useLoginUserMutation()

    const [registerUser, {
        data: registerData,
        isSuccess: isRegisterSuccess,
        isError: isRegisterError,
        error:registerError
    }] = useRegisterUserMutation()
    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormValue((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = async () =>{
        if(email && password){
            await loginUser({email, password})
        }else{
            toast.error("Please fill all input fields!")
        }
    }

    const handleRegister = async () => {

        if(name && last_name && username && email && password){
            await registerUser({name, last_name, username, email, password})
        }
    }

    useEffect(() => {
        if(isLoginSuccess) {
            toast.success("User login successfuly!")
            dispatch(setUser({accessToken:loginData.accessToken,  id:loginData.user.id, name:loginData.user.name,last_name : loginData.user.last_name, photo:loginData.user.photo, username:loginData.user.username }))
            navigate("/personal")
        }
        if(isRegisterSuccess) {
            toast.success("User register successfuly!")
            dispatch(setUser({accessToken:loginData.accessToken, id:loginData.user.id, name:loginData.user.name,last_name : loginData.user.last_name, photo:loginData.user.photo, username:loginData.user.username }))
            navigate("/personal")
        }
    }, [isLoginSuccess, isRegisterSuccess])

    useEffect(() => {
        if(isLoginError){
            toast.error((loginError as any).data.message);
        }

        if(isRegisterError){
            toast.error((registerError as any).data.message);
        }
    }, [isLoginError, isRegisterError])
    return (
        <div style={{height:"100vh",display: "flex", alignItems:"center", justifyContent:"center"}}>
            <div className={styles.register__content}>
                <img src={LogoImg} alt="" className={styles.register__content_img}/>

                {showForm ? (
                    <>
                    <div className={styles.register__content_box}>
                    <label htmlFor="last_name" className={styles.regiter__box_label}>Фамилия</label>
                    <input onChange={handleChange} name="last_name" value={formValue.last_name} className={styles.regiter__box_input}  />
                </div>
                    <div className={styles.register__content_box}>
                        <label htmlFor="name" className={styles.regiter__box_label}>Имя</label>
                        <input onChange={handleChange} name="name" value={formValue.name} className={styles.regiter__box_input}/>
                    </div>
                    <div className={styles.register__content_box}>
                        <label htmlFor="email" className={styles.regiter__box_label}>E-mail</label>
                        <input onChange={handleChange} name="email" value={formValue.email} type="email"  className={styles.regiter__box_input}/>
                    </div>
                    <div className={styles.register__content_box}>
                        <label htmlFor="username" className={styles.regiter__box_label}>Никнейм</label>
                        <input onChange={handleChange} name="username" value={formValue.username}  className={styles.regiter__box_input}/>
                    </div>
                    <div className={styles.register__content_box}>
                        <label htmlFor="password" className={styles.regiter__box_label}>Пароль</label>
                        <input onChange={handleChange} name="password" value={formValue.password} type="password" className={styles.regiter__box_input}/>
                    </div>
                    </>) : (
                        <>
                            <div className={styles.register__content_box}>
                                <label htmlFor="email" className={styles.regiter__box_label}>E-mail</label>
                                <input onChange={handleChange} value={formValue.email} name="email" type="email"  className={styles.regiter__box_input}/>
                            </div>
                            <div className={styles.register__content_box}>
                                <label htmlFor="password" className={styles.regiter__box_label}>Пароль</label>
                                <input onChange={handleChange} value={formValue.password} name="password" type="password" className={styles.regiter__box_input}/>
                            </div>
                        </>
                )

                }

                {showForm ? (<input type="submit" onClick={() => handleRegister()} className={styles.register__content_submit} value="Регистрация"/>) :
                    (<button type="button" onClick={() => handleLogin()} className={styles.register__content_submit}>Войти</button>)}
                {
                    showForm ? (
                        <p className={styles.register__content_question}>Уже есть аккаунт?
                        <button onClick={() => setShowForm(false)} className={styles.regiter__question_link}>Войти</button>
                    </p>) : (
                        <p className={styles.register__content_question}>Нету аккаунта?
                        <button onClick={() => setShowForm(true)} className={styles.regiter__question_link}>Зарегистрироваться</button>
                    </p>
                    )
                }
            </div>
        </div>
    )
}
export default Index
