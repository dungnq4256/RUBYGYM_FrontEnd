import React,{useEffect} from 'react'
import { Admin, Footer } from './../components'

function AdminPage() {
    useEffect(() => {
        document.title = 'Trang quản trị viên - RUBYGYM';
      });
    return (
        <>
            <Admin />
            <Footer/>
        </>
    )
}

export default AdminPage
