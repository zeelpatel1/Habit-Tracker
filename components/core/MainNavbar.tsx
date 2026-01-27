import { Link } from 'next-view-transitions'
import React from 'react'
import Container from './Container'
import ThemeToggle from './theme-toggle'
import CreateGoal from './create-goal'

const navItems = [
    {
        label: 'About',
        href: '/about'
    },
    {
        label: 'Blog',
        href: '/blog'
    }
]

const MainNavbar = () => {
    return (
        <Container>
        <div className='flex p-4 items-center justify-between'>
            <div className='flex items-center gap-4'>
                <div>
                    Logo
                </div>
                {
                    navItems.map((items)=>{
                        return (
                            <Link href={items.href} key={items.label}>
                                <span className='text-sm font-medium text-gray-500 hover:text-gray-700 hidden md:block'>{items.label}</span>
                            </Link>
                        )
                    })
                }
            </div>
            <div className='flex items-center gap-4'>
                <CreateGoal/>
                <ThemeToggle/>
            </div>
        </div>
        </Container>
    )
}

export default MainNavbar