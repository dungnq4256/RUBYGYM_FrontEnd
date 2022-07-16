import React, {useEffect} from 'react'
import { Login, Footer } from '../components'

function Loginpage() {
    useEffect(() => {
        document.title = 'Đăng nhập - RUBYGYM';
      });
    return (
        <>
            <Login />
            <Footer />
        </>
    )
}

export default Loginpage
