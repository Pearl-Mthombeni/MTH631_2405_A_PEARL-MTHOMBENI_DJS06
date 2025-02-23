import { html, render } from 'https://cdn.jsdelivr.net/npm/lit@3.1.1/+esm'; // Import Lit from CDN

// Data setup
const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State'];
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie'];
const products = [
    { product: 'banana', price: '2' },
    { product: 'mango', price: '6' },
    { product: 'potato', price: '' },
    { product: 'avocado', price: '8' },
    { product: 'coffee', price: '10' },
    { product: 'tea', price: '' }
];

// Logs names and provinces
const namesWithProvinces = names.map((name, index) => `${name} (${provinces[index] || 'No Province'})`);

// Uppercase names for provinces
const upperCaseProvinces = provinces.map(province => province.toUpperCase());

// Creates array for each names length
const nameLengths = names.map(name => name.length);

//  Alphabetically sorts provinces
const sortedProvinces = [...provinces].sort();

// filter: Remove provinces containing "Cape" & count 
const filteredProvinces = provinces.filter(province => !province.includes('Cape'));
const remainingProvinceCount = filteredProvinces.length;

// Boolean array checking if names contain 'S'
const containsS = names.map(name => name.includes('S') || name.includes('s'));

// Map names to their respective provinces
const nameToProvince = names.reduce((acc, name, index) => {
    acc[name] = provinces[index] || 'No Province';
    return acc;
}, {});

// Product filtering: Remove empty prices, convert to numbers
const validProducts = products
    .filter(item => item.price !== '')
    .map(item => ({ ...item, price: Number(item.price) }));

// Finds highest and lowest prices
const highest = validProducts.reduce((max, item) => (item.price > max.price ? item : max), validProducts[0]);
const lowest = validProducts.reduce((min, item) => (item.price < min.price ? item : min), validProducts[0]);

// Concatenate all product names
const productString = products.reduce((acc, item) => acc + item.product + ', ', '').slice(0, -2);

// Convert products array to an object
const transformedProducts = products.reduce((acc, item) => {
    acc[item.product] = { name: item.product, cost: item.price || 'N/A' };
    return acc;
}, {});

// Create custom Lit Web Component
class ProductList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        const template = html`
            <style>
                ul { list-style-type: none; padding: 0; }
                li { background: #f4f4f4; margin: 5px 0; padding: 10px; border-radius: 5px; }
                h2 { color: #333; }
            </style>

            <h2>Names with Provinces</h2>
            <ul>${namesWithProvinces.map(entry => html`<li>${entry}</li>`)}</ul>

            <h2>Uppercase Provinces</h2>
            <ul>${upperCaseProvinces.map(province => html`<li>${province}</li>`)}</ul>

            <h2>Name Lengths</h2>
            <ul>${nameLengths.map(length => html`<li>${length}</li>`)}</ul>

            <h2>Sorted Provinces</h2>
            <ul>${sortedProvinces.map(province => html`<li>${province}</li>`)}</ul>

            <h2>Filtered Provinces (Excluding "Cape")</h2>
            <p>Remaining Count: ${remainingProvinceCount}</p>

            <h2>Names Containing 'S'</h2>
            <ul>${containsS.map((hasS, index) => html`<li>${names[index]}: ${hasS}</li>`)}</ul>

            <h2>Name to Province Mapping</h2>
            <ul>
                ${Object.entries(nameToProvince).map(([name, province]) => html`<li>${name}: ${province}</li>`)}
            </ul>

            <h2>Products</h2>
            <ul>${products.map(item => html`<li>${item.product}: ${item.price || 'N/A'}</li>`)}</ul>

            <h2>Highest & Lowest Priced Products</h2>
            <p>Highest: ${highest.product} - $${highest.price}</p>
            <p>Lowest: ${lowest.product} - $${lowest.price}</p>

            <h2>Concatenated Product Names</h2>
            <p>${productString}</p>

            <h2>Transformed Product Object</h2>
            <ul>
                ${Object.entries(transformedProducts).map(([key, value]) => html`<li>${value.name}: ${value.cost}</li>`)}
            </ul>
        `;

        render(template, this.shadowRoot);
    }
}

// Defines custom elements
customElements.define('product-list', ProductList);