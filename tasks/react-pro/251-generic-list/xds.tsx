interface TableProps<TRow> {
  rows: TRow[];
  renderRow: (row: TRow) => React.ReactNode;
}

export const Table = <TRow,>({ rows, renderRow }: TableProps<TRow>) => (
  <table>
    <tbody>
      {rows.map((row, index) => (
        <tr key={index}>{renderRow(row)}</tr>
      ))}
    </tbody>
  </table>
);

type Product = {
  id: number;
  name: string;
  price: number;
};

const App = () => {
  const products: Product[] = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Phone', price: 700 },
  ];

  return (
    <Table
      rows={products}
      renderRow={(product) => (
        <>
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>{product.price}</td>
        </>
      )}
    />
  );
};
