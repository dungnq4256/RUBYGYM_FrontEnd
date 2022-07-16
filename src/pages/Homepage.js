import React, {useEffect} from 'react'
import { Banner, Footer, Header, Content} from '../components'

function Homepage() {
    useEffect(() => {
        document.title = 'Trang chủ - RUBYGYM';
      });
    return (
        <>
            <Header />
            <Banner />
            <Content />
            <Footer />
            {/* <Timetablee /> */}
        </>
    )
}

export default Homepage
