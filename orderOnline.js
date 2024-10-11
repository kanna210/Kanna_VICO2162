let cart = [];

function addToCart(itemName, itemPrice) {
    const itemID = itemName.toLowerCase().replace(/\s+/g, '-');
    const quantityInput = document.getElementById(`${itemID}-qty`);

    if (quantityInput) {
        const quantity = parseInt(quantityInput.value);

        if (quantity > 0) {
            const item = {
                name: itemName,
                price: itemPrice,
                quantity: quantity
            };

     
            const existingItemIndex = cart.findIndex(cartItem => cartItem.name === itemName);
            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += quantity;
            } else {
                cart.push(item);
            }

    
            updateCartCount();
            updateCart();
        } else {
            alert("Please enter a valid quantity.");
        }
    } else {
        console.error(`Quantity input not found for ${itemName}`);
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalItems;
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Clear previous items

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const li = document.createElement('li');
        li.innerText = `${item.name} x${item.quantity} - $${itemTotal.toFixed(2)}`;
        cartItems.appendChild(li);
    });

    // Display total in cart
    document.getElementById('total-price').innerText = total.toFixed(2);
}

function toggleCart() {
    const cartElement = document.getElementById('cart');
    cartElement.classList.toggle('hidden');
}

function placeOrder() {
    if (cart.length > 0) {
        alert('Order placed successfully!');
        cart = [];
        updateCartCount();
        updateCart();
        toggleCart();
    } else {
        alert('Your cart is empty!');
    }
}