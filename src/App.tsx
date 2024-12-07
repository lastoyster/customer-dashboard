import CustomerList from "./components/CustomerList";

const App = () => {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-200">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
                <CustomerList />
            </div>
        </div>
    );
};

export default App;
