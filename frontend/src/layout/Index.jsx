import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import NavigationBar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout() {
    const role = useSelector((state) => state.store.user)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden', paddingLeft: role?.role === 'admin' ? '50px' : 0 }}>
            <Row>
                <Col>
                    <Header />
                </Col>
            </Row>
            {role?.role === "user" ?
                <Row>
                    <Col>
                        <NavigationBar />
                    </Col>
                </Row>
                : null
            }
            <Row style={{ flex: 1 }}>
                {role?.role === 'admin' ? (
                    <Col xs={2} md={3}>
                        <Sidebar />
                    </Col>
                ) : null}
                <Col xs={10} style={{ marginLeft: role?.role === 'admin' ? '5%' : '5%', minHeight: '80vh' }}>
                    <Outlet />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Footer />
                </Col>
            </Row>
        </div>
    );
}
