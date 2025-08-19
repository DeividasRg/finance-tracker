import formatCurrency from "../_helpers/formatCurrency";
import formatString from "../_helpers/formatString";

function MonthlyStats({ data }) {
  return (
    <div className="flex flex-col gap-8 w-full mt-15 px-4">
      <h1 className="text-2xl font-bold text-center">Monthly Stats</h1>

      {Object.entries(data).map(([year, months]) => (
        <div key={year} className="pb-4 mb-4">
          <p className="text-xl font-semibold text-gray-600 mb-2">{year}</p>

          {Object.entries(months)
            .sort(([m1], [m2]) => m1.localeCompare(m2))
            .map(([month, categories]) => {
              const monthTotal = Object.values(categories).reduce(
                (sum, amount) => sum + amount,
                0
              );

              return (
                <div key={month} className="mb-3 pl-4">
                  <p className="font-medium text-gray-500 mb-1">
                    {new Date(`${year}-${month}-01`).toLocaleString("default", {
                      month: "long",
                    })}
                  </p>

                  <div className="flex flex-col gap-1 ml-4">
                    {Object.entries(categories)
                      .sort(([, a], [, b]) => a - b)
                      .map(([category, amount]) => (
                        <div
                          key={category}
                          className="flex justify-between bg-gray-50 px-3 py-1 rounded shadow-sm hover:bg-gray-100 transition"
                        >
                          <span className="text-gray-700">
                            {formatString(category)}
                          </span>
                          <span className="font-medium text-gray-800">
                            {formatCurrency(amount)}
                          </span>
                        </div>
                      ))}

                    <div className="flex justify-between bg-gray-200 px-3 py-1 rounded mt-2 font-semibold">
                      <span>Total</span>
                      <span>{formatCurrency(monthTotal)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
}

export default MonthlyStats;
