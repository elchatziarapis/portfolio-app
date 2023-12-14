
import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { motion } from 'framer-motion'
import { fadeIn } from '../utils/fade';

const Contact = () => {
    const [active, setActive] = useState(true);

    const handleClick = () => {
        setActive(!active);
    }

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs
            .send(
                "serviceID",
                "templateID",
                {
                    from_name: form.name,
                    to_name: "My Name",
                    from_email: form.email,
                    to_email: "My Mail",
                    message: form.message,
                },
                "PUBLIC KEY"
            )
    };

    return (
        <div className="flex flex-col-reverse m-10">
            <motion.div
                className="p-8 rounded-2xl bg-gray-600"
                variants={fadeIn('left', 'spring', 0.5, 0.75, 'easeOut')}
                animate={active ? 'visible' : 'hidden'}
                handleClick={setActive}
                onClick={handleClick}>
                <p className="text-lg font-mono">To get in touch</p>
                <h3 className="text-4xl font-mono">Contact.</h3>
                <form className="flex flex-1 flex-col mt-7 gap-5 font-sans" onSubmit={handleSubmit}>
                    <label className="flex flex-col">
                        <span className="mb-4">Your Name</span>
                        <input
                            name="name"
                            type="text"
                            placeholder="What is your name?"
                            className="rounded-lg placeholder:text-taupe px-4 py-4 outline-none border-none font-medium "
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="mb-4">Your Email</span>
                        <input
                            name="email"
                            type="email"
                            placeholder="What is your email?"
                            className="rounded-lg placeholder:text-taupe px-4 py-4 outline-none border-none font-medium "
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="mb-4">Your Message</span>
                        <textarea
                            name="message"
                            type="text"
                            placeholder="What is your message?"
                            className="rounded-lg placeholder:text-taupe px-4 py-4 outline-none border-none font-medium ">
                        </textarea>
                    </label>
                    <button
                        className="flex justify-center bg-gray-700 rounded-3xl hover:bg-slate-400 hover:text-white transition duration-300 ease-in-out py-5"
                        type="submit">
                        Submit
                    </button>
                </form>
            </motion.div>
        </div>
    )
}

export default Contact;