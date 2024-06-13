document.getElementById("rzp-button1").onclick = function (e) {
    e.preventDefault();
    var amt = document.getElementById("amt").value;
    fetch(`/cart/pay/${amt}`).then((data) => {
        return data.json();
    }).then((result) => {
        var options = {
            key: "<RAZOR_KEY_ID>",
            amount: result.amount,
            currency: "INR",
            handler: function (response) {
                alert("Payment ID: " + response.razorpay_payment_id);
                alert("Order ID: " + response.razorpay_order_id);
                alert("Signature: " + response.razorpay_signature);
            },
            // Other configuration options...
        };
        var rzp1 = new Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            alert("Payment Failed: " + response.error.description);
        });
        rzp1.open();
    }).catch((err) => {
        console.log(err);
    });
};
