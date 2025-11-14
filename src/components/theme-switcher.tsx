'use client'

import type { VariantProps } from 'class-variance-authority'
import type { buttonVariants } from '@/components/ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ThemeSwitcherProps
  = React.ComponentProps<'button'>
    & VariantProps<typeof buttonVariants> & {
      asChild?: boolean
    }

export function ThemeSwitcher({ size, variant, className }: ThemeSwitcherProps) {
  const { setTheme } = useTheme()
  return (
    <Button
      size={size}
      variant={variant}
      className={cn('size-8 p-1.5', className)}
      onClick={() => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
      }}
    >
      <MoonIcon
        size={16}
        className={`
          shrink-0 scale-0 opacity-0 transition-all
          dark:scale-100 dark:opacity-100
        `}
        aria-hidden="true"
      />
      <SunIcon
        size={16}
        className={`
          absolute shrink-0 scale-100 opacity-100 transition-all
          dark:scale-0 dark:opacity-0
        `}
        aria-hidden="true"
      />
    </Button>
  )
}
