import "./historyBooking.css";
import React, { useContext, useEffect, useState } from 'react';
import { Input, Table, Checkbox, Modal, Form, Select } from 'antd';
import { AuthContext } from "../../context/AuthContext";
import { AiFillEdit, AiFillDelete, AiFillPlusCircle } from "react-icons/ai";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { BASE_URL } from "../../utils/config";


const HistoryBooking = () => {
    const { token, id } = useContext(AuthContext);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState({
        account: {id: 0},
        id: 0,
        guestSize: 0,
        note: "",
        price: 0,
        status:"",
        tour: {id:0}

    });

    const columns = [
        {
            title: 'Tour Image',
            dataIndex: ['tour', 'image']
        },
        {
            title: 'Tour Name',
            dataIndex: ['tour', 'title'],
        },
        {
            title: 'Depart',
            dataIndex: ['tour', 'depart'],
        },
        {
            title: 'Arrival',
            dataIndex: ['tour', 'arrival'],
        },
        {
            title: 'Guest Size',
            dataIndex: 'guestSize',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Booking Date',
            dataIndex: 'bookingDate',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => (
                <>
                    {(status === "CONFIRM") ? (<Checkbox defaultChecked={true} disabled />) : (<Checkbox defaultChecked={false} disabled />)}
                </>
            ),
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (record) => {
                return (
                    <div>
                        <AiFillEdit />
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        fetchHistory();
    }, []);
    const fetchHistory = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/bookings/history/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchHistory(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    return (
        <section className="history container section">
            <div className="secTitle">
                <h3 data-aos="fade-right" className="title">
                    My Booking History
                </h3>
            </div>
            <div data-aos="fade-up" className="table">
                <Table columns={columns} dataSource={history} rowKey={(record) => record.id}
                    onRow={(record) => ({
                        onClick: () => { setSelectedRecord(record) }
                    })}
                    >
                </Table>
            </div>

            {/* <Modal
                title="UPDATE BOOKING"
                centered
                open={editModalOpen}
                onOk={handleEditBooking}
                onCancel={() => setEditModalOpen(false)}
            >
        
                <Form name="trigger" layout="vertical" autoComplete="off">
    
                    <Form.Item label="Status">
                        <Select name="status" value={formDataEdit.status} onSelect={handleEditSelectStatus}>
                            <Select.Option value="CONFIRM">Confirm</Select.Option>
                            <Select.Option value="CANCEL">Cancel</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
                   
            </Modal>  */}
        </section>
    )
    
}

export default HistoryBooking;