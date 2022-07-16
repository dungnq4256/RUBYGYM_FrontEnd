import React, {useEffect} from 'react'
import { Footer, Header, Content_Event} from '../components'

function Event() {
    useEffect(() => {
        document.title = 'Sự kiện - RUBYGYM';
      });
    return (
        <>
            <Header />
            <Content_Event />
            <Footer />
        </>
    )
}

export default Event
