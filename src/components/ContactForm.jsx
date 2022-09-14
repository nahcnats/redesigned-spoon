import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                name: null,
                email: null,
                message: null,
            });
        }
    }, [formState, reset]);

    function FormFieldErrors({ message }) {
        return <div className="r mt-2 text-xs text-red-500">{message}</div>;
    }

    const encode = (data) => {
        return Object.keys(data)
            .map(
                (key) =>
                    encodeURIComponent(key) +
                    "=" +
                    encodeURIComponent(data[key])
            )
            .join("&");
    };

    async function submitContactHandler({ name, email, message }) {
        const payload = {
            name,
            email,
            message,
        };

        try {
            const response = await axios({
                method: "post",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                url: "/",
                data: encode({ "form-name": "contact v1", ...payload }),
            });

            if (response) {
                window.location.href("/success");
            }
        } catch (error) {
            window.Location.href("/error");
        }
    }

    return (
        <form
            className="w-full"
            name="contact v1"
            method="post"
            netlify
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit(submitContactHandler)}
        >
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <input type="hidden" name="form-name" value="contact v1" />
                <div className="mb-4 flex flex-col">
                    <label htmlFor="name">Name</label>
                    <input
                        {...register("name", {
                            required: "Please enter your name",
                        })}
                        type="text"
                        id="name"
                        name="name"
                        className="h-8 rounded p-2 text-black"
                    />
                    {errors.name && (
                        <FormFieldErrors
                            message={errors.prospectName.message}
                        />
                    )}
                </div>
                <div className="mb-4 flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                        {...register("email", {
                            required: "Please enter your email",
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                message: "Please enter valid email",
                            },
                        })}
                        type="email"
                        id="email"
                        name="email"
                        className="h-8 rounded p-2 text-black"
                    />
                    {errors.email && (
                        <FormFieldErrors message={errors.email.message} />
                    )}
                </div>
                <div className="mb-6 flex flex-col md:col-span-2">
                    <label htmlFor="message">Message</label>
                    <textarea
                        {...register("message", {
                            required: "Please enter your message",
                        })}
                        id="message"
                        name="message"
                        cols="30"
                        rows="5"
                        className="rounded p-2 text-black"
                    />
                    {errors.message && (
                        <FormFieldErrors message={errors.message.message} />
                    )}
                </div>
            </div>
            <button type="submit" className="primary-button w-full">
                Reach Out
            </button>
        </form>
    );
}
