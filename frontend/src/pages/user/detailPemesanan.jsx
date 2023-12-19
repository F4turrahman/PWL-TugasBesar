import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './verticalprogress.css'

export default function DetailPemesanan() {
    const cartItems = useSelector((state) => state.store.cartItems);
    const auth = useSelector((state) => state.store);
    const [groupedCartItems, setGroupedCartItems] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        if (!auth.isLogin) {
            navigate('/login');
        }
    }, [auth, navigate]);

    useEffect(() => {
        const updatedGroupedCartItems = cartItems.reduce((acc, item) => {
            if (acc[item.id]) {
                acc[item.id].count += 1;
            } else {
                acc[item.id] = { ...item, count: 1 };
            }
            return acc;
        }, {});
        setGroupedCartItems(updatedGroupedCartItems);
    }, [cartItems]);

    const steps = [
        { date: "21/11/2023, 17:00 WIB", status: "Pesanan Sedang Dikirim" },
        { date: "21/11/2023, 17:00 WIB", status: "Barang Dikemas" },
        { date: "21/11/2023, 17:00 WIB", status: "Pembayaran Sudah diverifikasi" },
    ];

    return (
        <Container className="my-5">
            <Row>
                <Col>
                    <h1>Detail Pemesanan</h1>
                </Col>
            </Row>
            <hr />
            {Object.values(groupedCartItems).length === 0 ? (
                <p>Detail Pemesanan Anda Kosong.</p>
            ) : (
                <div>
                    {Object.values(groupedCartItems).map((groupedItem) => (
                        <Row key={groupedItem.id}>
                            <Col xs={5} md={4} className="mb-4">
                                <img
                                    src={groupedItem.image}
                                    alt={groupedItem.name}
                                    style={{ maxHeight: '200px' }}
                                />
                            </Col>
                            <Col xs={4} md={6}>
                                <Row className="mb-5">
                                    <Col>
                                        <h5>{groupedItem.name}</h5>
                                        <h1>Rp. {groupedItem.price.toLocaleString('rp-ID')}</h1>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <div className="mt-4">
                                            <ul className="events">
                                                {steps.map((step, index) => (
                                                    <li key={index}>
                                                        <time dateTime={step.date}>{step.date}</time>
                                                        <span><strong>{step.status}</strong></span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={3} md={2}>
                                <Row>
                                    <Col>
                                        <h3>Status : Diantar</h3>
                                        <h5 className="text-end mb-5">
                                            <span>Jumlah : {groupedItem.count}</span>
                                        </h5>
                                    </Col>
                                </Row>
                            </Col>
                            <hr />
                        </Row>
                    ))}
                </div>
            )}
        </Container>
    );
}
