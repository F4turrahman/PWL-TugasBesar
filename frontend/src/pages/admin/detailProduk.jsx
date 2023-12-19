import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function DetailProduk() {
    const auth = useSelector((state) => state.store)
    const navigate = useNavigate()
    useEffect(() => {
        if (!auth.isLogin) {
            navigate('/login');
        }
    }, [auth, navigate]);

    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };
    return (
        <Container className="mt-5 mb-5">
            <Card>
                <Card.Body className="p-5">
                    <Row>
                        <Col lg={3}>
                            <label htmlFor="imageUpload" className="mb-2">
                                Upload Gambar
                            </label>
                            <input
                                type="file"
                                id="imageUpload"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="form-control mb-3"
                            />
                            {selectedImage && (
                                <img
                                    src={selectedImage}
                                    alt="Selected"
                                    className="img-fluid mb-3"
                                />
                            )}
                        </Col>
                        <Col lg={9}>
                            Detail Produk
                            <hr />
                            <form>
                                <label className="mb-2">Nama Produk</label>
                                <input type="text" disabled placeholder="Nama Produk" className="form-control mb-3" />
                                <label className="mb-2">Harga</label>
                                <input type="text" disabled placeholder="Harga" className="form-control mb-3" />
                                <label className="mb-2">Ukuran</label>
                                <input type="text" disabled placeholder="Ukuran" className="form-control mb-3" />
                                <label className="mb-2">Stok</label>
                                <input type="text" disabled placeholder="Stok" className="form-control mb-3" />
                                <label className="mb-2">Status</label>
                                <select className="form-control mb-5" disabled>
                                    <option>Status</option>
                                </select>
                                <button type="submit" className="btn btn-primary px-3">Simpan</button>
                            </form>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}