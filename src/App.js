import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom';
import Admin from './pages/admin'
import CategoryList from './pages/admin/category/CategoryList';
import AdminHeader from './pages/admin/layout/AdminHeader';
import Home from './pages/admin/home'
import { Content } from 'antd/lib/layout/layout';
import AddCategory from './pages/admin/category/AddCategory';
import ProductList from './pages/admin/product/ProductList';
import AddProduct from './pages/admin/product/AddProduct';
import UpdateCategory from './pages/admin/category/UpdateCategory';
import Pricing from './pages/site/HomePage';
import UpdateProduct from './pages/admin/product/UpdateProduct';
import SupplierList from './pages/admin/supplier/SupplierList';
import UpdateSupplier from './pages/admin/supplier/UpdateSupplier';
import AddSupplier from './pages/admin/supplier/AddSupplier';
import Orders from './pages/admin/order/Orders';


function App() {
  return (
    <>
      {/* <Pricing></Pricing> */}

      <Layout>
        <AdminHeader></AdminHeader>
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/categories" element={<CategoryList />} />
              <Route
                path="/admin/categories/update/:id"
                element={<UpdateCategory />}
              />
              <Route path="/admin/addCategory" element={<AddCategory />} />
              <Route path="/admin/products" element={<ProductList />} />
              <Route path="/admin/addproduct" element={<AddProduct />} />
              <Route
                path="/admin/products/update/:id"
                element={<UpdateProduct />}
              />
              <Route path="/admin/suppliers" element={<SupplierList />} />
              <Route path="/admin/suppliers/:id" element={<UpdateSupplier />} />
              <Route path="/admin/addsupplier" element={<AddSupplier />} />
              <Route path="/admin/orders" element={<Orders />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default App;
