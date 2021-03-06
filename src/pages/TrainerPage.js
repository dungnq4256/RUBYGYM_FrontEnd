import { Trainer } from "../components"
import { TrainerInfor } from "../components"
import { Header } from "../components"
import { Footer } from "../components"
import React, {useEffect} from "react"
function TrainerPage() {
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
                            <TrainerInfor />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default TrainerPage