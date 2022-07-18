import React, { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./TrainerDetail.module.css";

import { Link, useParams } from "react-router-dom";
import { Popup, MyCalendar } from "../../../";
import { useNavigate } from "react-router-dom";
import managementAPI from "../../../../api/managementAPI";

function TrainerDetail() {
    const navigate = useNavigate();
    let [trainerInfor, setTrainerInfor] = useState({});
    let [members, setMembers] = useState({});
    let [avatarUrl, setAvatarUrl] = useState("");

    const { id } = useParams();

    useEffect(() => {
        (async () => {
            // console.log('hi');
            const res = await managementAPI.trainerDetail({ id });
            // console.log(res);
            trainerInfor = res.data.data;
            setTrainerInfor(trainerInfor);
            // console.log(trainerInfor);

            const _members = await managementAPI.memberListOfTrainer(id);
            console.log(_members);
            members = _members.data.data.member_list;
            setMembers(members);
            console.log(members);
            // console.log(trainers)
        })();
    }, []);

    return (
        <div className="trainer-detail-wrapper">
            <div className={clsx(styles.trainerDetailHeader)}>
                <Link to="/admin/trainers/" className={clsx(styles.backTrainerList)}>
                    <i class="fas fa-arrow-left"></i>
                </Link>
                <h1 className={clsx(styles.trainerHeading)}>HUẤN LUYỆN VIÊN</h1>
                {/* <button className="trainer-add-btn">Chỉnh sửa</button> */}
            </div>
            <div className={clsx(styles.trainerDetailContent)}>
                <div className="row">
                    <div className="col l-5 m-0 c-0">
                        <div className={clsx(styles.avatarAndName)}>
                            <div
                                className={clsx(styles.avatar)}
                                style={{
                                    backgroundImage: `url(${process.env
                                        .REACT_APP_API_URL +
                                        trainerInfor.avatar_url})`,
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                }}
                            ></div>
                            <div className={clsx(styles.userName)}>
                                {trainerInfor.name}
                            </div>
                        </div>
                    </div>
                    <div className="col l-7 m-12 c-12">
                        <div className={clsx(styles.infor)}>
                            <div className={clsx(styles.inforWrapperAll)}>
                                <div className={clsx(styles.inforWrapper)}>
                                    {/* Tên */}
                                    <div className={clsx(styles.inforContent)}>
                                        <h3 className={clsx(styles.inforLabel)}>
                                            Họ và tên
                                        </h3>
                                            <b>{trainerInfor.name}</b>
                                    </div>
                                </div>

                                {/* Số điện thoại */}
                                <div className={clsx(styles.inforWrapper)}>
                                    <div className={clsx(styles.inforContent)}>
                                        <h3 className={clsx(styles.inforLabel)}>
                                            Số điện thoại
                                        </h3>
                                            <b>{trainerInfor.phone}</b>
                                    </div>
                                </div>

                                {/* Ngày sinh */}
                                <div className={clsx(styles.inforWrapper)}>
                                    <div className={clsx(styles.inforContent)}>
                                        <h3 className={clsx(styles.inforLabel)}>
                                            Ngày sinh
                                        </h3>
                                            <input
                                                readOnly={true}
                                                // ref={birthdayRef}
                                                type="date"
                                                className={clsx(
                                                    styles.inforText
                                                )}
                                                value={trainerInfor.birthday ? trainerInfor.birthday.substring(
                                                    0,
                                                    10
                                                ) : ''}/>
                                               
                                     
                                    </div>
                                </div>

                                {/* Giới tính */}
                                <div className={clsx(styles.inforWrapper)}>
                                    <div className={clsx(styles.inforContent)}>
                                        <h3 className={clsx(styles.inforLabel)}>
                                            Giới tính
                                        </h3>
                                            <b
                                                className={clsx(
                                                    styles.inforGender
                                                )}
                                            >
                                                {trainerInfor.gender}
                                            </b>
                                      
                                    </div>
                                </div>

                                {/* Địa chỉ */}
                                <div className={clsx(styles.inforWrapper)}>
                                    <div className={clsx(styles.inforContent)}>
                                        <h3 className={clsx(styles.inforLabel)}>
                                            Địa chỉ
                                        </h3>
                                            <b>{trainerInfor.address}</b>
                                    
                                    </div>
                                </div>

                                {/* Ngày đăng ký */}
                                <div className={clsx(styles.inforWrapper)}>
                                    <div className={clsx(styles.inforContent)}>
                                        <h3 className={clsx(styles.inforLabel)}>
                                            Ngày đăng ký
                                        </h3>
                                        <input
                                            readOnly={true}
                                            // ref={birthdayRef}
                                            type="date"
                                            className={clsx(styles.inforText)}
                                            value={trainerInfor.created_at ? trainerInfor.created_at.substring(
                                                0,
                                                10
                                            ) : ""}
                                        />
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className={clsx(styles.trainerStudents)}>
                        <h2 className={clsx(styles.trainerDetailTitle)}>
                            Danh sách học viên
                        </h2>
                        <table className={clsx(styles.tableMemberList)}>
                            <thead className={clsx(styles.tableHeader)}>
                                <tr>
                                    <th>Ảnh</th>
                                    <th>Họ và tên</th>
                                    {/* <th>Tuổi</th> */}
                                    <th>Giới tính</th>
                                    <th>Số điện thoại</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody className="students-table-body">
                                {members.length &&
                                    members.map((member, index) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <img
                                                        src={
                                                            process.env
                                                                .REACT_APP_API_URL +
                                                            member.avatar_url
                                                        }
                                                    />
                                                </td>
                                                <td>{member.name}</td>
                                                {/* <td>{member.name}</td> */}
                                                <td>{member.gender}</td>
                                                <td>{member.phone}</td>
                                                <td>
                                                    <button
                                                        className={clsx(
                                                            styles.btnMemberDetail
                                                        )}
                                                        onClick={(e) => {
                                                            navigate(
                                                                "/admin/members/detail/" +
                                                                    member.id
                                                            );
                                                        }}
                                                    >
                                                        Chi tiết
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                {/* <tr>
                                    <td>1</td>
                                    <td>Nguyễn Văn Đương</td>
                                    <td>29</td>
                                    <td>Nam</td>
                                    <td>0123455674</td>
                                    <td><button>Xóa</button></td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                    <div className="trainer-schedule">
                        <h2 className={clsx(styles.trainerDetailTitle)}>
                            Lịch huấn luyện
                        </h2>
                        {/* <Timetablee /> */}
                        <MyCalendar id={id} role="trainer" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrainerDetail;
