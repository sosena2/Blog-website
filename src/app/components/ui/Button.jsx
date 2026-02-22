import React from 'react'

const Button = ({children, variant = 'primary', className = '', ...props}) => {
  const baseStyle = 'px-4 py-2 rounded-xl font-semibold transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-[#0F4C5C]'
    const variants = {
  primary: "bg-[#0F4C5C] text-white hover:bg-[#0C3D4A]",
  soft: "bg-[#D9EEF3] text-[#0C3D4A] hover:bg-[#C8E4EB]"
    }
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>{children}</button>
  )
}

export default Button