
"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Utensils, Coffee, Lock, Mail, User, Eye, EyeOff, Check, X, Upload, Shield, Star, ChefHat } from "lucide-react"
import API from "../api/api";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [usernameAvailable, setUsernameAvailable] = useState(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [profileImage, setProfileImage] = useState(null)
  const navigate = useNavigate()

  // Password strength calculation
  useEffect(() => {
    const calculateStrength = (password) => {
      let strength = 0
      if (password.length >= 8) strength += 25
      if (/[A-Z]/.test(password)) strength += 25
      if (/[0-9]/.test(password)) strength += 25
      if (/[^A-Za-z0-9]/.test(password)) strength += 25
      return strength
    }
    setPasswordStrength(calculateStrength(formData.password))
  }, [formData.password])

  // Check username availability
  useEffect(() => {
    const checkUsername = async () => {
      if (formData.username.length >= 3) {
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500))
          setUsernameAvailable(Math.random() > 0.3) // 70% chance available
        } catch (error) {
          setUsernameAvailable(null)
        }
      } else {
        setUsernameAvailable(null)
      }
    }

    const timeoutId = setTimeout(checkUsername, 300)
    return () => clearTimeout(timeoutId)
  }, [formData.username])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setProfileImage(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords don't match!")
      return
    }


    setIsLoading(true)

    try {
      const res = await API.post(`/api/auth/register`, formData)

      console.log("📤 Sending to backend:", formData);
      console.log("✅ Response:", res.data);
      setMessage("Account created successfully! Redirecting to login...")

      setTimeout(() => {
        navigate("/login")
      }, 2000)

    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return "bg-red-500"
    if (passwordStrength < 50) return "bg-orange-500"
    if (passwordStrength < 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return "Weak"
    if (passwordStrength < 50) return "Fair"
    if (passwordStrength < 75) return "Good"
    return "Strong"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
      <div className="w-full max-w-lg">
        {/* Logo and Brand */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                FoodieHub
              </h1>
              <p className="text-sm text-gray-500">Join the culinary community</p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        {/* <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {currentStep} of 2</span>
            <span className="text-sm text-orange-600">{currentStep === 1 ? "Account Details" : "Profile Setup"}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            ></div>
          </div>
        </div> */}

        {/* Main Registration Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Food-themed header */}
          <div className="h-32 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=600')] bg-cover opacity-20 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-6 text-white">
              <h2 className="text-2xl font-bold">Join FoodieHub!</h2>
              <p className="text-orange-100">Create your culinary journey</p>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <Star className="h-5 w-5 text-white/80" />
              <Coffee className="h-5 w-5 text-white/80" />
              <Utensils className="h-5 w-5 text-white/80" />
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 1 && (
                <>

                  {/* Username Field */}
                  <div className="space-y-2">
                    <label htmlFor="username" className="text-sm font-semibold text-gray-700">
                      Username
                    </label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                      <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="foodie_chef"
                        className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                        onChange={handleChange}
                        required
                      />
                      {formData.username.length >= 3 && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          {usernameAvailable === null ? (
                            <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                          ) : usernameAvailable ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <X className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {formData.username.length >= 3 && usernameAvailable !== null && (
                      <p className={`text-sm ${usernameAvailable ? "text-green-600" : "text-red-600"}`}>
                        {usernameAvailable ? "Username is available!" : "Username is already taken"}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {formData.password && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Password strength:</span>
                          <span
                            className={`font-medium ${passwordStrength >= 75 ? "text-green-600" : passwordStrength >= 50 ? "text-yellow-600" : "text-red-600"}`}
                          >
                            {getPasswordStrengthText()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                            style={{ width: `${passwordStrength}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative group">
                      <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {formData.confirmPassword && (
                      <p
                        className={`text-sm ${formData.password === formData.confirmPassword ? "text-green-600" : "text-red-600"}`}
                      >
                        {formData.password === formData.confirmPassword ? "Passwords match!" : "Passwords do not match"}
                      </p>
                    )}
                  </div>

                  {/* Next Step Button */}

                  <button

                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:transform-none disabled:cursor-not-allowed"
                  >
                    Continue to Profile Setup
                  </button>

                  {message && <p className="text-center text-sm text-red-500">{message}</p>}

                  {/* Login link */}
                  <p className="text-center text-md lg:text-lg mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-400 hover:underline">
                      Login
                    </Link>
                  </p>

                </>
              )}


            </form>

            {/* Social Registration */}
            {currentStep === 1 && (
              <>
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">or sign up with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 group">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Google</span>
                  </button>

                  <button className="flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 group">
                    <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Facebook</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center mt-8 text-sm text-gray-500">
          <ChefHat className="h-4 w-4 mr-2" />
          <span>Start your culinary adventure today</span>
        </div>
      </div>
    </div>
  )
}

export default Register
