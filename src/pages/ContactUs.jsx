

export default function ContactUs() {
  return (
    <>
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 grid md:grid-cols-2 gap-10 w-full max-w-5xl">
          
          {/* Left Side */}
          <div>
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">Let's get in touch</h3>
            <p className="text-gray-600 mb-6">
              Have something on your mind? Drop us a message and we'll get back to you as soon as possible!
            </p>
            {/* <div className="space-y-4">
              <p>📍 Karnal, Haryana</p>
              <p>📧 Career@gmail.com</p>
              <p>📞 903-xxx-xxxx</p>
            </div> */}
            <div className="mt-6">
              <p className="mb-2">Connect with us!</p>
              <div className="flex gap-4 text-xl">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <form className="space-y-4">
            <h3 className="text-xl font-bold text-indigo-600">Contact Us</h3>
            <input type="text" placeholder="Username" 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"/>
            <input type="email" placeholder="Email" 
                className="w-full p-3 border rounded-lg focus:ring-2 outline-none focus:ring-indigo-400"/>
            <textarea placeholder="Message" 
                className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-indigo-400 outline-none"></textarea>
            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">Send</button>
          </form>
        </div>
      </div>
      
    </>
  );
}
