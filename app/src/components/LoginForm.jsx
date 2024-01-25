const LoginForm = (props) => {
    const {
        onSubmit, 
        username, onChangeUsername,
        password, onChangePassword
    } = props
    return (
        <form onSubmit={onSubmit}>
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