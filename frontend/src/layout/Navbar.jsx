import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingBag } from "react-icons/fa";
import { FaCartShopping, FaFileCircleCheck, FaList } from "react-icons/fa6";
export default function NavigationBar() {
    return (
        <Navbar collapseOnSelect expand="lg" style={{ background: '#0d72f2' }}>
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto">
                        <Link to='/dashboard' className='nav-link text-white d-flex align-items-center'>
                            <FaShoppingBag className='me-1' />
                            Katalog
                        </Link>
                        <Link to='/cart' className='nav-link text-white d-flex align-items-center'>
                            <FaCartShopping className='me-1' />
                            Keranjang
                        </Link>
                        <Link to='/checkout' className='nav-link text-white d-flex align-items-center'>
                            <FaFileCircleCheck className='me-1' />
                            Checkout
                        </Link>
                        <Link to='/riwayat' className='nav-link text-white d-flex align-items-center'>
                            <FaList className='me-1' />
                            Riwayat
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}