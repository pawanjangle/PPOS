import { React, useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { getOrders, callDeleteOrder } from '../../service/Service';
import DataTableComponent from '../data-table/DataTableComponent';
import { MdDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { showAlert } from '../../redux/features/AlertSlice';
import AlertComponent from '../alert/AlertComponent';
import WrapperComponent from '../wrapper/WrapperComponent';

const OrdersComponent = () => {
    const alert = useSelector((state) => state.alert)
    const dispatch = useDispatch();
    const [key, setKey] = useState('home');
    const [allOrders, setAllOrders] = useState([])
    const [paidOrders, setPaidOrders] = useState([])
    const [unpaidOrders, setUnpaidOrders] = useState([])
    const [colDefs, setColDefs] = useState([
        {
            field: "sNo", headerName: 'S. No.', width: 100,
        },
        {
            field: "orderId", headerName: 'Order Id', filter: true, width: '300px'
        },
        {
            field: "orderDate", headerName: 'Order Date'
        },
        {
            field: "customerName", headerName: 'Customer Name'
        },
        { field: "total", headerName: 'Total' },
        { field: "paymentStatus" },
        {
            field: "Actions", headerName: "Actions", width: "100px", cellRenderer: (params) => <div>
                <MdDeleteForever style={{ color: "red", height: "40px" }} onClick={() => {
                    handleDelete(params.data)
                }} />
            </div>
        }

    ]);

    const handleDelete = (orderData) => {
        callDeleteOrder(orderData._id).then(res => {
            if (res.status === 200) {
                dispatch(showAlert({
                    alertState: true,
                    alertType: "success",
                    alertMessage: res.data.message
                }))
                setTimeout(() => {
                    dispatch(showAlert({
                        alertState: false,
                        alertType: "",
                        alertMessage: ""
                    }))
                }, 2000
                )
                callGetOrders()
            }
            console.log(res)
        })
            .catch(err => {
                console.log(err)
            })

    }

    const defaultColDef = {
        sortable: true,
    }

    useEffect(() => {
        callGetOrders()
    }, [])

    const callGetOrders = () => {
        getOrders().then(res => {
            if (res.status == 200) {
                filterOrders(res.data.orders)
                setAllOrders(res.data.orders)
            }
            else {
                setAllOrders([])
            }
        })
    }

    const filterOrders = (orderData) => {
        let paid = [];
        let unpaid = [];
        for (let val of orderData) {
            if (val.paymentStatus == "Paid") {
                val.sNo = paid.length + 1
                paid.push(val)
            }
            else {
                val.sNo = unpaid.length + 1
                unpaid.push(val)
            }
        }
        setPaidOrders(paid);
        setUnpaidOrders(unpaid)
    }
    return (
        <div>
            <WrapperComponent>
                <h5 className="mb-3">Orders</h5>
                <AlertComponent alertState={alert.alertState} alertType={alert.alertType} alertMessage={alert.alertMessage} />
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="home" title="Paid Orders" style={{ height: "90vh", marginRight: "10px" }}>
                        {paidOrders.length !== 0 ?
                            <DataTableComponent allProducts={paidOrders} allColumns={colDefs} defaultColDef={defaultColDef} /> :
                            <p style={{ marginLeft: "20px" }}>No Orders</p>
                        }
                    </Tab>
                    <Tab eventKey="profile" title="Unpaid Orders" style={{ height: "90vh", marginRight: "10px" }}>
                        {unpaidOrders.length !== 0 ?
                            <DataTableComponent allProducts={unpaidOrders} allColumns={colDefs} defaultColDef={defaultColDef} /> :
                            <p style={{ marginLeft: "20px" }}>No Orders</p>
                        }            </Tab>
                </Tabs>
            </WrapperComponent>
        </div>
    )
}

export default OrdersComponent