function Stat({ label, data }) {
  return (
    <div className="flex justify-between bg-gray-50 px-3 py-1 rounded shadow-sm hover:bg-gray-100 transition">
      <p className="text-gray-700">{label}</p>
      <p className="font-medium text-gray-800">{data} €</p>
    </div>
  );
}

export default Stat;
