import "./accounts.css";
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../../utils/config";
import { Input, Table, Pagination, Checkbox, Modal, Form, Select, Popover, Tag } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillPlusCircle } from "react-icons/ai";





const { Search } = Input;


const onSearch = (value, _e, info) => console.log(info?.source, value);
const Accounts = () => {
    const { token } = useContext(AuthContext);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [totalAccounts, setTotalAccounts] = useState(0);
    const [selectedRecord, setSelectedRecord] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [formDataAdd, setFormDataAdd] = useState({
        username: "",
        fullName: "",
        email: "",
        phone: "",
        address: "",
        password: "123456"
    });
    const [formDataEdit, setFormDataEdit] = useState({
        username: "",
        fullName: "",
        email: "",
        phone: "",
        address: "",
        status: ""
    })

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username'
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => {
                let tagColor;
                let statusName;
            
                switch (status) {
                    case "ACTIVE":
                        tagColor = "green";
                        statusName = "Active";
                        break;
                    case "INACTIVE":
                        tagColor = "red";
                        statusName = "Inactive";
                        break;
                }
                return <Tag color={tagColor}>{statusName}</Tag>;
            }
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (record) => {
                return (
                    <div>
                        <a onClick={() => toggleEditModal()}><AiFillEdit /></a>

                        {(selectedRecord?.id == record?.id) ? (
                            <Popover
                                content={<div><p>Do you want to delete? </p><a onClick={() => handleDelete(record.id)}>Delete</a></div>}
                                title="Confirm"
                                trigger="click"
                                open={openDelete}
                                onOpenChange={handleOpenChange}
                            >
                                <a><AiFillDelete /></a>
                            </Popover>
                        ) : (<><a><AiFillDelete /></a></>)}

                    </div>
                );
            },
        },
    ];

    const handleOpenChange = (newOpen) => {
        setOpenDelete(newOpen);
    };

    useEffect(() => {
        fetchAccounts();
        setFormDataEdit(selectedRecord);
    }, [selectedRecord]);

    const fetchAccounts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/accounts/get-all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAccounts(response.data);
            setTotalAccounts(response.data.length);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const toggleAddModal = () => {
        setAddModalOpen(!addModalOpen);
    };

    const toggleEditModal = () => {
        setEditModalOpen(!editModalOpen);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataAdd((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setFormDataEdit((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleEditSelectStatus = (value) => {
        setFormDataEdit((prevData) => ({ ...prevData, status: value }));
    }

    const handleAddAccount = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/api/accounts/create`,
                formDataAdd,
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                    },
                }
            );

            setAddModalOpen(!addModalOpen);
            setFormDataAdd({
                username: "",
                fullName: "",
                email: "",
                phone: "",
                address: "",
                password: "123456"
            })
            fetchAccounts();
        } catch (error) {
            setError(error.message);
        }
    }

    const handleDelete = async (id) => {
        setOpenDelete(true);
        try {
            await axios.delete(
                `${BASE_URL}/api/accounts/${id}`,
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }

            );
            setOpenDelete(false);
            fetchAccounts();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEditAccount = async () => {
        const id = selectedRecord.id;

        try {
            const response = await axios.put(
                `${BASE_URL}/api/accounts/update/${id}`,
                formDataEdit,
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setEditModalOpen(!editModalOpen);
            fetchAccounts();

        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <section className="main container section">
            <div className="secTitle">
                <h3 data-aos="fade-right" className="title">
                    Manage Accounts
                </h3>
            </div>
            <div className="destination-search">
                <div data-aos="fade-right" className="destinationInput">
                    <label htmlFor="city">
                        Search username
                    </label>
                    <div className="inputSearch flex">
                        <Search placeholder="input search text" onSearch={onSearch} enterButton />
                    </div>
                </div>
                <div data-aos="fade-right" className="add-tour"><button className="btn" onClick={toggleAddModal}>ADD ACCOUNT<AiFillPlusCircle /></button></div>
            </div>
            <div data-aos="fade-up" className="table">
                <Table columns={columns} dataSource={accounts} pagination={false} rowKey={(record) => record.id}
                    onRow={(record) => ({
                        onClick: () => { setSelectedRecord(record) }
                    })}>
                </Table>
            </div>

            <Pagination defaultCurrent={1} total={totalAccounts} />




            <Modal
                title="ADD ACCOUNT"
                centered
                open={addModalOpen}
                onOk={handleAddAccount}
                onCancel={() => setAddModalOpen(false)}
                width={800}
            >
                <Form name="trigger" style={{ maxWidth: 800 }} layout="vertical" autoComplete="off">

                    <Form.Item
                        label="Username"
                    >
                        <Input name="username" value={formDataAdd.username} onChange={handleChange} placeholder="Input username..." />
                    </Form.Item>
                    <Form.Item
                        label="Full Name"
                    >
                        <Input name="fullName" value={formDataAdd.fullName} onChange={handleChange} placeholder="Input full name..." />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                    >
                        <Input name="email" value={formDataAdd.email} onChange={handleChange} placeholder="Input email..." />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                    >
                        <Input name="phone" value={formDataAdd.phone} onChange={handleChange} placeholder="Input phone..." />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                    >
                        <Input name="address" value={formDataAdd.address} onChange={handleChange} placeholder="Input address..." />
                    </Form.Item>
                </Form>
            </Modal>



            <Modal
                title="UPDATE ACCOUNT"
                centered
                open={editModalOpen}
                onOk={handleEditAccount}
                onCancel={() => setEditModalOpen(false)}
                width={800}
            >
                <Form name="trigger" style={{ maxWidth: 800 }} layout="vertical" autoComplete="off">

                    <Form.Item
                        label="Username" onChange={handleChangeEdit}
                    >
                        <Input name="username" value={formDataEdit.username} placeholder="Input username..." />
                    </Form.Item>
                    <Form.Item
                        label="Full Name" onChange={handleChangeEdit}
                    >
                        <Input name="fullName" value={formDataEdit.fullName} placeholder="Input full name..." />
                    </Form.Item>
                    <Form.Item
                        label="Email" onChange={handleChangeEdit}
                    >
                        <Input name="email" value={formDataEdit.email} placeholder="Input email..." />
                    </Form.Item>
                    <Form.Item
                        label="Phone" onChange={handleChangeEdit}
                    >
                        <Input name="phone" value={formDataEdit.phone} placeholder="Input phone..." />
                    </Form.Item>
                    <Form.Item
                        label="Address" onChange={handleChangeEdit}
                    >
                        <Input name="address" value={formDataEdit.address} placeholder="Input address..." />
                    </Form.Item>

                    <Form.Item label="Status">
                        <Select name="status" value={formDataEdit.status} onSelect={handleEditSelectStatus}>
                            <Select.Option value="ACTIVE">Active</Select.Option>
                            <Select.Option value="INACTIVE">InActive</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </section>


    )
}
export default Accounts;