import Cookies from 'universal-cookie';
const cookies = new Cookies();
const domain = window.location.hostname;
// LOGIN
export const login = (props, d) => {
    if (d.username === 'user' && d.password === 'password') {
        localStorage.setItem('auth', d)
        props.history.push('/about');
    }
}

// LOGOUT
// export const logout = (props) => {
//     cookies.remove('userGuid')
// }
// LOGIN STATUS
export const isLogin = () => {
    if(domain !== "localhost") {
        if (cookies.get('userGuid')) {
            return true;
        }else{
            return false;
        }
    }
     return true;

}