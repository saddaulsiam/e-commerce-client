import Link from "next/link";
import Image from "next/image";
import { AiOutlineArrowRight } from "react-icons/ai";

const VendorOrderDetailsCart = ({ order }) => {
  return (
    <>
      <div className="mt-10 overflow-x-auto print:overflow-hidden">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Color</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {order?.products?.map((product, i) => (
              <tr key={i}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-20 w-20">
                        <Image
                          layout="fill"
                          src={product?.mainImage}
                          alt="Product image"
                          priority
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold capitalize">
                        {product?.name}
                      </div>
                      <div className="text-sm opacity-50">Any Title</div>
                    </div>
                  </div>
                </td>

                <td>
                  <p className="ml-2 capitalize">{product?.colors}</p>
                </td>
                <td>
                  <p className="ml-2 capitalize">{product?.size}xl</p>
                </td>
                <td>
                  <p className="ml-5">{product?.quantity}</p>
                </td>
                <td>
                  <p className="ml-3">{product?.salePrice}</p>
                </td>
                <td>
                  <Link href={`/product/${product._id}`}>
                    <p className="inline-block cursor-pointer rounded-full p-2 transition duration-200 ease-in-out hover:bg-slate-200 sm:text-lg">
                      <AiOutlineArrowRight />
                    </p>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default VendorOrderDetailsCart;
