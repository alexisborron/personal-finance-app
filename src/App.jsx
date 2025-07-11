import "./App.css";
import { Routes, Route } from "react-router-dom";
import data from "./data/data.json";
import ScrollToTop from "./components/ScrollToTop";
import Sidebar from "./components/Sidebar";
import OverviewPage from "./pages/Overview/OverviewPage";
import PotsPage from "./pages/Savings/PotsPage";
import TransactionsPage from "./pages/Transactions/TransactionsPage";
import BudgetsPage from "./pages/Budgets/BudgetsPage";
import BillsPage from "./pages/Bills/BillsPage";

function App() {
  return (
    <>
      <Sidebar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<OverviewPage data={data} />} />
        <Route path="/pots" element={<PotsPage data={data} />} />
        <Route
          path="/transactions"
          element={<TransactionsPage data={data} />}
        />
        <Route path="/budgets" element={<BudgetsPage data={data} />} />
        <Route path="/bills" element={<BillsPage data={data.transactions} />} />
      </Routes>
    </>
  );
}

export default App;
