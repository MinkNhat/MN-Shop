//Login - Register
var modalElement = document.querySelector('.js-modal')
var modalOverlayElement = document.querySelector('.js-modal__overlay')
var login = document.querySelector('.js-login-btn')
var register = document.querySelector('.js-register-btn')

// Quick view
var quickViewModal = document.querySelector('.js-quick-view')
var quickViewOverlay = document.querySelector('.js-quick-view__overlay')

// Header search input
var searchHistort = document.querySelector('.js-search-history')

// List product ( container chứa products )
var productsList = document.querySelector('.js-product-list')



app()
// -------


function app() {
    renderProducts()

    // Prevent sự kiện out focus vào search header ( khi click vào item vẫn giữ focus )
    searchHistort.onmousedown = function(e) {
        e.preventDefault()
    }

    // login - register
    login.onclick = function() {
        clickLogin()
    }
    
    register.onclick = function() {
        clickRegister()
    }

    modalOverlayElement.onclick = function() {
        modalElement.style.display = "none"
    }

    //quick view
    quickViewOverlay.onclick = function() {
        quickViewModal.style.display = "none"   
    }


}

// Hàm render products từ api, sau đó nhận sự kiện click vào nút "xem nhanh" trên từng sản phẩm
function renderProducts() {
    fetch('http://localhost:3000/productSeries')
    .then(response => response.json())
    .then(function(data){
        var html = data.map(function(productSeri){
            return `
                <div class="grid__column-2-4">
            <a class="home-product-item" href="">
                <div class="home-product-item__img" style="background-image: url(${productSeri.imgThump})"></div>
                <div class="home-product-item__name">${productSeri.SeriName}</div>
                <div class="home-product-item__price">
                    <span class="home-product-item__price-old">${FormatDotNumber((getMaxMinPrice(productSeri).minPrice*1.1).toFixed())}<span>đ</span></span>
                    <span class="home-product-item__price-current">${FormatDotNumber(getMaxMinPrice(productSeri).minPrice)}<span>đ</span></span>
                </div>
                <div class="home-product-item__action">
                    <div class="home-product-item__like home-product-item__like-liked">
                        <i class="home-product-item__like-icon-empty fa-regular fa-heart"></i>
                        <i class="home-product-item__like-icon-fill fa-solid fa-heart"></i>
                    </div>

                    <div class="home-product-item__rating">
                        <i class="home-product-item__rating-icon home-product-item__rating-icon--active fa-solid fa-star"></i>
                        <i class="home-product-item__rating-icon home-product-item__rating-icon--active fa-solid fa-star"></i>
                        <i class="home-product-item__rating-icon home-product-item__rating-icon--active fa-solid fa-star"></i>
                        <i class="home-product-item__rating-icon home-product-item__rating-icon--active fa-solid fa-star"></i>
                        <i class="home-product-item__rating-icon fa-solid fa-star"></i>
                    </div>

                    <!-- <span class="home-product-item__sold">88 đã bán</span> -->
                </div>
                <!-- <div class="home-product-item__origin">
                    <span class="home-product-item__origin-brand">Sony</span>
                    <span class="home-product-item__origin-name">Nhật Bản</span>
                </div> -->
                <div class="home-product-item__sale-off">
                    <span class="home-product-item__sale-label">SALE</span>
                    <span class="home-product-item__sale-percent">10%</span>
                </div>
                <div class="home-product-item__quick-view  js-quick-view-btn">
                    <span class="home-product-item__quick-view-link">XEM NHANH</span>
                </div>
                <div class="home-product-item__oder">
                    <button class="home-product-item__oder-btn">ĐẶT HÀNG NGAY</button>
                </div>
            </a>
        </div>
            `
        })
        productsList.innerHTML = html.join("") 
    })
    .then(clickQuickView)
}

// Xử lý khi click vào nút "xem nhanh" ở từng sản phẩm.
// Lưu ý: sau khi render mới xử lý ( do sau khi render mới có sản phẩm )
function clickQuickView() {
    var quickViewBtn = document.querySelectorAll('.js-quick-view-btn')
    for(var i=0; i<quickViewBtn.length; i++) {
        console.log(quickViewBtn[i])
        quickViewBtn[i].onclick = function(e) {
            e.preventDefault()
            quickViewModal.style.display = "block";
        }
    }
}

// Xử lý khi click vào nút Login
function clickLogin() {
    modalElement.style.display = "block"
    document.querySelector('.js-register-form').style.display = "none"
    document.querySelector('.js-login-form').style.display = "block"
    var switchBtn = document.querySelector('.js-switch2Res-btn')

    switchBtn.onclick = function() {
        clickRegister()
    }
}

// Xử lý khi click vào nút Register
function clickRegister() {
    modalElement.style.display = "block"
    document.querySelector('.js-login-form').style.display = "none"
    document.querySelector('.js-register-form').style.display = "block"
    var switchBtn = document.querySelector('.js-switch2Login-btn')
    switchBtn.onclick = function() {
        clickLogin()
    }
}

// Lấy price max và min
function getMaxMinPrice(obj) {
    var minPrice = Number.MAX_SAFE_INTEGER
    var maxPrice = 0
    for(var i=0; i<obj.products.length; i++) {
        if(obj.products[i].price < minPrice) minPrice = obj.products[i].price
        if(obj.products[i].price > maxPrice) maxPrice = obj.products[i].price
    }
    return {minPrice, maxPrice}
}

// Format chữ số hiển thị giá ( thêm dấu "." ngăn cách các hàng chữ số )
function FormatDotNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

