import { Link } from 'next-view-transitions'
import React from 'react'
import Container from './Container'
import ThemeToggle from './theme-toggle'
import CreateGoal from './login'
import { Target } from 'lucide-react'
import Login from './login'

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
        <nav className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
            <Container>
                <div className='flex h-16 items-center justify-between px-4'>
                    <div className='flex items-center gap-4'>
                        <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity">
                            <div className='w-8 h-8 rounded-lg bg-primary flex items-center justify-center'>
                                <Target className='className="h-5 w-5 text-primary-foreground' />
                            </div>
                            <span className="hidden sm:inline-block">Habit Tracker</span>
                        </Link>

                        {/* {
                            navItems.map((items) => {
                                return (
                                    <Link href={items.href} key={items.label}>
                                        <span className='text-sm font-medium text-gray-500 hover:text-gray-700 hidden md:block hover:underline cursor-pointer'>{items.label}</span>
                                    </Link>
                                )
                            })
                        } */}
                    </div>
                    <div className='flex items-center gap-4'>
                        <Login/>
                        <ThemeToggle />
                    </div>
                </div>
            </Container>
        </nav>
    )
}

export default MainNavbar