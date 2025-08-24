import { useContextProvider } from "../_context/ContextProvider";
import formatCurrency from "../_helpers/formatCurrency";
import formatDate from "../_helpers/formatDate";
import formatDateV2 from "../_helpers/formatDateV2";
import formatString from "../_helpers/formatString";

function TransactionPopUpView({ data }) {
  const { closeModule } = useContextProvider();

  return (
    <div className="p-5">
      <div className="text-center font-bold text-xl">
        <div className="flex items-center justify-between mb-5">
          <h1>All Transactions</h1>
          <button
            onClick={closeModule}
            className="hover:bg-sky-100 cursor-pointer p-1 rounded-full"
          >
            &times;
          </button>
        </div>
        <table className="min-w-full border text-xs border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-1 border">Created</th>
              <th className="p-1 border">User</th>
              <th className="p-1 border">Amount</th>
              <th className="p-1 border">Description</th>
              <th className="p-1 border">Comment</th>
              <th className="p-1 border">Proportion</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-200">
                <td className="p-1 border sm:hidden">
                  {formatDateV2(row.created_at)}
                </td>
                <td className="p-1 border hidden sm:block">
                  {formatDate(row.created_at)}
                </td>
                <td className="p-1 border">{formatString(row.user)}</td>
                <td className="p-1 border">{formatCurrency(row.amount)}</td>
                <td className="p-1 border">{row.description}</td>
                <td className="p-1 border">{row.comment}</td>
                <td className="p-1 border">{formatString(row.proportion)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionPopUpView;
