You can watch the tutorial for this app.

https://www.youtube.com/channel/UCFyXA9x8lpL3EYWeYhj4C4Q?view_as=subscriber

# 로그인구현 

## auth  mysql 연동하자

#### App.js

```js
import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import alcolAuth from "../hoc/alcolAuth";
import AlcolLoginPage from "./views/LoginPage/AlcolLoginPage.js";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/login" component={alcolAuth(AlcolLoginPage, false)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;

```



#### hoc/auth.js

```js
import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";

export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            //To know my current status, send Auth request 
            dispatch(auth()).then(response => {
            })

        }, [])

        return (
            <SpecificComponent {...props} user={user} />
        )
    }
    return AuthenticationCheck
}
```

#### user_actions.js

```js
import axios from 'axios';
import {AUTH_USER} from './types';
import {USER_SERVER} from '../components/Config.js';

export function alcolAuth(){
    const request = axios.get(`${USER_SERVER}/alcolAuth`)
    
     ....
     
}
```

#### type

```js
export const ALCOL_AUTH_USER = 'alcol_auth_user';
```

#### user.js

```js
const express = require('express');
const router = express.Router();
const { alcolAuth } = require("../middleware/alcolAuth");

router.get("/alcolAuth", (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        cart: req.user.cart
    });
});
```

#### midleware/alcolAuth.js

```js
const { User } = require('../models/User');

let alcolAuth = (req, res, next) => {
  let token = req.cookies.w_auth;

  getConnection((conn) => {
    (async() => {
      try {
        let id = '1636956783';
        let sql = " SELECT certreqid FROM ln_auth_feature WHERE certreqid = ? \n";
        let results = await exec_sql(conn, sql, id);
        console.log(results);
        console.log(results.length);
        console.log(results[0].certreqid);
        req.alcolUserId = results[0].certreqid;
      } catch(err){
      } finally{
        conn.release();
      }
    })();
  })
    
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { alcolAuth };
```

#### user_actions.js

```js
import axios from 'axios';
import {AUTH_USER} from './types';
import {USER_SERVER} from '../components/Config.js';

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}
```

#### user_reducer.js

```js
import {AUTH_USER} from './types';

export default function(state={},action){
    switch(action.type){
    	case AUTH_USER:
            return { ...state, loginSucces: action.payload }
    }
}
```

#### hoc/alcolAuth.js

```js
import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";

export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            //To know my current status, send Auth request 
            dispatch(auth()).then(response => {
                ////
                //Not Loggined in Status 
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/login')
                    }
                    //Loggined in Status 
                } else {
                    //supposed to be Admin page, but not admin person wants to go inside
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    }
                    if(adminRoute){
                        console.log("admin");
                    }
                    //Logged in Status, but Try to go into log in page 
                    else {
                        if (option === false) {
                            props.history.push('/')
                        }
                    }
                }
                ////
            })

        }, [])

        return (
            <SpecificComponent {...props} user={user} />
        )
    }
    return AuthenticationCheck
}
```

## 추후에 할것

* redux 에 잘 등록되었는지 확인하고 
* 장바구니 mariadb 테이블 만들고 한번 구현해보자

