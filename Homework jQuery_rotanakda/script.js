let API_URL = 'https://api.escuelajs.co/api/v1'
$(function(){
    // prepare object for insert to api product
    let product = {
        title: "",
        price: 0,
        description: "",
        categoryId: 0,
        images: ["https://eduport.webestica.com/assets/images/courses/4by3/09.jpg"]
    }
    // form value
    $('form').on('submit', function(e){
        e.preventDefault()
        console.log("submit")
        console.log($('#username').val())
        product.title = $('#title').val()
        product.price = $('#price').val()
        product.description = $('#description').val()
        product.categoryId = $('#category').val()
    
        console.log('product before submit', product)
        insertProduct(product)
        .then(res => console.log(res))
    })

    // append to document
    getAllProducts(12, 0)
    .then(res => {
        console.log(res)
        res.map(product => (
            $('#courses').append(`
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img class="rounded-t-lg" src=${product.images[0]} alt="" />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${product.title}</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
            </div>
            
            `)
        ))
    })
    
    insertProduct()
    .then(res => {
        res.map(product => (
            $('#courses').prepend(`
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img class="rounded-t-lg" src=${product.title = $('#title').val()} alt="" />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${product.title}</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
            </div>
            `)
        ))
    })

    // btnTop
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#top').fadeIn(1000);
        } else {
            $('#top').fadeOut(1000);
        }
    });

    $('#top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, '1000')
    });

    $('#btnScroll').on('click',function(){
        window.scrollTo({
            top:0,
            left:0,
            behavior:'smooth'
        })
    });


})

async function insertProduct(product){
    let response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
    let newProduct = await response.json()
    $('#courses').prepend(`
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img class="rounded-t-lg" src=${newProduct.images[0]} alt="" />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${newProduct.title}</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        </div>
    `)
    return newProduct
}


async function getAllProducts(limit, offset){
    let response = await fetch(`${API_URL}/products?limit=${limit}&offset=${offset}`)
    return response.json()
}
