
"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect} from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {

  const isUserLoggedIn = true;
  const [ providers, setProviders] = useState(null);

  // mobile menu
  const [toggleDropdown, setSetToggleDropdown] = useState(false);


  useEffect( ()=>{

    const setProviders = async ()=>{

      const response = await getProviders();
      setProviders(response);
    } 

    setProviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className=" flex gap-2 flex-center">
        <Image 
          src="/assets/images/logo.svg"
          alt="logo"
          width={30} height={30}
          className='object-contain'
        />
        <p className="logo_text">Promptopia</p>

      </Link>
      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? ( 
          <div className=" flex gp-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
            create a post
            </Link>

            <button className="outline_btn" type='button' onClick={signOut}>
              sign Out
            </button>

            <Link href="/profile">
              <Image src="/assets/images/logo.svg"
                width={37} height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        )
         : (
          <>
            { providers && Object.values(providers).map((provider)=>(
              <button 
               type="button"
                key={provider.name}
                onClick={()=>signIn(provider.id)}
                className="black_btn"
              >
                sign In
              </button>
            ))}
          </>
         )
        }
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden  flex relative ">
        { isUserLoggedIn ? (
          <div className="flex">
            <Image src="/assets/images/logo.svg"
                width={37} height={37}
                className="rounded-full"
                alt="profile"
                onClick={()=>
                  setSetToggleDropdown((prev)=> !prev)
                }
            />

            { toggleDropdown && (
              <div className="dropdown">
                {/* see profile link */}
                <Link
                  href="/profile"
                  className='dropdown_link'
                  onClick={()=>setSetToggleDropdown(false)}
                >
                  My Profile.
                </Link>
                {/* create prompt link */}
                <Link
                  href="/create-prompt"
                  className='dropdown_link'
                  onClick={()=>setSetToggleDropdown(false)}
                >
                  Create Prompt.
                </Link>
                {/* Link to sign out */}
                <Link                >
                  <button
                    type="button"
                    onClick={()=>{
                      setSetToggleDropdown(false);
                      signOut();
                    }}
                    className='mt-5 w-full black_btn'
                  >
                    Sign Out
                  </button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
             { providers && Object.values(providers).map((provider)=>(
              <button 
               type="button"
                key={provider.name}
                onClick={()=>signIn(provider.id)}
                className="black_btn"
              >
                sign In
              </button>
            ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
