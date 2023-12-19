import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout() {
    const cartItems = useSelector((state) => state.store.cartItems);
    const auth = useSelector((state) => state.store);
    const [groupedCartItems, setGroupedCartItems] = useState({});
    const [checkoutItems, setCheckoutItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    const [byr, setByr] = useState('')
    const [kode, setKode] = useState('')
    const [countdown, setCountdown] = useState(null);
    const handleIncrement = (itemId) => {
        setGroupedCartItems((prevGroupedCartItems) => {
            const updatedItems = {
                ...prevGroupedCartItems,
                [itemId]: {
                    ...prevGroupedCartItems[itemId],
                    count: prevGroupedCartItems[itemId].count + 1,
                },
            };
            return updatedItems;
        });
    };

    const startCountdown = () => {
        const targetDate = new Date();
        targetDate.setHours(targetDate.getHours() + 24);

        const intervalId = setInterval(updateCountdown, 1000);

        function updateCountdown() {
            const currentDate = new Date();
            const timeDifference = targetDate - currentDate;

            // Calculate remaining hours, minutes, and seconds
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            // Display the countdown
            setCountdown(`${hours}h ${minutes}m ${seconds}s`);

            // Check if the countdown has reached zero
            if (timeDifference <= 0) {
                clearInterval(intervalId);
                setCountdown("Waktu Pembayaran Telah Habis");
            }
        }
    }

    const handleClick = () => {
        if (byr === 'mandiri') {
            setKode('C4621621621')
        } else {
            setKode('0811321456')
        }
        startCountdown();
    }

    const handleDecrement = (itemId) => {
        setGroupedCartItems((prevGroupedCartItems) => {
            const updatedItems = {
                ...prevGroupedCartItems,
                [itemId]: {
                    ...prevGroupedCartItems[itemId],
                    count: Math.max(prevGroupedCartItems[itemId].count - 1, 0),
                },
            };
            return updatedItems;
        });
    };

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

        const itemsToCheckout = Object.values(updatedGroupedCartItems).filter((item) => item.count > 0);
        setCheckoutItems(itemsToCheckout);
        const total = itemsToCheckout.reduce((acc, item) => acc + item.price * item.count, 0);
        setTotalPrice(total);
    }, [cartItems]);

    return (
        <Container className="my-5">
            <Row>
                <Col>
                    <h1>Checkout</h1>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col xs={12} lg={7}>
                    {Object.values(groupedCartItems).length === 0 ? (
                        <p>Checkout Anda Kosong.</p>
                    ) : (kode ?
                        <>
                            Nomor Pembayaran Anda
                            <h3>{kode}</h3>
                            <span className="text-danger">Batas Pembayaran : {countdown}</span>
                            <h4>Tata Cara Pembayaran</h4>
                            <ul>
                                <li>Lorem Ipsum is simply </li>
                                <li>dummy text of the printing</li>
                                <li>and typesetting industry</li>
                            </ul>
                            <hr />
                            <h4>Setelah Pembayaran dilakukan, harap menunggu konfirmasi dari penjual</h4>
                            <Link to='/riwayat' className="btn btn-primary">Riwayat Pemesanan</Link>
                        </>
                        :
                        <div>
                            {Object.values(groupedCartItems).map((groupedItem) => (
                                <Row key={groupedItem.id}>
                                    <Col xs={12} md={5} className="mb-4">
                                        <img
                                            src={groupedItem.image}
                                            alt={groupedItem.name}
                                            style={{ maxHeight: '200px' }}
                                        />
                                    </Col>
                                    <Col xs={12} md={7}>
                                        <h5>{groupedItem.name}</h5>
                                        <h1>Rp. {groupedItem.price.toLocaleString('rp-ID')}</h1>
                                        <div className="d-flex align-items-center mt-4">
                                            <div onClick={() => handleIncrement(groupedItem.id)} style={{ cursor: 'pointer' }}>
                                                <FaPlus />
                                            </div>
                                            <div className="mx-2" onClick={() => handleDecrement(groupedItem.id)} style={{ cursor: 'pointer' }}>
                                                <FaMinus />
                                            </div>
                                            <span className="mx-2">Jumlah : {groupedItem.count}</span>
                                        </div>
                                    </Col>
                                    <hr />
                                </Row>
                            ))}
                            <div>
                                <h5>Alamat Pengiriman</h5>
                                <hr />
                                <Row>
                                    <Col>
                                        <h5>{auth?.user?.user}</h5>
                                    </Col>
                                    <Col><Link to="/profil" className="btn btn-primary">Ubah Alamat</Link></Col>
                                </Row>
                                <p>
                                    {auth?.user?.no}
                                </p>
                                <p>
                                    {auth?.user?.alamat}
                                </p>
                            </div>
                        </div>
                    )}
                </Col>
                <Col xs={12} lg={5}>
                    {checkoutItems.length > 0 && (
                        <Card>
                            <Card.Body className="p-4">
                                <h4>Rincian Pembayaran</h4>
                                {checkoutItems.map((checkoutItem) => (
                                    <Row key={checkoutItem.id}>
                                        <Col>
                                            {checkoutItem.name}
                                        </Col>
                                        <Col>
                                            Rp. {checkoutItem.price.toLocaleString('rp-ID')}
                                        </Col>
                                    </Row>
                                ))}
                                <hr />
                                <h3>
                                    <Row>
                                        <Col>
                                            Total Harga
                                        </Col>
                                        <Col>Rp. {totalPrice.toLocaleString('rp-ID')}</Col>
                                    </Row>
                                </h3>
                                <hr />
                                <h5>
                                    Metode Pembayaran
                                </h5>
                                <Row>
                                    <Col>Bank Mandiri</Col>
                                    <Col className="text-end">
                                        <input type="radio" name="byr" id="1" value='mandiri' onChange={(e) => setByr(e.target.value)} disabled={kode} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>Gopay</Col>
                                    <Col className="text-end">
                                        <input type="radio" name="byr" id="2" value='gopay' onChange={(e) => setByr(e.target.value)} disabled={kode} />
                                    </Col>
                                </Row>
                                <Button className="w-100 mt-3" onClick={(e) => handleClick()} disabled={kode}>Bayar</Button>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container >
    );
}
