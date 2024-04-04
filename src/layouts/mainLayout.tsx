import { useLoginStore } from "@/states/Login.state"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { verifyJWT } from "@/tools"
export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { setToken } = useLoginStore.getState()
    const navigation = useNavigate()
    const [load, setLoad] = useState(false)
    const verify = async () => {
        const token = localStorage.getItem("token")
        console.log(token);
        if (token) {
            const tokenValid = await verifyJWT(token)
            if (tokenValid) {
                setToken(token)
            } else {
                // navigation("/")
            }
        } else {
            // navigation("/")
        }
    }

    useEffect(() => {
        verify().finally(() => {
            setLoad(true)
        })
    }, [])

    return (
        <div>
            {load ? children : <></>}
        </div>
    )
}
