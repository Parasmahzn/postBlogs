'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import Provider from "./Provider";

const Nav = () => {

    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {

        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, [])

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href='/' className="flex gap-2">
                <Image className="object-contain"
                    alt="Promptopia Logo"
                    src='/assets/images/logo.svg'
                    width={30}
                    height={30}
                />
                <p className="logo_text"> Promptopia</p>
            </Link>

            {/* Desktop Navigation*/}
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link className="black_btn" href='/create-prompt'>
                            Create Post
                        </Link>
                        <button type="button" onClick={signOut}
                            className="outline_btn">
                            Sign Out
                        </button>
                        <Link href='/profile'>
                            <Image
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                                src={session?.user.image}
                            />

                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    key={provider.name}
                                    type="button"
                                    className="black_btn"
                                    onClick={() => signIn(provider.id)}

                                >
                                    Sign In

                                </button>
                            ))}
                    </>
                )
                }
            </div>

            {/*Mobile Navigation*/}
            <div className="sm:hidden flex relative">
                {
                    session?.user ? (
                        <div className="flex">
                            <Image
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                                src={session?.user.image}
                                onClick={() => setToggleDropdown((prev) => !prev)}
                            />
                            {toggleDropdown && (
                                <div className="dropdown">
                                    <Link href='/profile'
                                        className="dropdown_link"
                                        onClick={() => setToggleDropdown(false)}
                                    >
                                        My Profile
                                    </Link>

                                    <Link href='/create-prompt'
                                        className="dropdown_link"
                                        onClick={() => setToggleDropdown(false)}
                                    >
                                        Create Prompt
                                    </Link>

                                    <button type="button"
                                        className="mb-5 w-full black_btn"
                                        onClick={() => {
                                            setToggleDropdown(false);
                                            signOut();
                                        }}
                                    >
                                        Sign Out
                                    </button>

                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            {providers &&
                                Object.values(providers).map((provider) => (
                                    <button
                                        key={provider.name}
                                        type="button"
                                        className="black_btn"
                                        onClick={() => signIn(provider.id)}
                                    >
                                        Sign In

                                    </button>
                                ))}
                        </>
                    )

                }

            </div>
        </nav >
    )
}

export default Nav