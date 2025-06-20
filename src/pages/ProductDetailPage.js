import ProductDetail from "../features/product/components/ProductDetail";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
function ProductDetailPage() {
  return (
    <>
      <Navbar>
        <ProductDetail></ProductDetail>
      </Navbar>
      <Footer></Footer>
    </>
  );
}

export default ProductDetailPage;
