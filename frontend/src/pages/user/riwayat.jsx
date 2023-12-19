import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MdPayment } from "react-icons/md";
import { FaBoxOpen, FaHome, FaBox } from "react-icons/fa";

export default function Riwayat() {
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

    return (
        <Container className="my-5">
            <Row>
                <Col>
                    <h1>Riwayat</h1>
                </Col>
                <Col className="d-flex justify-content-end">
                    <MdPayment className="me-3 mb-2 text-muted" />
                    <FaBoxOpen className="me-3 mb-2 text-muted" />
                    <FaBox className="me-3 mb-2" />
                    <FaHome className="mb-2 text-muted" />
                </Col>
            </Row>
            <hr />
            {Object.values(groupedCartItems).length === 0 ? (
                <p>Riwayat Anda Kosong.</p>
            ) : (
                <div>
                    {Object.values(groupedCartItems).map((groupedItem) => (
                        <Row key={groupedItem.id}>
                            <Col xxs={5} md={4} className="mb-4">
                                <img
                                    src={groupedItem.image}
                                    alt={groupedItem.name}
                                    style={{ maxHeight: '200px' }}
                                />
                            </Col>
                            <Col xxs={4} md={6}>
                                <Row className="mb-5">
                                    <Col>
                                        <h5>{groupedItem.name}</h5>
                                        <h1>Rp. {groupedItem.price.toLocaleString('rp-ID')}</h1>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h3>
                                            Tanggal Pembelian:
                                        </h3>
                                        <h5>
                                            21/11/2023
                                        </h5>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xxs={3} md={2}>
                                <Row>
                                    <Col>
                                        <h3>Status : Diantar</h3>
                                        <h5 className="text-end mb-5">
                                            <span>Jumlah : {groupedItem.count}</span>
                                        </h5>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-end mt-5">
                                        <Link to='/riwayat-detail' className="btn btn-outline-primary">Detail Pemesanan</Link>
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
