document.getElementById("rzp-button1").onclick = function (e) {
    e.preventDefault();
    var amt = document.getElementById("amt").value;
    fetch(`/pay/${amt}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((result) => {
            var options = {
                key: "rzp_test_KFq3RmFXb4XMtO",
                amount: result.amount,
                currency: "INR",
                handler: function (response) {
                    alert("Payment ID: " + response.razorpay_payment_id);
                    alert("Order ID: " + response.razorpay_order_id);
                    alert("Signature: " + response.razorpay_signature);
                    
                    // Redirect to the success page
                    window.location.href = "success_view/";
                },
                // Other configuration options...
            };
            var rzp1 = new Razorpay(options);
            rzp1.on("payment.failed", function (response) {
                alert("Payment Failed: " + response.error.description);
            });
            rzp1.open();
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            // Handle error, e.g., display an error message to the user
        });
};


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

fetch(`/pay/${amt}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
    },
    body: JSON.stringify({ amount: amt })
})
