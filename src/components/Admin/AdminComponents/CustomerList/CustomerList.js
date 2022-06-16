import React, { useState, useEffect } from "react";
import { CustomerDetail } from "../../..";
import AdminHeader from "../AdminHeader/AdminHeader";
import axiosClient from "../../../../api/axiosClient";
import managementAPI from "../../../../api/managementAPI";

import "./CustomerList.css";
import CustomerElement from "../CustomerElement/CustomerElement";

function CustomerList() {
    let [members, setMembers] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await managementAPI.memberList();
            console.log(res);
            members = res.data.data.memberList;
            setMembers(members);

            // console.log(members)
        })();
    }, []);

    return (
        <div className="customer-list-wrapper">
            <AdminHeader heading="Hội viên" />
            <div className="customer-table-wrapper">
                <table className="customer-table">
                    <tr className="customer-title">
                        <th className="img-customer">Ảnh</th>
                        <th className="name-customer">Họ và tên</th>
                        <th className="gender-customer">Giới tính</th>
                        <th className="phone-customer">Số điện thoại</th>
                        <th className="trainer-customer">Huấn luyện viên</th>
                        <th className="status-customer">Trạng thái</th>
                        <th className="btn-customer"></th>
                    </tr>
                    {
                     members.map((member) => {
                         return <CustomerElement infor={member}/>
                     })
                    }
                </table>
            </div>
        </div>
    );
}

export default CustomerList;



// exports.viewEventList = async (req, res) => {
//     try {
//         const page = req.query.page
//         const quantity_per_page = req.query.quantity_per_page
//         const sql_view_EventList = "SELECT id, title, content, start_time, finish_time, thumbnail_image_url, detail_image_url FROM event";
//         await db.query(sql_view_EventList, (error, results) => {
//             if (error) {
//                 console.log(error);
//                 return res.json({
//                     error: "Unknown error"
//                 });
//             }
//             if (results.length === 0) {
//                 return res.json({
//                     status: 0,
//                     message: "Empty!"
//                 });
//             }
//             if (results.length !== 0) {
//                 const quantity = results.length;
//                 let eventList = [];
//                 for (let member of results) {
//                     eventList.push(member);
//                 }
//                 return res.json({
//                     status: 1,
//                     message: "Lấy danh sách sự kiện thành công!",
//                     data: {
//                         event_list: eventList
//                     },
//                     quantity,
//                     quantity_per_page,
//                     page
//                 });
//             }
//         });
//     }
//     catch (error) {
//         console.log(error);
//         return res.json({
//             error: "Unknown error"
//         });
//     }
// }