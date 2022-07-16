import React, {useEffect} from 'react'
import { Footer, Header } from '../components'
import { ChangePassword } from '../components'

function ChangePasswordPage() {
    useEffect(() => {
        document.title = 'Đổi mật khẩu - RUBYGYM';
      });
    return (
        <>
            <Header />
            <ChangePassword />
            <Footer />
        </>
    )
}

export default ChangePasswordPage