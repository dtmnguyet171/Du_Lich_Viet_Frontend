import "./bookings.css";
import React, { useContext, useEffect, useState } from 'react';
import { Input, Table, Checkbox, Modal, Form, Select } from 'antd';
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../../utils/config";
import { AiFillEdit, AiFillDelete, AiFillPlusCircle } from "react-icons/ai";

const { Search } = Input;

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const onSearch = (value, _e, info) => console.log(info?.source, value);
const Bookings = () => {
    const { token } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
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
    const [formDataEdit, setFormDataEdit] = useState({
    
            accountId: 0,
            bookingId: 0,
            guestSize: 0,
            note: "",
            price:0,
            status: "",
            tourId: 0
        
    })

    const columns = [
        {
            title: 'Username',
            dataIndex: ['account', 'username']
        },
        {
            title: 'Tour Name',
            dataIndex: ['tour', 'title'],
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
                        <a onClick={() => toggleEditModal()}><AiFillEdit /></a>

                        {/* {(selectedRecord?.id == record?.id) ? (
                            <Popover
                                content={<div><p>Do you want to delete? </p><a onClick={() => handleDelete(record.id)}>Delete</a></div>}
                                title="Confirm"
                                trigger="click"
                                open={openDelete}
                                onOpenChange={handleOpenChange}
                            >
                                <a><AiFillDelete /></a>
                            </Popover>
                        ) : (<><a><AiFillDelete /></a></>)} */}

                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        fetchBookings();
        setFormDataEdit({
            accountId: selectedRecord.account.id,
            bookingId: selectedRecord.id,
            guestSize: selectedRecord.guestSize,
            note: selectedRecord.note,
            price: selectedRecord.price,
            status: selectedRecord.status,
            tourId: selectedRecord.tour.id
        });
        // console.log(selectedRecord);
    }, [selectedRecord]);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/bookings/get-all-booking`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBookings(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const toggleEditModal = () => {
        setEditModalOpen(!editModalOpen);
    };
    
    const handleEditSelectStatus = (value) => {
        setFormDataEdit((prevData) => ({ ...prevData, status: value }));
    }

    const handleEditBooking = async () => {
        const id = selectedRecord.id;

        try {
            const response = await axios.put(
                `${BASE_URL}/bookings/update/${id}`,
                formDataEdit,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setEditModalOpen(!editModalOpen);
            fetchBookings();

        } catch (error) {
            setError(error.message);
        }
    }

    return (

        <section className="main container section">
            <div className="secTitle">
                <h3 data-aos="fade-right" className="title">
                    Manage Bookings
                </h3>
            </div>
            <div className="destination-search">
            <div data-aos="fade-right" className="destinationInput">
                <label data-aos="fade-right" htmlFor="city">
                    Search username
                </label>
                <div className="inputSearch flex">
                    <Search placeholder="input search text" onSearch={onSearch} enterButton />
                </div>
            </div>
            </div>
            <div data-aos="fade-up" className="table">
                <Table columns={columns} dataSource={bookings} rowKey={(record) => record.id}
                    onRow={(record) => ({
                        onClick: () => { setSelectedRecord(record) }
                    })}
                    >
                </Table>
            </div>

            <Modal
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
                   
            </Modal> 
        </section>
    )
}
export default Bookings;