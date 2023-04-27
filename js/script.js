// get elements
let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let sbmitBtn = document.querySelector("#submit");
let search = document.querySelector("#search");
let searchTitle = document.querySelector("#search-title");
let searchCategory = document.querySelector("#search-category");
let mood = "create";
let virtualVar; /// for using local variable or paramater and making it global for using in other functions easily
let table = "";
let tBody = document.getElementById("tbody");


// Get total in span show total price 

function getTotal() {
  if (price.value !== "") {
    let totalRes = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = totalRes;
    total.style.background = "#157347";
  } else {
    total.innerHTML = "";
    total.style.background = "#dc3545";
  }
}

/// Making function create the product in arrays and store them in local storage

let productData;
/// get saved values from local storage
if (localStorage.getItem("product") != null) {
  productData = JSON.parse(localStorage.getItem("product"))
} else {
  productData = [];
}

submit.onclick = function () {
  theProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value
  }
  /// Making any number of products from here 
  if (mood === "create") {
    if (theProduct.count > 1) {
      for (let i = 0; i < theProduct.count; i++) {
        productData.push(theProduct)
      }
    } else {
      productData.push(theProduct)
    }
  } else {
    productData[virtualVar] = theProduct;
    submit.innerHTML = 'Create';
    count.style.display = "block";
  }
  /// Saving values in local storage
  localStorage.setItem("product", JSON.stringify(productData));
  clearInputValue()
  showProductData()
}

/// Clear Values from inputs

function clearInputValue() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}


/// Show data by putting them in table dynamically

function showProductData() {
  for (let i = 0; i < productData.length; i++) {
    table += ` 
    <tr>
      <th scope="row">${i + 1}</th>
      <td>${productData[i].title}</td>
      <td>${productData[i].price}</td>
      <td>${productData[i].taxes}</td>
      <td>${productData[i].ads}</td>
      <td>${productData[i].discount}</td>
      <td>${productData[i].total}</td>
      <td>${productData[i].category}</td>
      <td><button class="btn btn-warning fw-bold" onclick="updateProduct(${i})">Update</button></td>
      <td><button class="btn btn-danger fw-bold" onclick="deleteProduct(${i})">Delete</button></td>
    </tr>
    `
  }
  tBody.innerHTML = table
  /// showing delete all product btn if there are products
  const deleteAllBtn = document.querySelector(".delete-btn");
  if (productData.length > 0) {
    deleteAllBtn.innerHTML = `<button class="btn btn-danger w-100 mb-3" id="deleteAll" onclick="deleteAllProducts()">Delete All (${productData.length})</button>`
  } else {
    deleteAllBtn.innerHTML = ""
  }
  /// for making total having color red and green while change the value or create product
  getTotal()
}
showProductData()


/// Delete item from list table

function deleteProduct(i) {
  productData.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(productData));
  showProductData()
}

/// Delete All products from table 

function deleteAllProducts() {
  localStorage.clear();
  productData.splice(0);
  showProductData()
}

// Update function

function updateProduct(i) {
  title.value = productData[i].title,
    price.value = productData[i].price,
    taxes.value = productData[i].taxes,
    ads.value = productData[i].ads,
    discount.value = productData[i].discount,
    getTotal();
  category.value = productData[i].category
  submit.innerHTML = 'Update';
  count.style.display = "none";
  mood = "update";
  virtualVar = i;
  scroll({
    top: 0,
    behavior: "smooth"
  });
}

//// Start search function 

let searchMood = "title"

/// update input field

function updateInputField(id) {
  if (id == "search-title") {
    searchMood = "title";
    search.placeholder = searchTitle.dataset.placeholder
  } else {
    searchMood = "category";
    search.placeholder = searchCategory.dataset.placeholder
  }
  search.focus();
}

/// Start searching

function searchProduct(inputValue) {
  for (let i = 0; i < productData.length; i++) {
    if (searchMood == "title") {
      if (productData[i].title.includes(inputValue)) {
        table += ` 
            <tr>
              <th scope="row">${i + 1}</th>
              <td>${productData[i].title}</td>
              <td>${productData[i].price}</td>
              <td>${productData[i].taxes}</td>
              <td>${productData[i].ads}</td>
              <td>${productData[i].discount}</td>
              <td>${productData[i].total}</td>
              <td>${productData[i].category}</td>
              <td><button class="btn btn-warning fw-bold" onclick="updateProduct(${i})">Update</button></td>
              <td><button class="btn btn-danger fw-bold" onclick="deleteProduct(${i})">Delete</button></td>
            </tr>
        `
      }
    } else {
      if (productData[i].category.includes(inputValue)) {
        table += ` 
            <tr>
              <th scope="row">${i + 1}</th>
              <td>${productData[i].title}</td>
              <td>${productData[i].price}</td>
              <td>${productData[i].taxes}</td>
              <td>${productData[i].ads}</td>
              <td>${productData[i].discount}</td>
              <td>${productData[i].total}</td>
              <td>${productData[i].category}</td>
              <td><button class="btn btn-warning fw-bold" onclick="updateProduct(${i})">Update</button></td>
              <td><button class="btn btn-danger fw-bold" onclick="deleteProduct(${i})">Delete</button></td>
            </tr>
            `
      }
    }
    tBody.innerHTML = table
  }
}

