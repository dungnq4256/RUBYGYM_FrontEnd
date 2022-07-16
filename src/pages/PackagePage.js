import React, {useEffect} from 'react'
import { Footer, Header, Content_Package} from '../components'

function Package() {
    useEffect(() => {
        document.title = 'Gói tập - RUBYGYM';
      });
    return (
        <>
            <Header />
            <Content_Package />
            <Footer />
        </>
    )
}

export default Package
