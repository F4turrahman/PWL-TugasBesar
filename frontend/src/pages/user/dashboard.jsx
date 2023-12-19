import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { dashboardUser } from "../../redux/Slice";

export default function DashboardUser() {
    const auth = useSelector((state) => state.store);
    const dataDashboard = useSelector((state) => state.store.dashboardUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isLogin) {
            navigate('/login');
        }
    }, [auth, navigate]);

    useEffect(() => {
        dispatch(dashboardUser());
    }, [dispatch]);

    return (
        <div className="container mt-5 mb-5">
            <div className="row row-cols-2 row-cols-md-4 row-cols-sm-2 g-4">
                {dataDashboard.map((product) => (
                    <div key={product.id} className="col">
                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                            <Card className="h-100">
                                <Card.Img variant="top" src={product.image} alt={product.name} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                        <b>{product.price}</b>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
