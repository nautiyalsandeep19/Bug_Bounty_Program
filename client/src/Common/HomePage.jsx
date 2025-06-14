// import { assets } from '../../assets/myassets'
import { motion } from 'motion/react'
import Navbar from './Navbar'
const Home = () => {
  return (
    <>
      <section className="relative min-h-[100vh] flex items-center justify-center px-4 sm:px-6 md:px-12 bg-[#060A58] overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* <img
            src={assets.bgimg}
            alt="Background"
            className="object-cover w-full h-full brightness-125 scale-105 transition-transform duration-[6s] ease-in-out animate-slowZoom"
          /> */}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-10 text-white flex flex-col items-center gap-6 w-full max-w-6xl text-center py-12 sm:py-20"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight px-4 tracking-tight"
          >
            Welcome to <span className="text-blue-300">Versantix</span>
            <br className="hidden sm:block" />
            <span className="text-gradient">
              Continuous Vulnerability Assessment Platform
            </span>
          </motion.h1>
        </motion.div>
      </section>
    </>
  )
}

export default Home
