import React, { useEffect, useRef, useState } from 'react'

const OTP = ({ otpCount, setOtp }) => {
  const [inputArrOTP, setInputArrOTP] = useState(new Array(otpCount).fill(''))
  const refArr = useRef([])

  useEffect(() => {
    refArr.current[0]?.focus()
  }, [])

  const handleOnChange = (value, index) => {
    if (isNaN(value)) return
    const newValue = value.trim()
    const newArr = [...inputArrOTP]
    newArr[index] = newValue.slice(-1)
    setInputArrOTP(newArr)
    if (newValue) {
      refArr.current[index + 1]?.focus()
    }
  }

  const handleOnKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!e.target.value && index > 0) {
        refArr.current[index - 1]?.focus()
      }
    }
  }

  const handleOnPaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '')
    if (!pasted) return

    const otpValues = pasted.split('').slice(0, otpCount)
    const newArr = [...inputArrOTP]
    otpValues.forEach((char, i) => {
      newArr[i] = char
      if (refArr.current[i]) {
        refArr.current[i].value = char
      }
    })
    setInputArrOTP(newArr)
    refArr.current[otpValues.length - 1]?.focus()
  }

  useEffect(() => {
    const newOtp = inputArrOTP.join('')
    setOtp(newOtp)
  }, [inputArrOTP])

  return (
    <div className="w-full flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5">
      {inputArrOTP.map((input, index) => (
        <input
          key={index}
          ref={(el) => (refArr.current[index] = el)}
          value={inputArrOTP[index]}
          onChange={(e) => handleOnChange(e.target.value, index)}
          onKeyDown={(e) => handleOnKeyDown(e, index)}
          onPaste={index === 0 ? handleOnPaste : undefined}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-base sm:text-2xl text-white bg-transparent border-1 p-2 rounded-md sm:rounded-lg shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] outline-none transition-all duration-150 focus:ring-2 focus:ring-blue-400"
        />
      ))}
    </div>
  )
}

export default OTP
