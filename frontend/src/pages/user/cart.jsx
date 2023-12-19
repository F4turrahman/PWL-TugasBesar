import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCartLocally } from "../../redux/Slice";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaRegTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const cartItems = useSelector((state) => state.store.cartItems);
    const auth = useSelector((state) => state.store);
    const [groupedCartItems, setGroupedCartItems] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCartLocally(productId));
    };

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
    }, [cartItems]);

    return (
        <Container className="my-5">
            <Row>
                <Col>
                    <h1>Keranjang</h1>
                </Col>
            </Row>
            <hr />
            {Object.values(groupedCartItems).length === 0 ? (
                <p>Keranjang Anda Kosong.</p>
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
                            <Col xxs={7} md={8}>
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
                                    <Button
                                        variant="danger"
                                        onClick={() => handleRemoveFromCart(groupedItem.id)}
                                    >
                                        <FaRegTrashAlt />
                                    </Button>
                                </div>
                            </Col>
                            <hr />
                        </Row>
                    ))}
                    <div className="text-end">
                        <Button className="px-5" onClick={(e) => { e.preventDefault(); navigate('/checkout') }}>Checkout</Button>
                    </div>
                </div>
            )}
        </Container>
    );
}
