import { useEffect } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getCount, getManage } from "../../redux/Slice"
import { ChartVert } from "./chart"

export default function DashboardAdmin() {
    const auth = useSelector((state) => state.store)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getCount())
        dispatch(getManage())
    }, [dispatch])
    useEffect(() => {
        if (!auth.isLogin) {
            navigate('/login');
        }
    }, [auth, navigate]);
    return (
        <Container className="">
            <Row className="mt-3">
                <Col lg={4} sm={12}>
                    <Card className="mb-3">
                        <Card.Header className="py-4">
                            <h1>
                                {auth.count?.tersedia}
                            </h1>
                        </Card.Header>
                        <Card.Body className="bg-primary text-white">
                            <h5>Barang Tersedia</h5>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4} sm={12}>
                    <Card className="mb-3">
                        <Card.Header className="py-4">
                            <h1>
                                {auth.count?.dikirim}
                            </h1>
                        </Card.Header>
                        <Card.Body className="bg-primary text-white">
                            <h5>Barang Dikirim</h5>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4} sm={12}>
                    <Card>
                        <Card.Header className="py-4">
                            <h1>
                                {auth.count?.terjual}
                            </h1>
                        </Card.Header>
                        <Card.Body className="bg-primary text-white">
                            <h5>Barang Terjual</h5>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mb-5 mt-3 px-3">
                <Card>
                    <Card.Body>
                        <ChartVert />
                    </Card.Body>
                </Card>
            </Row>

        </Container>
    )
}