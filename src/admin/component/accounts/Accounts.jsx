import "./accounts.css";
import React, { useEffect, useState } from 'react';
import { Input, Table, Pagination } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillPlusCircle } from "react-icons/ai";
const { Search } = Input;


const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const onSearch = (value, _e, info) => console.log(info?.source, value);
const Accounts = () => {

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [totalAccounts, setTotalAccounts] = useState(0);
    const [current, setCurrent] = useState(1);

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
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
        },
    ];

    const onChangePage = (page) => {
        setCurrent(page);
    };


    const toggleAddModal = () => {
        setAddModalOpen(!addModalOpen);
    };
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
                <Table columns={columns} dataSource={accounts} onChange={onChange} />
            </div>

            <Pagination current={current} onChange={onChangePage} total={totalAccounts} />
        </section>
    )
}
export default Accounts;