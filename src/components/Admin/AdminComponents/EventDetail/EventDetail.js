import React, { useState, useEffect } from "react";
import "./EventDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import Popup from '../../../Popup/Popup'
import eventAPI from "../../../../api/eventAPI";
import userProfileAPI from "./../../../../api/userProfileAPI";

function EventDetail(props) {
    const navigate = useNavigate();
    let [isPTag, setPTag] = useState(true);
    let [showPopup, setShowPopup] = useState(false);
    let [eventInfor, setEventInfor] = useState({
        id: '',
        title: '',
        detail_title: '',
        content: '',
        start_time: new Date(),
        finish_time: '',
        thumbnail_image_url: '',
        detail_image_url: ''
    });
    let [eventInforOnChange, setEventInforOnChange] = useState({
        id: '',
        title: '',
        detail_title: '',
        content: '',
        start_time: '',
        finish_time: '',
        thumbnail_image_url: '',
        detail_image_url: ''
    });
    const handleEdit = () => {
        setPTag(false);
    };
    const handleCancel = () => {
        setPTag(true);
        setEventInforOnChange({...eventInfor});
    };
    
    const handleUpdate = async () => {
        //console.log(eventInforOnChange);
        const response = await eventAPI.updateEvent(eventInfor.id, eventInforOnChange);
        //console.log(response);
        if (response && response.status) {
            setShowPopup((prev) => !prev);
            setEventInfor({...eventInforOnChange});
            setPTag(true);
            setTimeout(() => {
                setShowPopup((prev) => !prev);
            }, 1000);
        }
        if (response && !response.status && response.message) {
            alert(response.message);
        }
    };

    const { id } = useParams();

    useEffect(() => {
        (async () => {
            console.log("hi", id);
            const res = await eventAPI.eventDetail(id);
            console.log(res);
            eventInfor = res.data.data;
            eventInforOnChange = res.data.data;
            setEventInfor(eventInfor);
            setEventInforOnChange(eventInforOnChange);
        })();
    }, []);
    // Edit Avatar
    const handleEditImage = async (e) => {
        console.log(e.target.id);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        const response = await userProfileAPI.updateAvatar(formData);

        if (e.target.id == 'thumbnailImageChoose') {
            eventInforOnChange = {
                ...eventInforOnChange,
                thumbnail_image_url:response.data.data.imageURL
            }
            setEventInforOnChange(eventInforOnChange);
            console.log(eventInforOnChange);
        }
        else {
            eventInforOnChange = {
                ...eventInforOnChange,
                detail_image_url:response.data.data.imageURL
            }
            setEventInforOnChange(eventInforOnChange);
            console.log(eventInforOnChange);
        }
    };
    return (
        <div className="event-detail-wrapperr">
            <div className="event-detail-header">
                <h1 className="event-headingg">S??? KI???N</h1>
                {isPTag && (
                    <button onClick={handleEdit} className="event-edit-btn">
                        Ch???nh s???a
                    </button>
                )}
            </div>
            <div className="event-detail-content">
                {/* ???nh s??? ki???n */}
                <h2>???nh s??? ki???n</h2>
                <div className={isPTag ? "img-event" : "img-event edit-active"}>
                    <div className="thumbnail-img-event">
                        <img src={process.env.REACT_APP_API_URL + eventInforOnChange.thumbnail_image_url} alt="" />
                        {!isPTag && (
                            <div>
                                <label className="thumbnail-img-btn" htmlFor="thumbnailImageChoose">
                                <i class="fal fa-camera"></i>
                            </label>
                            <input
                            type="file"
                            id="thumbnailImageChoose"
                            hidden
                            onChange={handleEditImage}
                        />
                            </div>
                        )}
                        <div>(350 x 250)</div>
                    </div>
                    <div className="detail-img-event">
                        <img src={process.env.REACT_APP_API_URL + eventInforOnChange.detail_image_url} alt="" />
                        {!isPTag && (
                            <div>
                                <label className="detail-img-btn" htmlFor="detailImageChoose">
                                <i class="fal fa-camera"></i>
                            </label>
                            <input
                            type="file"
                            id="detailImageChoose"
                            hidden
                            onChange={handleEditImage}
                        />
                            </div>
                        )}
                        <div>(1080 x 480)</div>
                    </div>
                </div>

                {/* Ti??u ????? */}
                <h2>Ti??u ?????</h2>
                {isPTag ? 
                    <div className={isPTag ? "infor-event" : "infor-event edit-active"}>
                        {eventInfor.title}
                    </div>
                    : <input className="infor-event edit-active" type="text"
                        value={eventInforOnChange.title}
                        onChange={(e) => {
                            eventInforOnChange = {
                                title: e.target.value,
                                detail_title: eventInforOnChange.detail_title,
                                content: eventInforOnChange.content,
                                start_time: eventInforOnChange.start_time,
                                finish_time: eventInforOnChange.finish_time,
                                thumbnail_image_url: eventInforOnChange.thumbnail_image_url,
                                detail_image_url: eventInforOnChange.detail_image_url
                            }
                            setEventInforOnChange(eventInforOnChange);
                            // //console.log(eventInforOnChange);
                        }}                
                    ></input>
                }

                {/* Ti??u ????? chi ti???t */}
                <h2>Ti??u ????? chi ti???t</h2>
                {isPTag ? 
                <div className="infor-event">
                    {eventInfor.detail_title}
                </div> 
                : <input className="infor-event edit-active" type="text"
                    value={eventInforOnChange.detail_title}
                    onChange={(e) => {
                        eventInforOnChange = {
                            title: eventInforOnChange.title,
                            detail_title: e.target.value,
                            content: eventInforOnChange.content,
                            start_time: eventInforOnChange.start_time,
                            finish_time: eventInforOnChange.finish_time,
                            thumbnail_image_url: eventInforOnChange.thumbnail_image_url,
                            detail_image_url: eventInforOnChange.detail_image_url
                        }
                        setEventInforOnChange(eventInforOnChange);
                        // //console.log(eventInforOnChange);
                    }}                
                ></input>}

                {/* Th???i gian */}
                <div className="time-event">
                    <div className="start-time">
                        <h2>Ng??y b???t ?????u</h2>
                        <input type='date' disabled={isPTag} className={isPTag ? "infor-event" : "infor-event edit-active"}
                            value={isPTag ? eventInfor.start_time.toString().substring(0, 10) : eventInforOnChange.start_time.toString().substring(0, 10)}
                            onChange={(e) => {
                                eventInforOnChange = {
                                    title: eventInforOnChange.title,
                                    detail_title: eventInforOnChange.detail_title,
                                    content: eventInforOnChange.content,
                                    start_time: e.target.value,
                                    finish_time: eventInforOnChange.finish_time,
                                    thumbnail_image_url: eventInforOnChange.thumbnail_image_url,
                                    detail_image_url: eventInforOnChange.detail_image_url
                                }
                                setEventInforOnChange(eventInforOnChange);
                                // //console.log(eventInforOnChange);
                            }}
                        ></input>
                    </div>
                    <div className="finish-time">
                        <h2>Ng??y k???t th??c</h2>
                        <input type='date' disabled={isPTag} className={isPTag ? "infor-event" : "infor-event edit-active"}
                            value={isPTag ? eventInfor.finish_time.toString().substring(0, 10) : eventInforOnChange.finish_time.toString().substring(0, 10)}
                            onChange={(e) => {
                                eventInforOnChange = {
                                    title: eventInforOnChange.title,
                                    detail_title: eventInforOnChange.detail_title,
                                    content: eventInforOnChange.content,
                                    start_time: eventInforOnChange.start_time,
                                    finish_time: e.target.value,
                                    thumbnail_image_url: eventInforOnChange.thumbnail_image_url,
                                    detail_image_url: eventInforOnChange.detail_image_url
                                }
                                setEventInforOnChange(eventInforOnChange);
                                // //console.log(eventInforOnChange);
                            }}
                        ></input>
                    </div>
                </div>

                {/* N???i dung */}
                <h2>N???i dung</h2>
                {isPTag ? 
                    <div className={isPTag ? "infor-event" : "infor-event edit-active"}>
                        {eventInfor.content}
                    </div> :
                    // : <input className="infor-event edit-active" type="text"
                    //     value={eventInforOnChange.content}
                    //     onChange={(e) => {
                    //         eventInforOnChange = {
                    //             title: eventInforOnChange.title,
                    //             detail_title: eventInforOnChange.detail_title,
                    //             content: e.target.value,
                    //             start_time: eventInforOnChange.start_time,
                    //             finish_time: eventInforOnChange.finish_time,
                    //             thumbnail_image_url: eventInforOnChange.thumbnail_image_url,
                    //             detail_image_url: eventInforOnChange.detail_image_url
                    //         }
                    //         setEventInforOnChange(eventInforOnChange);
                    //         // //console.log(eventInforOnChange);
                    //     }}                
                    // ></input>
                    <textarea v-model="message" 
                                            className="infor-event edit-active"
                                            
                                            value={eventInforOnChange.content}
                                            onChange={(e) => {
                                                eventInforOnChange = {
                                                    title: eventInforOnChange.title,
                                                    detail_title: eventInforOnChange.detail_title,
                                                    content: e.target.value,
                                                    start_time: eventInforOnChange.start_time,
                                                    finish_time: eventInforOnChange.finish_time,
                                                    thumbnail_image_url: eventInforOnChange.thumbnail_image_url,
                                                    detail_image_url: eventInforOnChange.detail_image_url
                                                }
                                                setEventInforOnChange(eventInforOnChange);
                                                // //console.log(eventInforOnChange);
                                            }}
                                            ></textarea>
                }
            </div>
            <div className="btn-update-cancel">
                {!isPTag && (
                    <div>
                        <button
                            onClick={handleUpdate}
                            className="event-update-btn"
                        >
                            L??u
                        </button>
                        <button
                            onClick={handleCancel}
                            className="event-cancel-btn"
                        >
                            Hu???
                        </button>
                    </div>
                )}
            </div>
            <Popup trigger={showPopup} message="C???p nh???t th??nh c??ng" />
        </div>
    );
}

export default EventDetail;
