import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Login } from "../redux/Slice";
import { Container, Row, Col, Form, Button, Alert, Card, InputGroup } from "react-bootstrap";
import { FaUser, FaKey } from "react-icons/fa";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, isLogin, isLoading, message } = useSelector(
        (state) => state.store
    );

    useEffect(() => {
        if (isLogin) {
            navigate("/dashboard");
        }
    }, [isLogin, dispatch, navigate]);

    const Auth = (e) => {
        e.preventDefault();
        dispatch(Login({ username, password }));
    };

    return (
        <Container className="my-2 pt-sm-5">
            <Row className="justify-content-center ">
                <Col md={8} lg={6} xl={5}>
                    <Card className="overflow-hidden p-4">
                        <Card.Body className="p-sm-2">
                            <Form onSubmit={Auth}>
                                {isError && <Alert variant="danger">{message}</Alert>}
                                <h1 className="text-muted mb-4">
                                    Selamat Datang <br /> Silahkan Login
                                </h1>
                                <Form.Group controlId="formBasicusername" className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            value={username}
                                            autoComplete="username"
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Username"
                                            required
                                        />
                                        <InputGroup.Text id="basic-addon1">
                                            <FaUser />
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            autoComplete="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            required
                                        />
                                        <InputGroup.Text id="basic-addon1">
                                            <FaKey />
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 mb-2"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Loading..." : "Login"}
                                </Button>
                                <hr />
                                <div className="text-center">
                                    <Button
                                        variant="outline-primary"
                                        className="px-5 mb-2"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            navigate('/register')
                                        }}
                                    >
                                        Daftar Akun Baru
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container >
    );
};

export default LoginPage;
