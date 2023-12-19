from waitress import serve
from pyramid.config import Configurator
from pyramid.response import Response
from pyramid.view import view_config
import pymysql


# Koneksi ke database MySQL
connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    db='tubes_pwl',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)

@view_config(route_name='hello', request_method='GET', renderer='json')
def hello_world(request):
    print('Incoming request')
    data = [{'id': 1, 'name': 'product 1'}, {'id': 2, 'name': 'product 2'}]
    return {'data': data}

# Fungsi untuk menampilkan data pada tabel database (READ)
@view_config(route_name='product', request_method='GET', renderer='json')
def product(request):
    '''Create a hello view to get'''
    # show from table movies
    with connection.cursor() as cursor:
        sql = "SELECT * FROM produk"
        cursor.execute(sql)
        result = cursor.fetchall()
        
    data = []
    for item in result:
        data.append({
            'id': item['produk_id'],
            'nama_barang': item['nama_produk'],
            'harga': item['harga_produk'],
            'ukuran_produk': item['ukuran'],
            'detail_produk': item['deskripsi'],
        })
    return {
        'greet': 'ok', 
        'data': data
        }


# Fungsi untuk menambahkan data pada tabel database (CREATE)
@view_config(route_name='product-create', request_method='POST', renderer="json")
def product_create(request):
    '''Create a product view to post'''
    # insert into table 
    body = request.json_body
    with connection.cursor() as cursor:
        sql = "INSERT INTO produk (nama_produk, harga_produk, ukuran, deskripsi) VALUES (%s, %s, %s, %s)"
        cursor.execute(sql, (body['nama_barang'], body['harga'], body['ukuran_produk'], body['detail_produk']))
        connection.commit()
    return {'greet': 'ok'}


# Fungsi untuk mengupdate data pada tabel database (UPDATE)
@view_config(route_name='product-update', request_method='PUT', renderer="json")
def product_update(request):
    '''Create a product view to put'''
    # update table
    body = request.json_body
    with connection.cursor() as cursor:
        sql = "UPDATE produk SET nama_produk=%s, harga_produk=%s, ukuran=%s, deskripsi=%s WHERE id=%s"
        cursor.execute(sql, (body['nama_barang'], body['harga'], body['ukuran_produk'], body['detail_produk'], body['id']))
        connection.commit()
    return {'greet': 'ok'}


# Fungsi untuk menghapus data pada tabel database (DELETE)
@view_config(route_name='product-delete', request_method='DELETE', renderer="json")
def product_delete(request):
    '''Create a product view to delete'''
    # delete from table
    with connection.cursor() as cursor:
        sql = "DELETE FROM produk WHERE id=%s"
        cursor.execute(sql, (request.GET.get('id')))
        connection.commit()
    return {'greet': 'ok'}



@view_config(route_name='product-byID', request_method='GET', renderer="json")
def product_byID(request):
    '''Create a product view to get by ID'''
    with connection.cursor() as cursor:
        sql = "SELECT * FROM assets WHERE id=%s"
        cursor.execute(sql, (request.GET.get('id')))
        response = cursor.fetchone()
    return {'greet': 'ok', 'data': response}


if __name__ == '__main__':
    with Configurator() as config:
        config.add_route('hello', '/')
        config.add_route('product', '/product')
        config.add_route('product-create', '/product-create')
        config.add_route('product-update', '/product-update')
        config.add_route('product-delete', '/product-delete')
        config.scan()
        config.add_static_view(name='static', path='static')
        app = config.make_wsgi_app()
    serve(app, host='0.0.0.0', port=6543)