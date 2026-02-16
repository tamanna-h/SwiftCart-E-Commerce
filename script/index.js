// Load all products
const loadProducts = () => {
    fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((data) => displayProduct(data))
}

// Load all categories
const loadCategoryProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products/categories')
    const data = await res.json()
    displayCategories(data);
}

// Initialize category buttons
loadCategoryProducts()

// Display category filter buttons
const displayCategories = (categories) => {
    console.log(categories);
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';
    
    // Add "All" button
    const allBtn = document.createElement('button');
    allBtn.classList.add('px-4', 'py-2', 'bg-indigo-600', 'text-white', 'rounded-full', 'text-sm');
    allBtn.innerText = 'All';
    allBtn.onclick = () => {
        loadProducts();
        setActiveButton(allBtn);
    };
    levelContainer.appendChild(allBtn);
    
    // Add category buttons
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.classList.add('px-4', 'py-2', 'bg-white', 'border', 'rounded-full', 'text-sm', 'hover:bg-indigo-50');
        btn.innerText = category.charAt(0).toUpperCase() + category.slice(1);
        btn.onclick = () => {
            loadProductsByCategory(category);
            setActiveButton(btn);
        };
        levelContainer.appendChild(btn);
    });
}

// Set active button styling
const setActiveButton = (activeBtn) => {
    const buttons = document.querySelectorAll('#level-container button');
    buttons.forEach(btn => {
        btn.classList.remove('bg-indigo-600', 'text-white');
        btn.classList.add('bg-white', 'border');
    });
    activeBtn.classList.remove('bg-white', 'border');
    activeBtn.classList.add('bg-indigo-600', 'text-white');
}

// Load products by category
const loadProductsByCategory = (category) => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((res) => res.json())
    .then((data) => displayProduct(data))
}

// Load single product details for modal
const loadProductDetails = async (id) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();
    showProductModal(data);
}

// Show product details in modal
const showProductModal = (product) => {
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <div class="flex flex-col md:flex-row gap-6">
            <!-- Product Image -->
            <div class="md:w-1/2">
                <img src="${product.image}" 
                     alt="${product.title}"
                     class="w-full h-80 object-contain rounded-lg bg-gray-50 p-4">
            </div>
            
            <!-- Product Info -->
            <div class="md:w-1/2 flex flex-col">
                <span class="text-xs text-indigo-600 font-semibold uppercase mb-2">
                    ${product.category}
                </span>
                
                <h3 class="text-2xl font-bold mb-4">
                    ${product.title}
                </h3>
                
                <div class="flex items-center gap-4 mb-4">
                    <span class="text-yellow-500 font-semibold">
                        ⭐ ${product.rating.rate}
                    </span>
                    <span class="text-gray-500 text-sm">
                        (${product.rating.count} reviews)
                    </span>
                </div>
                
                <p class="text-3xl font-bold text-indigo-600 mb-6">
                    $${product.price}
                </p>
                
                <div class="mb-6 flex-grow">
                    <h4 class="font-semibold mb-2">Description:</h4>
                    <p class="text-gray-600 text-sm leading-relaxed">
                        ${product.description}
                    </p>
                </div>
                
                <div class="flex gap-3 mt-auto">
                    <button class="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                        Buy Now
                    </button>
                    <button class="flex-1 border-2 border-indigo-600 text-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Open the modal
    document.getElementById('product_modal').showModal();
}

// Display products in grid
const displayProduct = (products) => {
    console.log(products);
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm p-4">
                <img src="${product.image}"
                     class="h-48 w-full object-contain rounded-lg mb-4">

                <span class="text-xs text-indigo-600">${product.category}</span>
                <h3 class="font-semibold text-sm mt-2 line-clamp-2">
                    ${product.title}
                </h3>

                <div class="flex items-center justify-between text-sm mt-2">
                    <span class="text-yellow-500">⭐ ${product.rating.rate} <span class="text-gray-400">(${product.rating.count})</span></span>
                    <span class="font-bold">$${product.price}</span>
                </div>

                <div class="flex gap-2 mt-4">
                    <button onclick="loadProductDetails(${product.id})" class="flex-1 border rounded-md py-2 text-sm hover:bg-gray-100">
                        Details
                    </button>
                    <button class="flex-1 bg-indigo-600 text-white rounded-md py-2 text-sm hover:bg-indigo-700">
                        Add
                    </button>
                </div>
            </div>
        `;
        productContainer.appendChild(productCard);
    });
}

// Initialize: Load all products on page load
loadProducts();