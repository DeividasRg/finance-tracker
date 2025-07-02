import formatString from "../_helpers/formatString";

function StatSummary({ data, user }) {
  const totalSpent = Math.abs(
    data
      .filter((x) => x.amount < 0)
      .reduce((acc, cur) => acc + cur.amount, 0) || 0
  );
  const totalReceived =
    data
      .filter((x) => x.amount > 0)
      .reduce((acc, cur) => acc + cur.amount, 0) || 0;

  const totalCount = data.length;

  return (
    <>
      <h1 className="text-center font-normal tracking-widest border-b">
        {formatString(user)} all time stats
      </h1>
      <div className="flex flex-col w-[95%] gap-3">
        <div className="flex items-center justify-between border-b">
          <p className="font-normal text-gray-700">Total spent:</p>
          <p className="font-light">{totalSpent} €</p>
        </div>
        <div className="flex items-center justify-between border-b">
          <p className="font-normal text-gray-700">Total received:</p>
          <p className="font-light">{totalReceived} €</p>
        </div>
        <div className="flex items-center justify-between border-b">
          <p className="font-normal text-gray-700">Total transactions:</p>
          <p className="font-light">{totalCount}</p>
        </div>
      </div>
    </>
  );
}

export default StatSummary;
