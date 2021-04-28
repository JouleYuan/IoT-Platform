import React from 'react';
import axios from "../../tool/Axios";
import { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import getPosition from "../../tool/Position";

function DataTable(){
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: '/message',
        }).then(function(response){
            let tmp_data = response.data.data;
            for(let i = 0; i < tmp_data.length; i++){
                tmp_data[i].position = getPosition(tmp_data[i].lat, tmp_data[i].lng);
            }
            setData(tmp_data);
        })
    }, []);

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`输入关键词`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        搜索
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        重置
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        /*
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },*/
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };

    const selectTag = alert => {
        if(alert === 0) return(<Tag color="success">正常</Tag>)
        else return (<Tag color="error">异常</Tag>)
    };

    const columns = [
        {
            title: '设备ID',
            dataIndex: 'clientId',
            key: 'clientId',
            ...getColumnSearchProps('clientId'),
        },
        {
            title: '上报信息',
            dataIndex: 'info',
            key: 'info',
            ...getColumnSearchProps('info'),
        },
        {
            title: '设备数据',
            dataIndex: 'value',
            key: 'value',
            ...getColumnSearchProps('value'),
        },
        {
            title: '警报信息',
            dataIndex: 'alert',
            key: 'alert',
            render: alert => <>{selectTag(alert)}</>,
            filters: [
                {
                    text: '正常',
                    value: 0,
                },
                {
                    text: '异常',
                    value: 1,
                },
            ],
            filterMultiple: false,
            onFilter: (value, record) => record.alert === value,
        },
        {
            title: '设备坐标',
            dataIndex: 'position',
            key: 'position',
            ...getColumnSearchProps('position'),
        },
        {
            title: '设备位置',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
        },
        {
            title: '上报时间',
            dataIndex: 'timestamp',
            key: 'timestamp',
            sorter: (a, b) => a.timestamp - b.timestamp,
            render: timestamp => <>{new Date(timestamp).toLocaleString('ja-JP')}</>
        },
    ];

    return <Table columns={columns} dataSource={data} pagination={false} rowKey="id"/>;
}

export default DataTable;