import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { addToCart } from "../../redux/Slice";

export default function Detail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const auth = useSelector((state) => state.store);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        const mockData = [
            {
                id: 1, name: 'Tas Han & Yan', price: 1050000, stok: 20, deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'https://lzd-img-global.slatic.net/g/p/d574907fe8669ffad077f601418483eb.jpg_360x360q75.jpg_.webp'
            },
            {
                id: 2, name: 'Tas Mahal', price: 2250000, stok: 50, deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'https://lzd-img-global.slatic.net/g/ff/kf/S8f59f267a2fc441e90dcc0734d0cb5f3f.jpg_360x360q75.jpg_.webp'
            },
            {
                id: 3, name: 'Tas Murah', price: 3321123, stok: 1, deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'https://id-live-01.slatic.net/p/57c7b54b9dfba0e50824a9525449caf1.jpg'
            },
            {
                id: 4, name: 'Tas Han & Yan', price: 1050000, stok: 20, deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'https://lzd-img-global.slatic.net/g/p/d574907fe8669ffad077f601418483eb.jpg_360x360q75.jpg_.webp'
            },
            {
                id: 5, name: 'Tas Mahal', price: 250000, stok: 50, deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'https://lzd-img-global.slatic.net/g/ff/kf/S8f59f267a2fc441e90dcc0734d0cb5f3f.jpg_360x360q75.jpg_.webp'
            },
            {
                id: 6, name: 'Tas Murah', price: 3321123, stok: 1, deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'https://id-live-01.slatic.net/p/57c7b54b9dfba0e50824a9525449caf1.jpg'
            },
            {
                id: 7, name: 'Tas Han & Yan', price: 1050000, stok: 20, deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'https://lzd-img-global.slatic.net/g/p/d574907fe8669ffad077f601418483eb.jpg_360x360q75.jpg_.webp'
            },
            {
                id: 8, name: 'Tas Mahal', price: 2250000, stok: 50, deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'https://lzd-img-global.slatic.net/g/ff/kf/S8f59f267a2fc441e90dcc0734d0cb5f3f.jpg_360x360q75.jpg_.webp'
            },
            {
                id: 9, name: 'Tas Murah', price: 3321123, stok: 1, deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'https://id-live-01.slatic.net/p/57c7b54b9dfba0e50824a9525449caf1.jpg'
            },
            {
                id: 10, name: 'Tas Han & Yan', price: 1050000, stok: 20, deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'https://lzd-img-global.slatic.net/g/p/d574907fe8669ffad077f601418483eb.jpg_360x360q75.jpg_.webp'
            },
        ];

        const selectedProduct = mockData.find((p) => p.id === parseInt(productId, 10));

        setProduct(selectedProduct);
    }, [productId]);

    useEffect(() => {
        if (!auth.isLogin) {
            navigate('/login');
        }
    }, [auth, navigate]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    return (
        <Container className="my-5">
            <Row>
                <Col xs={12} md={6}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
                </Col>
                <Col xs={12} md={6} className="mt-3 mt-md-0">
                    <h2>{product.name}</h2>
                    <h1>Rp. {product.price}</h1>
                    <h6 className="pt-3">Stok: {product.stok}</h6>
                    <hr />
                    <h5>Deskripsi</h5>
                    <p>{product.deskripsi}</p>
                    <hr className="mt-5" />
                    <div className="d-flex gap-3 justify-content-center mt-5">
                        <Button variant="primary" className="px-4 align-items-center" onClick={handleAddToCart}><FaPlus className="me-1" />Keranjang</Button>
                        <Button variant="primary" className="px-5" onClick={() => navigate('/checkout')}>Checkout</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}