import MockAdapter from "axios-mock-adapter";
import axios from "axios";

export const url = "http://fake.backend.com:5000/"

// FAKE BAKCEND
const mock = new MockAdapter(axios);

// Response Success
mock.onPost(url + 'login').reply(200, {
    message: 'Login Success',
    role: 'user',
    user: 'user',
    email: 'user@gmail.com',
    password: 'user',
    no: '08123321123',
    alamat: 'lorem ipsume dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore er delore magna aliqua.'
});

mock.onPost(url + 'loginAdmin').reply(200, {
    message: 'Login Success',
    role: 'admin',
    user: 'admin',
    email: 'admin@gmail.com',
    password: 'admin',
    no: '08123321123',
    alamat: 'lorem ipsume dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore er delore magna aliqua.'
});

mock.onPut(url + 'updateUser').reply(200, {
    message: 'Login Success',
    role: 'user',
    user: 'user',
    email: 'updated_user@gmail.com',
    password: 'user',
    no: '08123321123',
    alamat: 'Updated address information.'
});

mock.onPut(url + 'updateAdmin').reply(200, {
    message: 'Login Success',
    role: 'admin',
    user: 'admin Updated!',
    email: 'admin_updaterd!@gmail.com',
    password: 'admin',
    no: '08123321123',
    alamat: 'Updated address information.'
});

mock.onPost(url + 'register').reply(200, { message: 'Register Success' });
mock.onGet(url + 'count').reply(200, {
    tersedia: "20000",
    dikirim: '15000',
    terjual: "5021",
});
mock.onGet(url + 'charts').reply(200, [
    { january: 42 },
    { februari: 800 },
    { maret: 12 },
    { april: 124 },
    { mei: 141 },
    { juni: 800 },
    { juli: 500 },
    { agustus: 400 },
    { september: 120 },
    { oktober: 900 },
    { november: 1242 },
    { desember: 2812 }
]);
mock.onGet(url + 'manage').reply(200, {
    message: 'success',
    data: [
        {
            id: 1, name: 'Tas Han & Yan', price: 'Rp. 1.050.000', stok: 20, status: 'tersedia', ukuran: 'besar'
        },
        {
            id: 2, name: 'Tas Mahal', price: 'Rp. 2.250.000', stok: 50, status: 'tersedia', ukuran: 'kecil'
        },
        {
            id: 3, name: 'Tas Murah', price: 'Rp. 3.321.123', stok: 1, status: 'tersedia', ukuran: 'sedang'
        },
        {
            id: 4, name: 'Tas Han & Yan', price: 'Rp. 1.050.000', stok: 20, status: 'tersedia', ukuran: 'besar'
        },
        {
            id: 5, name: 'Tas Mahal', price: 'Rp. 2.250.000', stok: 50, status: 'tersedia', ukuran: 'kecil'
        },
        {
            id: 6, name: 'Tas Murah', price: 'Rp. 3.321.123', stok: 1, status: 'tersedia', ukuran: 'sedang'
        },
        {
            id: 7, name: 'Tas Han & Yan', price: 'Rp. 1.050.000', stok: 20, status: 'tersedia', ukuran: 'besar'
        },
        {
            id: 8, name: 'Tas Mahal', price: 'Rp. 2.250.000', stok: 50, status: 'tersedia', ukuran: 'kecil'
        },
        {
            id: 9, name: 'Tas Murah', price: 'Rp. 3.321.123', stok: 1, status: 'tersedia', ukuran: 'sedang'
        },
        {
            id: 10, name: 'Tas Han & Yan', price: 'Rp. 1.050.000', stok: 20, status: 'tersedia', ukuran: 'sedang'
        },]
});

mock.onDelete(url + 'logout').reply(200);

mock.onPost(url + 'addToCart').reply(200, { message: 'Add Data Success' });

mock.onGet(url + 'dashboardUser').reply(200, [
    {
        id: 1, name: 'Tas Han & Yan', price: 'Rp. 1.050.000', stok: 20, deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'https://lzd-img-global.slatic.net/g/p/d574907fe8669ffad077f601418483eb.jpg_360x360q75.jpg_.webp'
    },
    {
        id: 2, name: 'Tas Mahal', price: 'Rp. 2.250.000', stok: 50, deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'https://lzd-img-global.slatic.net/g/ff/kf/S8f59f267a2fc441e90dcc0734d0cb5f3f.jpg_360x360q75.jpg_.webp'
    },
    {
        id: 3, name: 'Tas Murah', price: 'Rp. 3.321.123', stok: 1, deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'https://id-live-01.slatic.net/p/57c7b54b9dfba0e50824a9525449caf1.jpg'
    },
    {
        id: 4, name: 'Tas Han & Yan', price: 'Rp. 1.050.000', stok: 20, deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'https://lzd-img-global.slatic.net/g/p/d574907fe8669ffad077f601418483eb.jpg_360x360q75.jpg_.webp'
    },
    {
        id: 5, name: 'Tas Mahal', price: 'Rp. 2.250.000', stok: 50, deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'https://lzd-img-global.slatic.net/g/ff/kf/S8f59f267a2fc441e90dcc0734d0cb5f3f.jpg_360x360q75.jpg_.webp'
    },
    {
        id: 6, name: 'Tas Murah', price: 'Rp. 3.321.123', stok: 1, deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'https://id-live-01.slatic.net/p/57c7b54b9dfba0e50824a9525449caf1.jpg'
    },
    {
        id: 7, name: 'Tas Han & Yan', price: 'Rp. 1.050.000', stok: 20, deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'https://lzd-img-global.slatic.net/g/p/d574907fe8669ffad077f601418483eb.jpg_360x360q75.jpg_.webp'
    },
    {
        id: 8, name: 'Tas Mahal', price: 'Rp. 2.250.000', stok: 50, deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'https://lzd-img-global.slatic.net/g/ff/kf/S8f59f267a2fc441e90dcc0734d0cb5f3f.jpg_360x360q75.jpg_.webp'
    },
    {
        id: 9, name: 'Tas Murah', price: 'Rp. 3.321.123', stok: 1, deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'https://id-live-01.slatic.net/p/57c7b54b9dfba0e50824a9525449caf1.jpg'
    },
    {
        id: 10, name: 'Tas Han & Yan', price: 'Rp. 1.050.000', stok: 20, deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'https://lzd-img-global.slatic.net/g/p/d574907fe8669ffad077f601418483eb.jpg_360x360q75.jpg_.webp'
    },
])

// Response Failed
mock.onPost(url + 'loginfail').reply(400, { message: 'Login Failed' });
mock.onPost(url + 'registerfail').reply(400, { message: 'Password Not Match!' });