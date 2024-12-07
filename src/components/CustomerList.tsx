import { fetchCustomers } from "@/services/CustomerService";
import { Customer } from "@/types/types";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import CustomerCard from "./CustomerCard";
import CustomerDetail from "./CustomerDetail";

const CustomerList = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
        null
    );

    const handleCardClick = (customerId: number) => {
        setSelectedCustomerId(customerId);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCustomers();
                setCustomers(data);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Customer List Panel */}
            <div className="w-1/3 max-w-xs bg-gray-100 border-r border-gray-300 p-4 flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Customers
                </h2>
                <ScrollArea className="flex-1 overflow-y-auto rounded-lg bg-white shadow-inner p-2">
                    {customers.map((customer) => (
                        <CustomerCard
                            key={customer.id}
                            customer={customer}
                            isSelected={selectedCustomerId === customer.id}
                            onClick={handleCardClick}
                            className="mb-3 transition-transform transform hover:scale-105 hover:shadow-xl"
                        />
                    ))}
                </ScrollArea>
            </div>

            {/* Customer Detail Panel */}
            <div className="flex-1 max-h-screen p-6 bg-gray-50">
                {selectedCustomerId ? (
                    <CustomerDetail
                        id={selectedCustomerId}
                        customer={customers.find(
                            (customer) => customer.id === selectedCustomerId
                        )}
                        className="transition-opacity duration-300 opacity-100"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-600 text-lg">
                        Select a customer to see details
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerList;
