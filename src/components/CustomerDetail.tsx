import PhotoGrid from "./PhotoGrid";
import { Customer } from "@/types/types";

interface CustomerDetailProps {
    id: number;
    className?: string;
    customer?: Customer;
}

const CustomerDetail = ({ customer, className }: CustomerDetailProps) => {
    return (
        <div
            className={`p-6 bg-white rounded-lg shadow-lg border border-gray-200 ${className} max-h-screen overflow-auto`}
        >
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Customer Name: {customer?.name}
                </h2>
            </div>
            <div className="border-t border-gray-300 pt-6">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                    Photos
                </h3>
                <PhotoGrid id={customer?.id} />
            </div>
        </div>
    );
};

export default CustomerDetail;
