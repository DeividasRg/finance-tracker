async function page({ params }) {
  const { id } = await params;

  return (
    <div>
      <p>ID {id}</p>
    </div>
  );
}

export default page;
