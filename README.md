You can watch the tutorial for this app.

https://www.youtube.com/channel/UCFyXA9x8lpL3EYWeYhj4C4Q?view_as=subscriber

# 로그인구현 

## 조사

#### App.js

```js
import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import LoginPage from "./views/LoginPage/LoginPage.js";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/login" component={Auth(LoginPage, false)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;

```



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

## 필요부분 복사

#### App.js

```js
import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import AlcolLoginPage from "./views/LoginPage/AlcolLoginPage.js";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/alcolLogin" component={Auth(AlcolLoginPage, false)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;

```



#### AlcolLoginPage

```js
// LoginPage 전체 복사
import { useDispatch } from "react-redux";
import { alcolLoginUser } from "../../../_actions/user_actions";

const dispatch = useDispatch();

function AlcolLoginPage(props) {
	dispatch(alcolLoginUser(dataToSubmit)).then();
}

export default withRouter(AlcolLoginPage);
```

#### user_actions.js

```js
import axios from 'axios';
import {ALCOL_LOGIN_USER} from './types';
import {USER_SERVER} from '../components/Config.js';

export function alcolLoginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then( .... );

    return {
        ......
    }
}
```

#### type

```js
export const ALCOL_LOGIN_USER = 'alcol_login_user';
```

#### user.js

```js
router.post("/alcolLogin", (req, res) => {
```

#### user_actions.js

```js
import axios from 'axios';
import {ALCOL_LOGIN_USER} from './types';
import {USER_SERVER} from '../components/Config.js';

export function alcolLoginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: ALCOL_LOGIN_USER,
        payload: request
    }
}
```

#### user_reducer.js

```js
import {ALCOL_LOGIN_USER} from './types';

export default function(state={},action){
    switch(action.type){
    	case ALCOL_LOGIN_USER:
            return { ...state, loginSucces: action.payload }
    }
}
```

#### loginPage.js

```js
dispatch(AlcolLoginPage(dataToSubmit))
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
