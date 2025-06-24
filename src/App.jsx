import "./App.css";
import { Routes, Route } from "react-router-dom";
import data from "./data/data.json";
import Sidebar from "./components/Sidebar";
import OverviewPage from "./pages/Overview/OverviewPage";
import PotsPage from "./pages/PotsPage";
import TransactionsPage from "./pages/Transactions/TransactionsPage";
import BudgetsPage from "./pages/BudgetsPage";
import BillsPage from "./pages/BillsPage";

function App() {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<OverviewPage data={data} />} />
        <Route path="/pots" element={<PotsPage />} />
        <Route
          path="/transactions"
          element={<TransactionsPage data={data} />}
        />
        <Route path="/budgets" element={<BudgetsPage />} />
        <Route path="/bills" element={<BillsPage />} />
      </Routes>
    </>
  );
}

export default App;
