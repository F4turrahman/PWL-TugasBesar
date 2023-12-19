import { useEffect } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Saldo() {
    const auth = useSelector((state) => state.store)
    const navigate = useNavigate()
    useEffect(() => {
        if (!auth.isLogin) {
            navigate('/login');
        }
    }, [auth, navigate]);
    return (
        <Container className="mt-5">
            <Card>
                <Card.Body className="p-5">
                    <h5>Saldo</h5>
                    <hr />
                    <p>Jumlah Saldo <Button variant="outline-primary" className="mx-5">Tarik Saldo</Button> </p>
                    <h1>Rp. 15.765.000</h1>
                    <h5 className="mt-3">Nomor Rekening</h5>
                    <hr />
                    Nomor Rekening Yang Dipakai
                    <input type="text" className="form-control mt-2 mb-3" disabled value="1111222233334444" />
                    <Button>Ubah Nomor Rekening</Button>
                </Card.Body>
            </Card>
        </Container>
    )
}