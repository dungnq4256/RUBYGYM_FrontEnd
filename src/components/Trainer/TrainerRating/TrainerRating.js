import React, { useState, useRef, useEffect } from "react";
import practiceInfoAPI from "../../../api/practiceInfoAPI";
import styles from "./TrainerRating.css";
import clsx from "clsx";
import avatar from "../../../store/imgs/avatar.jpg";
import { Popup } from "./../../";
function TrainerRating(props) {
    const ref = useRef();
    let [showPopup, setShowPopup] = useState(false);
    let [showConfirmFalse, setShowConfirmFalse] = useState(false);
    let [ratingState, setRatingState] = useState({
        id: "",
        height: "160",
        weight: "80",
        bmi: "1.5",
        target: "40kg",
        evaluation: "",
    });
    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (
                props.trigger &&
                ref.current &&
                !ref.current.contains(e.target)
            ) {
                props.setTrigger(false);
            }
        };

        document.addEventListener("click", checkIfClickedOutside, true);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("click", checkIfClickedOutside, true);
        };
    }, [props.trigger]);
    useEffect(() => {
        (async () => {
            ratingState = props.ratingState;
            setRatingState(ratingState);
        })();
    }, [props.trigger]);
    const hanleConfirm = async () => {
        if (ratingState.evaluation == "") {
            setShowConfirmFalse(true);
            console.log(ratingState.evaluation);
            // console.log(ratingState.rating);
        } else {
            console.log(ratingState.evaluation);
            const response = await practiceInfoAPI.updateRating(
                props.ratingState.member_id,
                ratingState
            );
            console.log(response);
            if (response && response.status) {
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                    props.setTrigger(false);
                }, 2000);
            }
            if (response && !response.status && response.message) {
                alert(response.message);
            }
        }
    };
    return props.trigger ? (
        <>
            <div className="TrainerRating-popupWrapper">
                <div className="TrainerRating-popupInner" ref={ref}>
                    <div className="TrainerRating-Header">
                        <div>????nh gi??</div>
                    </div>
                    <div className="TrainerRating-Avatar">
                        <img
                            src={
                                process.env.REACT_APP_API_URL + props.avatarUrl
                            }
                            className="TrainerRating-Avatar-Img"
                        ></img>
                    </div>
                    <div className="TrainerRating-Info">
                        <div className="TrainerRating-Info-1">
                            <div className="TrainerRating-Height">
                                <p>Chi???u cao (cm)</p>
                                <b>{ratingState.height / 10}</b>
                            </div>
                            <div className="TrainerRating-Weight">
                                <p>C??n n???ng (kg)</p>
                                <b>{ratingState.weight / 1000}</b>
                            </div>
                            <div className="TrainerRating-BMI">
                                <p>Ch??? s??? BMI</p>
                                <b>
                                    {Math.round(
                                        (ratingState.weight /
                                            ratingState.height /
                                            ratingState.height) *
                                            10000
                                    ) / 10}
                                </b>
                            </div>
                        </div>
                        <div className="TrainerRating-Info-2">
                            <p>M???c ti??u</p>
                            <b>{ratingState.target}</b>
                        </div>
                        <div className="TrainerRating-Info-3">
                            <p>????nh gi??</p>
                            <textarea
                                v-model="message"
                                value={ratingState.evaluation}
                                onChange={(e) => {
                                    setShowConfirmFalse(false);
                                    setRatingState({
                                        ...ratingState,
                                        evaluation: e.target.value,
                                    });
                                }}
                                placeholder="????nh gi??"
                            ></textarea>
                        </div>
                        {showConfirmFalse ? (
                            <p id="showConfirmFalse">* B???n ch??a ????nh gi??</p>
                        ) : null}
                        <div className="btnRating">
                            <button
                                onClick={hanleConfirm}
                                className="btnSuccessRating"
                            >
                                X??c nh???n
                            </button>
                            <button
                                className="btnCloseRating"
                                onClick={() => {
                                    props.setTrigger(false);
                                }}
                            >
                                H???y
                            </button>
                        </div>
                    </div>
                </div>
                <Popup trigger={showPopup} message="C???p nh???t th??nh c??ng" />
            </div>
        </>
    ) : null;
}
export default TrainerRating;
