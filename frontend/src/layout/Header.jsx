import { Button, Col, InputGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, reset } from "../redux/Slice";
import { IoSearchOutline } from "react-icons/io5";

export default function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();
    const isRegisterPage = location.pathname === "/register";
    const role = useSelector((state) => state.store.user)
    const logout = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
    };
    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching...");
    };

    return (
        <div className='p-3 text-white' style={{ background: '#0051b9' }}>
            <Row>
                <Col>
                    <h1>BagGo</h1>
                </Col>
                {role?.role === 'user' ? (
                    <Col>
                        <InputGroup>
                            <input
                                type="text"
                                autoComplete="search"
                                placeholder="Search"
                                className="form-control"
                                required
                            />
                            <Button variant="light" onClick={handleSearch}>
                                <IoSearchOutline />
                            </Button>
                        </InputGroup>
                    </Col>
                ) : null}
                <Col className="text-end">
                    {role?.role ?
                        (
                            <>
                                <Link onClick={logout} className="btn text-white mx-2">
                                    Logout
                                </Link>
                                <Link to='/profil' className="btn text-white">
                                    {role.role}
                                </Link>
                            </>
                        ) :
                        (isRegisterPage ? (
                            <Link to="/" className="btn text-white">
                                Login
                            </Link>
                        ) :
                            <Link to="/register" className="btn text-white">
                                Register
                            </Link>
                        )
                    }
                </Col>
            </Row>
        </div>
    );
}
