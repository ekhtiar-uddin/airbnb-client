export function AddressLink({ children }) {
  return (
    <a
      href={`https://maps.google.com/?q=${encodeURIComponent(children)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block my-2 text-gray-700 underline"
    >
      {children}
    </a>
  );
}
