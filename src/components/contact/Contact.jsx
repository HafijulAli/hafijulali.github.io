import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import { MdOutlineEmail } from 'react-icons/md';
import { BsWhatsapp } from 'react-icons/bs';
import { RiTelegramLine } from 'react-icons/ri';
import emailjs from 'emailjs-com';
import './contact.css';


const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const USER_ID = process.env.REACT_APP_EMAILJS_USER_ID;


const Contact = () => {
  const clearForm = () => {
    document.getElementById("contact-form").reset();
  }


  const form = useRef();
  const sendMail = (e) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait... while email is being sent");
    emailjs.sendForm(SERVICE_ID,
      'template_hsgc5x8', form.current, USER_ID).then((result) => {
        toast.update(toastId, { render: "Email sent successfully, please allow Hafijul to respond within 24 hours", type: "success", isLoading: false });
        console.debug(result.text);
        clearForm();
      }, (error) => {
        toast.update(toastId, { render: "There was some issue sending your email, please contact me@hafijul.dev", type: "error", isLoading: false });
        console.error(error.text);
      }).finally(() => {
        console.debug("Cleaning up pending and stale toast notifications");
        setTimeout(() => toast.dismiss(), 5000);
      });
  };

  return (
    <section id="contact">
      <h5>Get To Know</h5>
      <h2>Contact Me</h2>
      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
            <MdOutlineEmail className='contact__option-icon' />
            <h4>Email</h4>
            <h5>hafijul.dev@gmail.com</h5>
            <a href='mailto:hafijul.dev@gmail.com' target="_blank" rel="noopener noreferrer">Send a Message</a>
          </article>
          <article className="contact__option">
            <RiTelegramLine className='contact__option-icon' />
            <h4>Telegram</h4>
            <h5>Sheikh Hafijul Ali</h5>
            <a href='https://telegram.me/hafijuldev' target="_blank" rel="noopener noreferrer">Send a Message</a>
          </article>
          <article className="contact__option">
            <BsWhatsapp className='contact__option-icon' />
            <h4>WhatsApp</h4>
            <h5>Sheikh Hafijul Ali</h5>
            <a href='https://api.whatsapp.com/send?phone=917992390073&text=Hii%20How%20are%20you?' target="_blank" rel="noopener noreferrer">Send a Message</a>
          </article>
        </div>
        <form ref={form} onSubmit={sendMail} id="contact-form">
          <input type="text" name="name" placeholder='Your Full Name' required />
          <input type="email" name="email" placeholder='Your Email' required />
          <textarea name='message' rows="7" placeholder='Your Message' required> </textarea>
          <button type='sumbit' className='btn btn-primary'>Send Message</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;