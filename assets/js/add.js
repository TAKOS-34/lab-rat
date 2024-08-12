const container_form = document.getElementsByClassName('container-contact')[0];
const form = document.getElementById('contact-form');
const form_email = document.getElementById('email');
const form_subject = document.getElementById('subject');
const form_text_area = document.getElementById('message');
const contact_message_limit_count = document.getElementById('contact-message-limit-count');
const form_submit = document.getElementById('contact-btn');
const success_message = document.getElementsByClassName('success-message')[0];
const crypto_price = document.getElementById('crypto-pice');

document.addEventListener('DOMContentLoaded',() => {

    fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?slug=bitcoin&convert=USD', {
        method: 'GET',
        headers: {
            'X-CMC_PRO_API_KEY': '2b4320fa-f696-4192-8c27-da3247c1e45d'
        }
    }).then(response => {
        if (response.status.error_code === 0) {
            crypto_price.innerHTML = parseInt(response.data["1"].quote.USD.price);
        } else {
            crypto_price.innerHTML = 0;
        }
    }).catch(error => {
        console.error(error);
    });

    form_text_area.addEventListener('input', () => {
        contact_message_limit_count.innerHTML = form_text_area.value.length;
        if (form_text_area.value.length > 1900) {
            contact_message_limit_count.style.color = '#ff8484';
        } else { 
            contact_message_limit_count.style.color = '';
        }
    });

    form_submit.addEventListener('click', () => {
        if (form.checkValidity()) {
            const email = form_email.value.trim();
            const subject = form_subject.value.trim();
            const message = form_text_area.value.trim();
            if (email && subject && message && email.length > 0 && email.length < 100 && subject.length > 0 && subject.length < 100 && message.length > 0 && message.length < 2000 ) {
                const contact_infos = {
                    email: email,
                    subject: subject,
                    message: message
                }
                // formspree
                form.remove();
                success_message.style.display = 'block';
                container_form.style.height = '200px';
            } else {
                alert('Please fill all the form fields');
            }
        } else {
            form.reportValidity();
        }
    });

});