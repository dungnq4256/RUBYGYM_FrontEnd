import React, {useEffect} from "react";
import { Header, CustomerInfor, Footer } from "../components";
function CustomerPage() {
    useEffect(() => {
        document.title = 'Thông tin cá nhân - RUBYGYM';
      });
    return (
        <>
            <Header />
            <div className="grid wide">
                <div className="row">
                    <div className="col l-10 l-o-1">
                        <div 
                            style={{
                                marginTop: '90px'
                            }}
                        >
                            <CustomerInfor />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default CustomerPage