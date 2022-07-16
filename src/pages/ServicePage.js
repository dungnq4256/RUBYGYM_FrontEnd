import React, {useEffect} from 'react'
import { Footer, Header, Content_Service} from '../components'

function Service() {
    useEffect(() => {
        document.title = 'Dịch vụ - RUBYGYM';
      });
    return (
        <>
            <Header />
            <Content_Service />
            <Footer />
        </>
    )
}

export default Service
