import React from 'react'
import CardComponent from '../Components/CardComponent'

function places() {
  return (
    <section className="container flex flex-row justify-center items-center my-10 gap-6 flex-wrap">
    {/* Cards will be dynamically added here */}
      <CardComponent />
  </section>
  )
}

export default places