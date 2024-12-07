import { customers, URL } from "@/utils/constants";

//  lets fecth customer data

export const fetchCustomers = async () => {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return customers;
    }
};
