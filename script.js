let cardNumInput = 
    document.querySelector('#cardNum')

cardNumInput.addEventListener('keyup', () => {
    let cNumber = cardNumInput.value
    cNumber = cNumber.replace(/\s/g, "")

    if (Number(cNumber)) {
        cNumber = cNumber.match(/.{1,4}/g)
        cNumber = cNumber.join(" ")
        cardNumInput.value = cNumber
    }
})


document.querySelector('.submit_btn').addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the form from submitting
  alert('Order Successfull');
  window.location.href = "index.html";
});
