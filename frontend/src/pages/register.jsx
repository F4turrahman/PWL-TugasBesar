import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser, reset } from "../redux/Slice";
import { MdAlternateEmail } from "react-icons/md";
import { Container, Row, Col, Form, Button, Alert, Card, InputGroup } from "react-bootstrap";
import { FaUser, FaKey, FaCheck } from "react-icons/fa";

const Register = () => {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.store
    );

    useEffect(() => {
        if (isSuccess) {
            navigate("/login");
        }
        dispatch(reset());
    }, [isSuccess, dispatch, navigate]);

    const Auth = (e) => {
        e.preventDefault();
        dispatch(RegisterUser(data));
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
                                    Selamat Datang <br /> Silahkan Sign Up
                                </h1>
                                <Form.Group controlId="formBasicusername" className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            value={data.username || ''}
                                            autoComplete="username"
                                            onChange={(e) => setData({ ...data, username: e.target.value })}
                                            placeholder="Username"
                                            required
                                        />
                                        <InputGroup.Text id="basic-addon1">
                                            <FaUser />
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="email"
                                            value={data.email || ''}
                                            autoComplete="email"
                                            onChange={(e) => setData({ ...data, email: e.target.value })}
                                            placeholder="Email"
                                            required
                                        />
                                        <InputGroup.Text id="basic-addon1">
                                            <MdAlternateEmail />
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="password"
                                            value={data.password || ''}
                                            autoComplete="password"
                                            onChange={(e) => setData({ ...data, password: e.target.value })}
                                            placeholder="Password"
                                            required
                                        />
                                        <InputGroup.Text id="basic-addon1">
                                            <FaKey />
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formBasicPasswordConfirm" className="mb-3">
                                    <Form.Label>Konfirmasi Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="password"
                                            value={data.passwordConfirm || ''}
                                            autoComplete="confirm-password"
                                            onChange={(e) => setData({ ...data, passwordConfirm: e.target.value })}
                                            placeholder="Konfirmasi Password"
                                            required
                                        />
                                        <InputGroup.Text id="basic-addon1">
                                            <FaCheck />
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 mb-2"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Loading..." : "Sign Up"}
                                </Button>
                                <hr />
                                <div className="text-center">
                                    <Link to='/' className="nav-link text-danger">Sudah Mempunyai Akun?</Link>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container >
    );
};

export default Register;
