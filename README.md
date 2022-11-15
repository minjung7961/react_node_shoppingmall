You can watch the tutorial for this app.

https://www.youtube.com/channel/UCFyXA9x8lpL3EYWeYhj4C4Q?view_as=subscriber

# 로그인구현 

## 조사

#### loginPage.js

```js
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_actions";

const dispatch = useDispatch();

function LoginPage(props) {
	dispatch(loginUser(dataToSubmit)).then();
}
```

#### user.js

```js
router.post("/login",(req,res) => {})
```

#### user_actions.js

```js
import axios from 'axios';
import {LOGIN_USER} from './types';
import {USER_SERVER} from '../components/Config.js';

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}
```

#### type

```js
export const LOGIN_USER = 'login_user';
```

#### user_reducer.js

```js
import {LOGIN_USER} from './types';

export default function(state={},action){
    switch(action.type){
    	case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
    }
}
```

#### loginPage.js

```js
dispatch(loginUser(dataToSubmit))
.then(response => {
    if (response.payload.loginSuccess) {
        window.localStorage.setItem('userId', response.payload.userId);
        if (rememberMe === true) {
            window.localStorage.setItem('rememberMe', values.id);
        } else {
            localStorage.removeItem('rememberMe');
        }
        props.history.push("/");
    } else {
        setFormErrorMessage('Check out your Account or Password again')
    }
})
    .catch(err => {
    setFormErrorMessage('Check out your Account or Password again')
    setTimeout(() => {
        setFormErrorMessage("")
    }, 3000);
});
```

#### 
