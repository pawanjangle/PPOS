import { React, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
const OrdersComponent = () => {
    const [key, setKey] = useState('home'); 

    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
            <Tab eventKey="home" title="Paid Orders">
                Tab content for Home
            </Tab>
            <Tab eventKey="profile" title="Unpaid Orders">
                Tab content for Profile
            </Tab>
        </Tabs>)
}

export default OrdersComponent