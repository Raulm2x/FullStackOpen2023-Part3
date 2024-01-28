import { useState } from "react"

const LoginForm = ({handleLogin}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onChangeUsername = (event) => (
        setUsername(event.target.value)
    )

    const onChangePassword = (event) => (
        setPassword(event.target.value)
    )

    const login = (event) => {
        event.preventDefault()
        const userData = {
            username,
            password
        }
        handleLogin(userData)
        
        setUsername('')
        setPassword('')
    } 

    return (
        <form onSubmit={login}>
            <h2>Login</h2>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={onChangeUsername}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={onChangePassword}
                /> 
            </div>
            <button type="submit">login</button>      
        </form>
    )
}

export default LoginForm