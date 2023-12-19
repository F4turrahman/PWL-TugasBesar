import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAdmin, updateUser } from "../redux/Slice";

export default function Profil() {
    const auth = useSelector((state) => state.store)
    const dispatch = useDispatch()
    const [data, setData] = useState({
        role: auth?.user?.role,
        user: auth?.user?.user,
        email: auth?.user?.email,
        password: auth?.user?.password,
        no: auth?.user?.no,
        alamat: auth?.user?.alamat
    })

    useEffect(() => {
        setData({
            role: auth?.user?.role,
            user: auth?.user?.user,
            email: auth?.user?.email,
            password: auth?.user?.password,
            no: auth?.user?.no,
            alamat: auth?.user?.alamat
        });
    }, [auth]);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (auth?.user?.role === "admin") {
            dispatch(updateAdmin(data))
        } else {
            dispatch(updateUser(data));
        }
    };

    const navigate = useNavigate()
    useEffect(() => {
        if (!auth.isLogin) {
            navigate('/login');
        }
    }, [auth, navigate]);
    return (
        <Container className="mt-3" style={{ paddingRight: '10%' }}>
            <h2>Profil User</h2>
            <hr />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nama Pengguna</Form.Label>
                    <Form.Control
                        type="text"
                        autoComplete="username"
                        placeholder="Username"
                        value={data.user}
                        style={{ background: '#ccd9ec' }}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        autoComplete="email"
                        placeholder="email"
                        value={data.email}
                        style={{ background: '#ccd9ec' }}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        autoComplete="password"
                        value={data.password}
                        onChange={handleChange}
                        style={{ background: '#ccd9ec' }}
                        placeholder="Password"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Nomor Telepon</Form.Label>
                    <Form.Control
                        type="text"
                        value={data.no}
                        autoComplete="nomor telephone"
                        onChange={handleChange}
                        style={{ background: '#ccd9ec' }}
                        placeholder="Nomor Telepon"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Alamat</Form.Label>
                    <textarea
                        name="alamat"
                        id="" cols="30" rows="10"
                        className="form-control"
                        style={{ background: '#ccd9ec' }}
                        onChange={handleChange}
                        value={data.alamat}
                    >
                    </textarea>
                </Form.Group>
                <Row className="d-flex justify-content-between">
                    <Col>
                        <Form.Group >
                            <Form.Label>Role</Form.Label>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <span
                            style={{ background: '#ccd9ec', padding: '10px', borderRadius: '10px' }}

                        >{data.role}</span>
                    </Col>
                    <Col className="text-end">
                        <Button variant="primary" type="submit" className="w-50 mb-5">
                            Simpan
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}