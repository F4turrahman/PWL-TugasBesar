import { useEffect, useMemo } from 'react'
import { Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import {
    useTable, useSortBy, useGlobalFilter, usePagination,
} from 'react-table';
import { useNavigate } from 'react-router-dom';
import { FaPencil } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

export default function Manajemen() {
    const navigate = useNavigate()
    const manageData = useSelector((state) => state.store)

    const columns = useMemo(
        () => [
            {
                Header: 'No',
                accessor: (_, index) => index + 1
            },
            {
                Header: 'Nama Produk',
                accessor: 'name',
                Cell: ({ value }) => (value)
            },
            {
                Header: 'Harga',
                accessor: 'price',
                Cell: ({ value }) => (value),
            },
            {
                Header: 'Ukuran',
                accessor: 'ukuran',
                Cell: ({ value }) => (value),
            },
            {
                Header: 'Stok',
                accessor: 'stok',
                Cell: ({ value }) => (value),
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({ value }) => (value),
            },
            {
                Header: 'Aksi',
                id: 'actions',
                disableSortBy: true,
                Cell: ({ row }) => (
                    <div className='text-center'>
                        <Button variant='warning' className='mx-2' onClick={() => navigate('/detail-product')}><FaPencil /></Button>
                        <Button variant='danger' className='mx-2'><FaTrashAlt /></Button>
                    </div>
                ),
            },
        ],
        [navigate],
    )

    const data = useMemo(
        () => (manageData.manage?.data || []),
        [manageData.manage?.data]
    );
    useEffect(() => {
        if (!manageData.isLogin) {
            navigate('/login');
        }
    }, [manageData, navigate]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state,
        setGlobalFilter,
        gotoPage,
        pageCount,
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageSize: 5,
            }
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
    )

    const { globalFilter } = state

    return (
        <Container>
            <Row>
                <Col className='my-5'>
                    <Card className="overflow-hidden p-4 border-0 shadow-lg rounded-4">
                        <CardBody>
                            <Row className="mb-2">
                                <Col >
                                    <div className="mb-2 d-inline-block">
                                        <div className="position-relative">
                                            <input type="text" value={globalFilter || ''} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Cari data" className="form-control" style={{ backgroundColor: '#f3f6f9' }} />
                                        </div>
                                    </div>
                                </Col>
                                <Col className='text-end'>
                                    <Button variant="success">Tambah Produk</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className='table-responsive'>
                                        <table {...getTableProps()} className='table align-middle table-nowrap table-hover'>
                                            <thead className='text-center'>
                                                {headerGroups.map((headerGroup) => (
                                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                                        {headerGroup.headers.map((column) => {
                                                            const sortIcon = column.isSortedDesc ? "🔼" : "🔽";
                                                            return (
                                                                <th {...column.getHeaderProps(column.getSortByToggleProps())} className='bg-primary text-white'>
                                                                    {column.render('Header')}
                                                                    <span>{column.isSorted ? sortIcon : ''}</span>
                                                                </th>
                                                            );
                                                        })}
                                                    </tr>
                                                ))}
                                            </thead>
                                            {page.length === 0 ? (
                                                <tbody >
                                                    <tr>
                                                        <td colSpan={headerGroups[0].headers.length} className="text-center">
                                                            {(manageData.isLoading) ? 'Memuat data...' : 'Tidak ada data.'}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            ) : (
                                                <tbody {...getTableBodyProps()} className='text-center custom-tbody3'>
                                                    {page.map((row) => {
                                                        prepareRow(row);
                                                        return (
                                                            <tr {...row.getRowProps()}>
                                                                {row.cells.map((cell) => (
                                                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                                ))}
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            )}
                                        </table>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="align-items-md-center mt-3">
                                <Col>
                                    <nav aria-label="Page navigation">
                                        <ul className="pagination pagination-sm justify-content-end mb-2">
                                            {/* First */}
                                            <li className={`page-item ${state.pageIndex === 0 ? 'hide-pagination' : ''}`}>
                                                <button className="page-link" style={{ cursor: 'pointer' }} onClick={() => gotoPage(0)} tabIndex="-1">
                                                    {'<<'}
                                                </button>
                                            </li>
                                            {/* Previus */}
                                            <li className={`page-item ${state.pageIndex === 0 ? 'hide-pagination' : ''}`}>
                                                <button className="page-link" style={{ cursor: 'pointer' }} onClick={() => gotoPage(state.pageIndex - 1)} tabIndex="-1">{'<'}</button>
                                            </li>
                                            {Array.from({ length: pageCount }, (_, index) => index + 1).map((key, index) => (
                                                <li key={key} className={`page-item ${index === state.pageIndex ? 'active' : ''}`}>
                                                    <button className="page-link" style={{ cursor: 'pointer' }} onClick={() => gotoPage(index)}>{index + 1}</button>
                                                </li>
                                            ))}
                                            {/* Next */}
                                            <li className={`page-item ${state.pageIndex === pageCount - 1 ? 'hide-pagination' : ''}`}>
                                                <button className="page-link" style={{ cursor: 'pointer' }} onClick={() => gotoPage(state.pageIndex + 1)}>{'>'}</button>
                                            </li>
                                            {/* Last */}
                                            <li className={`page-item ${state.pageIndex === pageCount - 1 ? 'hide-pagination' : ''}`}>
                                                <button className="page-link" style={{ cursor: 'pointer' }} onClick={() => gotoPage(pageCount - 1)}>
                                                    {">>"}
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}