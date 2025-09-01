
const Footer = () => {
  return (
    <footer className=" h-auto w-full ">
      <div className="w-full h-auto  ">
        <div className="w-full flex   !pb-3  items-start justify-evenly">
          {/* Company Links */}
          <div >
            <h3 className="max-sm:font-medium max-sm:text-[0.9rem] font-semibold text-gray-900 !mb-2">Company</h3>
            <ul className="text-[0.85rem]">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</a></li>
            </ul>
          </div>
            {/* Resources */}
          <div>
            <h3 className=" max-sm:font-medium max-sm:text-[0.9rem] font-semibold text-gray-900 !mb-2">Support</h3>
            <ul className="text-[0.85rem] ">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Social Links */}

          <div >
            <h3 className="max-sm:font-medium max-sm:text-[0.9rem] font-semibold text-gray-900 !mb-2">Connect</h3>
            <ul className="text-[0.85rem] ">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">X (Twitter)</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">YouTube</a></li>
            </ul>
          </div>
          
        </div>

        {/* Bottom section */}
        <div className="w-full !p-5 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">© 2025 Prepverse. All rights reserved</p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms of Use</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
