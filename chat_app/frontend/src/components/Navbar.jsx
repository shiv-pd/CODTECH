
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom';
import { LogOut, MessageSquare,Settings,User} from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';

const Navbar = () => {
  const {logout, authUser} = useAuthStore();
  const {theme, setTheme}  = useThemeStore();

  const changeTheme = () => {
    if(theme === "light")setTheme("dark");
    if(theme === "dark")setTheme("cupcake");;
    if(theme === "cupcake")setTheme("retro");
    if(theme === "retro")setTheme("dracula");
    if(theme === "dracula") setTheme("forest");
    if(theme === "forest") setTheme("nord");
    if(theme === "nord") setTheme("garden");
    if(theme === "garden") setTheme("luxury");
    if(theme === "luxury") setTheme("night");
    if(theme === "night") setTheme("light");

  }

  return (
    < header 
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
     <div className="container mx-auto px-4 h-16">
       <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all" >
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare  className="w-5 h-5 text-primary"/>
            </div>
            <h1 className='text-lg font-bold'>Myapp</h1>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* <Link to={"/settings"}
                className={`btn btn-sm gap-2 transition-colors`}>
            <Settings  className="w-4 h-4"/>
            <span className="hidden sm:inline">Settings</span>
          </Link> */}
            <button className="flex gap-2 items-center hover:animate-spin" onClick={changeTheme} >
            <Settings  className="size-5 mx-2"/>
            </button>


          {authUser && (
            <>
            <Link to={"/profile"} className={`btn btn-sm gap-2`}>
              <User className="size-5"/>
              <span className="hidden sm:inline">Profile</span>
            </Link>

            <button className="flex gap-2 items-center" onClick={logout}>
              <LogOut className="size-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            
            </>
          )}
        </div>

       </div>
     </div>
    </header>
  );
};

export default Navbar;