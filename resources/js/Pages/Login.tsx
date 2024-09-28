import { Head, useForm, usePage } from "@inertiajs/react"
import style from "../../css/login.module.css"
import TextInput from "@/Components/TextInput"
import { FormEvent, FormEventHandler } from "react"
export default function Login() {
    const [] = usePage().component
    const { post, setData, setError, errors, data } = useForm({
        username: "",
        password: "",
        remember: true
    })

    async function submitData(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault()
        post("/login", {
            onSuccess: () => {
                route("/dashboard")
            }
        })
    }

    return (
        <>
        <Head title="Login" />
            <div className={style.container}>

                <div>
                    <img src="/farmer.jpg" alt="" />
                </div>
                <form onSubmit={submitData}>
                    <h3>Aplikasi Pendataan Kelompok Tani Kab. Enrekang</h3>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" value={data.username} onChange={ev => {
                            setData({
                                ...data,
                                username: ev.target.value,
                            })
                        }} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" value={data.password} onChange={ev => {
                            setData({
                                ...data,
                                password: ev.target.value,
                            })
                        }} />
                    </div>
                    <button>
                        Login
                    </button>
                </form>
            </div>
        </>
    )
}