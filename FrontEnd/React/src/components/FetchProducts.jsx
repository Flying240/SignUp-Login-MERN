import { useState, useEffect } from "react";
import axios from "axios";

const FetchProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const url = "http://localhost:3000/user";
                const token = localStorage.getItem("token");
                const headers = {
                    headers: {
                        Authorization: token,
                    },
                };

                const response = await axios.get(url, headers);
                setProducts(response.data.products || []);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {products.map((product, index) => (
                <div
                    key={index}
                    className="border p-4 rounded-lg shadow"
                >
                    <h2 className="text-xl font-bold">{product.name}</h2>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="text-green-600 font-bold mt-2">
                        ${product.price}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default FetchProducts;
