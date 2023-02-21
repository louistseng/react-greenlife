//存放我們的動作
export const USER = 'USER';
export function setUser(data) {
    console.log(data)
    return {
        type: USER,
        data
    }
}