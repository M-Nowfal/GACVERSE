const ValidationError = ({ error }: { error: string }) => {
  return (
    <p className="text-xs font-semibold text-red-600">{error}</p>
  );
}

export default ValidationError;
