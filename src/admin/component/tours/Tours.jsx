import "./tours.css";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Checkbox, Input, Table, Tooltip } from 'antd';
import { BASE_URL } from "./../../../utils/config";
import useFetch from "../../../hooks/useFetch";
import {AiFillEdit, AiFillDelete, AiFillPlusCircle} from "react-icons/ai";


const Tours = () => {
    const { Search } = Input;
    const [tours, setTours] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // const test = useFetch(`${BASE_URL}/tour/getAll`);

    // Create a react hook to add a scroll animation
    useEffect(() => {
        fetchTours();
    }, []);

    const fetchTours = async () => {
        setLoading(true);

        const requestData = {
            maxPrice: 2000000000,
            minPrice: 1,
            page: 1,
            page_size: 1,
            sortField: "content",
            sortType: "asc",
            status: ["AVAILABLE"],
        };

        
        try {
            const response = await axios.post(
                `${BASE_URL}/tour/view_list_tour`,
                requestData,
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("a",response);
            setTours(response.data.content);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            width: 120
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (image) => <img src={image}/>,
            width: 80
        },
        {
            title: 'Arrival',
            dataIndex: 'arrival',
            width: 80
        },
        {
            title: 'Depart',
            dataIndex: 'depart',
            width: 80
        },
        {
            title: 'Content',
            dataIndex: 'content',
            ellipsis: {
                showTitle: false,
              },
              render: (content) => (
                <Tooltip placement="topLeft" title={content}>
                  {content}
                </Tooltip>
              ),
              width: 120
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            sorter: (a, b) => a.duration - b.duration,
            width: 80
        },
        {
            title: 'Transport',
            dataIndex: 'transport',
            width: 80
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            width: 80
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: 80
        },
        {
            title: 'Type',
            dataIndex: 'type',
            width: 80,
            render: (type) => (
            <>
            {(type == "AVAILABLE") ? (<Checkbox defaultChecked="true" disabled />) : (<Checkbox defaultChecked="false" disabled />)}
            </>
            )
        },
        {
            title: 'Max Guest Size',
            dataIndex: 'maxGuestSize',
            sorter: (a, b) => a.maxGuestSize - b.maxGuestSize,
            width: 60
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: () => <>
                <a><AiFillEdit /></a>
                <a><AiFillDelete /></a>
            </>,
            width: 60
          },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const onSearch = (value, _e, info) => console.log(info?.source, value);
    return (
        <section className="main container section">
            <div className="secTitle">
                <h3 data-aos="fade-right" className="title">
                    Manage Tour
                </h3>
            </div>
            <div className="destination-search">
            <div data-aos="fade-right" className="destinationInput">
                <label htmlFor="city">
                    Search TourName
                </label>
                <div className="inputSearch flex">
                    <Search placeholder="input search text" onSearch={onSearch} enterButton />
                </div>
            </div>
            <div className="add-tour"><button className="btn">ADD TOUR<AiFillPlusCircle/></button></div>
            </div>
            <div data-aos="fade-up" className="table">
                <Table columns={columns} dataSource={tours} pagination={{defaultCurrent: 1, }} onChange={onChange}>
                </Table>
            </div>
        </section>
    )
}
export default Tours;