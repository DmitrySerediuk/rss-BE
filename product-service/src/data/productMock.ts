const productsData = [
        {
            "count": 1,
            "id": 1,
            "title": "yandex.ru",
            "description": "Yandex company share price",
            "price": "999"
        },
        {
            "count": 1,
            "id": 2,
            "title": "google.com",
            "description": "Google price share",
            "price": "5000"
        },
        {
            "count": 1,
            "id": 3,
            "title": "mail.ru",
            "description": "Mailru price share",
            "price": "33"
        },
        {
            "count": 1,
            "id": 4,
            "title": "amazon",
            "description": "Amazon price share",
            "price": "4000"
        },
        {
            "count": 1,
            "id": 5,
            "title": "shell",
            "description": "Shell price share",
            "price": "424"
        },
        {
            "count": 1,
            "id": 6,
            "title": "boing",
            "description": "Boing price share",
            "price": "321"
        }
    ]

const getAllProducts = async () => {
    return productsData;
}

export {getAllProducts}