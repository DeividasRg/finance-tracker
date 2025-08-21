function TitleComponent({ text }) {
  return (
    <div className="flex justify-center">
      <span className="font-bold text-2xl tracking-wider border-b pb-2 text-center">
        {text}
      </span>
    </div>
  );
}

export default TitleComponent;
