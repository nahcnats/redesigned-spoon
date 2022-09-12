import { useForm } from "react-hook-form";

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function FormFieldErrors({ message }) {
        return <div className="r mt-2 text-xs text-red-500">{message}</div>;
    }

    async function submitHandler() {}

    return (
        <form className="w-full" onSubmit={handleSubmit(submitHandler)}>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div className="mb-4 flex flex-col">
                    <label htmlFor="name">Name</label>
                    <input
                        {...register("name", {
                            required: "Please enter your name",
                        })}
                        type="text"
                        id="name"
                        className="h-8 rounded p-2"
                    />
                    {errors.name && (
                        <FormFieldErrors message={errors.name.message} />
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
                        className="h-8 rounded p-2"
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
                        cols="30"
                        rows="5"
                        className="rounded p-2"
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
