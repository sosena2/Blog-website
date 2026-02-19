import React from 'react'

const Button = ({children, variant = 'primary', ...props}) => {
    const baseStyle = 'px-4 py-2 rounded-xl font-semibold transition-colors duration-300'
    const variants = {
        primary: "bg-[#40513B] text-white hover:bg-[]"
    }
  return (
    <button className={`${baseStyle} ${variants[variant]}`} {...props}>{children}</button>
  )
}

export default Button