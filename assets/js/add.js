const container_form = document.getElementsByClassName('container-contact')[0];
const form = document.getElementById('contact-form');
const form_email = document.getElementById('email');
const form_subject = document.getElementById('subject');
const form_text_area = document.getElementById('message');
const contact_message_limit_count = document.getElementById('contact-message-limit-count');
const form_submit = document.getElementById('contact-btn');
const success_message = document.getElementsByClassName('success-message')[0];

document.addEventListener('DOMContentLoaded',() => {

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