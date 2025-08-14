function AllStats({ transactions }) {
  const totalSpent = Math.round(
    Math.abs(
      transactions
        .filter((x) => x.amount < 0)
        .reduce((acc, cur) => acc + cur.amount, 0) || 0
    )
  );

  return (
    <div className="text-center w-full">
      <p>
        All time transaction count -{" "}
        <span className="text-gray-800 font-bold">{transactions.length}</span>
      </p>
      <p>
        All time spent -{" "}
        <span className="text-gray-800 font-bold">{totalSpent} €</span>
      </p>
    </div>
  );
}

export default AllStats;
