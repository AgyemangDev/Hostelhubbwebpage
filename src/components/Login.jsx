import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth,db } from "../firebase/FirebaseConfig"
import InputField from "./AgentDashboard/inputField"
import RememberMe from "./AgentDashboard/RememberMe"
import LoginButton from "./AgentDashboard/LoginButton"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Pre-fill saved credentials
  useEffect(() => {
    const savedEmail = localStorage.getItem("email")
    const savedPassword = localStorage.getItem("password")
    if (savedEmail && savedPassword) {
      setEmail(savedEmail)
      setPassword(savedPassword)
      setRememberMe(true)
    }
  }, [])

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password")
      return
    }

    setIsLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const userId = userCredential.user.uid

      if (rememberMe) {
        localStorage.setItem("email", email)
        localStorage.setItem("password", password)
      } else {
        localStorage.removeItem("email")
        localStorage.removeItem("password")
      }

      const studentRef = doc(db, "Student_Users", userId)
      const studentSnap = await getDoc(studentRef)

      if (!studentSnap.exists()) {
        alert("You are not qualified to log in. Kindly apply through our website.")
        setIsLoading(false)
        return
      }

      const studentData = studentSnap.data()

      if (studentData.isEmployeeApplied && studentData.isAccepted) {
        const employeeRef = doc(db, "Employees", userId)
        const employeeSnap = await getDoc(employeeRef)
        const employeeData = employeeSnap.exists() ? employeeSnap.data() : {}

        const combined = { ...studentData, ...employeeData }
        navigate("/agent-dashboard", { state: { user: combined } })
      } else if (studentData.isEmployeeApplied && !studentData.isAccepted) {
        alert("Your application is under review. Kindly contact Hostelhubb support.")
      } else {
        alert("You are not qualified to log in. Kindly apply through our website.")
      }
    } catch (err) {
      console.error(err)
      alert("Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center text-[#610b0c] mb-6">Login to Hostelhubb</h2>

      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />

      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />

      <RememberMe
        rememberMe={rememberMe}
        setRememberMe={setRememberMe}
      />

      <LoginButton
        isLoading={isLoading}
        onClick={handleLogin}
      />
    </div>
  )
}

export default Login
