import { useState } from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import getPosition from "../../tool/position/Position";
import getAddress from "../../tool/position/Address";

const data = [
    {
        id: '1',
        deviceId: 'device0002',
        info: "Device Data 2021/04/26 16:30:41",
        value: 94,
        alert: 1,
        lat: 30.14594933986664,
        lng: 120.34829343557358,
        timestamp: 1619425841299,
    },
    {
        id: '2',
        deviceId: 'device0002',
        info: "Device Data 2021/04/26 16:30:41",
        value: 94,
        alert: 1,
        lat: 30.14594933986664,
        lng: 120.34829343557358,
        timestamp: 1619425841299,
    },
    {
        id: '3',
        deviceId: 'device0005',
        info: "Device Data 2021/04/26 16:30:41",
        value: 11,
        alert: 0,
        lat: 30.14594933986664,
        lng: 120.34829343557358,
        timestamp: 1619425841299,
    },
    {
        id: '4',
        deviceId: 'device0003',
        info: "Device Data 2021/04/26 16:30:41",
        value: 24,
        alert: 0,
        lat: 30.14594933986664,
        lng: 120.34829343557358,
        timestamp: 1619425841299,
    },
];

function DataTable(){
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");

    for(let i = 0; i < data.length; i++){
        data[i].position = getPosition(data[i].lat, data[i].lng);
        getAddress(data[i].lat, data[i].lng);
    }

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
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
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
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

    const columns = [
        {
            title: '设备ID',
            dataIndex: 'deviceId',
            key: 'name',
            ...getColumnSearchProps('name'),
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
            ...getColumnSearchProps('alert'),
        },
        {
            title: '设备坐标',
            dataIndex: 'position',
            key: 'position',
            ...getColumnSearchProps('position'),
        },
        /*
        {
            title: '设备位置',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
        },*/
        {
            title: '上报时间',
            dataIndex: 'timestamp',
            key: 'timestamp',
            ...getColumnSearchProps('timestamp'),
        },
    ];

    return <Table columns={columns} dataSource={data} pagination={false} rowKey="id"/>;
}

export default DataTable;