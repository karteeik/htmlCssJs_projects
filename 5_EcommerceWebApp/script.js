const products = fetch('products.json')
    .then(response => response.json())
    .then(data => {
      console.log('Products:', data);
      // You can now use the data here
    })
    .catch(error => console.error('Error loading JSON:', error));

const productContainer = document.getElementById('productContainer');
const productTemplate = document.getElementById('productTemplate');

const showProductContainer = (products) => {
  if(!products){
    return false;
  }

  products.forEach((curProd) => {
    const {brand, category, description, id, image, name, price, stock} = curProd;

    const prodClone = document.importNode(productTemplate.content, true);

    prodClone.querySelector('.productName').textContent = name;

    productTemplate.append(prodClone);
  });
}

showProductContainer(products);