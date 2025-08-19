import formatString from "../_helpers/formatString";
import Stat from "./Stat";

function StatSummary({ data, user }) {
  const totalSpent = Math.round(
    Math.abs(
      data
        .filter((x) => x.amount < 0)
        .reduce((acc, cur) => acc + cur.amount, 0) || 0
    )
  );
  const totalReceived = Math.round(
    data
      .filter((x) => x.amount > 0)
      .reduce((acc, cur) => acc + cur.amount, 0) || 0
  );

  const totalCount = data.length;

  return (
    <>
      <h1 className="text-2xl font-bold text-center">
        {formatString(user)} all time stats
      </h1>

      <div className="flex flex-col w-[95%] gap-3">
        <Stat label="Total spent:" data={totalSpent} />
        <Stat label="Total received:" data={totalReceived} />
        <Stat label="Total transactions:" data={totalCount} />
      </div>
    </>
  );
}

export default StatSummary;
