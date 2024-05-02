import { useState } from 'react';

export default function ProductScreen(){
  const [filter, setFilter] = useState('');
  const [isStocked, setIsStocked] = useState(false);

  const products = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
  ];

  return (
    <div>
      <SearchBar filter={filter} isStocked={isStocked} setFilter={setFilter} setIsStocked={setIsStocked} />
      <ProductTable products={products} filter={filter} isStocked={isStocked}/>
    </div>
  );
}

function ProductRow({product}){
  const name = product.stocked ? product.name : <span style={{color: 'red'}}>{product.name}</span>
  return (<tr>
    <th>{name}</th>
    <th>{product.price}</th>
  </tr>);
}

function ProductCategoryRow({category}){
  return (<tr>
    <th colSpan="2">{category}</th>
  </tr>);
}

function ProductTable({ products, filter, isStocked }){
  const rows = [];
  var lastCategory = null;

  products.forEach((product => {
    if(product.name.toLowerCase().indexOf(filter.toLowerCase()) === -1){
      return;
    }
    if(isStocked && !product.stocked){
      return;
    }
    if(product.category == lastCategory){
      rows.push(
        <ProductRow product={product}/>
      );
    } else{
      lastCategory = product.category;
      rows.push(
        <ProductCategoryRow category={product.category}/>,
        <ProductRow product={product}/>
      );
    }
  }));

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

function SearchBar({filter, isStocked, setFilter, setIsStocked}){
  return(
    <form>
      <input type="text" placeholder = "Search..." value={filter} onChange={(e) => setFilter(e.target.value)}></input>
      <label>
        <input type="checkbox" checked={isStocked} onChange={(e) => setIsStocked(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}